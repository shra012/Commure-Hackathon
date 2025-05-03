from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from validation import validate_pair, validate_batch
from fastapi import HTTPException
from typing import Dict, Any
import json
from pathlib import Path

app = FastAPI(title="CPT RAG Validator")

class Claim(BaseModel):
    code1: str
    code2: str
    modifier: Optional[str] = None


# ClaimResponse model
class ClaimResponse(BaseModel):
    claim_id: str
    response_id: Optional[str]
    status: str
    outcome: str
    denied: bool
    denial_reasons: List[str]
    has_prior_auth: bool
    has_cob: bool
    procedure_codes: List[str]
    modifiers: List[str]
    diagnosis_codes: List[str]
    total_amount: float
    raw_claim: Dict[str, Any]
    raw_response: Optional[Dict[str, Any]]

# Load sample claim response from JSON file
SAMPLE_CLAIM_PATH = Path(__file__).parent / "sample_claim.json"
try:
    with open(SAMPLE_CLAIM_PATH) as f:
        sample_claims = json.load(f)
except FileNotFoundError:
    sample_claims = None

@app.post("/validate/single")
def single(claim: Claim):
    return {**claim.dict(), "result": validate_pair(claim.code1, claim.code2, claim.modifier)}

@app.post("/validate/batch")
def batch(claims: List[Claim]):
    return {"results": validate_batch([c.dict() for c in claims]).to_dict(orient="records")}

@app.get("/claim/{claim_id}", response_model=ClaimResponse)
def get_claim(claim_id: str):
    if claim_id == sample_claims["claim_id"]:
        return sample_claims
    raise HTTPException(status_code=404, detail="Claim not found")

@app.get("/claims", response_model=List[ClaimResponse])
def get_all_claims():
    if sample_claims:
        return sample_claims
    raise HTTPException(status_code=404, detail="No claims found")