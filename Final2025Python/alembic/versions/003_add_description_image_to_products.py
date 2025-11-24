"""Add description and image_url to products table

Revision ID: 003_add_description_image
Revises: 002_add_client_id
Create Date: 2025-11-21 21:55:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '003_add_description_image'
down_revision = '002_add_client_id'
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Add description and image_url columns to products table"""
    
    # Add description column (nullable, max 1000 chars)
    op.add_column('products', sa.Column('description', sa.String(length=1000), nullable=True))
    
    # Add image_url column (nullable, max 500 chars)
    op.add_column('products', sa.Column('image_url', sa.String(length=500), nullable=True))


def downgrade() -> None:
    """Remove description and image_url columns from products table"""
    
    # Remove columns
    op.drop_column('products', 'image_url')
    op.drop_column('products', 'description')
