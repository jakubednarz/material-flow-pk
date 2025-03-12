from fastapi import APIRouter
from ..database import create_db_and_tables


router = APIRouter()


@router.on_event("startup")
def on_startup():
    create_db_and_tables()
