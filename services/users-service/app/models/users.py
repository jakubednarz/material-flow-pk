import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from .enums import UserRoleEnum


class User(SQLModel, table=True):    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    email: Optional[str] = None
    password: str

    first_name: str
    last_name: str
    pesel: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    image: Optional[str] = None

    role: UserRoleEnum
    activities: List["UserActivity"] = Relationship(back_populates="user")

    last_login: datetime = Field(default_factory=datetime.now)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    disabled: bool = False


class UserActivity(SQLModel, table=True):
    __tablename__ = 'user_activity'
    
    id: int = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    action: str
    details: str
    created_at: datetime = Field(default_factory=datetime.now)
    
    user: Optional[User] = Relationship(back_populates="activities")
