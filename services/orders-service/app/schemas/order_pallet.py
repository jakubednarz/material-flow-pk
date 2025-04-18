import uuid
from typing import Optional

from pydantic import BaseModel


class OrderPalletBase(BaseModel):
    pallet_id: uuid.UUID
    quantity: float
    notes: Optional[str] = None


class OrderPalletCreate(OrderPalletBase):
    pass


class OrderPalletUpdate(BaseModel):
    quantity: Optional[float] = None
    notes: Optional[str] = None


class OrderPalletRead(OrderPalletBase):
    id: uuid.UUID
    order_id: uuid.UUID

    class Config:
        orm_mode = True


class OrderPalletReadWithDetails(OrderPalletRead):
    pallet_code: Optional[str] = None
    material_name: Optional[str] = None
    location_name: Optional[str] = None


class OrderSchema(BaseModel):
    id: Optional[uuid.UUID] = None
    order_number: str
    type: str
    direction: str
    status: str
    priority: str
    source: str
    recipient: str
    requester_id: uuid.UUID
    approver_id: Optional[uuid.UUID] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    approved_at: Optional[str] = None
    expected_completion: Optional[str] = None

    class Config:
        orm_mode = True


class OrderSchemaWithPallets(OrderSchema):
    pallets: list[OrderPalletReadWithDetails] = []
