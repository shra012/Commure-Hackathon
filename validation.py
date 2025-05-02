import os
import json
import torch
import logging
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

import chromadb
from sentence_transformers import SentenceTransformer
import pandas as pd

# Logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# Configuration
RULES_PATH      = Path("/kaggle/input/commune-data/ncci_rules.json")
COLLECTION_NAME = "ncci_rules"
BATCH_SIZE      = 5000
EMBED_BATCH     = 64
MAX_THREADS     = 4

# Device
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
logging.info(f"Using device: {DEVICE}")

# Load rules
with open(RULES_PATH) as f:
    all_rules: List[Dict] = json.load(f)
rules = all_rules[:100]  # slice in prod as needed

# Prepare ingestion lists
txts, metas, ids = [], [], []
for idx, rule in enumerate(rules):
    txts.append(rule["rule_text"])
    metas.append({
        "code1":             rule["code1"],
        "code2":             rule["code2"],
        "modifier_allowed":  rule["modifier_allowed"],
        "modifier_indicator":rule["modifier_indicator"],
        "valid_modifiers":   "LT,RT,FA,F1,F2"
    })
    ids.append(f"rule_{idx:06d}")

# Initialize model & ChromaDB
model = SentenceTransformer("all-MiniLM-L6-v2", device=DEVICE)
class TorchEmbedFn:
    def __init__(self, mdl): self.model = mdl
    def __call__(self, input: List[str]) -> List[List[float]]:
        return self.model.encode(input, batch_size=EMBED_BATCH, convert_to_numpy=True)
embed_fn = TorchEmbedFn(model)

client = chromadb.Client()
if COLLECTION_NAME in [c.name for c in client.list_collections()]:
    client.delete_collection(COLLECTION_NAME)
collection = client.create_collection(name=COLLECTION_NAME, embedding_function=embed_fn)

# Chunk helper
def chunked(lst, n):
    for i in range(0, len(lst), n): yield lst[i:i+n]

# Embed & upload
logging.info("Generating embeddings…")
emb_batches = [model.encode(batch, batch_size=EMBED_BATCH, convert_to_numpy=True)
               for batch in chunked(txts, BATCH_SIZE)]
text_batches = list(chunked(txts, BATCH_SIZE))
meta_batches = list(chunked(metas, BATCH_SIZE))
id_batches   = list(chunked(ids, BATCH_SIZE))

def upload_batch(i, docs, metas, ids_, embs):
    collection.add(documents=docs, metadatas=metas, ids=ids_, embeddings=embs)
    return f"Batch {i+1}/{len(text_batches)} done"

logging.info("Uploading... ")
with ThreadPoolExecutor(max_workers=MAX_THREADS) as ex:
    for future in as_completed(
        [ex.submit(upload_batch, i, d, m, idb, eb)
         for i,(d,m,idb,eb) in enumerate(zip(text_batches,meta_batches,id_batches,emb_batches))]
    ):
        logging.info(future.result())
logging.info("✅ Ingestion complete")

# Validation Logic
def is_valid_modifier(mod: Optional[str], valid_mods: set) -> bool:
    return bool(mod and mod in valid_mods)

def search_rule(code1: str, code2: str) -> Tuple[Optional[str], Optional[dict]]:
    resp = collection.query(
        query_texts=[f"{code1} with {code2}"], n_results=3,
        where={"code1": code1}, include=["documents","metadatas"]
    )
    docs, metas = resp["documents"][0], resp["metadatas"][0]
    for doc, meta in zip(docs, metas):
        if meta.get("code2")==code2: return doc, meta
    return None, None


def validate_pair(code1: str, code2: str, modifier: Optional[str]=None) -> str:
    txt, meta = search_rule(code1, code2)
    if not txt: return f"✅ No rule for {code1}+{code2}"
    valid_mods = set(meta.get("valid_modifiers","").split(","))
    if meta.get("modifier_allowed"):
        if is_valid_modifier(modifier, valid_mods): return f"✅ '{modifier}' valid — {txt}"
        return f"❌ Invalid: got '{modifier}'. Allowed: {', '.join(sorted(valid_mods))}"
    if modifier:
        return f"❌ Modifier not allowed for {code1}+{code2}"
    return f"✅ No modifier as required — {txt}"


def validate_batch(claims: List[Dict]) -> pd.DataFrame:
    rows=[]
    for c in claims:
        rows.append({
            "code1":c["code1"],"code2":c["code2"],"modifier":c.get("modifier"),
            "result":validate_pair(c["code1"],c["code2"],c.get("modifier"))
        })
    return pd.DataFrame(rows)