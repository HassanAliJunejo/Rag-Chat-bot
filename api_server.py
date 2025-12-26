#!/usr/bin/env python3
"""
RAG Chatbot API Server

This script creates a Flask API server for the RAG chatbot system.
"""

import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import chatbot_response


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    """
    Chat endpoint that accepts user queries and returns RAG-based responses.
    
    Expected JSON input:
    {
        "query": "User's question"
    }
    
    Returns JSON:
    {
        "response": "Response from the RAG system"
    }
    """
    try:
        # Log the incoming request
        logger.info(f"Incoming chat request: {request.json}")
        
        # Get the query from the request
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({"error": "Missing query in request body"}), 400

        user_query = data['query']
        
        # Validate query
        if not user_query.strip():
            return jsonify({"error": "Query cannot be empty"}), 400

        # Generate response using the RAG system
        response = chatbot_response(user_query)
        
        # Log the response
        logger.info(f"Generated response: {response}")
        
        return jsonify({"response": response})
    
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return jsonify({"status": "healthy"})


if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)