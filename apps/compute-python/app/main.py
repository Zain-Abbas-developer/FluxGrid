from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI(
    title="FluxGrid Compute Service",
    version="1.0.0",
)


class ComputeRequest(BaseModel):
    job_id: str
    type: str
    payload: dict


@app.get("/health")
async def health():
    return {
        "success": True,
        "service": "fluxgrid-compute",
    }


@app.post("/compute")
async def compute(request: ComputeRequest):
    print(f"Processing compute job: {request.job_id}")
    print(f"Type: {request.type}")
    print(f"Payload: {request.payload}")

    return {
        "success": True,
        "job_id": request.job_id,
        "processed_by": "python",
        "result": {
            "message": "Python computation completed"
        },
    }