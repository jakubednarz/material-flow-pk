from pydantic import BaseModel
import uuid
from ..models.enums import UserRoleEnum



class UserSchema(BaseModel):
    id: uuid.UUID
    username: str
    password: str
    email: str | None = None
    first_name: str
    last_name: str
    role: UserRoleEnum = UserRoleEnum.WAREHOUSE_WORKER
    disabled: bool = False

    class Config:
        from_attributes = True


class UserCreateSchema(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    role: UserRoleEnum = UserRoleEnum.WAREHOUSE_WORKER


class UserUpdateSchema(BaseModel):
    username: str
    password: str
    email: str | None = None
