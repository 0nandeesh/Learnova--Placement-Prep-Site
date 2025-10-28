from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas import SQLMaterial, SQLMaterialCreate
from app.data import SQL_MATERIALS, SQL_RESOURCES

router = APIRouter(prefix="/api/sql", tags=["SQL Materials & Resources"])

@router.get("/", response_model=List[SQLMaterial])
async def get_sql_materials(
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    search: Optional[str] = Query(None, description="Search in title and content")
):
    """Get all SQL materials with optional filtering"""
    materials = SQL_MATERIALS.copy()
    
    if category:
        materials = [m for m in materials if m["category"] == category]
    
    if difficulty:
        materials = [m for m in materials if m["difficulty"] == difficulty]
    
    if search:
        search_lower = search.lower()
        materials = [m for m in materials if 
                    search_lower in m["title"].lower() or 
                    search_lower in m["content"].lower()]
    
    return materials

@router.get("/categories")
async def get_categories():
    """Get all available categories"""
    categories = list(set(m["category"] for m in SQL_MATERIALS))
    return {"categories": categories}

@router.get("/difficulties")
async def get_difficulties():
    """Get all available difficulties"""
    difficulties = list(set(m["difficulty"] for m in SQL_MATERIALS))
    return {"difficulties": difficulties}

@router.post("/", response_model=SQLMaterial)
async def create_sql_material(material: SQLMaterialCreate):
    """Create a new SQL material (stored in memory)"""
    new_id = max(m["id"] for m in SQL_MATERIALS) + 1
    material_dict = material.dict()
    material_dict["id"] = new_id
    SQL_MATERIALS.append(material_dict)
    return SQLMaterial(**material_dict)

@router.get("/{material_id}", response_model=SQLMaterial)
async def get_sql_material(material_id: int):
    """Get a specific SQL material by ID"""
    try:
        material = next(m for m in SQL_MATERIALS if m["id"] == material_id)
        return SQLMaterial(**material)
    except StopIteration:
        raise HTTPException(status_code=404, detail="Material not found")


# SQL Learning Resources Endpoints
@router.get("/resources/all")
async def get_sql_resources():
    """Get all SQL learning resources"""
    return SQL_RESOURCES


@router.get("/resources/practice")
async def get_sql_practice_platforms():
    """Get SQL practice platforms"""
    return {"practice_platforms": SQL_RESOURCES["practice_platforms"]}


@router.get("/resources/courses")
async def get_sql_courses():
    """Get SQL courses"""
    return {"courses": SQL_RESOURCES["courses"]}


@router.get("/resources/materials")
async def get_sql_additional_resources():
    """Get additional SQL resources and guides"""
    return {"resources": SQL_RESOURCES["resources"]}
