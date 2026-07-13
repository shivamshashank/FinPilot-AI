from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.auth.dependencies import get_current_user
from app.api.v1.auth.schemas import LoginRequest, RegisterRequest
from app.database.session import get_db_session
from app.repositories.user_repository import UserRepository
from app.services.auth_service import create_access_token, get_user_payload, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


def get_repository(session: Session = Depends(get_db_session)) -> UserRepository:
    return UserRepository(session)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, repository: UserRepository = Depends(get_repository)) -> dict[str, object]:
    if repository.get_by_email(payload.email):
        raise HTTPException(status_code=400, detail="email already registered")
    user = repository.create(email=payload.email, full_name=payload.full_name, hashed_password=hash_password(payload.password))
    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer", "user": get_user_payload(user)}


@router.post("/login")
def login(payload: LoginRequest, repository: UserRepository = Depends(get_repository)) -> dict[str, object]:
    user = repository.get_by_email(payload.email)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="invalid credentials")
    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer", "user": get_user_payload(user)}


@router.get("/me")
def me(user: dict[str, object] = Depends(get_current_user)) -> dict[str, object]:
    return {"user": user}
