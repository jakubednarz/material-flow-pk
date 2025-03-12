from fastapi import FastAPI

from .database import create_db_and_tables
from .routers import warehouse

app = FastAPI(title="warehouse-service")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(warehouse.router)
