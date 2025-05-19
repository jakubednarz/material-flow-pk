import os
from typing import Annotated

from dotenv import find_dotenv
from fastapi import Depends

# from sqlalchemy.ext.compiler import compiles
# from sqlalchemy.schema import DropTable
from sqlmodel import Session, SQLModel, create_engine

from .models.warehouse import *  # noqa: F403

find_dotenv()
USER_DATABASE_URL = os.getenv("WAREHOUSE_DB_URL")

engine = create_engine(USER_DATABASE_URL)


# @compiles(DropTable)
# def _compile_drop_table(element, compiler, **kwargs):
#     return compiler.visit_drop_table(element) + " CASCADE"


def create_db_and_tables():
    # SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
