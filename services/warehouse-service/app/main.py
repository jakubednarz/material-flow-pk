from fastapi import FastAPI

from .database import create_db_and_tables
from .routers import (
    # bill_of_materials,
    # bom_item,
    # material,
    pallet,
    resource,
    resource_movement,
    resource_reservation,
    warehouse_location,
)

app = FastAPI(title="warehouse-service")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(resource.router)
# app.include_router(material.router)
app.include_router(pallet.router)
app.include_router(resource_reservation.router)
app.include_router(resource_movement.router)
# app.include_router(bom_item.router)
# app.include_router(bill_of_materials.router)
app.include_router(warehouse_location.router)
