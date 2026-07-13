import os
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "FinPilot AI"
    app_env: str = "development"
    api_v1_prefix: str = "/api/v1"
    backend_cors_origins: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173"
    )
    database_url: str | None = Field(default=None)
    supabase_url: str | None = Field(default=None)
    supabase_anon_key: str | None = Field(default=None)
    supabase_service_role_key: str | None = Field(default=None)
    jwt_secret: str = Field(
        default_factory=lambda: os.getenv("JWT_SECRET", "change-me")
    )
    jwt_algorithm: str = Field(default="HS256")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.backend_cors_origins.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
