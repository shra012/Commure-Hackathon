from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from validation import validate_pair, validate_batch

app = FastAPI(title="CPT RAG Validator")

class Claim(BaseModel):
    code1: str
    code2: str
    modifier: Optional[str] = None

@app.post("/validate/single")
def single(claim: Claim):
    return {**claim.dict(), "result": validate_pair(claim.code1, claim.code2, claim.modifier)}

@app.post("/validate/batch")
def batch(claims: List[Claim]):
    return {"results": validate_batch([c.dict() for c in claims]).to_dict(orient="records")}