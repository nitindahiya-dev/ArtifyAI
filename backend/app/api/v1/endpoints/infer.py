# backend/app/api/v1/endpoints/infer.py
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from app.services import inference_service, ipfs_service, signer_service, db_service
from app.schemas.pydantic_models import InferenceResponse, AIReport

import traceback

router = APIRouter()


@router.post("/", response_model=InferenceResponse)
async def infer_endpoint(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # 1. Run inference
        report: AIReport = inference_service.run_inference(contents)

        # 2. Sign the report
        sig = signer_service.sign_report(report)
        report.signature = sig

        # 3. Upload image + report.json to IPFS (web3.storage)
        cid = ipfs_service.upload_image_and_report(contents, file.filename, report)

        # 4. Optionally store in DB (non-blocking in future)
        try:
            db_service.create_art_record(cid=cid, uploader=None, report=report.dict())
        except Exception as e:
            # log but don't fail the request
            print("DB store failed:", e)

        return JSONResponse({"cid": cid, "report": report.dict()})
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
