from unittest.mock import patch

from app.database.session import check_database_connection, get_database_status


def test_database_status_reports_configuration() -> None:
    status = get_database_status()

    assert "status" in status
    assert "database_url" in status
    assert status["database_url"] is not None


def test_check_database_connection_success() -> None:
    assert check_database_connection() is True


def test_check_database_connection_failure() -> None:
    with patch("app.database.session.get_engine") as mock_get_engine:
        mock_get_engine.return_value.connect.side_effect = Exception("Connection error")
        assert check_database_connection() is False
