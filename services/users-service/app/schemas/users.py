from pydantic import BaseModel
import uuid

class UserSchema(BaseModel):
    id: uuid.UUID
    username: str
    password: str
    email: str | None = None
    disabled: bool | None = None

    class Config:
        from_attributes = True