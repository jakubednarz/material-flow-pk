import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import MaterialMovement
from ..schemas.material_movement import (
    MaterialMovementCreateSchema,
    MaterialMovementSchema,
)


def create_material_movement(
    movement: MaterialMovementCreateSchema, session: SessionDep
):
    db_movement = MaterialMovement(**movement.model_dump())
    session.add(db_movement)
    session.commit()
    session.refresh(db_movement)
    return db_movement


def read_all_material_movements(session: SessionDep):
    movements = session.exec(select(MaterialMovement)).all()
    return [MaterialMovementSchema(**movement.model_dump()) for movement in movements]


def read_material_movement(movement_id: uuid.UUID, session: SessionDep):
    movement = session.get(MaterialMovement, movement_id)
    if movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    return MaterialMovementSchema(**movement.model_dump())


def update_material_movement(
    movement_id: uuid.UUID,
    movement_data: MaterialMovementCreateSchema,
    session: SessionDep,
):
    db_movement = session.get(MaterialMovement, movement_id)
    if db_movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    for key, value in movement_data.model_dump(exclude_unset=True).items():
        setattr(db_movement, key, value)
    session.commit()
    session.refresh(db_movement)
    return MaterialMovementSchema(**db_movement.model_dump())


def delete_material_movement(movement_id: uuid.UUID, session: SessionDep):
    db_movement = session.get(MaterialMovement, movement_id)
    if db_movement is None:
        raise HTTPException(status_code=404, detail="Movement not found")
    session.delete(db_movement)
    session.commit()
    return {"detail": "Movement deleted"}
