# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import infer as infer_router_module

from app.ml import loader as ml_loader

app = FastAPI(title="ArtifyAi Backend")

# CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    # Attempt to warm up / load the ML model (if available)
    try:
        ml_loader.init_model()
        print("ML model loader finished.")
    except Exception as e:
        # keep running — inference service will fall back to mock if necessary
        print("ML model not loaded:", e)


# include endpoints
app.include_router(infer_router_module.router, prefix="/infer", tags=["infer"])

# health check
@app.get("/health")
def health():
    return {"status": "ok", "env": settings.ENV}
