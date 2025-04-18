import os
from typing import Annotated

from dotenv import find_dotenv
from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

from .models.orders import *  # noqa: F403

find_dotenv()
DATABASE_URL = os.getenv("ORDERS_DB_URL")
print(DATABASE_URL)
engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    # SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
