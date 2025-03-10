from fastapi import HTTPException, status, Cookie

from typing import Annotated, Optional
from datetime import datetime, timedelta, timezone

import jwt

from ..utils.bcrypt import verify_password
from ..utils.getenv import get_env
from ..api.users import get_user



def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(
    data: dict, expires_delta: timedelta | None = None,
):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=get_env("AUTH_SECRET_KEY"), algorithm=get_env("AUTH_ALGORITHM"))
    return encoded_jwt


async def get_token_from_cookie(
    access_token: Annotated[Optional[str], Cookie()] = None,
):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if access_token.startswith("Bearer "):
        return access_token[7:]
    return access_token

