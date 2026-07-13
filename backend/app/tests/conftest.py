import pytest

from app.database.session import get_engine
from app.models.base import Base
from app.models.user import User  # noqa: F401


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    engine = get_engine()
    # Create all tables in the database before running tests
    Base.metadata.create_all(bind=engine)
    yield
