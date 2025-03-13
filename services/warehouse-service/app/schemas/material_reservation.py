import uuid
from datetime import date
from typing import Optional

from pydantic import BaseModel


class MaterialReservationSchema(BaseModel):
    id: uuid.UUID

    material_id: uuid.UUID
    pallet_id: uuid.UUID
    user_id: uuid.UUID

    quantity: float
    reservation_date: date
    expiration_date: Optional[date] = None
    status: str


class MaterialReservationCreateSchema(BaseModel):
    material_id: uuid.UUID
    pallet_id: uuid.UUID
    user_id: uuid.UUID

    quantity: float
    reservation_date: date
    expiration_date: Optional[date] = None
    status: str
