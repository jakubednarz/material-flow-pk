import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional



class UserRole(SQLModel, table=True):
    __tablename__ = "user_role"

    user_id: uuid.UUID = Field(foreign_key="user.id", primary_key=True, nullable=False, ondelete="CASCADE")
    role_id: int = Field(foreign_key="role.id", primary_key=True, nullable=False, ondelete="CASCADE")


class Role(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None

    users: List["User"] = Relationship(back_populates="roles", link_model=UserRole)


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

    roles: List["Role"] = Relationship(back_populates="users", link_model=UserRole)
    activities: List["UserActivity"] = Relationship(back_populates="user")

    last_login: datetime = Field(default_factory=datetime.now)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    disabled: bool = False


class UserActivity(SQLModel, table=True):
    __tablename__ = 'user_activity'
    
    id: int = Field(default=None, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    action: str
    details: str
    created_at: datetime = Field(default_factory=datetime.now)
    
    user: Optional[User] = Relationship(back_populates="activities")
