import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MaterialMovementSchema(BaseModel):
    id: uuid.UUID

    pallet_id: uuid.UUID
    movement_type: Optional[str]

    source_location_id: uuid.UUID
    destination_location_id: uuid.UUID
    movement_date: datetime

    order_id: uuid.UUID
    user_id: uuid.UUID


class MaterialMovementCreateSchema(BaseModel):
    pallet_id: uuid.UUID
    movement_type: Optional[str]

    source_location_id: uuid.UUID
    destination_location_id: uuid.UUID

    order_id: uuid.UUID
    user_id: uuid.UUID
