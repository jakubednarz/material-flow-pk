import uuid
from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    hashed_password: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool = False
