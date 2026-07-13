from __future__ import annotations

import os
from datetime import UTC, datetime, timedelta
from typing import Any

import bcrypt
import jwt
from jwt import InvalidTokenError

from app.core.config import get_settings
from app.models.user import User

settings = get_settings()


def create_access_token(subject: str, expires_delta: int | None = None) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=expires_delta or 60)
    payload = {"sub": subject, "exp": expire}
    secret = settings.jwt_secret or os.getenv("JWT_SECRET", "change-me")
    algorithm = settings.jwt_algorithm or os.getenv("JWT_ALGORITHM", "HS256")
    return jwt.encode(payload, secret, algorithm=algorithm)


def verify_access_token(token: str) -> dict[str, Any]:
    if not token:
        raise InvalidTokenError("Missing token")
    secret = settings.jwt_secret or os.getenv("JWT_SECRET", "change-me")
    algorithm = settings.jwt_algorithm or os.getenv("JWT_ALGORITHM", "HS256")
    return jwt.decode(token, secret, algorithms=[algorithm])


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


def get_user_payload(user: User) -> dict[str, Any]:
    return {"id": user.id, "email": user.email, "full_name": user.full_name}
