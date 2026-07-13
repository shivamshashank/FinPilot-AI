from fastapi import APIRouter

from app.api.v1.auth.router import router as auth_router

router = APIRouter()
router.include_router(auth_router)


@router.get("/status", tags=["system"])
def api_status() -> dict[str, str]:
    return {"status": "ok", "version": "v1"}
