import uuid

from pydantic import BaseModel


class MaterialCreateSchema(BaseModel):
    name: str
    code: str
    description: str
    min_stock: float
    current_stock: float


class MaterialSchema(BaseModel):
    id: uuid.UUID
    name: str
    code: str
    description: str
    min_stock: float
    current_stock: float
