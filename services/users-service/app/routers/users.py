from fastapi import APIRouter
from ..database import SessionDep, create_db_and_tables
from ..schemas.users import UserSchema
from ..api.users import create_user, read_all_users, read_user
import uuid

router = APIRouter()

@router.on_event("startup")
def on_startup():
    create_db_and_tables()


@router.post("/create/", response_model=UserSchema)
def create_user_route(user: UserSchema, session: SessionDep):
    return create_user(user=user, session=session)


@router.get("/users/", response_model=list[UserSchema])
def read_all_users_route(session: SessionDep):
    return read_all_users(session=session)


@router.get("/users/{user_id}", response_model=UserSchema)
def get_user(user_id: uuid.UUID, session: SessionDep):
    return read_user(user_id, session)
