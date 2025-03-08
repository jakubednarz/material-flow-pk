from fastapi import HTTPException

from ..schemas.users import UserSchema

from ..database import SessionDep
from ..models.users import User
from sqlmodel import select
import uuid


def create_user(user: UserSchema, session: SessionDep) -> User:
    db_user = User(**user.model_dump())

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def read_all_users(session:SessionDep) -> list[UserSchema]:
    users = session.exec(select(User))
    return [
        UserSchema(**user.model_dump())
        for user in users
    ]


def read_user(user_id: uuid.UUID, session: SessionDep) -> UserSchema:
    user = session.get(User, user_id)
    if user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return UserSchema(**user.model_dump())


def read_user_by_username(username: str, session: SessionDep) -> UserSchema:
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    
    if user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return UserSchema(**user.model_dump())


# TODO
def update_user():
    ...
    
# TODO
def delete_user():
    ...
