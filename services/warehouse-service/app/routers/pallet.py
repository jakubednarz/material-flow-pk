import uuid

from fastapi import APIRouter

from ..api import pallet
from ..database import SessionDep
from ..schemas.pallet import PalletBaseSchema, PalletCreateSchema, PalletReadSchema

router = APIRouter(tags=["Pallet"])


@router.post("/warehouse/pallets/", response_model=PalletBaseSchema)
def create_pallet_route(pallet_schema: PalletCreateSchema, session: SessionDep):
    return pallet.create_pallet(pallet=pallet_schema, session=session)


@router.get("/warehouse/pallets/", response_model=list[PalletReadSchema])
def get_all_pallets_route(session: SessionDep):
    return pallet.read_all_pallets(session=session)


@router.get("/warehouse/pallets/{pallet_id}", response_model=PalletReadSchema)
def get_pallet_route(pallet_id: uuid.UUID, session: SessionDep):
    return pallet.read_pallet(pallet_id=pallet_id, session=session)


@router.put("/warehouse/pallets/{pallet_id}", response_model=PalletBaseSchema)
def update_pallet_route(
    pallet_id: uuid.UUID, pallet_data: PalletCreateSchema, session: SessionDep
):
    return pallet.update_pallet(
        pallet_id=pallet_id, pallet_data=pallet_data, session=session
    )


@router.delete("/warehouse/pallets/{pallet_id}")
def delete_pallet_route(pallet_id: uuid.UUID, session: SessionDep):
    return pallet.delete_pallet(pallet_id=pallet_id, session=session)
