# backend/tests/test_infer.py
import io
from PIL import Image
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)

def create_test_image_bytes():
    img = Image.new("RGB", (64, 64), color=(73, 109, 137))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()

@pytest.mark.skipif(not settings.WEB3STORAGE_TOKEN or not settings.REPORT_SIGNER_PRIVATE_KEY, reason="Requires WEB3STORAGE_TOKEN & REPORT_SIGNER_PRIVATE_KEY env")
def test_infer_route():
    data = {"file": ("test.png", create_test_image_bytes(), "image/png")}
    resp = client.post("/infer/", files=data)
    assert resp.status_code == 200
    j = resp.json()
    assert "cid" in j
    assert "report" in j
    assert "score" in j["report"]
