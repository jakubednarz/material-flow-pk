import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models.orders import Order
from ..schemas.orders import OrderSchema

router = APIRouter()


@router.post("/", response_model=OrderSchema, status_code=201)
def create_order(order_data: OrderSchema, session: Session = Depends(get_session)):
    new_order = Order(**order_data.dict())
    session.add(new_order)
    session.commit()
    session.refresh(new_order)
    return new_order


@router.get("/", response_model=list[OrderSchema])
def read_all_orders(session: Session = Depends(get_session)):
    orders = session.exec(select(Order)).all()
    return orders


@router.get("/{order_id}", response_model=OrderSchema)
def read_order(order_id: uuid.UUID, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.put("/{order_id}", response_model=OrderSchema)
def update_order(
    order_id: uuid.UUID,
    order_data: OrderSchema,
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


@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: uuid.UUID, session: Session = Depends(get_session)):
    db_order = session.get(Order, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    session.delete(db_order)
    session.commit()
    return {"detail": "Order deleted"}
