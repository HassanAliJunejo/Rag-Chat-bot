---
id: 1
title: Update project constitution for RAG chatbot
stage: constitution
date: 2025-12-16
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: master
user: ASUS
command: /sp.constitution
labels: [constitution,rag-chatbot,spec-first]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 -
---
## Prompt

```text
/sp.constitution

Project: AI-Driven Technical Book with Embedded RAG Chatbot

Purpose:
Author a technical book using Claude Code and Spec-Kit Plus, publish it with Docusaurus on GitHub Pages, and embed a RAG chatbot that answers questions strictly from the book content.

Core Principles:
- Spec-first development (Spec-Kit Plus compliant)
- Accuracy and grounded responses (no hallucinations)
- Clarity for developers and AI engineers
- Reproducible setups and deployments
- Secure handling of secrets and APIs

Book Standards:
- Written in Docusaurus (Markdown/MDX)
- Modular, progressive chapters
- Runnable, explained code examples
- Readability: Grade 10–12

RAG Chatbot Standards:
- Backend: FastAPI
- LLM: OpenAI Agents / ChatKit SDKs
- Vector DB: Qdrant Cloud (Free Tier)
- Database: Neon Serverless Postgres
- Answers must be retrieval-grounded
- Support "answer from selected text only"

Technical Constraints:
- GitHub Pages deployment
- Clean, modular, documented code
- No hard-coded secrets

Success Cri
```

## Response snapshot

Updated the constitution template with project-specific values for the RAG chatbot project, including core principles, technology standards, and development workflow.

## Outcome

- ✅ Impact: Created project constitution with 6 core principles
- 🧪 Tests: No tests required for constitution
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: Continue with spec creation using /sp.specify
- 🧠 Reflection: Constitution properly captures all project principles and constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A