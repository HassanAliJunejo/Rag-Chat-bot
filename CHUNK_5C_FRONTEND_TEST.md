# CHUNK 5C - Frontend Run and Quick Test Guide

This guide provides simple, beginner-friendly instructions for opening and testing the frontend of the RAG chatbot application.

## 1. Opening index.html in Browser

There are several ways to open the frontend in your browser:

### Method 1: Double-click the file
- Navigate to the folder containing your RAG chatbot files
- Find the `index.html` file
- Double-click on `index.html`
- Your default browser will open with the frontend

### Method 2: Right-click and open with specific browser
- Right-click on the `index.html` file
- Select "Open with"
- Choose Chrome, Firefox, or your preferred browser

### Method 3: Drag and drop into browser
- Open your browser (Chrome, Firefox, etc.)
- Open a new tab
- Drag the `index.html` file from your file explorer into the browser window

When opened, the URL in your browser will look like: `file:///path/to/index.html`

## 2. What to Check After Opening

### Status Indicator
- Look at the top of the page for a status indicator
- It should show "Online" in GREEN
- If it shows "Offline" in RED, something is wrong

### If Status Shows "Offline" in RED
This could mean:
- The backend server is not running
- Ollama is not running
- Port is blocked or unavailable

## 3. Send First Test Message

### Steps to Test:
1. Type "hi" in the input text box at the bottom of the chat interface
2. Either click the "Send" button OR press Enter on your keyboard
3. Wait 5-10 seconds for the bot to respond
4. The bot's response should appear in a purple box on the left side of the chat

## 4. Quick Troubleshooting

### A. If Status is "Offline":
- Check if Ollama is running: Open terminal/command prompt and run `ollama list`
  - You should see the `qwen2.5:3b` model in the list
- Check if FastAPI is running: In another terminal, run `curl localhost:8000/health`
  - You should get a response: `{"status": "online", "message": "Server is running"}`
- If either is not running, restart both services

### B. If Message Doesn't Send:
- Open browser developer tools by pressing F12
- Go to the "Console" tab
- Look for any red error messages
- If you see CORS errors, this indicates the frontend can't connect to the backend

### C. If Bot Doesn't Respond:
- Wait up to 30 seconds (the first response can be slow)
- Check your backend terminal for any error messages
- Verify that the `qwen2.5:3b` model is properly downloaded and running in Ollama

## 5. Success Indicators

When everything is working correctly, you will see:

✅ Status shows "Online" (green)
✅ Your message appears on the right side (blue)
✅ Bot response appears on the left side (purple)
✅ No errors in browser console (press F12 to check)

### Troubleshooting Tips:
- Make sure both the backend server (uvicorn) and Ollama service are running before testing
- If you're still having issues, try refreshing the browser page
- Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
- If problems persist, restart all services and try again

### Quick Restart Commands:
- To restart Ollama: `ollama serve`
- To restart the backend: `uvicorn api_server_fastapi.py:app --host 0.0.0.0 --port 8000 --reload`