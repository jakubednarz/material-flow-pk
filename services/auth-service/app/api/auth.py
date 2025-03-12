from ..api.users import get_user
from ..utils.bcrypt import verify_password
from ..utils.token import create_access_token, get_token_from_cookie


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


__all__ = ["authenticate_user", "create_access_token", "get_token_from_cookie"]
