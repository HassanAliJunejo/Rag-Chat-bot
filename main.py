#!/usr/bin/env python3
"""
RAG Chatbot for Docusaurus Book Content - Main Entry Point

This script orchestrates the entire RAG chatbot process:
1. Ingest Docusaurus documentation into Qdrant (if not already done)
2. Start the chatbot interface
"""

import os
import sys
import argparse
from qdrant_client import QdrantClient


def check_qdrant_collection(collection_name: str = "docusaurus_rag_docs") -> bool:
    """
    Check if the Qdrant collection exists and has content.

    Args:
        collection_name (str): Name of the Qdrant collection to check

    Returns:
        bool: True if collection exists and has points, False otherwise
    """
    try:
        client = QdrantClient(":memory:")
        collection_info = client.get_collection(collection_name)
        return collection_info.points_count > 0
    except Exception:
        # Collection doesn't exist or other error
        return False


def main():
    """
    Main function to run the RAG chatbot system.
    """
    parser = argparse.ArgumentParser(description='RAG Chatbot for Docusaurus Book Content')
    parser.add_argument('--ingest-only', action='store_true', 
                        help='Only ingest documentation, don\'t start chatbot')
    parser.add_argument('--chat-only', action='store_true', 
                        help='Start chatbot only (skip ingestion check)')
    parser.add_argument('--collection', type=str, default='docusaurus_rag_docs',
                        help='Qdrant collection name to use')
    
    args = parser.parse_args()

    # Check if OpenAI API key is set
    if not os.getenv("OPENAI_API_KEY"):
        print("Warning: OPENAI_API_KEY environment variable not set.")
        print("Please set your OpenAI API key as an environment variable:")
        print("  - On Windows: set OPENAI_API_KEY=your_actual_api_key_here")
        print("  - On Unix/Mac: export OPENAI_API_KEY=your_actual_api_key_here")
        print()

    if not args.chat_only:
        # Check if documentation has been ingested
        if not check_qdrant_collection(args.collection):
            print(f"Qdrant collection '{args.collection}' not found or empty.")
            print("Starting documentation ingestion process...")
            
            from ingest_docs import main as ingest_main
            try:
                ingest_main()
            except KeyboardInterrupt:
                print("\nIngestion interrupted by user.")
                sys.exit(1)
            except Exception as e:
                print(f"Error during ingestion: {e}")
                sys.exit(1)
        else:
            print(f"Found existing Qdrant collection '{args.collection}' with content.")
    
    # If only ingestion was requested, exit now
    if args.ingest_only:
        print("Documentation ingestion completed.")
        return

    # Start the chatbot
    print("\nStarting RAG Chatbot for Docusaurus Book Content...")
    print("Type 'quit' to exit the chatbot.\n")
    
    from chatbot import main as chat_main
    try:
        chat_main()
    except KeyboardInterrupt:
        print("\n\nChatbot interrupted by user.")
    except Exception as e:
        print(f"Error in chatbot: {e}")


if __name__ == "__main__":
    main()