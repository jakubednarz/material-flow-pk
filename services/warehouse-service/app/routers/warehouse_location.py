import uuid

from fastapi import APIRouter

from ..api import warehouse_location
from ..database import SessionDep
from ..schemas.warehouse_location import (
    WarehouseLocationCreateSchema,
    WarehouseLocationSchema,
)

router = APIRouter(tags=["Warehouse Location"])


@router.post("/warehouse/locations/", response_model=WarehouseLocationSchema)
def create_warehouse_location_route(
    location: WarehouseLocationCreateSchema, session: SessionDep
):
    return warehouse_location.create_warehouse_location(
        location=location, session=session
    )


@router.get("/warehouse/locations/", response_model=list[WarehouseLocationSchema])
def get_all_warehouse_locations_route(session: SessionDep):
    return warehouse_location.read_all_warehouse_locations(session=session)


@router.get(
    "/warehouse/locations/{location_id}", response_model=WarehouseLocationSchema
)
def get_warehouse_location_route(location_id: uuid.UUID, session: SessionDep):
    return warehouse_location.read_warehouse_location(
        location_id=location_id, session=session
    )


@router.put(
    "/warehouse/locations/{location_id}", response_model=WarehouseLocationSchema
)
def update_warehouse_location_route(
    location_id: uuid.UUID,
    location_data: WarehouseLocationCreateSchema,
    session: SessionDep,
):
    return warehouse_location.update_warehouse_location(
        location_id=location_id, location_data=location_data, session=session
    )


@router.delete("/warehouse/locations/{location_id}")
def delete_warehouse_location_route(location_id: uuid.UUID, session: SessionDep):
    return warehouse_location.delete_warehouse_location(
        location_id=location_id, session=session
    )
