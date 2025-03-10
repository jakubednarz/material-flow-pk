from fastapi import FastAPI
from .routers import warehouse



app = FastAPI()

app.include_router(warehouse.router)
