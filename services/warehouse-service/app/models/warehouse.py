import uuid
from datetime import date, datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class PalletItemType(str, Enum):
    MATERIAL = "Material"
    PRODUCT = "Product"
    BOM = "BillOfMaterials"


class Material(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    code: str = Field(unique=True)
    description: str
    min_stock: float
    current_stock: float

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    reservations: List["MaterialReservation"] = Relationship(back_populates="material")
    bom_items: List["BOMItem"] = Relationship(back_populates="material")
    pallets: List["Pallet"] = Relationship(back_populates="material")


class MaterialReservation(SQLModel, table=True):
    __tablename__ = "material_reservation"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    material_id: uuid.UUID = Field(foreign_key="material.id")
    pallet_id: uuid.UUID = Field(foreign_key="pallet.id")
    user_id: uuid.UUID

    quantity: float
    reservation_date: date
    expiration_date: Optional[date] = None
    status: str

    material: Optional["Material"] = Relationship(back_populates="reservations")
    pallet: Optional["Pallet"] = Relationship(back_populates="reservations")


class MaterialMovement(SQLModel, table=True):
    __tablename__ = "material_movement"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    pallet_id: uuid.UUID = Field(foreign_key="pallet.id")
    movement_type: Optional[str]

    source_location_id: uuid.UUID = Field(
        foreign_key="warehouse_location.id", nullable=True
    )
    destination_location_id: uuid.UUID = Field(foreign_key="warehouse_location.id")

    movement_date: datetime = Field(default_factory=datetime.now)

    order_id: uuid.UUID
    user_id: uuid.UUID

    pallet: Optional["Pallet"] = Relationship(back_populates="movements")


class Product(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    code: str = Field(unique=True)
    description: str

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    boms: List["BillOfMaterials"] = Relationship(back_populates="product")
    pallets: List["Pallet"] = Relationship(back_populates="product")


class BillOfMaterials(SQLModel, table=True):
    __tablename__ = "bill_of_materials"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    product_id: uuid.UUID = Field(foreign_key="product.id")

    name: str
    valid_from: date
    valid_to: Optional[date] = None
    is_active: bool = True

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    product: Optional["Product"] = Relationship(back_populates="boms")
    bom_items: List["BOMItem"] = Relationship(back_populates="bom")
    pallets: List["Pallet"] = Relationship(back_populates="bom")


class BOMItem(SQLModel, table=True):
    __tablename__ = "bom_item"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    bom_id: uuid.UUID = Field(foreign_key="bill_of_materials.id")
    material_id: uuid.UUID = Field(foreign_key="material.id")

    quantity: float

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    bom: Optional[BillOfMaterials] = Relationship(back_populates="bom_items")
    material: Optional[Material] = Relationship(back_populates="bom_items")


class Pallet(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    item_type: PalletItemType = Field(default=PalletItemType.MATERIAL)

    material_id: Optional[uuid.UUID] = Field(foreign_key="material.id", nullable=True)
    product_id: Optional[uuid.UUID] = Field(foreign_key="product.id", nullable=True)
    bom_id: Optional[uuid.UUID] = Field(
        foreign_key="bill_of_materials.id", nullable=True
    )

    location_id: uuid.UUID = Field(foreign_key="warehouse_location.id")

    code: str = Field(unique=True)
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    reservations: List["MaterialReservation"] = Relationship(back_populates="pallet")
    movements: List["MaterialMovement"] = Relationship(back_populates="pallet")
    location: Optional["WarehouseLocation"] = Relationship(back_populates="pallets")

    material: Optional["Material"] = Relationship(back_populates="pallets")
    product: Optional["Product"] = Relationship(back_populates="pallets")
    bom: Optional["BillOfMaterials"] = Relationship(back_populates="pallets")


class WarehouseLocation(SQLModel, table=True):
    __tablename__ = "warehouse_location"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    zone: Optional[str] = None
    rack: Optional[str] = None
    level: Optional[str] = None
    position: Optional[str] = None
    max_capacity: Optional[float] = None
    current_capacity: float
    status: str

    pallets: List["Pallet"] = Relationship(back_populates="location")
