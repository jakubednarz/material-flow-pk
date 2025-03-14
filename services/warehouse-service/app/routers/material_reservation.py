import uuid

from fastapi import APIRouter

from ..api import material_reservations
from ..database import SessionDep
from ..schemas.material_reservation import (
    MaterialReservationCreateSchema,
    MaterialReservationSchema,
)

router = APIRouter(tags=["Material Reservation"])


@router.post(
    "/warehouse/material-reservations/", response_model=MaterialReservationSchema
)
def create_material_reservation_route(
    reservation: MaterialReservationCreateSchema, session: SessionDep
):
    return material_reservations.create_material_reservation(
        reservation=reservation, session=session
    )


@router.get(
    "/warehouse/material-reservations/", response_model=list[MaterialReservationSchema]
)
def get_all_material_reservations_route(session: SessionDep):
    return material_reservations.read_all_material_reservations(session=session)


@router.get(
    "/warehouse/material-reservations/{reservation_id}",
    response_model=MaterialReservationSchema,
)
def get_material_reservation_route(reservation_id: uuid.UUID, session: SessionDep):
    return material_reservations.read_material_reservation(
        reservation_id=reservation_id, session=session
    )


@router.put(
    "/warehouse/material-reservations/{reservation_id}",
    response_model=MaterialReservationSchema,
)
def update_material_reservation_route(
    reservation_id: uuid.UUID,
    reservation_data: MaterialReservationCreateSchema,
    session: SessionDep,
):
    return material_reservations.update_material_reservation(
        reservation_id=reservation_id,
        reservation_data=reservation_data,
        session=session,
    )


@router.delete("/warehouse/material-reservations/{reservation_id}")
def delete_material_reservation_route(reservation_id: uuid.UUID, session: SessionDep):
    return material_reservations.delete_material_reservation(
        reservation_id=reservation_id, session=session
    )
