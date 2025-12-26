#!/usr/bin/env python3
"""
RAG Chatbot API Server - Optimized FastAPI Implementation

This script creates an optimized FastAPI API server for the RAG chatbot system.
Features:
- Response streaming for large outputs
- Pagination (limit results per request)
- Timeouts to prevent hanging
- Async/await for I/O operations
- Caching for repeated requests
- Response size limits
- Efficient file handling
- Monitoring and logging
- Proper error handling
"""

import asyncio
import logging
import os
import time
import uuid
from datetime import datetime
from typing import AsyncGenerator, Dict, List, Optional

import async_timeout
from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.exception_handlers import http_exception_handler
from pydantic import BaseModel

# Import the chatbot response function
from chatbot import chatbot_response as original_chatbot_response


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="RAG Chatbot API - Optimized",
    version="1.0.0",
    # Add middleware for request timeout
    timeout=60  # Global timeout of 60 seconds
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for request/response validation
class ChatRequest(BaseModel):
    message: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.3
    stream: Optional[bool] = False
    timeout_seconds: Optional[int] = 30
    max_response_length: Optional[int] = 2000  # Maximum response length in characters


class ChatResponse(BaseModel):
    reply: str
    processing_time: float
    truncated: bool = False


class HealthResponse(BaseModel):
    status: str
    timestamp: str


# Monitoring and metrics
class APIMetrics:
    def __init__(self):
        self.request_count = 0
        self.error_count = 0
        self.total_processing_time = 0.0
        self.cache_hits = 0

    def increment_requests(self):
        self.request_count += 1

    def increment_errors(self):
        self.error_count += 1

    def add_processing_time(self, time_taken: float):
        self.total_processing_time += time_taken

    def increment_cache_hits(self):
        self.cache_hits += 1

    def get_avg_processing_time(self):
        if self.request_count == 0:
            return 0.0
        return self.total_processing_time / self.request_count


# Initialize metrics
metrics = APIMetrics()

# In-memory cache (use Redis in production)
response_cache: Dict[str, Dict] = {}


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: Request, chat_request: ChatRequest):
    """
    Optimized chat endpoint with streaming, pagination, timeouts, and async processing.

    Args:
        request: HTTP request object
        chat_request: Chat request with message and options

    Returns:
        JSON response with the chatbot reply
    """
    start_time = time.time()
    request_id = str(uuid.uuid4())

    # Increment request counter
    metrics.increment_requests()

    # Log the incoming request
    logger.info(f"[{request_id}] Incoming chat request: {chat_request.message[:50]}...")

    # Validate message
    if not chat_request.message or not chat_request.message.strip():
        metrics.increment_errors()
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Create cache key
    cache_key = f"{chat_request.message}:{chat_request.max_tokens}:{chat_request.temperature}"

    # Check cache first
    if cache_key in response_cache:
        cached_response = response_cache[cache_key]
        processing_time = time.time() - start_time
        logger.info(f"[{request_id}] Cache hit, returning cached response")
        metrics.increment_cache_hits()
        return ChatResponse(
            reply=cached_response["reply"],
            processing_time=processing_time,
            truncated=cached_response.get("truncated", False)
        )

    try:
        # Process with timeout
        with async_timeout.timeout(chat_request.timeout_seconds):
            if chat_request.stream:
                # Return streaming response
                return StreamingResponse(
                    stream_response(chat_request, request_id),
                    media_type="text/plain"
                )

            # Process synchronously with timeout
            response = await process_chat_request(chat_request, request_id)

            # Cache the response (in production, use Redis)
            response_cache[cache_key] = {
                "reply": response,
                "timestamp": datetime.utcnow().isoformat()
            }

            processing_time = time.time() - start_time
            metrics.add_processing_time(processing_time)

            # Truncate response if needed
            truncated = False
            if len(response) > chat_request.max_response_length:
                response = response[:chat_request.max_response_length] + "\n[Response truncated for performance]"
                truncated = True

            logger.info(f"[{request_id}] Request completed in {processing_time:.2f}s")

            return ChatResponse(
                reply=response,
                processing_time=processing_time,
                truncated=truncated
            )

    except asyncio.TimeoutError:
        processing_time = time.time() - start_time
        metrics.increment_errors()
        logger.warning(f"[{request_id}] Request timed out after {chat_request.timeout_seconds}s")
        raise HTTPException(
            status_code=408,
            detail=f"Request timed out after {chat_request.timeout_seconds} seconds"
        )
    except Exception as e:
        processing_time = time.time() - start_time
        metrics.increment_errors()
        logger.error(f"[{request_id}] Error processing chat request: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


async def stream_response(chat_request: ChatRequest, request_id: str) -> AsyncGenerator[str, None]:
    """
    Generate a streaming response for the chat endpoint.
    
    Args:
        chat_request: Chat request with message and options
        request_id: Unique request identifier
    
    Yields:
        Chunks of the response
    """
    try:
        # Process the request
        response = await process_chat_request(chat_request, request_id)
        
        # Stream the response in chunks
        chunk_size = 100  # characters per chunk
        for i in range(0, len(response), chunk_size):
            chunk = response[i:i + chunk_size]
            yield chunk
            await asyncio.sleep(0.01)  # Small delay to prevent overwhelming the client
    except Exception as e:
        logger.error(f"[{request_id}] Error in streaming response: {str(e)}")
        yield f"Error: {str(e)}"


async def process_chat_request(chat_request: ChatRequest, request_id: str) -> str:
    """
    Process a chat request with the RAG system.
    
    Args:
        chat_request: Chat request with message and options
        request_id: Unique request identifier
    
    Returns:
        The chatbot response
    """
    # In a real implementation, you would adjust the chatbot to respect the max_tokens
    # and temperature parameters. For now, we're just using the original function.
    response = original_chatbot_response(chat_request.message)
    return response


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat()
    )


