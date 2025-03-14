import uuid
from typing import Optional

from pydantic import BaseModel


class WarehouseLocationSchema(BaseModel):
    id: uuid.UUID
    zone: Optional[str] = None
    rack: Optional[str] = None
    level: Optional[str] = None
    position: Optional[str] = None
    max_capacity: Optional[float] = None
    current_capacity: float
    status: str


class WarehouseLocationCreateSchema(BaseModel):
    zone: Optional[str] = None
    rack: Optional[str] = None
    level: Optional[str] = None
    position: Optional[str] = None
    max_capacity: Optional[float] = None
    current_capacity: float
    status: str
