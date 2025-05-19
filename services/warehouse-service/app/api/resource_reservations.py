import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import ResourceReservation
from ..schemas.resource_reservation import (
    ResourceReservationCreateSchema,
    ResourceReservationReadSchema,
    ResourceReservationUpdateSchema,
)


def create_resource_reservation(
    reservation: ResourceReservationCreateSchema, session: SessionDep
):
    db_reservation = ResourceReservation(**reservation.model_dump())
    session.add(db_reservation)
    session.commit()
    session.refresh(db_reservation)
    return db_reservation


def read_all_resource_reservations(session: SessionDep):
    reservations = session.exec(select(ResourceReservation)).all()
    return [
        ResourceReservationReadSchema(**reservation.model_dump())
        for reservation in reservations
    ]


def read_resource_reservation(reservation_id: uuid.UUID, session: SessionDep):
    reservation = session.get(ResourceReservation, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return ResourceReservationReadSchema(**reservation.model_dump())


def update_resource_reservation(
    reservation_id: uuid.UUID,
    reservation_data: ResourceReservationUpdateSchema,
    session: SessionDep,
):
    db_reservation = session.get(ResourceReservation, reservation_id)
    if db_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    for key, value in reservation_data.model_dump(exclude_unset=True).items():
        setattr(db_reservation, key, value)
    session.commit()
    session.refresh(db_reservation)
    return ResourceReservationUpdateSchema(**db_reservation.model_dump())


def delete_resource_reservation(reservation_id: uuid.UUID, session: SessionDep):
    db_reservation = session.get(ResourceReservation, reservation_id)
    if db_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    session.delete(db_reservation)
    session.commit()
    return {"detail": "Reservation deleted"}
