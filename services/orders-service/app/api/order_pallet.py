import uuid

from fastapi import Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models.orders import Order, OrderPallet
from ..schemas.order_pallet import (
    OrderPalletCreate,
    OrderPalletUpdate,
)


def add_pallet_to_order(
    order_id: uuid.UUID,
    pallet_data: OrderPalletCreate,
    session: Session = Depends(get_session),
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    existing = session.exec(
        select(OrderPallet).where(
            OrderPallet.order_id == order_id,
            OrderPallet.pallet_id == pallet_data.pallet_id,
        )
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Pallet {pallet_data.pallet_id} is already assigned to this order",
        )

    order_pallet = OrderPallet(
        order_id=order_id,
        pallet_id=pallet_data.pallet_id,
        quantity=pallet_data.quantity,
        notes=pallet_data.notes,
    )

    session.add(order_pallet)
    session.commit()
    session.refresh(order_pallet)

    return order_pallet


def get_order_pallets(order_id: uuid.UUID, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order_pallets = session.exec(
        select(OrderPallet).where(OrderPallet.order_id == order_id)
    ).all()

    return order_pallets


def get_pallet_orders(pallet_id: uuid.UUID, session: Session = Depends(get_session)):
    order_pallets = session.exec(
        select(OrderPallet).where(OrderPallet.pallet_id == pallet_id)
    ).all()

    return order_pallets


def get_order_pallet(
    order_pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    order_pallet = session.get(OrderPallet, order_pallet_id)
    if not order_pallet:
        raise HTTPException(status_code=404, detail="Order-pallet relation not found")

    return order_pallet


def update_order_pallet(
    order_pallet_id: uuid.UUID,
    pallet_data: OrderPalletUpdate,
    session: Session = Depends(get_session),
):
    order_pallet = session.get(OrderPallet, order_pallet_id)
    if not order_pallet:
        raise HTTPException(status_code=404, detail="Order-pallet relation not found")

    update_data = pallet_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(order_pallet, key, value)

    session.add(order_pallet)
    session.commit()
    session.refresh(order_pallet)

    return order_pallet


def remove_pallet_from_order(
    order_pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    order_pallet = session.get(OrderPallet, order_pallet_id)
    if not order_pallet:
        raise HTTPException(status_code=404, detail="Order-pallet relation not found")

    session.delete(order_pallet)
    session.commit()

    return {"detail": "Pallet removed from order"}


def delete_order_pallet_by_ids(
    order_id: uuid.UUID, pallet_id: uuid.UUID, session: Session = Depends(get_session)
):
    order_pallet = session.exec(
        select(OrderPallet).where(
            OrderPallet.order_id == order_id, OrderPallet.pallet_id == pallet_id
        )
    ).first()

    if not order_pallet:
        raise HTTPException(status_code=404, detail="Order-pallet relation not found")

    session.delete(order_pallet)
    session.commit()

    return {"detail": "Pallet removed from order"}
