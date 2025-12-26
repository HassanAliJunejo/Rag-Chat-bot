#!/usr/bin/env python3
"""
RAG Chatbot API Server - FastAPI Implementation

This script creates a FastAPI API server for the RAG chatbot system.
"""

import os
import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from groq import Groq


class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    status: str


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Load QWEN.md file
def load_context():
    try:
        with open("QWEN.md", "r", encoding="utf-8") as f:
            return f.read()[:5000]  # First 5000 chars
    except FileNotFoundError:
        return "Context file not found"

CONTEXT = load_context()

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

app = FastAPI(title="Robotics Assistant API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production mein specific domain do
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Groq API call
        prompt = f"""Context: {CONTEXT[:1000]}

User Question: {request.message}

Provide helpful response about ROS 2, humanoid robotics, or AI agents."""

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant specializing in ROS 2, humanoid robotics, and AI agents. Provide accurate and helpful responses based on the context provided."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama-3.3-70b-versatile",
        )

        result = chat_completion.choices[0].message.content
        return ChatResponse(response=result, status="success")

    except Exception as e:
        return ChatResponse(
            response=f"Error: {str(e)}",
            status="error"
        )


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "online", "message": "Server is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)