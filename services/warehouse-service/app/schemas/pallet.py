import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class PalletSchema(BaseModel):
    id: uuid.UUID
    material_id: uuid.UUID
    location_id: uuid.UUID

    code: str
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str

    created_at: datetime
    updated_at: Optional[datetime] = None


class PalletCreateSchema(BaseModel):
    material_id: uuid.UUID
    location_id: uuid.UUID

    code: str
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str
