def chunk_text(text: str, chunk_size: int = 800) -> list[str]:
    """
    Split the input text into fixed-size character chunks.

    Args:
        text (str): The input text to be chunked
        chunk_size (int): The size of each chunk in characters (default: 800)

    Returns:
        list[str]: A list of text chunks
    """
    # Handle edge cases: None or empty text
    if not text:
        return []

    # Create chunks of specified size using list comprehension
    chunks = []
    for i in range(0, len(text), chunk_size):
        # Extract a chunk of size chunk_size starting at position i
        chunk = text[i:i + chunk_size]
        chunks.append(chunk)

    return chunks


if __name__ == "__main__":
    # Sample long text for testing
    sample_text = """Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. Colloquially, the term "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving".

The scope of AI is disputed: as machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. A quip in Tesler's Theorem says "AI is whatever hasn't been done yet." For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology. Modern machine learning techniques are a core part of AI. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.

AI applications include advanced web search engines (i.e. Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri or Alexa), self-driving cars (i.e. Tesla), automated decision-making and competing at the highest level in strategic game systems (such as chess and Go). As machines become increasingly capable, mental facilities once thought to require intelligence are removed from the definition. The central problems of AI include philosophy of mind, knowledge representation, problem solving, planning, learning, reasoning, perception, motion, and social intelligence.

Problems for which no known algorithm can provide an exact or optimal solution in reasonable time are often addressed by AI methods focusing on finding approximate or suboptimal solutions. These methods remain tractable in the face of large-scale scenarios and high-dimensional input spaces, where classical algorithms fail. The fundamental commitment of AI is to the thesis that cognitive processes can be mechanized.

The various sub-fields of AI research are centered around particular goals and the use of particular tools. The traditional goals of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception, and support for robotics. General intelligence is among the field's long-term goals. Tools used by AI researchers include search and mathematical optimization, formal logic, artificial neural networks, and methods based on statistics, probability and economics. AI also draws upon computer science, psychology, linguistics, philosophy, neuroscience, and many other fields.

The field was founded on the assumption that human intelligence can be so precisely described that a machine can be made to simulate it."""
    
    # Test the chunk_text function
    chunks = chunk_text(sample_text, chunk_size=800)
    
    # Print the total number of chunks created
    print(f"Total number of chunks created: {len(chunks)}")
    
    # Print the first 200 characters of the first chunk for preview
    if chunks:
        preview_length = min(200, len(chunks[0]))
        print(f"First {preview_length} characters of the first chunk:")
        print(chunks[0][:preview_length])
    else:
        print("No chunks were created.")