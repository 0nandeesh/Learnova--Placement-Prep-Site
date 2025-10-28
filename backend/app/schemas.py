from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# DSA Question Schemas
class DSAQuestionBase(BaseModel):
    title: str
    topic: str
    difficulty: str
    source: str
    link: str
    category: str

class DSAQuestionCreate(DSAQuestionBase):
    pass

class DSAQuestion(DSAQuestionBase):
    id: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# SQL Material Schemas
class SQLMaterialBase(BaseModel):
    title: str
    category: str
    difficulty: str
    content: str
    examples: List[str]

class SQLMaterialCreate(SQLMaterialBase):
    pass

class SQLMaterial(SQLMaterialBase):
    id: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# OS Note Schemas
class OSNoteBase(BaseModel):
    title: str
    category: str
    content: str
    links: List[str]

class OSNoteCreate(OSNoteBase):
    pass

class OSNote(OSNoteBase):
    id: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Contact Form Schema
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    message: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
