import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import ResourceMovement
from ..schemas.resource_movement import (
    ResourceMovementCreateSchema,
    ResourceMovementReadSchema,
    ResourceMovementUpdateSchema,
)


def create_resource_movement(
    movement: ResourceMovementCreateSchema, session: SessionDep
):
    db_movement = ResourceMovement(**movement.model_dump())
    session.add(db_movement)
    session.commit()
    session.refresh(db_movement)
    return db_movement


def read_all_resource_movements(session: SessionDep):
    movements = session.exec(select(ResourceMovement)).all()
    return [
        ResourceMovementReadSchema(**movement.model_dump()) for movement in movements
    ]


def read_resource_movement(movement_id: uuid.UUID, session: SessionDep):
    movement = session.get(ResourceMovement, movement_id)
    if movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    return ResourceMovementReadSchema(**movement.model_dump())


def update_resource_movement(
    movement_id: uuid.UUID,
    movement_data: ResourceMovementUpdateSchema,
    session: SessionDep,
):
    db_movement = session.get(ResourceMovement, movement_id)
    if db_movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    for key, value in movement_data.model_dump(exclude_unset=True).items():
        setattr(db_movement, key, value)
    session.commit()
    session.refresh(db_movement)
    return ResourceMovementUpdateSchema(**db_movement.model_dump())


def delete_resource_movement(movement_id: uuid.UUID, session: SessionDep):
    db_movement = session.get(ResourceMovement, movement_id)
    if db_movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    session.delete(db_movement)
    session.commit()
    return {"detail": "Movement deleted"}
