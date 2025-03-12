from fastapi import FastAPI
from .routers import warehouse
from .database import create_db_and_tables



app = FastAPI(title="warehouse-service")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(warehouse.router)
