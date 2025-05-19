import uuid
from datetime import date
from typing import Optional

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import BOMItem, ProductComposition, Resource, ResourceType
from ..schemas.resource import (
    ResourceBaseSchema,
    ResourceReadSchema,
)


def create_resource(resource: ResourceBaseSchema, session: SessionDep):
    db_resource = Resource(**resource.dict())
    session.add(db_resource)
    session.commit()
    session.refresh(db_resource)
    return db_resource


def read_all_resources(session: SessionDep):
    resources = session.exec(select(Resource)).all()
    return [ResourceReadSchema.from_orm(resource) for resource in resources]


def read_resource(resource_id: uuid.UUID, session: SessionDep):
    resource = session.get(Resource, resource_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    return ResourceReadSchema.from_orm(resource)


def update_resource(
    resource_id: uuid.UUID, resource_data: ResourceReadSchema, session: SessionDep
):
    db_resource = session.get(Resource, resource_id)
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    for key, value in resource_data.dict(exclude_unset=True).items():
        setattr(db_resource, key, value)
    session.commit()
    session.refresh(db_resource)
    return ResourceReadSchema.from_orm(db_resource)


def delete_resource(resource_id: uuid.UUID, session: SessionDep):
    db_resource = session.get(Resource, resource_id)
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    session.delete(db_resource)
    session.commit()
    return {"detail": "Resource deleted"}


def create_material(
    session: SessionDep,
    name: str,
    code: str,
    description: Optional[str] = None,
    min_stock: Optional[float] = None,
    quantity: float = 0,
):
    """
    Utwórz nowy materiał.
    """
    material = Resource(
        name=name,
        code=code,
        description=description,
        type=ResourceType.MATERIAL,
        min_stock=min_stock,
        quantity=quantity,
    )
    session.add(material)
    session.commit()
    session.refresh(material)
    return material


def create_bom(
    session: SessionDep,
    name: str,
    code: str,
    description: Optional[str] = None,
    valid_from: date = None,
    valid_to: Optional[date] = None,
    is_active: bool = True,
):
    """
    Utwórz nowy BOM.
    """
    bom = Resource(
        name=name,
        code=code,
        description=description,
        type=ResourceType.BOM,
        valid_from=valid_from,
        valid_to=valid_to,
        is_active=is_active,
    )
    session.add(bom)
    session.commit()
    session.refresh(bom)
    return bom


def add_material_to_bom(
    session: SessionDep,
    bom_id: uuid.UUID,
    material_id: uuid.UUID,
    quantity: float,
    unit: str,
):
    """
    Dodaj materiał do BOMu.
    """
    bom_item = BOMItem(
        bom_id=bom_id, material_id=material_id, quantity=quantity, unit=unit
    )
    session.add(bom_item)
    session.commit()
    session.refresh(bom_item)
    return bom_item


def create_product(
    session: SessionDep,
    name: str,
    code: str,
    description: Optional[str] = None,
    min_stock: Optional[float] = None,
    quantity: float = 0,
):
    """
    Utwórz nowy produkt.
    """
    product = Resource(
        name=name,
        code=code,
        description=description,
        type=ResourceType.PRODUCT,
        min_stock=min_stock,
        quantity=quantity,
    )
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


def add_bom_to_product(
    session: SessionDep, product_id: uuid.UUID, bom_id: uuid.UUID, quantity: float
):
    """
    Dodaj BOM do produktu.
    """
    composition = ProductComposition(
        product_id=product_id, bom_id=bom_id, quantity=quantity
    )
    session.add(composition)
    session.commit()
    session.refresh(composition)
    return composition


def add_material_to_product(
    session: SessionDep, product_id: uuid.UUID, material_id: uuid.UUID, quantity: float
):
    """
    Dodaj materiał bezpośrednio do produktu (bez BOMu).
    """
    composition = ProductComposition(
        product_id=product_id, material_id=material_id, quantity=quantity
    )
    session.add(composition)
    session.commit()
    session.refresh(composition)
    return composition
