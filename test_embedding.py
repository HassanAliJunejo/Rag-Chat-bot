import os
import json
import urllib.request
import urllib.error

def test_embedding():
    # Define the text to embed
    text_to_embed = "Physical AI connects digital intelligence with robots."

    # Get the API key from environment variable
    # If you have an API key, set it in an environment variable called OPENAI_API_KEY
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # For testing purposes only - add your API key here if needed
        # Remember to remove it after testing for security
        api_key = ""  # Leave empty or add your key temporarily

        if not api_key:
            print("Error: OPENAI_API_KEY environment variable not set.")
            print("Please set your OpenAI API key as an environment variable:")
            print("  - On Windows: set OPENAI_API_KEY=your_actual_api_key_here")
            print("  - On Unix/Mac: export OPENAI_API_KEY=your_actual_api_key_here")
            return
    
    # Prepare the API request
    url = "https://api.openai.com/v1/embeddings"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    data = {
        "input": text_to_embed,
        "model": "text-embedding-ada-002"
    }
    
    # Make the API request
    try:
        req = urllib.request.Request(
            url=url,
            data=json.dumps(data).encode('utf-8'),
            headers=headers,
            method="POST"
        )
        
        with urllib.request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            
        # Extract the embedding
        embedding = response_data['data'][0]['embedding']
        
        # Print the results
        print(f"Embedding vector length: {len(embedding)}")
        print(f"First 5 values of the embedding: {embedding[:5]}")
        
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        if e.code == 401:
            print("Error: Invalid API key or unauthorized access.")
        elif e.code == 429:
            print("Error: Rate limit exceeded. Please try again later.")
        elif e.code == 500:
            print("Error: Internal server error. Please try again later.")
        else:
            print(f"Error: {e.read().decode('utf-8')}")
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")
    except KeyError as e:
        print(f"KeyError: Unexpected response structure - {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    test_embedding()