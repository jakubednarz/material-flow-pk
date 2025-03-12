import uuid

from fastapi import APIRouter, Query

from ..api import materials
from ..database import SessionDep
from ..schemas.materials import MaterialCreateSchema, MaterialSchema

router = APIRouter(tags=["Material"])


@router.post("/warehouse/materials/", response_model=MaterialSchema)
def create_material_route(material: MaterialCreateSchema, session: SessionDep):
    return materials.create_material(material=material, session=session)


@router.get(
    "/warehouse/materials/", response_model=list[MaterialSchema] | MaterialSchema
)
def get_all_materials_route(
    session: SessionDep, code: str = Query(None), name: str = Query(None)
):
    if code:
        return materials.read_material_by_code(code=code, session=session)
    elif name:
        return materials.read_material_by_name(name=name, session=session)
    return materials.read_all_materials(session=session)


@router.get("/warehouse/materials/{material_id}", response_model=MaterialSchema)
def get_material_route(material_id: uuid.UUID, session: SessionDep):
    return materials.read_material(material_id=material_id, session=session)


@router.put("/warehouse/materials/{material_id}", response_model=MaterialSchema)
def update_material_route(
    material_id: uuid.UUID, material_data: MaterialCreateSchema, session: SessionDep
):
    return materials.update_material(
        material_id=material_id, material_data=material_data, session=session
    )


@router.delete("/warehouse/materials/{material_id}")
def delete_material_route(material_id: uuid.UUID, session: SessionDep):
    return materials.delete_material(material_id=material_id, session=session)


@router.patch("/warehouse/materials/{material_id}/stock", response_model=MaterialSchema)
def update_material_stock_route(
    material_id: uuid.UUID, quantity: float, session: SessionDep
):
    return materials.update_material_stock(
        material_id=material_id, quantity=quantity, session=session
    )


@router.get("/warehouse/materials/{material_id}/availability")
def check_material_availability_route(
    material_id: uuid.UUID, required_quantity: float, session: SessionDep
):
    return materials.check_material_availability(
        material_id=material_id, required_quantity=required_quantity, session=session
    )


@router.get("/warehouse/materials/{material_id}/reservations")
def get_material_reservations_route(material_id: uuid.UUID, session: SessionDep):
    return materials.read_material_reservations(
        material_id=material_id, session=session
    )


@router.get("/warehouse/materials/{material_id}/bom-items")
def get_material_bom_items_route(material_id: uuid.UUID, session: SessionDep):
    return materials.read_material_bom_items(material_id=material_id, session=session)
