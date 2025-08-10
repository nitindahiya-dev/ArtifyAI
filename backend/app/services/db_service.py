# backend/app/services/db_service.py
from app.db.session import SessionLocal, engine
from app.db import models
import json

# Create tables if not exist
models.Base.metadata.create_all(bind=engine)


def create_art_record(cid: str, uploader: str | None, report: dict | None, signature: str | None = None, token_id: str | None = None, tx_hash: str | None = None):
    session = SessionLocal()
    try:
        r = models.ArtRecord(
            cid=cid,
            uploader=uploader,
            report_json=json.dumps(report) if report else None,
            signature=signature or (report.get("signature") if report else None),
            token_id=token_id,
            tx_hash=tx_hash,
        )
        session.add(r)
        session.commit()
        session.refresh(r)
        return r
    finally:
        session.close()
