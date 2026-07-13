from fastapi.testclient import TestClient
from sqlalchemy import text

from app.main import app
from app.database.session import get_engine

client = TestClient(app)


def _reset_users_table() -> None:
    with get_engine().connect() as connection:
        connection.execute(text("DELETE FROM users"))
        connection.commit()


def test_register_and_login_flow() -> None:
    _reset_users_table()
    email = "day4@example.com"
    register_response = client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "secret123", "full_name": "Day Four"},
    )
    assert register_response.status_code == 201
    payload = register_response.json()
    assert payload["token_type"] == "bearer"
    assert "access_token" in payload
    assert payload["user"]["email"] == email

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": email, "password": "secret123"},
    )
    assert login_response.status_code == 200
    assert login_response.json()["token_type"] == "bearer"


def test_me_endpoint_requires_token() -> None:
    _reset_users_table()
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401


def test_duplicate_registration() -> None:
    _reset_users_table()
    email = "duplicate@example.com"
    
    # First registration
    client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "secret123", "full_name": "User 1"},
    )
    
    # Duplicate registration
    response = client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "secret123", "full_name": "User 2"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "email already registered"


def test_invalid_login_credentials() -> None:
    _reset_users_table()
    email = "login@example.com"
    client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "secret123", "full_name": "User 1"},
    )
    
    # Invalid password
    response = client.post(
        "/api/v1/auth/login",
        json={"email": email, "password": "wrong-password"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "invalid credentials"
    
    # Non-existent user
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "nobody@example.com", "password": "secret123"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "invalid credentials"


def test_me_endpoint_with_valid_token() -> None:
    _reset_users_table()
    email = "me@example.com"
    register_response = client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "secret123", "full_name": "Me User"},
    )
    user_id = register_response.json()["user"]["id"]
    token = register_response.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/auth/me", headers=headers)
    
    assert response.status_code == 200
    assert response.json()["user"]["sub"] == str(user_id)


def test_me_endpoint_with_invalid_token() -> None:
    headers = {"Authorization": "Bearer invalid-token"}
    response = client.get("/api/v1/auth/me", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "invalid token"

