from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "FinPilot AI"}


def test_readiness_endpoint() -> None:
    response = client.get("/ready")

    assert response.status_code == 200
    assert response.json() == {"status": "ready"}


def test_liveness_endpoint() -> None:
    response = client.get("/live")

    assert response.status_code == 200
    assert response.json() == {"status": "alive"}


def test_api_v1_status_endpoint() -> None:
    response = client.get("/api/v1/status")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "v1"}


def test_missing_route_returns_404() -> None:
    response = client.get("/does-not-exist")

    assert response.status_code == 404
    assert "detail" in response.json()


def test_validation_error_returns_422() -> None:
    response = client.post("/api/v1/status", json={"unexpected": True})

    assert response.status_code == 405
