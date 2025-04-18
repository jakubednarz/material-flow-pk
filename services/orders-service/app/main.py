from fastapi import FastAPI

from .database import create_db_and_tables
from .routers import order_pallet, orders

app = FastAPI(title="orders-service")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(orders.router)
app.include_router(order_pallet.router)
