<!--
Sync Impact Report:
Version change: N/A (initial version) → 1.0.0
Added principles: I. Spec-First Development, II. Accuracy and Grounded Responses, III. Clarity for Developers, IV. Reproducible Setups, V. Secure Handling of Secrets, VI. Modular Architecture
Added sections: Technology Standards, Development Workflow
Templates requiring updates: ✅ plan-template.md (Constitution Check section), ✅ spec-template.md (requirements alignment), ✅ tasks-template.md (task categorization)
Follow-up TODOs: None
-->
# RAG Chatbot Constitution

## Core Principles

### I. Spec-First Development (NON-NEGOTIABLE)
<!-- Example: I. Library-First -->
All development follows spec-first methodology using Spec-Kit Plus, with comprehensive documentation and planning before implementation begins.
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### II. Accuracy and Grounded Responses
<!-- Example: II. CLI Interface -->
All RAG chatbot responses must be retrieval-grounded from book content only, with strict prevention of hallucinations or fabricated information.
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### III. Clarity for Developers and AI Engineers
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Documentation, code examples, and explanations must maintain Grade 10-12 readability level with clear, runnable code examples that are thoroughly explained.
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### IV. Reproducible Setups and Deployments
<!-- Example: IV. Integration Testing -->
All environments, configurations, and deployments must be reproducible with clean, modular, documented code supporting consistent setups across platforms.
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### V. Secure Handling of Secrets and APIs
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
No hard-coded secrets allowed; all sensitive information must be handled securely through environment variables and proper authentication mechanisms.
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

### VI. Modular Architecture
All components must be modular, progressive, and independently deployable, following clean separation of concerns between book content, RAG backend, and frontend interfaces.

## Technology Standards
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

Docusaurus (Markdown/MDX) for book content, FastAPI backend for RAG services, OpenAI Agents for LLM interactions, Qdrant Cloud vector database, Neon Serverless Postgres for data storage, deployed on GitHub Pages.
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## Development Workflow
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

Use Claude Code and Spec-Kit Plus for all development tasks, maintain modular chapter structures with runnable examples, ensure retrieval-grounded responses with support for "answer from selected text only" functionality.
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This constitution supersedes all other development practices; all implementations must comply with spec-first methodology, accuracy requirements, and secure handling of secrets. Code reviews must verify compliance with all principles.
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: 1.0.0 | **Ratified**: 2025-12-16 | **Last Amended**: 2025-12-16
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
