import uuid
from datetime import date
from typing import Optional

from pydantic import BaseModel


class ResourceReservationBaseSchema(BaseModel):
    material_id: uuid.UUID
    pallet_id: uuid.UUID
    user_id: uuid.UUID

    quantity: float
    reservation_date: date
    expiration_date: Optional[date] = None
    status: str


class ResourceReservationCreateSchema(ResourceReservationBaseSchema):
    pass


class ResourceReservationUpdateSchema(ResourceReservationBaseSchema):
    id: uuid.UUID


class ResourceReservationReadSchema(ResourceReservationBaseSchema):
    id: uuid.UUID
