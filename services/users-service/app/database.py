from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine
from .models.users import User  # noqa: F401

from dotenv import find_dotenv
import os

find_dotenv()
USER_DATABASE_URL = os.getenv("USERS_DB_URL")

engine = create_engine(USER_DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
