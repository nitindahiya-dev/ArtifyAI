# backend/app/utils/images.py
from PIL import Image
import io

def open_and_validate(jpg_bytes: bytes, max_size_bytes: int = 5_000_000):
    if len(jpg_bytes) > max_size_bytes:
        raise ValueError("Image too large")
    try:
        img = Image.open(io.BytesIO(jpg_bytes))
        img.verify()  # verify file isn't truncated
    except Exception as e:
        raise ValueError("Invalid image") from e
    return True
