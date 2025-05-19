import uuid
from datetime import date, datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class PalletStatus(str, Enum):
    AVAILABLE = "Available"
    RESERVED = "Reserved"
    BLOCKED = "Blocked"


class PalletBaseSchema(BaseModel):
    resource_id: Optional[uuid.UUID] = None
    location_id: uuid.UUID

    code: str
    quantity: float
    status: Optional[PalletStatus] = PalletStatus.AVAILABLE
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str


class PalletCreateSchema(PalletBaseSchema):
    pass


class PalletReadSchema(PalletBaseSchema):
    id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None


class PalletUpdateSchema(PalletBaseSchema):
    id: uuid.UUID
