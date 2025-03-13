import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class BillOfMaterialsSchema(BaseModel):
    id: uuid.UUID
    product_id: uuid.UUID

    name: str
    valid_from: date
    valid_to: Optional[date] = None
    is_active: bool = True

    created_at: datetime
    updated_at: Optional[datetime] = None


class BillOfMaterialsCreateSchema(BaseModel):
    product_id: uuid.UUID

    name: str
    valid_from: date
    valid_to: Optional[date] = None
    is_active: bool = True
