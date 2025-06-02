from fastapi import APIRouter, Depends
from sqlmodel import Session

from ..api import suppliers
from ..database import get_session
from ..schemas.suppliers import SupplierCreateSchema, SupplierUpdateSchema

router = APIRouter(tags=["Suppliers"])


@router.post("/suppliers/", response_model=SupplierCreateSchema, status_code=201)
def create_supplier_route(
    supplier_data: SupplierCreateSchema, session: Session = Depends(get_session)
):
    return suppliers.create_supplier(supplier_data=supplier_data, session=session)


@router.get("/suppliers/", response_model=list[SupplierUpdateSchema])
def get_all_suppliers_route(session: Session = Depends(get_session)):
    return suppliers.read_all_suppliers(session=session)


@router.get("/suppliers/{supplier_id}", response_model=SupplierUpdateSchema)
def get_supplier_route(supplier_id: str, session: Session = Depends(get_session)):
    return suppliers.read_supplier(supplier_id=supplier_id, session=session)
