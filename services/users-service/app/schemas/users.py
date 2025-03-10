from pydantic import BaseModel
import uuid



class UserSchema(BaseModel):
    id: uuid.UUID
    username: str
    password: str
    email: str | None = None
    first_name: str
    last_name: str
    disabled: bool = False

    class Config:
        from_attributes = True
