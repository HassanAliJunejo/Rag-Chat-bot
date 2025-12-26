#!/usr/bin/env python3
"""
RAG Chatbot - Qdrant Ingestion Script

This script takes pre-chunked text and safely stores it in Qdrant using embeddings.
It uses the chunk_text function from chunker.py and embeds chunks one at a time
with appropriate delays between API calls.
"""

import os
import time
import uuid
from typing import List, Dict, Any
import requests
import json
from qdrant_client import QdrantClient
from qdrant_client.http import models
from chunker import chunk_text  # Import the chunk_text function from chunker.py


def get_embedding(text: str, api_key: str, model: str = "text-embedding-ada-002") -> List[float]:
    """
    Get embedding for the given text using OpenAI API.
    
    Args:
        text (str): Text to embed
        api_key (str): OpenAI API key
        model (str): Embedding model to use
    
    Returns:
        List[float]: Embedding vector
    """
    url = "https://api.openai.com/v1/embeddings"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    data = {
        "input": text,
        "model": model
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        result = response.json()
        embedding = result['data'][0]['embedding']
        return embedding
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error occurred while getting embedding: {e}")
        print(f"Response: {response.text}")
        raise
    except KeyError as e:
        print(f"KeyError: Unexpected response structure - {e}")
        print(f"Response: {response.json()}")
        raise
    except Exception as e:
        print(f"Error getting embedding: {e}")
        raise


def ingest_chunks_to_qdrant(chunks: List[Dict[str, Any]], 
                           source_file: str, 
                           collection_name: str = "rag_docs",
                           delay_between_calls: float = 0.1):
    """
    Ingest pre-chunked text into Qdrant with embeddings.
    
    Args:
        chunks (List[Dict]): List of chunk dictionaries containing text
        source_file (str): Path to the source file for metadata
        collection_name (str): Name of the Qdrant collection
        delay_between_calls (float): Delay between API calls in seconds
    """
    # Initialize Qdrant client with in-memory storage
    client = QdrantClient(":memory:")
    
    # Get OpenAI API key from environment variable
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set. "
                         "Please set your OpenAI API key as an environment variable.")
    
    # Check if collection exists, if so delete it and recreate
    try:
        client.get_collection(collection_name)
        print(f"Collection '{collection_name}' exists, deleting and recreating...")
        client.delete_collection(collection_name)
    except Exception:
        print(f"Collection '{collection_name}' does not exist, creating new...")
    
    # Create a new collection
    # Note: The vector size should match the embedding model being used
    # text-embedding-ada-002 produces vectors of size 1536
    vector_size = 1536
    client.create_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=vector_size, distance=models.Distance.COSINE),
    )
    
    print(f"Created collection '{collection_name}' with vector size {vector_size}")
    
    # Prepare points for insertion
    points = []
    
    # Process each chunk
    for idx, chunk_data in enumerate(chunks):
        try:
            # Get the text content from chunk_data
            # It could be either a string or a dictionary with a 'text' key
            if isinstance(chunk_data, dict):
                text = chunk_data.get('text', '')
            else:
                text = str(chunk_data)
            
            # Skip empty chunks
            if not text.strip():
                print(f"Skipping empty chunk at index {idx}")
                continue
            
            # Get embedding for the chunk
            print(f"Getting embedding for chunk {idx + 1}/{len(chunks)}...")
            embedding = get_embedding(text, api_key)
            
            # Create a point for Qdrant
            point_id = str(uuid.uuid4())
            payload = {
                "source_file": source_file,
                "chunk_index": idx,
                "text": text
            }
            
            point = models.PointStruct(
                id=point_id,
                vector=embedding,
                payload=payload
            )
            
            points.append(point)
            
            # Print progress
            print(f"Processed chunk {idx + 1}/{len(chunks)}: {len(embedding)}-dimensional embedding created")
            
            # Add delay to prevent overwhelming the API
            time.sleep(delay_between_calls)
            
        except Exception as e:
            print(f"Error processing chunk {idx}: {e}")
            # Log the problematic chunk for debugging
            print(f"Problematic chunk content: {chunk_data}")
            continue
    
    # Insert all points to Qdrant
    if points:
        print(f"Inserting {len(points)} chunks to Qdrant collection '{collection_name}'...")
        try:
            client.upsert(collection_name=collection_name, points=points)
            print(f"Successfully inserted {len(points)} chunks into Qdrant")
        except Exception as e:
            print(f"Error inserting points to Qdrant: {e}")
            raise
    else:
        print("No valid chunks to insert into Qdrant")


def main():
    """
    Main function to run the ingestion process.
    """
    # Example usage - you would pass actual chunks to this function
    sample_text = """Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. Colloquially, the term "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving".

The scope of AI is disputed: as machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. A quip in Tesler's Theorem says "AI is whatever hasn't been done yet." For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology. Modern machine learning techniques are a core part of AI. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.

AI applications include advanced web search engines (i.e. Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri or Alexa), self-driving cars (i.e. Tesla), automated decision-making and competing at the highest level in strategic game systems (such as chess and Go). As machines become increasingly capable, mental facilities once thought to require intelligence are removed from the definition. The central problems of AI include philosophy of mind, knowledge representation, problem solving, planning, learning, reasoning, perception, motion, and social intelligence.

Problems for which no known algorithm can provide an exact or optimal solution in reasonable time are often addressed by AI methods focusing on finding approximate or suboptimal solutions. These methods remain tractable in the face of large-scale scenarios and high-dimensional input spaces, where classical algorithms fail. The fundamental commitment of AI is to the thesis that cognitive processes can be mechanized.

The various sub-fields of AI research are centered around particular goals and the use of particular tools. The traditional goals of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception, and support for robotics. General intelligence is among the field's long-term goals. Tools used by AI researchers include search and mathematical optimization, formal logic, artificial neural networks, and methods based on statistics, probability and economics. AI also draws upon computer science, psychology, linguistics, philosophy, neuroscience, and many other fields.

The field was founded on the assumption that human intelligence can be so precisely described that a machine can be made to simulate it."""
    
    # Chunk the sample text
    print("Chunking text...")
    chunks = [{"text": chunk, "index": i} for i, chunk in enumerate(chunk_text(sample_text))]
    print(f"Created {len(chunks)} chunks")
    
    # Ingest chunks to Qdrant
    try:
        ingest_chunks_to_qdrant(chunks, "sample_document.txt")
        print("Ingestion completed successfully!")
    except Exception as e:
        print(f"Ingestion failed: {e}")


if __name__ == "__main__":
    main()