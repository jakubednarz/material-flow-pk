import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import Pallet, Resource, WarehouseLocation
from ..schemas.pallet import PalletCreateSchema, PalletReadSchema, PalletUpdateSchema


def create_pallet(pallet: PalletCreateSchema, session: SessionDep):
    resource = session.get(Resource, pallet.resource_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")

    location = session.get(WarehouseLocation, pallet.location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")

    db_pallet = Pallet(**pallet.model_dump())
    session.add(db_pallet)
    session.commit()
    session.refresh(db_pallet)
    return db_pallet


def read_all_pallets(session: SessionDep):
    pallets = session.exec(select(Pallet)).all()
    return [PalletReadSchema(**pallet.model_dump()) for pallet in pallets]


def read_pallet(pallet_id: uuid.UUID, session: SessionDep):
    pallet = session.get(Pallet, pallet_id)
    if pallet is None:
        raise HTTPException(status_code=404, detail="Pallet not found")
    return PalletReadSchema(**pallet.model_dump())


def update_pallet(
    pallet_id: uuid.UUID, pallet_data: PalletCreateSchema, session: SessionDep
):
    db_pallet = session.get(Pallet, pallet_id)
    if db_pallet is None:
        raise HTTPException(status_code=404, detail="Pallet not found")
    for key, value in pallet_data.model_dump(exclude_unset=True).items():
        setattr(db_pallet, key, value)
    session.commit()
    session.refresh(db_pallet)
    return PalletUpdateSchema(**db_pallet.model_dump())


def delete_pallet(pallet_id: uuid.UUID, session: SessionDep):
    db_pallet = session.get(Pallet, pallet_id)
    if db_pallet is None:
        raise HTTPException(status_code=404, detail="Pallet not found")
    session.delete(db_pallet)
    session.commit()
    return {"detail": "Pallet deleted"}
