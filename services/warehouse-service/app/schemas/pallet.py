import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel

from ..models.warehouse import PalletItemType


class PalletSchema(BaseModel):
    id: uuid.UUID

    item_type: PalletItemType = PalletItemType.MATERIAL

    material_id: Optional[uuid.UUID]
    product_id: Optional[uuid.UUID]
    bom_id: Optional[uuid.UUID]

    location_id: uuid.UUID

    code: str
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str

    created_at: datetime
    updated_at: Optional[datetime] = None


class PalletCreateSchema(BaseModel):
    item_type: PalletItemType = PalletItemType.MATERIAL

    material_id: Optional[uuid.UUID]
    product_id: Optional[uuid.UUID]
    bom_id: Optional[uuid.UUID]

    location_id: uuid.UUID

    code: str
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str
