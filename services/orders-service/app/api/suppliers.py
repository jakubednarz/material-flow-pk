from fastapi import Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models.suppliers import Supplier
from ..schemas.suppliers import SupplierCreateSchema


def create_supplier(
    supplier_data: SupplierCreateSchema, session: Session = Depends(get_session)
):
    new_supplier = Supplier(**supplier_data.dict())
    session.add(new_supplier)
    session.commit()
    session.refresh(new_supplier)
    return new_supplier


def read_all_suppliers(session: Session = Depends(get_session)):
    suppliers = session.exec(select(Supplier)).all()
    return suppliers


def read_supplier(supplier_id: int, session: Session = Depends(get_session)):
    supplier = session.get(Supplier, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier
