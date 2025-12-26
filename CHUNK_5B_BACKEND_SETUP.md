# CHUNK 5B - Python Backend Setup Instructions

This guide provides step-by-step instructions for setting up the Python backend for the RAG chatbot application.

## 1. Install Python Dependencies

Run the following command to install the required Python packages:

```bash
pip install fastapi uvicorn[standard] requests pydantic
```

This command will install:
- `fastapi`: Modern, fast web framework for building APIs with Python
- `uvicorn[standard]`: ASGI server for running FastAPI applications
- `requests`: HTTP library for making API requests
- `pydantic`: Data validation library used by FastAPI

## 2. Verify QWEN.md File

Check if the QWEN.md file exists in your current directory:

```bash
dir QWEN.md
```

Expected output should show the file exists in the current directory.

## 3. Run FastAPI Server

Start the FastAPI server with the following command:

```bash
uvicorn api_server_fastapi.py:app --host 0.0.0.0 --port 8000 --reload
```

This command will:
- Run the application defined in `api_server_fastapi.py`
- Bind to all available network interfaces (0.0.0.0)
- Listen on port 8000
- Enable auto-reload functionality (restarts server on code changes)

## 4. Test if Server is Running

### Using curl command:
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "online", "message": "Server is running"}
```

### Using browser:
Navigate to: `http://localhost:8000/health`

You should see the same JSON response in your browser.

## 5. Quick Checks

### View Server Logs
When the server is running, logs will be displayed in the terminal where you started the uvicorn server. Look for messages like:
- `INFO:     Uvicorn running on http://0.0.0.0:8000`
- Information about incoming requests
- Any error messages if they occur

### Stop Server
Press `Ctrl+C` in the terminal where the server is running to stop it gracefully.

### Check if Port 8000 is in Use
If you encounter an error about port 8000 already being in use, run this command to see what's using the port:

```bash
netstat -ano | findstr :8000
```

To kill a process using port 8000 (replace PID with the actual Process ID from the netstat output):
```bash
taskkill /PID <PID> /F
```