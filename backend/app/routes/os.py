from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas import OSNote, OSNoteCreate
from app.data import OS_NOTES, OS_RESOURCES

router = APIRouter(prefix="/api/os", tags=["OS Notes & Resources"])

@router.get("/", response_model=List[OSNote])
async def get_os_notes(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in title and content")
):
    """Get all OS notes with optional filtering"""
    notes = OS_NOTES.copy()
    
    if category:
        notes = [n for n in notes if n["category"] == category]
    
    if search:
        search_lower = search.lower()
        notes = [n for n in notes if 
                search_lower in n["title"].lower() or 
                search_lower in n["content"].lower()]
    
    return notes

@router.get("/categories")
async def get_categories():
    """Get all available categories"""
    categories = list(set(n["category"] for n in OS_NOTES))
    return {"categories": categories}

@router.post("/", response_model=OSNote)
async def create_os_note(note: OSNoteCreate):
    """Create a new OS note (stored in memory)"""
    new_id = max(n["id"] for n in OS_NOTES) + 1
    note_dict = note.dict()
    note_dict["id"] = new_id
    OS_NOTES.append(note_dict)
    return OSNote(**note_dict)

@router.get("/{note_id}", response_model=OSNote)
async def get_os_note(note_id: int):
    """Get a specific OS note by ID"""
    try:
        note = next(n for n in OS_NOTES if n["id"] == note_id)
        return OSNote(**note)
    except StopIteration:
        raise HTTPException(status_code=404, detail="Note not found")


# OS Learning Resources Endpoints
@router.get("/resources/all")
async def get_os_resources():
    """Get all OS learning resources"""
    return OS_RESOURCES


@router.get("/resources/courses")
async def get_os_courses():
    """Get OS courses"""
    return {"courses": OS_RESOURCES["courses"]}


@router.get("/resources/topics")
async def get_os_topics():
    """Get OS topics"""
    return {"topics": OS_RESOURCES["topics"]}


@router.get("/resources/materials")
async def get_os_additional_resources():
    """Get additional OS resources and guides"""
    return {"resources": OS_RESOURCES["resources"]}
