import os
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.routes import dsa, sql, os as os_routes, contact, aiml

load_dotenv()

app = FastAPI(
    title="PrepNexus API",
    description="API for PrepNexus - Your Smart Placement Companion (No Database Required)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dsa.router)
app.include_router(sql.router)
app.include_router(os_routes.router)
app.include_router(contact.router)
app.include_router(aiml.router)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    content: str

@app.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")
    body = {
        "model": "llama3-70b-groq",
        "messages": [
            {
                "role": "system",
                "content": "You are Learnova Assistant. Help learners understand technical concepts and generate optimized, well-commented code examples in Python, C++, or Java. Format code using Markdown fences with the correct language tag and keep explanations concise."
            },
            {
                "role": "user",
                "content": payload.message
            }
        ],
        "temperature": 0.2,
        "max_tokens": 2048
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                json=body,
                headers=headers
            )
        response.raise_for_status()
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=error.response.status_code, detail=error.response.text)
    except httpx.HTTPError as error:
        raise HTTPException(status_code=502, detail=str(error))
    data = response.json()
    choices = data.get("choices")
    if not choices:
        raise HTTPException(status_code=502, detail="Groq API returned no choices")
    content = choices[0].get("message", {}).get("content")
    if not content:
        raise HTTPException(status_code=502, detail="Groq API returned empty content")
    return ChatResponse(content=content.strip())

@app.get("/")
async def root():
    return {
        "message": "PrepNexus API is running!",
        "note": "No database required - using static data",
        "endpoints": {
            "dsa": "/api/dsa/",
            "sql": "/api/sql/",
            "os": "/api/os/",
            "aiml": "/api/aiml/",
            "contact": "/api/contact/",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "not_required"}
