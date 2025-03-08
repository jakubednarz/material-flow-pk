from fastapi import Depends, APIRouter, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm

from datetime import timedelta
from typing import Annotated

from ..schemas.auth import Token, UserSchema
from ..api.auth import authenticate_user, create_access_token, get_current_active_user
from ..utils.getenv import get_env


router = APIRouter()

@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    response: Response
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(get_env("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES")))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    response.set_cookie(
        key="access_token", 
        value=f"Bearer {access_token}",
        max_age=access_token_expires.total_seconds(),
        expires=access_token_expires.total_seconds(),
        samesite="lax"
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserSchema)
async def get_logged_user(current_user: Annotated[UserSchema, Depends(get_current_active_user)]):
    return current_user
