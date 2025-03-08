from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError

from ..schemas.auth import TokenData, UserSchema
from ..utils.bcrypt import verify_password
from ..utils.getenv import get_env
import requests


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(username: str):
    try:
        # TODO temporary request
        response = requests.get(f"http://users-service:8000/users?username={username}")
        
        if response.status_code != 200:
            return None
        
        user_data = response.json()
        return UserSchema(
            username=user_data["username"],
            hashed_password=user_data["password"],
            disabled=user_data["disabled"]
        )
    except Exception:
        return None

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=get_env("AUTH_SECRET_KEY"), algorithm=get_env("AUTH_ALGORITHM"))
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, get_env("AUTH_SECRET_KEY"), algorithms=[get_env("AUTH_ALGORITHM")])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: Annotated[UserSchema, Depends(get_current_user)]):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
