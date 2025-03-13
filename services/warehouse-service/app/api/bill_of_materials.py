import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import BillOfMaterials
from ..schemas.bill_of_materials import (
    BillOfMaterialsCreateSchema,
    BillOfMaterialsSchema,
)


def create_bill_of_materials(bom: BillOfMaterialsCreateSchema, session: SessionDep):
    db_bom = BillOfMaterials(**bom.model_dump())
    session.add(db_bom)
    session.commit()
    session.refresh(db_bom)
    return db_bom


def read_all_bills_of_materials(session: SessionDep):
    boms = session.exec(select(BillOfMaterials)).all()
    return [BillOfMaterialsSchema(**bom.model_dump()) for bom in boms]


def read_bill_of_materials(bom_id: uuid.UUID, session: SessionDep):
    bom = session.get(BillOfMaterials, bom_id)
    if bom is None:
        raise HTTPException(status_code=404, detail="BOM not found")
    return BillOfMaterialsSchema(**bom.model_dump())


def update_bill_of_materials(
    bom_id: uuid.UUID, bom_data: BillOfMaterialsCreateSchema, session: SessionDep
):
    db_bom = session.get(BillOfMaterials, bom_id)
    if db_bom is None:
        raise HTTPException(status_code=404, detail="BOM not found")
    for key, value in bom_data.model_dump(exclude_unset=True).items():
        setattr(db_bom, key, value)
    session.commit()
    session.refresh(db_bom)
    return BillOfMaterialsSchema(**db_bom.model_dump())


def delete_bill_of_materials(bom_id: uuid.UUID, session: SessionDep):
    db_bom = session.get(BillOfMaterials, bom_id)
    if db_bom is None:
        raise HTTPException(status_code=404, detail="BOM not found")
    session.delete(db_bom)
    session.commit()
    return {"detail": "BOM deleted"}
