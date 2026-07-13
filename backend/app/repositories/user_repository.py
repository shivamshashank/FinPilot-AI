from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_by_email(self, email: str) -> User | None:
        return self.session.query(User).filter(User.email == email).one_or_none()

    def create(self, *, email: str, full_name: str | None, hashed_password: str) -> User:
        user = User(email=email, full_name=full_name, hashed_password=hashed_password)
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def get_by_id(self, user_id: int) -> User | None:
        return self.session.get(User, user_id)
