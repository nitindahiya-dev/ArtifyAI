# backend/app/services/ipfs_service.py
import requests
import json
from app.core.config import settings
from typing import Dict, Any

WEB3_UPLOAD_URL = "https://api.web3.storage/upload"

def upload_image_and_report(image_bytes: bytes, filename: str, report: Dict[str, Any]) -> str:
    token = settings.WEB3STORAGE_TOKEN
    # Dev-friendly: if token is missing or looks like a placeholder, return a mock CID
    if not token or token.strip().lower().startswith("your_") or token.strip() == "":
        # mock CID — NOT a real IPFS CID, used for local dev/testing only
        return "bafybeibackupmockciddevonly1234567890abcdef"
    headers = {"Authorization": f"Bearer {token}"}
    files = [
        ("file", (filename, image_bytes, "application/octet-stream")),
        ("file", ("report.json", json.dumps(report).encode("utf-8"), "application/json")),
    ]
    resp = requests.post(WEB3_UPLOAD_URL, headers=headers, files=files)
    if not resp.ok:
        raise RuntimeError(f"IPFS upload failed: {resp.status_code} {resp.text}")
    data = resp.json()
    cid = data.get("cid")
    if not cid:
        raise RuntimeError("IPFS response missing cid")
    return cid
