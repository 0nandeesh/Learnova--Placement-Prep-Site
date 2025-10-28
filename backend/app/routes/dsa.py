from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas import DSAQuestion, DSAQuestionCreate
from app.data import DSA_QUESTIONS, DSA_RESOURCES

router = APIRouter(prefix="/api/dsa", tags=["DSA Questions & Resources"])

@router.get("/", response_model=List[DSAQuestion])
async def get_dsa_questions(
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    search: Optional[str] = Query(None, description="Search in title and topic")
):
    """Get all DSA questions with optional filtering"""
    questions = DSA_QUESTIONS.copy()
    
    if category:
        questions = [q for q in questions if q["category"] == category]
    
    if difficulty:
        questions = [q for q in questions if q["difficulty"] == difficulty]
    
    if search:
        search_lower = search.lower()
        questions = [q for q in questions if 
                    search_lower in q["title"].lower() or 
                    search_lower in q["topic"].lower()]
    
    return questions

@router.get("/categories")
async def get_categories():
    """Get all available categories"""
    categories = list(set(q["category"] for q in DSA_QUESTIONS))
    return {"categories": categories}

@router.get("/difficulties")
async def get_difficulties():
    """Get all available difficulties"""
    difficulties = list(set(q["difficulty"] for q in DSA_QUESTIONS))
    return {"difficulties": difficulties}

@router.post("/", response_model=DSAQuestion)
async def create_dsa_question(question: DSAQuestionCreate):
    """Create a new DSA question (stored in memory)"""
    new_id = max(q["id"] for q in DSA_QUESTIONS) + 1
    question_dict = question.dict()
    question_dict["id"] = new_id
    DSA_QUESTIONS.append(question_dict)
    return DSAQuestion(**question_dict)

@router.get("/{question_id}", response_model=DSAQuestion)
async def get_dsa_question(question_id: int):
    """Get a specific DSA question by ID"""
    try:
        question = next(q for q in DSA_QUESTIONS if q["id"] == question_id)
        return DSAQuestion(**question)
    except StopIteration:
        raise HTTPException(status_code=404, detail="Question not found")


# DSA Learning Resources Endpoints
@router.get("/resources/all")
async def get_dsa_resources():
    """Get all DSA learning resources"""
    return DSA_RESOURCES


@router.get("/resources/courses")
async def get_dsa_courses():
    """Get DSA courses"""
    return {"courses": DSA_RESOURCES["courses"]}


@router.get("/resources/projects")
async def get_dsa_projects():
    """Get DSA projects"""
    return {"projects": DSA_RESOURCES["projects"]}


@router.get("/resources/learning-paths")
async def get_dsa_learning_paths():
    """Get DSA learning paths"""
    return {"learning_paths": DSA_RESOURCES["learning_paths"]}


@router.get("/resources/problem-sets")
async def get_dsa_problem_sets():
    """Get DSA problem sets"""
    return {"problem_sets": DSA_RESOURCES["problem_sets"]}


@router.get("/resources/materials")
async def get_dsa_additional_resources():
    """Get additional DSA resources and tools"""
    return {"resources": DSA_RESOURCES["resources"]}
