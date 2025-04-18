import uuid

from fastapi import APIRouter, Depends
from sqlmodel import Session

from ..api import orders
from ..database import get_session
from ..schemas.orders import OrderCreateSchema, OrderUpdateSchema

router = APIRouter(tags=["Orders"])


@router.post("/orders/", response_model=OrderCreateSchema, status_code=201)
def create_order_route(
    order_data: OrderCreateSchema, session: Session = Depends(get_session)
):
    return orders.create_order(order_data=order_data, session=session)


@router.get("/orders/", response_model=list[OrderUpdateSchema])
def get_all_orders_route(session: Session = Depends(get_session)):
    return orders.read_all_orders(session=session)


@router.get("/orders/{order_id}", response_model=OrderUpdateSchema)
def get_order_route(order_id: uuid.UUID, session: Session = Depends(get_session)):
    return orders.read_order(order_id=order_id, session=session)


@router.put("/orders/{order_id}", response_model=OrderUpdateSchema)
def update_order_route(
    order_id: uuid.UUID,
    order_data: OrderUpdateSchema,
    session: Session = Depends(get_session),
):
    return orders.update_order(
        order_id=order_id, order_data=order_data, session=session
    )


@router.delete("/orders/{order_id}", status_code=204)
def delete_order_route(order_id: uuid.UUID, session: Session = Depends(get_session)):
    return orders.delete_order(order_id=order_id, session=session)
