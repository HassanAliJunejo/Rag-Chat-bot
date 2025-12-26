#!/usr/bin/env python3
"""
Efficient File Handler - Lazy Loading and Chunk Processing

This module provides efficient file handling capabilities with:
- Lazy loading of large files
- Chunk processing to manage memory usage
- File size checks before processing
- Asynchronous file operations
"""

import asyncio
import os
from typing import AsyncGenerator, Generator, List, Optional
from pathlib import Path


class FileProcessor:
    """
    A class to handle efficient file processing with lazy loading and chunk processing.
    """
    
    def __init__(self, file_path: str):
        """
        Initialize the FileProcessor with a file path.
        
        Args:
            file_path (str): Path to the file to process
        """
        self.file_path = Path(file_path)
        
    def get_file_size(self) -> int:
        """
        Get the size of the file in bytes.
        
        Returns:
            int: Size of the file in bytes
        """
        if not self.file_path.exists():
            raise FileNotFoundError(f"File does not exist: {self.file_path}")
        
        return self.file_path.stat().st_size
    
    def is_file_too_large(self, max_size_mb: int = 100) -> bool:
        """
        Check if the file is larger than the specified size limit.
        
        Args:
            max_size_mb (int): Maximum file size in MB
            
        Returns:
            bool: True if file is too large, False otherwise
        """
        file_size_bytes = self.get_file_size()
        max_size_bytes = max_size_mb * 1024 * 1024
        return file_size_bytes > max_size_bytes
    
    def read_in_chunks(self, chunk_size: int = 8192) -> Generator[str, None, None]:
        """
        Read the file in chunks to manage memory usage.
        
        Args:
            chunk_size (int): Size of each chunk to read in bytes
            
        Yields:
            str: Chunks of the file content
        """
        with open(self.file_path, 'r', encoding='utf-8', errors='ignore') as file:
            while True:
                chunk = file.read(chunk_size)
                if not chunk:
                    break
                yield chunk
    
    async def read_in_chunks_async(self, chunk_size: int = 8192) -> AsyncGenerator[str, None]:
        """
        Asynchronously read the file in chunks to manage memory usage.
        
        Args:
            chunk_size (int): Size of each chunk to read in bytes
            
        Yields:
            str: Chunks of the file content
        """
        loop = asyncio.get_event_loop()
        
        with open(self.file_path, 'r', encoding='utf-8', errors='ignore') as file:
            while True:
                # Run the file read operation in a thread pool to avoid blocking
                chunk = await loop.run_in_executor(None, file.read, chunk_size)
                if not chunk:
                    break
                yield chunk
    
    def read_lines_lazy(self) -> Generator[str, None, None]:
        """
        Lazily read lines from the file one at a time.
        
        Yields:
            str: Lines from the file
        """
        with open(self.file_path, 'r', encoding='utf-8', errors='ignore') as file:
            for line in file:
                yield line
    
    def process_as_chunks(self, 
                         chunk_size: int = 1024, 
                         overlap: int = 100) -> List[str]:
        """
        Process the file as overlapping chunks.
        
        Args:
            chunk_size (int): Size of each chunk in characters
            overlap (int): Number of overlapping characters between chunks
            
        Returns:
            List[str]: List of text chunks
        """
        chunks = []
        current_chunk = ""
        
        for chunk in self.read_in_chunks(chunk_size=chunk_size):
            current_chunk += chunk
            
            # If the current chunk is larger than the desired size, create a new chunk
            while len(current_chunk) >= chunk_size:
                # Take a chunk of the desired size
                text_chunk = current_chunk[:chunk_size]
                chunks.append(text_chunk)
                
                # Move the current chunk forward, with overlap
                current_chunk = current_chunk[chunk_size - overlap:]
        
        # Add the remaining chunk if it has content
        if current_chunk.strip():
            chunks.append(current_chunk)
        
        return chunks
    
    def read_file_with_size_check(self, max_size_mb: int = 100) -> Optional[str]:
        """
        Read the entire file after checking its size.
        
        Args:
            max_size_mb (int): Maximum file size in MB
            
        Returns:
            Optional[str]: File content if not too large, None otherwise
        """
        if self.is_file_too_large(max_size_mb):
            print(f"File {self.file_path} is too large ({self.get_file_size() / (1024*1024):.2f} MB > {max_size_mb} MB)")
            return None
        
        with open(self.file_path, 'r', encoding='utf-8', errors='ignore') as file:
            return file.read()


# Example usage functions
async def process_qwen_file(file_path: str = "QWEN.md", 
                           chunk_size: int = 2000, 
                           overlap: int = 200) -> List[str]:
    """
    Process the QWEN.md file efficiently with chunking.
    
    Args:
        file_path (str): Path to the QWEN.md file
        chunk_size (int): Size of each chunk in characters
        overlap (int): Number of overlapping characters between chunks
        
    Returns:
        List[str]: List of text chunks from the file
    """
    processor = FileProcessor(file_path)
    
    # Check file size first
    file_size_mb = processor.get_file_size() / (1024 * 1024)
    print(f"Processing file: {file_path} ({file_size_mb:.2f} MB)")
    
    if processor.is_file_too_large(max_size_mb=50):  # 50 MB limit
        print("File is too large, processing in chunks...")
        return processor.process_as_chunks(chunk_size=chunk_size, overlap=overlap)
    else:
        # For smaller files, read directly
        content = processor.read_file_with_size_check(max_size_mb=50)
        if content:
            # Split into chunks if needed
            chunks = []
            for i in range(0, len(content), chunk_size - overlap):
                chunk = content[i:i + chunk_size]
                if chunk.strip():  # Only add non-empty chunks
                    chunks.append(chunk)
            return chunks
        else:
            return []


def main():
    """
    Main function to demonstrate file processing capabilities.
    """
    file_path = "QWEN.md"  # Default file to process
    
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist. Creating a sample file for demonstration...")
        
        # Create a sample large file for testing
        with open(file_path, 'w', encoding='utf-8') as f:
            sample_content = """Sample content for QWEN.md
This is a sample file to demonstrate the file processing capabilities.
The RAG Chatbot API Server - Optimized FastAPI Implementation includes:
- Response streaming for large outputs
- Pagination (limit results per request)
- Timeouts to prevent hanging
- Async/await for I/O operations
- Caching for repeated requests
- Response size limits
- Efficient file handling
- Monitoring and logging
- Proper error handling

""" * 1000  # Repeat to create a larger file
            f.write(sample_content)
    
    # Process the file
    import asyncio
    chunks = asyncio.run(process_qwen_file(file_path))
    
    print(f"File processed into {len(chunks)} chunks")
    print(f"First chunk preview: {chunks[0][:100]}...")
    print(f"Last chunk preview: {chunks[-1][:100]}...")


if __name__ == "__main__":
    main()