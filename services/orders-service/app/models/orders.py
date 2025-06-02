import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class OrderType(str, Enum):
    INTERNAL = "Internal"
    EXTERNAL = "External"


class OrderDirection(str, Enum):
    INCOMING = "Incoming"
    OUTGOING = "Outgoing"


class OrderStatus(str, Enum):
    DRAFT = "Draft"
    PENDING = "Pending"
    APPROVED = "Approved"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class OrderPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    URGENT = "Urgent"


class Order(SQLModel, table=True):
    __tablename__ = "orders"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    order_number: str = Field(unique=True, index=True)

    type: OrderType
    direction: OrderDirection
    status: OrderStatus
    priority: OrderPriority

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    approved_at: Optional[datetime] = None
    expected_completion: Optional[datetime] = None

    source: str
    recipient: str

    requester_id: uuid.UUID
    approver_id: Optional[uuid.UUID] = None

    notes: Optional[str] = None

    order_pallets: List["OrderPallet"] = Relationship(back_populates="order")


class OrderPallet(SQLModel, table=True):
    __tablename__ = "order_pallets"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    order_id: uuid.UUID = Field(foreign_key="orders.id")
    pallet_id: uuid.UUID

    quantity: float
    notes: Optional[str] = None

    order: Order = Relationship(back_populates="order_pallets")
