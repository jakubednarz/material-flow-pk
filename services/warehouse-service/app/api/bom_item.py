import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import BOMItem
from ..schemas.bom_item import BOMItemCreateSchema, BOMItemSchema


def create_bom_item(bom_item: BOMItemCreateSchema, session: SessionDep):
    db_bom_item = BOMItem(**bom_item.model_dump())
    session.add(db_bom_item)
    session.commit()
    session.refresh(db_bom_item)
    return db_bom_item


def read_all_bom_items(session: SessionDep):
    bom_items = session.exec(select(BOMItem)).all()
    return [BOMItemSchema(**bom_item.model_dump()) for bom_item in bom_items]


def read_bom_item(bom_item_id: uuid.UUID, session: SessionDep):
    bom_item = session.get(BOMItem, bom_item_id)
    if bom_item is None:
        raise HTTPException(status_code=404, detail="BOM Item not found")
    return BOMItemSchema(**bom_item.model_dump())


def update_bom_item(
    bom_item_id: uuid.UUID, bom_item_data: BOMItemCreateSchema, session: SessionDep
):
    db_bom_item = session.get(BOMItem, bom_item_id)
    if db_bom_item is None:
        raise HTTPException(status_code=404, detail="BOM Item not found")
    for key, value in bom_item_data.model_dump(exclude_unset=True).items():
        setattr(db_bom_item, key, value)
    session.commit()
    session.refresh(db_bom_item)
    return BOMItemSchema(**db_bom_item.model_dump())


def delete_bom_item(bom_item_id: uuid.UUID, session: SessionDep):
    db_bom_item = session.get(BOMItem, bom_item_id)
    if db_bom_item is None:
        raise HTTPException(status_code=404, detail="BOM Item not found")
    session.delete(db_bom_item)
    session.commit()
    return {"detail": "BOM Item deleted"}
