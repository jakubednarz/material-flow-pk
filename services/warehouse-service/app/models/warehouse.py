import uuid
from datetime import datetime, date
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List



class Material(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    code: str
    description: str
    min_stock: float
    current_stock: float    

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    reservations: List["MaterialReservation"] = Relationship(back_populates="material")
    bom_items: List["BOMItem"] = Relationship(back_populates="material")


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

    material: Optional["Material"] = Relationship(back_populates="reservations", cascade_delete=True)
    pallet: Optional["Pallet"] = Relationship(back_populates="reservations", cascade_delete=True) 


class MaterialMovement(SQLModel, table=True):
    __tablename__ = "material_movement"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    pallet_id: uuid.UUID = Field(foreign_key="pallet.id") 
    movement_type: Optional[str]
    
    source_location_id: uuid.UUID = Field(foreign_key="warehouse_location.id", nullable=True)
    destination_location_id: uuid.UUID = Field(foreign_key="warehouse_location.id")

    movement_date: datetime = Field(default_factory=datetime.now)

    order_id: uuid.UUID
    user_id: uuid.UUID

    pallet: Optional["Pallet"] = Relationship(back_populates="movements", cascade_delete=True)



class Product(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    code: str
    description: str

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    boms: List["BillOfMaterials"] = Relationship(back_populates="product", cascade_delete=True)


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

    product: Optional["Product"] = Relationship(back_populates="boms", cascade_delete=True)
    bom_items: List["BOMItem"] = Relationship(back_populates="bom", cascade_delete=True)


class BOMItem(SQLModel, table=True):
    __tablename__ = "bom_item"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    bom_id: uuid.UUID = Field(foreign_key="bill_of_materials.id")
    material_id: uuid.UUID = Field(foreign_key="material.id")

    quantity: float  

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    bom: Optional[BillOfMaterials] = Relationship(back_populates="bom_items", cascade_delete=True)
    material: Optional[Material] = Relationship(back_populates="bom_items", cascade_delete=True)


class Pallet(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    material_id: uuid.UUID = Field(foreign_key="material.id")
    location_id: uuid.UUID = Field(foreign_key="warehouse_location.id")

    code: str = Field(unique=True)
    quantity: float
    status: Optional[str] = None
    production_date: date
    expiry_date: Optional[date] = None
    batch_number: str

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    reservations: List["MaterialReservation"] = Relationship(back_populates="pallet", cascade_delete=True)


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

    pallets: List["Pallet"] = Relationship(back_populates="location", cascade_delete=True)
