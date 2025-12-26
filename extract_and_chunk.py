import os
import glob


def extract_and_chunk_docs(docs_dir="../docs"):
    """
    Extracts text from Markdown files in docs directory and chunks them into 800-character pieces.
    
    Args:
        docs_dir (str): Path to the docs directory (default: "../docs")
        
    Returns:
        list: List of dictionaries containing doc_path, chunk_index, and text
    """
    # Find all Markdown files recursively in the docs directory
    md_files = glob.glob(os.path.join(docs_dir, "**", "*.md"), recursive=True)
    
    chunks = []
    
    # Process each Markdown file
    for file_path in md_files:
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
    # Extract and chunk all Markdown files
    chunks = extract_and_chunk_docs("../docs")
    
    # Print total number of chunks created
    print(f"Total number of chunks created: {len(chunks)}")
    
    # Print the first 2 chunks with their doc_path and first 200 characters of text
    for i in range(min(2, len(chunks))):
        chunk = chunks[i]
        print(f"\nChunk {i+1}:")
        print(f"  doc_path: {chunk['doc_path']}")
        print(f"  text (first 200 chars): {chunk['text'][:200]}...")
        

if __name__ == "__main__":
    main()