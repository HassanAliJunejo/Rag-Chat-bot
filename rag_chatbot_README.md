# RAG Chatbot for Docusaurus Book Content

This project implements a Retrieval-Augmented Generation (RAG) chatbot that allows users to ask questions about book content hosted in a Docusaurus documentation site. The chatbot answers ONLY from retrieved chunks of the documentation, and responds with "Not found in the book." when the answer is not available in the indexed content.

## Features

- Query the Docusaurus book content using natural language
- Answers based only on retrieved documentation chunks
- Falls back to "Not found in the book." when content is not available
- Ingests Docusaurus Markdown files automatically
- Uses Qdrant for vector storage and retrieval
- Integrates with OpenAI embeddings API

## Prerequisites

1. **Python 3.8+**
2. **OpenAI API Key**: You need an OpenAI API key to generate embeddings
3. **Docusaurus Documentation**: The book content should be in the `docs/` directory in Markdown format

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your OpenAI API key:**
   ```bash
   # On Windows
   set OPENAI_API_KEY=your_actual_api_key_here
   
   # On Unix/Mac
   export OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Ensure your Docusaurus documentation is in the `docs/` directory**

## Usage

### Run the Complete Pipeline (Recommended)

Run both ingestion and chatbot in one command:

```bash
python main.py
```

This will:
1. Check if documentation has been ingested into Qdrant
2. If not, automatically ingest the Docusaurus documentation
3. Start the chatbot interface

### Run Ingestion Only

To only ingest the documentation without starting the chatbot:

```bash
python main.py --ingest-only
```

### Run Chatbot Only

To start the chatbot without checking/running ingestion:

```bash
python main.py --chat-only
```

### Custom Collection Name

To use a custom Qdrant collection name:

```bash
python main.py --collection my_custom_collection
```

## How It Works

1. **Ingestion Process:**
   - The system scans all Markdown files in the `docs/` directory
   - Text is chunked into 800-character segments
   - Each chunk is embedded using OpenAI's embedding API
   - Embeddings are stored in Qdrant vector database

2. **Query Process:**
   - User question is embedded using the same API
   - Vector similarity search finds the most relevant chunks
   - The most relevant chunk is returned as the answer
   - If no relevant chunks are found, returns "Not found in the book."

## Architecture

- `main.py`: Main entry point that orchestrates the entire process
- `chatbot.py`: Implements the chat interface and RAG logic
- `ingest_docs.py`: Extracts and ingests Docusaurus documentation
- `ingest_to_qdrant.py`: Handles vector ingestion to Qdrant
- `chunker.py`: Text chunking utilities
- `test_embedding.py`: Utility to test embedding API connection

## Customization

You can customize the behavior by modifying:
- Chunk size in `chunker.py` (default: 800 characters)
- Number of results retrieved in `chatbot.py`
- Delay between API calls in `ingest_to_qdrant.py`

## Troubleshooting

- **API Key Issues**: Ensure your OpenAI API key is correctly set in the environment
- **Documentation Not Found**: Verify that your Docusaurus docs are in the `docs/` directory
- **Memory Issues**: The system uses in-memory Qdrant storage; for large documentation sets, consider using persistent storage

## License

[Specify your license here]