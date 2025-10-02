# /projects/ArtifyAI/backend/app/main.py
import sys
import os
import subprocess
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

# Fix import path: Add project root to sys.path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))  # /projects/ArtifyAI
sys.path.insert(0, project_root)

# Now import ML and DB modules
from ml.src.infer import ArtAuthenticityModel, load_model
from db.models import Base, Prediction
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Database setup
DATABASE_URL = "postgresql://artifyai_user:artpass@localhost:5432/artifyai"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.1.186:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
model = load_model()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    result = model.predict(image)
    return JSONResponse(content=result)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    result = model.predict(image)
    # Upload to IPFS using subprocess
    try:
        cid = subprocess.check_output(['ipfs', 'add', '-Q'], input=image_data, stderr=subprocess.STDOUT).decode().strip()
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"IPFS upload failed: {e.output.decode()}")
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="IPFS binary not found. Ensure 'ipfs' is installed and in PATH.")
    # Save to database
    db = SessionLocal()
    try:
        db_prediction = Prediction(
            cid=cid,
            prediction=result["prediction"],
            confidence=result["confidence"]
        )
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
    finally:
        db.close()
    result["cid"] = cid
    return JSONResponse(content=result)