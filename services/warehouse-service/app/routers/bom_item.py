import uuid

from fastapi import APIRouter

from ..api import bom_item
from ..database import SessionDep
from ..schemas.bom_item import BOMItemCreateSchema, BOMItemSchema

router = APIRouter(tags=["BOM Item"])


@router.post("/warehouse/bom-items/", response_model=BOMItemSchema)
def create_bom_item_route(bom_item_schema: BOMItemCreateSchema, session: SessionDep):
    return bom_item.create_bom_item(bom_item=bom_item_schema, session=session)


@router.get("/warehouse/bom-items/", response_model=list[BOMItemSchema])
def get_all_bom_items_route(session: SessionDep):
    return bom_item.read_all_bom_items(session=session)


@router.get("/warehouse/bom-items/{bom_item_id}", response_model=BOMItemSchema)
def get_bom_item_route(bom_item_id: uuid.UUID, session: SessionDep):
    return bom_item.read_bom_item(bom_item_id=bom_item_id, session=session)


@router.put("/warehouse/bom-items/{bom_item_id}", response_model=BOMItemSchema)
def update_bom_item_route(
    bom_item_id: uuid.UUID, bom_item_data: BOMItemCreateSchema, session: SessionDep
):
    return bom_item.update_bom_item(
        bom_item_id=bom_item_id, bom_item_data=bom_item_data, session=session
    )


@router.delete("/warehouse/bom-items/{bom_item_id}")
def delete_bom_item_route(bom_item_id: uuid.UUID, session: SessionDep):
    return bom_item.delete_bom_item(bom_item_id=bom_item_id, session=session)
