import uuid
from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel

from ..models.warehouse import ResourceType


class ResourceBaseSchema(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    type: ResourceType
    min_stock: Optional[float] = None
    quantity: float = 0

    model_config = {"from_attributes": True}


class ResourceReadSchema(ResourceBaseSchema):
    id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_active: bool = True


class MaterialReadSchema(ResourceReadSchema):
    type: ResourceType = ResourceType.MATERIAL


class BOMReadSchema(ResourceReadSchema):
    type: ResourceType = ResourceType.BOM
    valid_from: Optional[date] = None
    valid_to: Optional[date] = None
    is_active: bool = True

    items: List["BOMItemReadSchema"] = []


class BOMItemReadSchema(BaseModel):
    id: uuid.UUID
    material_id: uuid.UUID
    material_name: str
    material_code: str
    quantity: float
    unit: str

    model_config = {"from_attributes": True}


class ProductReadSchema(ResourceReadSchema):
    type: ResourceType = ResourceType.PRODUCT

    compositions: List["ProductCompositionReadSchema"] = []


class ProductCompositionReadSchema(BaseModel):
    id: uuid.UUID
    bom_id: Optional[uuid.UUID] = None
    bom_name: Optional[str] = None
    material_id: Optional[uuid.UUID] = None
    material_name: Optional[str] = None
    quantity: float

    model_config = {"from_attributes": True}
