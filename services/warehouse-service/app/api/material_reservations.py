import uuid

from fastapi import HTTPException
from sqlmodel import select

from ..database import SessionDep
from ..models.warehouse import MaterialReservation
from ..schemas.material_reservation import (
    MaterialReservationCreateSchema,
    MaterialReservationSchema,
)


def create_material_reservation(
    reservation: MaterialReservationCreateSchema, session: SessionDep
):
    db_reservation = MaterialReservation(**reservation.model_dump())
    session.add(db_reservation)
    session.commit()
    session.refresh(db_reservation)
    return db_reservation


def read_all_material_reservations(session: SessionDep):
    reservations = session.exec(select(MaterialReservation)).all()
    return [
        MaterialReservationSchema(**reservation.model_dump())
        for reservation in reservations
    ]


def read_material_reservation(reservation_id: uuid.UUID, session: SessionDep):
    reservation = session.get(MaterialReservation, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return MaterialReservationSchema(**reservation.model_dump())


def update_material_reservation(
    reservation_id: uuid.UUID,
    reservation_data: MaterialReservationCreateSchema,
    session: SessionDep,
):
    db_reservation = session.get(MaterialReservation, reservation_id)
    if db_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    for key, value in reservation_data.model_dump(exclude_unset=True).items():
        setattr(db_reservation, key, value)
    session.commit()
    session.refresh(db_reservation)
    return MaterialReservationSchema(**db_reservation.model_dump())


def delete_material_reservation(reservation_id: uuid.UUID, session: SessionDep):
    db_reservation = session.get(MaterialReservation, reservation_id)
    if db_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    session.delete(db_reservation)
    session.commit()
    return {"detail": "Reservation deleted"}
