# backend/app/services/inference_service.py
from app.ml.loader import get_model, image_to_embedding
from app.schemas.pydantic_models import AIReport
import math
import random

def run_inference(image_bytes: bytes) -> AIReport:
    """
    Returns a minimal AIReport:
      - score: 0..100
      - embedding: optional numeric list (low-dim)
      - similar: empty for now
      - meta: extra metadata
    """
    model = get_model()
    if model is None:
        # fallback: generate mock score and embedding
        score = int(60 + 20 * (random.random()))  # 60-80 pseudo
        embedding = [round(float(random.gauss(0, 1)), 6) for _ in range(128)]
        return AIReport(score=score, embedding=embedding, similar=[], meta={"mock": True})

    # Real model path: compute embedding and a simple "authenticity" heuristic:
    # local import to avoid requiring numpy unless model is used
    import numpy as np  # type: ignore

    emb = image_to_embedding(image_bytes, model)
    vec = emb
    norm = float(np.linalg.norm(vec))
    # Map norm to 0..100 using a simple sigmoid heuristic:
    score = max(0, min(100, int(100 * (1.0 / (1.0 + math.exp(-(norm - 1.0)))) )))  # arbitrary sigmoid
    embedding = [float(x) for x in (vec[:128].tolist() if hasattr(vec, "tolist") else vec[:128])]
    return AIReport(score=score, embedding=embedding, similar=[], meta={"mock": False})
