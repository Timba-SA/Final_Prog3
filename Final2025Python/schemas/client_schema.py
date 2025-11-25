"""Client schema for request/response validation."""
from typing import Optional, List, TYPE_CHECKING
from pydantic import EmailStr, Field, field_validator

from schemas.base_schema import BaseSchema

if TYPE_CHECKING:
    from schemas.address_schema import AddressSchema
    from schemas.order_schema import OrderSchema


class ClientSchema(BaseSchema):
    """Schema for Client entity with validations."""

    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Client's first name")
    lastname: Optional[str] = Field(None, min_length=1, max_length=100, description="Client's last name")
    email: Optional[EmailStr] = Field(None, description="Client's email address")
    telephone: Optional[str] = Field(
        None,
        min_length=7,
        max_length=20,
        description="Client's phone number (7-20 digits, optional + prefix)"
    )

    @field_validator('telephone', mode='before')
    @classmethod
    def validate_telephone(cls, v):
        """Validate telephone format, allowing None or empty string."""
        if v is None or v == '' or (isinstance(v, str) and v.strip() == ''):
            return None
        # Validate pattern only if value is provided
        if not isinstance(v, str):
            raise ValueError('Telephone must be a string')
        # Remove spaces for validation
        clean_v = v.replace(' ', '').replace('-', '')
        if not clean_v:
            return None
        # Check pattern: optional +, then 1-9, then 6-19 more digits
        import re
        if not re.match(r'^\+?[1-9]\d{6,19}$', clean_v):
            raise ValueError('Telephone must be 7-20 digits, optionally starting with +, and cannot start with 0')
        return v

    addresses: Optional[List['AddressSchema']] = []
    orders: Optional[List['OrderSchema']] = []
