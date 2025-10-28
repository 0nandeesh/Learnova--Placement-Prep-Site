from fastapi import APIRouter, Query
from typing import List, Optional
from app.data import AIML_CONCEPTS, AIML_RESOURCES

router = APIRouter(prefix="/api/aiml", tags=["AI/ML Concepts & Resources"])


@router.get("/")
async def get_aiml_concepts(
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    search: Optional[str] = Query(None, description="Search in title and description")
):
    """Get all AI/ML concepts with optional filtering"""
    concepts = AIML_CONCEPTS.copy()
    
    if category:
        concepts = [c for c in concepts if c["category"] == category]
    
    if difficulty:
        concepts = [c for c in concepts if c["difficulty"] == difficulty]
    
    if search:
        search_lower = search.lower()
        concepts = [c for c in concepts if 
                   search_lower in c["title"].lower() or 
                   search_lower in c["description"].lower()]
    
    return concepts


@router.get("/categories")
async def get_categories():
    """Get all available categories"""
    categories = list(set(c["category"] for c in AIML_CONCEPTS))
    return {"categories": sorted(categories)}


@router.get("/difficulties")
async def get_difficulties():
    """Get all available difficulties"""
    difficulties = list(set(c["difficulty"] for c in AIML_CONCEPTS))
    return {"difficulties": sorted(difficulties)}


# AIML Learning Resources Endpoints
@router.get("/resources/all")
async def get_aiml_resources():
    """Get all AI/ML learning resources"""
    return AIML_RESOURCES


@router.get("/resources/courses")
async def get_aiml_courses():
    """Get AI/ML courses"""
    return {"courses": AIML_RESOURCES["courses"]}


@router.get("/resources/projects")
async def get_aiml_projects():
    """Get AI/ML projects"""
    return {"projects": AIML_RESOURCES["projects"]}


@router.get("/resources/learning-paths")
async def get_aiml_learning_paths():
    """Get AI/ML learning paths"""
    return {"learning_paths": AIML_RESOURCES["learning_paths"]}


@router.get("/resources/materials")
async def get_aiml_materials():
    """Get additional AI/ML materials and resources"""
    return {"materials": AIML_RESOURCES["resources"]}