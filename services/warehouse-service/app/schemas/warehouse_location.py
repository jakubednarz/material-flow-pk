import uuid
from typing import Optional

from pydantic import BaseModel


class WarehouseLocationBaseSchema(BaseModel):
    zone: Optional[str] = None
    rack: Optional[str] = None
    level: Optional[str] = None
    position: Optional[str] = None
    max_capacity: Optional[float] = None
    current_capacity: float
    status: str


class WarehouseLocationCreateSchema(WarehouseLocationBaseSchema):
    pass


class WarehouseLocationReadSchema(WarehouseLocationBaseSchema):
    id: uuid.UUID
    # created_at: str
    # updated_at: Optional[str] = None


class WarehouseLocationUpdateSchema(WarehouseLocationBaseSchema):
    id: uuid.UUID
