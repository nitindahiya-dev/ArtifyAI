# backend/app/db/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ArtRecord(Base):
    __tablename__ = "art_records"

    id = Column(Integer, primary_key=True, index=True)
    cid = Column(String(256), unique=False, nullable=False)
    uploader = Column(String(128), nullable=True)
    report_json = Column(Text, nullable=True)
    signature = Column(String(256), nullable=True)
    token_id = Column(String(128), nullable=True)
    tx_hash = Column(String(128), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
