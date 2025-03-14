import uuid

from fastapi import APIRouter

from ..api import bill_of_materials
from ..database import SessionDep
from ..schemas.bill_of_materials import (
    BillOfMaterialsCreateSchema,
    BillOfMaterialsSchema,
)

router = APIRouter(tags=["Bill Of Materials"])


@router.post("/warehouse/bill-of-materials/", response_model=BillOfMaterialsSchema)
def create_bill_of_materials_route(
    bom: BillOfMaterialsCreateSchema, session: SessionDep
):
    return bill_of_materials.create_bill_of_materials(bom=bom, session=session)


@router.get("/warehouse/bill-of-materials/", response_model=list[BillOfMaterialsSchema])
def get_all_bills_of_materials_route(session: SessionDep):
    return bill_of_materials.read_all_bills_of_materials(session=session)


@router.get(
    "/warehouse/bill-of-materials/{bom_id}", response_model=BillOfMaterialsSchema
)
def get_bill_of_materials_route(bom_id: uuid.UUID, session: SessionDep):
    return bill_of_materials.read_bill_of_materials(bom_id=bom_id, session=session)


@router.put(
    "/warehouse/bill-of-materials/{bom_id}", response_model=BillOfMaterialsSchema
)
def update_bill_of_materials_route(
    bom_id: uuid.UUID, bom_data: BillOfMaterialsCreateSchema, session: SessionDep
):
    return bill_of_materials.update_bill_of_materials(
        bom_id=bom_id, bom_data=bom_data, session=session
    )


@router.delete("/warehouse/bill-of-materials/{bom_id}")
def delete_bill_of_materials_route(bom_id: uuid.UUID, session: SessionDep):
    return bill_of_materials.delete_bill_of_materials(bom_id=bom_id, session=session)
