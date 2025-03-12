from fastapi import APIRouter, Query
from ..database import SessionDep
from ..schemas.users import UserSchema, UserUpdateSchema, UserCreateSchema
from ..api import users
import uuid



router = APIRouter(tags=["User"])


@router.post("/create/", response_model=UserCreateSchema)
def create_user_route(user: UserCreateSchema, session: SessionDep):
    return users.create_user(user=user, session=session)


@router.get("/users/", response_model=list[UserSchema] | UserSchema)
def read_users_route(session: SessionDep, username: str = Query(None)):
    if username:
        return users.read_user_by_username(username=username, session=session)
    return users.read_all_users(session=session)


@router.get("/users/{user_id}", response_model=UserSchema)
def get_user(user_id: uuid.UUID, session: SessionDep):
    return users.read_user(user_id=user_id, session=session)


@router.put("/users/{user_id}")
def update_user_route(user_id: uuid.UUID, user_data: UserUpdateSchema, session: SessionDep):
    return users.update_user(user_id=user_id, user_data=user_data, session=session)


@router.delete("/users/{user_id}")
def delete_user_route(user_id: uuid.UUID, session: SessionDep):
    return users.delete_user(user_id=user_id, session=session)

