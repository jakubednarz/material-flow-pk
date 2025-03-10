from pydantic import BaseModel



class UserSchema(BaseModel):
    username: str
    hashed_password: str
    disabled: bool
    