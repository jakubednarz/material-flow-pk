import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class OrderBaseSchema(BaseModel):
    order_number: str

    type: str
    direction: str
    status: str
    priority: str

    created_at: datetime
    updated_at: Optional[datetime] = None
    approved_at: Optional[datetime] = None
    expected_completion: Optional[datetime] = None

    source: str
    recipient: str

    requester_id: uuid.UUID
    approver_id: Optional[uuid.UUID] = None

    notes: Optional[str] = None


class OrderCreateSchema(OrderBaseSchema):
    pass


class OrderUpdateSchema(OrderBaseSchema):
    id: uuid.UUID
