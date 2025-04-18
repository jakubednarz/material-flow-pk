import uuid

from fastapi import APIRouter, Depends
from sqlmodel import Session

from ..api import order_pallet
from ..database import get_session
from ..schemas.order_pallet import (
    OrderPalletCreate,
    OrderPalletRead,
    OrderPalletUpdate,
)

router = APIRouter(tags=["Order Pallet"])


@router.post("/orders/{order_id}/pallets/", response_model=OrderPalletRead)
def add_pallet_to_order_route(
    order_id: uuid.UUID,
    pallet_data: OrderPalletCreate,
    session: Session = Depends(get_session),
):
    return order_pallet.add_pallet_to_order(
        order_id=order_id, pallet_data=pallet_data, session=session
    )


@router.get("/orders/{order_id}/pallets/", response_model=list[OrderPalletRead])
def get_order_pallets_route(
    order_id: uuid.UUID, session: Session = Depends(get_session)
):
    return order_pallet.get_order_pallets(order_id=order_id, session=session)


@router.get("/pallets/{pallet_id}/orders/", response_model=list[OrderPalletRead])
def get_pallet_orders_route(
    pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    return order_pallet.get_pallet_orders(pallet_id=pallet_id, session=session)


@router.get("/order-pallets/{order_pallet_id}/", response_model=OrderPalletRead)
def get_order_pallet_route(
    order_pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    return order_pallet.get_order_pallet(
        order_pallet_id=order_pallet_id, session=session
    )


@router.put("/order-pallets/{order_pallet_id}/", response_model=OrderPalletRead)
def update_order_pallet_route(
    order_pallet_id: uuid.UUID,
    pallet_data: OrderPalletUpdate,
    session: Session = Depends(get_session),
):
    return order_pallet.update_order_pallet(
        order_pallet_id=order_pallet_id, pallet_data=pallet_data, session=session
    )


@router.delete("/order-pallets/{order_pallet_id}/", status_code=204)
def remove_pallet_from_order_route(
    order_pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    return order_pallet.remove_pallet_from_order(
        order_pallet_id=order_pallet_id, session=session
    )
