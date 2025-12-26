# CHUNK 5A - Ollama Installation Guide

## For Linux/Mac

### 1. Install Ollama using curl command

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Download qwen2.5:3b model

```bash
ollama pull qwen2.5:3b
```

### 3. Start Ollama service

```bash
ollama serve
```

Note: You can run this in the background with:
```bash
# Linux
nohup ollama serve &

# Mac
ollama serve &
```

### 4. Test if Ollama is running with simple command

```bash
ollama run qwen2.5:3b
```

Then type a simple prompt like:
```
Hello, how are you?
```

Press Ctrl+D to exit the interactive mode.

## For Windows

### 1. Download link for Ollama installer

Download the installer from: https://ollama.ai/download/OllamaSetup.exe

### 2. Installation steps

1. Run the downloaded `OllamaSetup.exe` as administrator
2. Follow the installation wizard
3. Once installed, Ollama should start automatically
4. Check the system tray for the Ollama icon to confirm it's running

### 3. Download qwen2.5:3b model command

Open Command Prompt or PowerShell and run:
```cmd
ollama pull qwen2.5:3b
```

### 4. Verify it's running

```cmd
ollama run qwen2.5:3b
```

Then type a simple prompt like:
```
Hello, how are you?
```

Press Ctrl+Z then Enter to exit the interactive mode.

## Common Commands for Both Platforms

### Check Ollama version
```bash
ollama -v
```

### List installed models
```bash
ollama list
```

### Test model with simple prompt
```bash
ollama run qwen2.5:3b "What is the capital of France?"
```

Or for a more interactive session:
```bash
ollama run qwen2.5:3b
```
Then type your prompts and use the appropriate exit command (Ctrl+D on Linux/Mac, Ctrl+Z then Enter on Windows).