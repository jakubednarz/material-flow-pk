import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BOMItemSchema(BaseModel):
    id: uuid.UUID
    bom_id: uuid.UUID
    material_id: uuid.UUID

    quantity: float

    created_at: datetime
    updated_at: Optional[datetime] = None


class BOMItemCreateSchema(BaseModel):
    bom_id: uuid.UUID
    material_id: uuid.UUID

    quantity: float
