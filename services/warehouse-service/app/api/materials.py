from ..schemas.materials import MaterialCreateSchema, MaterialSchema
from ..database import SessionDep
from ..models.warehouse import Material
from fastapi import HTTPException
from sqlmodel import select
import uuid



def create_material(material: MaterialCreateSchema, session: SessionDep):
    db_material = Material(**material.model_dump())

    session.add(db_material)
    session.commit()
    session.refresh(db_material)

    return db_material


def read_all_materials(session: SessionDep):
    materials = session.exec(select(Material)).all()
    return [
        MaterialSchema(**material.model_dump())
        for material in materials
    ]


def read_material(material_id: uuid.UUID, session: SessionDep):
    material = session.get(Material, material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    return MaterialSchema(**material.model_dump())


def read_material_by_code(code: int, session: SessionDep):
    statement = select(Material).where(Material.code == code)
    material = session.exec(statement).first()

    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    return MaterialSchema(**material.model_dump())


def read_material_by_name(name: str, session: SessionDep):
    statement = select(Material).where(Material.name == name)
    material = session.exec(statement).first()

    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    return MaterialSchema(**material.model_dump())


def update_material(
    material_id: uuid.UUID, material_data: MaterialCreateSchema, session: SessionDep
):
    db_material = session.get(Material, material_id)
    if db_material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    for key, value in material_data.model_dump(exclude_unset=True).items():
        setattr(db_material, key, value)
    
    session.commit()
    session.refresh(db_material)
    
    return MaterialSchema(**db_material.model_dump())


def delete_material(material_id: uuid.UUID, session: SessionDep):
    db_material = session.get(Material, material_id)
    if db_material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    session.delete(db_material)
    session.commit()
    return {"detail": "Material deleted"}


def update_material_stock(
    material_id: uuid.UUID, quantity: float, session: SessionDep
):
    db_material = session.get(Material, material_id)
    if db_material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    db_material.current_stock += quantity
    session.commit()
    session.refresh(db_material)
    
    return MaterialSchema(**db_material.model_dump())


def check_material_availability(
    material_id: uuid.UUID, required_quantity: float, session: SessionDep
):
    db_material = session.get(Material, material_id)
    if db_material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    if db_material.current_stock >= required_quantity:
        return {"available": True}
    else:
        return {"available": False}


def read_material_reservations(material_id: uuid.UUID, session: SessionDep):
    material = session.get(Material, material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return [
        reservation.model_dump()
        for reservation in material.reservations
    ]


def read_material_bom_items(material_id: uuid.UUID, session: SessionDep):
    material = session.get(Material, material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return [
        bom_item.model_dump()
        for bom_item in material.bom_items
    ]
