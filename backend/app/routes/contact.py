from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import ContactForm, ContactResponse
from app.data import CONTACT_SUBMISSIONS
from datetime import datetime

router = APIRouter(prefix="/api/contact", tags=["Contact"])

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(contact: ContactForm):
    """Submit a contact form"""
    contact_dict = contact.dict()
    contact_dict["created_at"] = datetime.utcnow()
    contact_dict["id"] = len(CONTACT_SUBMISSIONS) + 1
    
    CONTACT_SUBMISSIONS.append(contact_dict)
    
    return ContactResponse(**contact_dict)

@router.get("/", response_model=List[ContactResponse])
async def get_contact_submissions():
    """Get all contact form submissions (admin only)"""
    return [ContactResponse(**submission) for submission in CONTACT_SUBMISSIONS]
