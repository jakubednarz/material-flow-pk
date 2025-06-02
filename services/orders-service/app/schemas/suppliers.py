import uuid

from pydantic import BaseModel


class SupplierBaseSchema(BaseModel):
    name: str
    contact: str
    address: str


class SupplierCreateSchema(SupplierBaseSchema):
    pass


class SupplierUpdateSchema(SupplierBaseSchema):
    id: uuid.UUID
