import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResourceMovementBaseSchema(BaseModel):
    pallet_id: uuid.UUID
    resource_id: uuid.UUID

    movement_type: Optional[str]
    source_location_id: uuid.UUID
    destination_location_id: uuid.UUID
    movement_date: datetime
    order_id: uuid.UUID
    user_id: uuid.UUID


class ResourceMovementCreateSchema(ResourceMovementBaseSchema):
    pass


class ResourceMovementReadSchema(ResourceMovementBaseSchema):
    id: uuid.UUID


class ResourceMovementUpdateSchema(ResourceMovementBaseSchema):
    id: uuid.UUID
