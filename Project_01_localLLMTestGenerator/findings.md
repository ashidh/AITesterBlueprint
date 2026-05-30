# Findings

This document tracks research, discoveries, and constraints.

## Research & Discoveries
- **Goal**: Generate functional and non-functional test cases (API and Web app) from user-provided Jira requirements.
- **Input**: User pastes Jira requirements directly into a chat-like interface.
- **Providers**: The application needs to integrate with Ollama API, LM Studio API, Groq API, OpenAI, Claude API, and Gemini API.
- **Tech Stack**: Full-stack TypeScript (Node.js Backend + React Frontend).
- **Design Specifications**: Based on `design/localLLMTestGen.png`, the UI will feature:
  - A main view with a History sidebar, a central output area for test cases, and a bottom input for requirements.
  - A Settings window to configure API keys/URLs for the various providers, along with "Save" and "Test Connection" buttons.

## Constraints
- **Protocol 0 Enforced**: No scripts or code can be written until Discovery Questions are answered and the task_plan.md has an approved Blueprint.
- **Output Format**: All generated test cases must strictly follow a Jira-compatible format.
