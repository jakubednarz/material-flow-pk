from fastapi import HTTPException

from ..schemas.users import UserSchema, UserUpdateSchema, UserCreateSchema

from ..database import SessionDep
from ..models.users import User
from ..utils.bcrypt import hash_password
from sqlmodel import select
import uuid



def create_user(user: UserCreateSchema, session: SessionDep):
    db_user = User(**user.model_dump())
    db_user.password = hash_password(db_user.password)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def read_all_users(session: SessionDep):
    users = session.exec(select(User))
    return [
        UserSchema.model_validate(user)
        for user in users
    ]


def read_user(user_id: uuid.UUID, session: SessionDep):
    user = session.get(User, user_id)
    if user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return UserSchema.model_validate(user)


def read_user_by_username(username: str, session: SessionDep):
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    
    if user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return UserSchema.model_validate(user)


def update_user(user_id: uuid.UUID, user_data: UserUpdateSchema, session: SessionDep):
    db_user = session.get(User, user_id)

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user_data.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)
    db_user.password = hash_password(db_user.password)
    
    session.commit()
    session.refresh(db_user)
    
    return UserSchema.model_validate(db_user)


def delete_user(user_id: uuid.UUID, session: SessionDep):
    db_user = session.get(User, user_id)
    if db_user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(db_user)
    session.commit()
    return {"response": "user deleted"}
