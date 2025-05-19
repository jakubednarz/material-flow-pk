import uuid
from typing import List

from fastapi import APIRouter
from sqlmodel import select

from ..api import resource
from ..database import SessionDep
from ..models.warehouse import (
    BOMItem,
    ProductComposition,
    Resource,
    ResourceType,
)
from ..schemas.resource import (
    BOMItemReadSchema,
    BOMReadSchema,
    MaterialReadSchema,
    ProductCompositionReadSchema,
    ProductReadSchema,
    ResourceBaseSchema,
    ResourceReadSchema,
)

router = APIRouter(tags=["Resource"])


@router.post(
    "/warehouse/resources/", response_model=ResourceReadSchema, status_code=201
)
def create_resource_route(resource_schema: ResourceBaseSchema, session: SessionDep):
    return resource.create_resource(resource=resource_schema, session=session)


@router.get("/warehouse/resources/", response_model=list[ResourceReadSchema])
def get_all_resources_route(session: SessionDep):
    return resource.read_all_resources(session=session)


@router.get("/warehouse/resources/{resource_id}", response_model=ResourceReadSchema)
def get_resource_route(resource_id: uuid.UUID, session: SessionDep):
    return resource.read_resource(resource_id=resource_id, session=session)


@router.put("/warehouse/resources/{resource_id}", response_model=ResourceReadSchema)
def update_resource_route(
    resource_id: uuid.UUID, resource_data: ResourceBaseSchema, session: SessionDep
):
    return resource.update_resource(
        resource_id=resource_id, resource_data=resource_data, session=session
    )


@router.delete("/warehouse/resources/{resource_id}", status_code=204)
def delete_resource_route(resource_id: uuid.UUID, session: SessionDep):
    return resource.delete_resource(resource_id=resource_id, session=session)


@router.get(
    "/warehouse/materials/",
    response_model=List[MaterialReadSchema],
)
def get_all_materials(session: SessionDep):
    """
    Pobierz wszystkie materiały.
    """
    materials = session.exec(
        select(Resource).where(Resource.type == ResourceType.MATERIAL)
    ).all()

    return materials


@router.get(
    "/warehouse/boms/",
    response_model=List[BOMReadSchema],
)
def get_all_boms(session: SessionDep):
    """
    Pobierz wszystkie BOMy wraz z ich pozycjami.
    """
    boms = session.exec(select(Resource).where(Resource.type == ResourceType.BOM)).all()

    result = []
    for bom in boms:
        # Pobierz wszystkie pozycje BOMu
        bom_items = session.exec(select(BOMItem).where(BOMItem.bom_id == bom.id)).all()

        # Konwertuj pozycje BOMu na schemat odpowiedzi
        items = []
        for item in bom_items:
            # Pobierz dane materiału
            material = session.get(Resource, item.material_id)
            if material:
                items.append(
                    BOMItemReadSchema(
                        id=item.id,
                        material_id=item.material_id,
                        material_name=material.name,
                        material_code=material.code,
                        quantity=item.quantity,
                        unit=item.unit,
                    )
                )

        # Stwórz obiekt BOM z pozycjami
        bom_read = BOMReadSchema(
            id=bom.id,
            name=bom.name,
            code=bom.code,
            description=bom.description,
            type=bom.type,
            min_stock=bom.min_stock,
            quantity=bom.quantity,
            valid_from=bom.valid_from,
            valid_to=bom.valid_to,
            is_active=bom.is_active,
            created_at=bom.created_at,
            updated_at=bom.updated_at,
            items=items,
        )
        result.append(bom_read)

    return result


@router.get(
    "/warehouse/products/",
    response_model=List[ProductReadSchema],
)
def get_all_products(session: SessionDep):
    """
    Pobierz wszystkie produkty wraz z ich kompozycjami.
    """
    products = session.exec(
        select(Resource).where(Resource.type == ResourceType.PRODUCT)
    ).all()

    result = []
    for product in products:
        # Pobierz wszystkie kompozycje produktu
        product_compositions = session.exec(
            select(ProductComposition).where(
                ProductComposition.product_id == product.id
            )
        ).all()

        # Konwertuj kompozycje na schemat odpowiedzi
        compositions = []
        for comp in product_compositions:
            bom_name = None
            material_name = None

            # Pobierz nazwę BOMu jeśli używany
            if comp.bom_id:
                bom = session.get(Resource, comp.bom_id)
                if bom:
                    bom_name = bom.name

            # Pobierz nazwę materiału jeśli używany bezpośrednio
            if comp.material_id:
                material = session.get(Resource, comp.material_id)
                if material:
                    material_name = material.name

            compositions.append(
                ProductCompositionReadSchema(
                    id=comp.id,
                    bom_id=comp.bom_id,
                    bom_name=bom_name,
                    material_id=comp.material_id,
                    material_name=material_name,
                    quantity=comp.quantity,
                )
            )

        # Stwórz obiekt produktu z kompozycjami
        product_read = ProductReadSchema(
            id=product.id,
            name=product.name,
            code=product.code,
            description=product.description,
            type=product.type,
            min_stock=product.min_stock,
            quantity=product.quantity,
            created_at=product.created_at,
            updated_at=product.updated_at,
            is_active=product.is_active,
            compositions=compositions,
        )
        result.append(product_read)

    return result
