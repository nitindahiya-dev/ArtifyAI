# backend/app/services/signer_service.py
import os
import hashlib
import json
from eth_account import Account
from eth_account.messages import encode_defunct
from app.core.config import settings
from app.schemas.pydantic_models import AIReport

def sign_report(report: AIReport) -> str:
    key = settings.REPORT_SIGNER_PRIVATE_KEY
    if not key:
        raise RuntimeError("REPORT_SIGNER_PRIVATE_KEY not set")

    # Prepare canonical JSON
    obj = report.dict()
    # Remove signature if present
    obj.pop("signature", None)
    json_bytes = json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    digest = hashlib.sha256(json_bytes).digest()
    message = encode_defunct(digest)
    acct = Account.from_key(key)
    signed = acct.sign_message(message)
    return signed.signature.hex()
