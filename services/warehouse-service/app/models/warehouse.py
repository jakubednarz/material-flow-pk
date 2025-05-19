import uuid
from datetime import date, datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class ResourceType(str, Enum):
    MATERIAL = "Material"
    PRODUCT = "Product"
    BOM = "BillOfMaterials"


class PalletStatus(str, Enum):
    AVAILABLE = "Available"
    RESERVED = "Reserved"
    BLOCKED = "Blocked"


class Resource(SQLModel, table=True):
    """
    Class representing a resource in the warehouse.
    A resource can be a material, product, or BOM (Bill of Materials).
    """

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    code: str = Field(unique=True, index=True)
    description: Optional[str] = None
    type: ResourceType = Field(index=True)

    min_stock: Optional[float] = None
    quantity: float = 0

    # BOM attrs
    valid_from: Optional[date] = None
    valid_to: Optional[date] = None
    is_active: bool = True

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    pallets: List["Pallet"] = Relationship(back_populates="resource")
    reservations: List["ResourceReservation"] = Relationship(back_populates="resource")

    as_material_in_boms: List["BOMItem"] = Relationship(
        back_populates="material",
        sa_relationship_kwargs={"primaryjoin": "Resource.id==BOMItem.material_id"},
    )

    product_compositions: List["ProductComposition"] = Relationship(
        back_populates="product",
        sa_relationship_kwargs={
            "primaryjoin": "Resource.id==ProductComposition.product_id"
        },
    )

    as_bom_in_products: List["ProductComposition"] = Relationship(
        back_populates="bom",
        sa_relationship_kwargs={
            "primaryjoin": "Resource.id==ProductComposition.bom_id"
        },
    )

    bom_items: List["BOMItem"] = Relationship(
        back_populates="bom",
        sa_relationship_kwargs={"primaryjoin": "Resource.id==BOMItem.bom_id"},
    )


class BOMItem(SQLModel, table=True):
    """
    BOMItem represents an item in a Bill of Materials (BOM).
    """

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    bom_id: uuid.UUID = Field(foreign_key="resource.id", index=True)
    material_id: uuid.UUID = Field(foreign_key="resource.id", index=True)

    quantity: float
    unit: str

    bom: "Resource" = Relationship(
        back_populates="bom_items",
        sa_relationship_kwargs={
            "primaryjoin": "BOMItem.bom_id==Resource.id",
            "foreign_keys": "BOMItem.bom_id",
        },
    )
    material: "Resource" = Relationship(
        back_populates="as_material_in_boms",
        sa_relationship_kwargs={
            "primaryjoin": "BOMItem.material_id==Resource.id",
            "foreign_keys": "BOMItem.material_id",
        },
    )


class ProductComposition(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    product_id: uuid.UUID = Field(foreign_key="resource.id", index=True)

    bom_id: Optional[uuid.UUID] = Field(
        foreign_key="resource.id", nullable=True, index=True
    )
    material_id: Optional[uuid.UUID] = Field(
        foreign_key="resource.id", nullable=True, index=True
    )

    quantity: float

    product: "Resource" = Relationship(
        back_populates="product_compositions",
        sa_relationship_kwargs={
            "primaryjoin": "ProductComposition.product_id==Resource.id",
            "foreign_keys": "ProductComposition.product_id",
        },
    )
    bom: Optional["Resource"] = Relationship(
        back_populates="as_bom_in_products",
        sa_relationship_kwargs={
            "primaryjoin": "ProductComposition.bom_id==Resource.id",
            "foreign_keys": "ProductComposition.bom_id",
        },
    )


class ResourceReservation(SQLModel, table=True):
    __tablename__ = "resource_reservation"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    resource_id: uuid.UUID = Field(foreign_key="resource.id", index=True)
    pallet_id: uuid.UUID = Field(foreign_key="pallet.id", index=True)
    user_id: uuid.UUID

    quantity: float
    reservation_date: date
    expiration_date: Optional[date] = None
    status: str

    resource: "Resource" = Relationship(back_populates="reservations")
    pallet: "Pallet" = Relationship(back_populates="reservations")


class ResourceMovement(SQLModel, table=True):
    __tablename__ = "resource_movement"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resource_id: uuid.UUID = Field(foreign_key="resource.id", index=True)
    pallet_id: uuid.UUID = Field(foreign_key="pallet.id", index=True)
    movement_type: Optional[str]

    source_location_id: Optional[uuid.UUID] = Field(
        foreign_key="warehouse_location.id", nullable=True, index=True
    )
    destination_location_id: uuid.UUID = Field(
        foreign_key="warehouse_location.id", index=True
    )

    movement_date: datetime = Field(default_factory=datetime.now)

    order_id: uuid.UUID
    user_id: uuid.UUID

    resource: "Resource" = Relationship()
    pallet: "Pallet" = Relationship(back_populates="movements")


class Pallet(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    resource_id: uuid.UUID = Field(foreign_key="resource.id", index=True)
    location_id: uuid.UUID = Field(foreign_key="warehouse_location.id", index=True)

    code: str = Field(unique=True, index=True)
    quantity: float
    status: Optional[PalletStatus] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    resource: "Resource" = Relationship(back_populates="pallets")
    location: "WarehouseLocation" = Relationship(back_populates="pallets")
    movements: List["ResourceMovement"] = Relationship(back_populates="pallet")
    reservations: List["ResourceReservation"] = Relationship(back_populates="pallet")


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
