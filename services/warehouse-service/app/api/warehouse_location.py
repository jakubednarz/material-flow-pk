import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import WarehouseLocation
from ..schemas.warehouse_location import (
    WarehouseLocationCreateSchema,
    WarehouseLocationSchema,
)


def create_warehouse_location(
    location: WarehouseLocationCreateSchema, session: SessionDep
):
    db_location = WarehouseLocation(**location.model_dump())
    session.add(db_location)
    session.commit()
    session.refresh(db_location)
    return db_location


def read_all_warehouse_locations(session: SessionDep):
    locations = session.exec(select(WarehouseLocation)).all()
    return [WarehouseLocationSchema(**location.model_dump()) for location in locations]


def read_warehouse_location(location_id: uuid.UUID, session: SessionDep):
    location = session.get(WarehouseLocation, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return WarehouseLocationSchema(**location.model_dump())


def update_warehouse_location(
    location_id: uuid.UUID,
    location_data: WarehouseLocationCreateSchema,
    session: SessionDep,
):
    db_location = session.get(WarehouseLocation, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    for key, value in location_data.model_dump(exclude_unset=True).items():
        setattr(db_location, key, value)
    session.commit()
    session.refresh(db_location)
    return WarehouseLocationSchema(**db_location.model_dump())


def delete_warehouse_location(location_id: uuid.UUID, session: SessionDep):
    db_location = session.get(WarehouseLocation, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    session.delete(db_location)
    session.commit()
    return {"detail": "Location deleted"}
