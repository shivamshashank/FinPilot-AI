"""Add hashed password to users

Revision ID: 3f3dc4624d26
Revises: e6bd7b4b0428
Create Date: 2026-07-13 00:05:00.000000

"""

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "3f3dc4624d26"
down_revision = "e6bd7b4b0428"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "hashed_password", sa.String(length=255), nullable=False, server_default=""
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "hashed_password")
