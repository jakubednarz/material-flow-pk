import uuid

from sqlmodel import Field, SQLModel


class Supplier(SQLModel, table=True):
    __tablename__ = "suppliers"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(index=True, nullable=False)
    contact: str = Field(nullable=False)
    address: str = Field(nullable=False)
