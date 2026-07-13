from pydantic import BaseModel, Field


class StatusResponse(BaseModel):
    status: str = Field(..., description="Current status of the service")


class HealthResponse(StatusResponse):
    service: str = Field(..., description="Service identifier")
