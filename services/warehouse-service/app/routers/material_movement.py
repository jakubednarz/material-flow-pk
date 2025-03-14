import uuid

from fastapi import APIRouter

from ..api import material_movement
from ..database import SessionDep
from ..schemas.material_movement import (
    MaterialMovementCreateSchema,
    MaterialMovementSchema,
)

router = APIRouter(tags=["Material Movement"])


@router.post("/warehouse/material-movements/", response_model=MaterialMovementSchema)
def create_material_movement_route(
    movement: MaterialMovementCreateSchema, session: SessionDep
):
    return material_movement.create_material_movement(
        movement=movement, session=session
    )


@router.get(
    "/warehouse/material-movements/", response_model=list[MaterialMovementSchema]
)
def get_all_material_movements_route(session: SessionDep):
    return material_movement.read_all_material_movements(session=session)


@router.get(
    "/warehouse/material-movements/{movement_id}", response_model=MaterialMovementSchema
)
def get_material_movement_route(movement_id: uuid.UUID, session: SessionDep):
    return material_movement.read_material_movement(
        movement_id=movement_id, session=session
    )


@router.put(
    "/warehouse/material-movements/{movement_id}", response_model=MaterialMovementSchema
)
def update_material_movement_route(
    movement_id: uuid.UUID,
    movement_data: MaterialMovementCreateSchema,
    session: SessionDep,
):
    return material_movement.update_material_movement(
        movement_id=movement_id, movement_data=movement_data, session=session
    )


@router.delete("/warehouse/material-movements/{movement_id}")
def delete_material_movement_route(movement_id: uuid.UUID, session: SessionDep):
    return material_movement.delete_material_movement(
        movement_id=movement_id, session=session
    )
