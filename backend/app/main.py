import logging
from time import perf_counter
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.responses import JSONResponse

from app.api.v1.router import router as api_v1_router
from app.core.config import get_settings
from app.schemas.responses import HealthResponse, StatusResponse

settings = get_settings()
logger = logging.getLogger("finpilot")

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_request_logging(request: Request, call_next: Any) -> JSONResponse:
    started = perf_counter()
    response = None
    try:
        response = await call_next(request)
        return response
    finally:
        elapsed_ms = round((perf_counter() - started) * 1000, 2)
        logger.info(
            "request completed",
            extra={
                "method": request.method,
                "path": request.url.path,
                "status_code": getattr(response, "status_code", 500),
                "duration_ms": elapsed_ms,
            },
        )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


app.include_router(api_v1_router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["system"], response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service=settings.app_name)


@app.get("/ready", tags=["system"], response_model=StatusResponse)
def ready() -> StatusResponse:
    return StatusResponse(status="ready")


@app.get("/live", tags=["system"], response_model=StatusResponse)
def live() -> StatusResponse:
    return StatusResponse(status="alive")