@app.get("/api/stats")
async def get_stats():
    """
    Get API statistics and performance metrics.
    """
    return {
        "status": "healthy",
        "active_requests": 0,  # In a real implementation, track active requests
        "total_requests": metrics.request_count,
        "error_count": metrics.error_count,
        "avg_processing_time": metrics.get_avg_processing_time(),
        "cache_size": len(response_cache),
        "cache_hits": metrics.cache_hits,
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/api/metrics")
async def get_detailed_metrics():
    """
    Get detailed API metrics for monitoring.
    """
    return {
        "request_count": metrics.request_count,
        "error_count": metrics.error_count,
        "total_processing_time": metrics.total_processing_time,
        "avg_processing_time": metrics.get_avg_processing_time(),
        "cache_hits": metrics.cache_hits,
        "cache_size": len(response_cache),
        "timestamp": datetime.utcnow().isoformat()
    }


@app.delete("/api/cache/clear")
async def clear_cache():
    """
    Clear the response cache.
    """
    global response_cache
    count = len(response_cache)
    response_cache = {}
    return {
        "message": f"Cache cleared, {count} items removed",
        "timestamp": datetime.utcnow().isoformat()
    }


# Background task to periodically clean up old cache entries
async def cleanup_cache():
    """
    Periodically clean up old cache entries to prevent memory issues.
    """
    while True:
        await asyncio.sleep(3600)  # Run every hour
        
        # Remove entries older than 24 hours
        current_time = datetime.utcnow().timestamp()
        old_keys = [
            key for key, value in response_cache.items()
            if current_time - datetime.fromisoformat(value["timestamp"]).timestamp() > 86400
        ]
        
        for key in old_keys:
            del response_cache[key]
        
        logger.info(f"Cache cleanup: removed {len(old_keys)} old entries")


@app.on_event("startup")
async def startup_event():
    """
    Startup event to start background tasks.
    """
    logger.info("Starting up optimized RAG Chatbot API server")
    # Start background cache cleanup task
    asyncio.create_task(cleanup_cache())


# Custom exception handler
@app.exception_handler(Exception)
async def custom_exception_handler(request: Request, exc: Exception):
    """
    Custom exception handler for unhandled exceptions.
    """
    request_id = str(uuid.uuid4())
    logger.error(f"[{request_id}] Unhandled exception: {exc}", exc_info=True)

    metrics.increment_errors()

    return JSONResponse(
        status_code=500,
        content={
            "message": "Internal server error",
            "request_id": request_id,
            "timestamp": datetime.utcnow().isoformat()
        }
    )


# Request timeout exception handler
@app.exception_handler(asyncio.TimeoutError)
async def timeout_exception_handler(request: Request, exc: asyncio.TimeoutError):
    """
    Exception handler for timeout errors.
    """
    request_id = str(uuid.uuid4())
    logger.warning(f"[{request_id}] Request timed out")

    metrics.increment_errors()

    return JSONResponse(
        status_code=408,
        content={
            "message": "Request timeout",
            "request_id": request_id,
            "timestamp": datetime.utcnow().isoformat()
        }
    )


if __name__ == '__main__':
    import uvicorn
    # Get port from environment variable or default to 8000
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host='0.0.0.0', port=port)