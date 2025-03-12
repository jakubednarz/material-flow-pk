from fastapi import FastAPI

from .database import create_db_and_tables
from .routers import activities, users

app = FastAPI(title="users-service")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(users.router)
app.include_router(activities.router)
