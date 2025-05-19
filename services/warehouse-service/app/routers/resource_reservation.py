import uuid

from fastapi import APIRouter

from ..api import resource_reservations
from ..database import SessionDep
from ..schemas.resource_reservation import (
    ResourceReservationBaseSchema,
    ResourceReservationCreateSchema,
)

router = APIRouter(tags=["Resource Reservation"])


@router.post(
    "/warehouse/resource-reservations/", response_model=ResourceReservationBaseSchema
)
def create_resource_reservation_route(
    reservation: ResourceReservationCreateSchema, session: SessionDep
):
    return resource_reservations.create_resource_reservation(
        reservation=reservation, session=session
    )


@router.get(
    "/warehouse/resource-reservations/",
    response_model=list[ResourceReservationBaseSchema],
)
def get_all_resource_reservations_route(session: SessionDep):
    return resource_reservations.read_all_resource_reservations(session=session)


@router.get(
    "/warehouse/resource-reservations/{reservation_id}",
    response_model=ResourceReservationBaseSchema,
)
def get_resource_reservation_route(reservation_id: uuid.UUID, session: SessionDep):
    return resource_reservations.read_resource_reservation(
        reservation_id=reservation_id, session=session
    )


@router.put(
    "/warehouse/resource-reservations/{reservation_id}",
    response_model=ResourceReservationBaseSchema,
)
def update_resource_reservation_route(
    reservation_id: uuid.UUID,
    reservation_data: ResourceReservationCreateSchema,
    session: SessionDep,
):
    return resource_reservations.update_resource_reservation(
        reservation_id=reservation_id,
        reservation_data=reservation_data,
        session=session,
    )


@router.delete("/warehouse/resource-reservations/{reservation_id}")
def delete_resource_reservation_route(reservation_id: uuid.UUID, session: SessionDep):
    return resource_reservations.delete_resource_reservation(
        reservation_id=reservation_id, session=session
    )
