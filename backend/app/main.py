import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
from ml.src.infer import ArtAuthenticityModel, load_model

app = FastAPI()

# Load model at startup
model = load_model()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    result = model.predict(image)
    return JSONResponse(content=result)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    result = model.predict(image)
    report = {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "similar_works": ["Reference Authentic Image 1", "Reference Authentic Image 2"]  # Placeholder
    }
    return JSONResponse(content=report)