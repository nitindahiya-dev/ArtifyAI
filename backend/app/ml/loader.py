# backend/app/ml/loader.py
import io
from PIL import Image

# Lazy / optional imports to avoid hard failures when ML libs are not installed
MODEL = None
MODEL_NAME = "clip-ViT-B-32"  # change later if you want


def init_model():
    """
    Try to load the sentence-transformers model. If the required package is missing,
    we set MODEL to None and allow the app to continue (inference_service will use a mock).
    """
    global MODEL
    if MODEL is not None:
        return MODEL
    try:
        # Import here so missing packages won't break module import
        from sentence_transformers import SentenceTransformer  # type: ignore
        MODEL = SentenceTransformer(MODEL_NAME)
        print(f"Loaded model {MODEL_NAME}")
    except Exception as e:
        # Keep MODEL as None if loading fails (no heavy deps installed)
        print("ML model not loaded (optional). Reason:", e)
        MODEL = None
    return MODEL


def get_model():
    return MODEL


def image_to_embedding(image_bytes: bytes, model):
    """
    Convert image bytes to a numpy embedding using the provided model.
    This function imports numpy locally so importing the module doesn't require numpy globally.
    """
    if model is None:
        raise RuntimeError("No ML model loaded")

    # local import to avoid top-level dependency
    import numpy as np  # type: ignore

    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    emb = model.encode(img, convert_to_numpy=True)
    return np.array(emb)
