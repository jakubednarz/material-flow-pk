import uuid

from fastapi import Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models.orders import Order
from ..schemas.orders import OrderCreateSchema, OrderUpdateSchema


def create_order(
    order_data: OrderCreateSchema, session: Session = Depends(get_session)
):
    new_order = Order(**order_data.dict())
    session.add(new_order)
    session.commit()
    session.refresh(new_order)
    return new_order


def read_all_orders(session: Session = Depends(get_session)):
    orders = session.exec(select(Order)).all()
    return orders


def read_order(order_id: uuid.UUID, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


def update_order(
    order_id: uuid.UUID,
    order_data: OrderUpdateSchema,
    session: Session = Depends(get_session),
):
    db_order = session.get(Order, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in order_data.dict(exclude_unset=True).items():
        setattr(db_order, key, value)
    session.commit()
    session.refresh(db_order)
    return db_order


def delete_order(order_id: uuid.UUID, session: Session = Depends(get_session)):
    db_order = session.get(Order, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    session.delete(db_order)
    session.commit()
    return {"detail": "Order deleted"}
