# backend/app/schemas/pydantic_models.py
from pydantic import BaseModel
from typing import List, Optional, Any

class SimilarItem(BaseModel):
    cid: str
    similarity: float

class AIReport(BaseModel):
    score: int  # 0-100
    embedding: Optional[List[float]] = None
    similar: Optional[List[SimilarItem]] = []
    signature: Optional[str] = None
    meta: Optional[dict] = None

class InferenceResponse(BaseModel):
    cid: str
    report: AIReport
