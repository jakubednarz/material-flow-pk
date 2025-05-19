import uuid

from fastapi import APIRouter

from ..api import resource_movement
from ..database import SessionDep
from ..schemas.resource_movement import (
    ResourceMovementBaseSchema,
    ResourceMovementCreateSchema,
)

router = APIRouter(tags=["Resource Movement"])


@router.post(
    "/warehouse/resource-movements/", response_model=ResourceMovementBaseSchema
)
def create_resource_movement_route(
    movement: ResourceMovementCreateSchema, session: SessionDep
):
    return resource_movement.create_resource_movement(
        movement=movement, session=session
    )


@router.get(
    "/warehouse/resource-movements/", response_model=list[ResourceMovementBaseSchema]
)
def get_all_resource_movements_route(session: SessionDep):
    return resource_movement.read_all_resource_movements(session=session)


@router.get(
    "/warehouse/resource-movements/{movement_id}",
    response_model=ResourceMovementBaseSchema,
)
def get_resource_movement_route(movement_id: uuid.UUID, session: SessionDep):
    return resource_movement.read_resource_movement(
        movement_id=movement_id, session=session
    )


@router.put(
    "/warehouse/resource-movements/{movement_id}",
    response_model=ResourceMovementBaseSchema,
)
def update_resource_movement_route(
    movement_id: uuid.UUID,
    movement_data: ResourceMovementCreateSchema,
    session: SessionDep,
):
    return resource_movement.update_resource_movement(
        movement_id=movement_id, movement_data=movement_data, session=session
    )


@router.delete("/warehouse/resource-movements/{movement_id}")
def delete_resource_movement_route(movement_id: uuid.UUID, session: SessionDep):
    return resource_movement.delete_resource_movement(
        movement_id=movement_id, session=session
    )
