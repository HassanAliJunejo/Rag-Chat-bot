#!/usr/bin/env python3
"""
RAG Chatbot - Documentation Ingestion Script

This script extracts text from the Docusaurus documentation files and ingests them into Qdrant.
"""

import os
import glob
import sys
from typing import List, Dict, Any
from qdrant_client import QdrantClient
from qdrant_client.http import models
from chunker import chunk_text
from ingest_to_qdrant import get_embedding, ingest_chunks_to_qdrant


def extract_and_chunk_docusaurus_docs(docs_dir: str = "./docs") -> List[Dict[str, Any]]:
    """
    Extracts text from Docusaurus Markdown files and chunks them for RAG.

    Args:
        docs_dir (str): Path to the Docusaurus docs directory

    Returns:
        List[Dict[str, Any]]: List of dictionaries containing doc_path, chunk_index, and text
    """
    # Find all Markdown files recursively in the docs directory
    md_files = glob.glob(os.path.join(docs_dir, "**", "*.md"), recursive=True)

    chunks = []

    # Process each Markdown file
    for file_path in md_files:
        print(f"Processing file: {file_path}")
        
        # Extract text content from the file
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()

        # Split text into 800-character chunks
        chunk_size = 800
        for i in range(0, len(text), chunk_size):
            chunk_text = text[i:i+chunk_size]

            # Create a dictionary for each chunk
            chunk_dict = {
                "doc_path": file_path,
                "chunk_index": i // chunk_size,  # Calculate index of the chunk
                "text": chunk_text
            }

            chunks.append(chunk_dict)

    return chunks


def main():
    """
    Main function to extract, chunk, and ingest Docusaurus documentation into Qdrant.
    """
    print("Starting Docusaurus documentation ingestion process...")
    
    # Check if docs directory exists
    if not os.path.exists("./docs"):
        print("Error: docs directory not found.")
        print("Please make sure you're running this script from the root of the Docusaurus project.")
        sys.exit(1)
    
    # Extract and chunk all Docusaurus documentation
    print("Extracting and chunking documentation...")
    chunks = extract_and_chunk_docusaurus_docs("./docs")

    print(f"Total number of chunks created: {len(chunks)}")

    # Print the first 2 chunks as a preview
    for i in range(min(2, len(chunks))):
        chunk = chunks[i]
        print(f"\nChunk {i+1}:")
        print(f"  doc_path: {chunk['doc_path']}")
        print(f"  chunk_index: {chunk['chunk_index']}")
        print(f"  text (first 200 chars): {chunk['text'][:200]}...")

    # Ingest chunks to Qdrant
    print("\nStarting ingestion to Qdrant...")
    try:
        ingest_chunks_to_qdrant(chunks, "docusaurus_docs", collection_name="docusaurus_rag_docs")
        print("Ingestion completed successfully!")
        print("\nYou can now run the chatbot using: python chatbot.py")
    except Exception as e:
        print(f"Ingestion failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()