from fastapi import HTTPException, status, Depends
from jwt.exceptions import InvalidTokenError
from typing import Annotated
import jwt
import requests

from ..schemas.token import TokenDataSchema
from ..schemas.user import UserSchema
from ..utils.getenv import get_env
from ..utils.token import get_token_from_cookie

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


async def get_current_user(
    token: Annotated[str, Depends(get_token_from_cookie)],
):
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
        token_data = TokenDataSchema(username=username)
    except InvalidTokenError:
        raise credentials_exception
        
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[UserSchema, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
