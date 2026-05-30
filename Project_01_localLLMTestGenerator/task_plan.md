# Task Plan & Blueprint

## Project: Local LLM Test Generator

### Blueprint (Awaiting Approval)
**1. Overview**
A full-stack Web Application designed to generate functional and non-functional test cases (API & Web) in Jira format based on user-provided Jira requirements.

**2. Architecture & Tech Stack**
- **Frontend**: React with TypeScript.
- **Backend**: Node.js with TypeScript acting as an API gateway to various LLM providers.
- **LLM Integrations**: Support for Ollama API, LM Studio API, Groq API, OpenAI API, Claude API, and Gemini API.

**3. User Interface Design** (Based on `design/localLLMTestGen.png`)
- **Main View**:
  - Left Sidebar: Generation History.
  - Center Display: Generated Test Cases (Jira format).
  - Bottom Input: Chat/Prompt input for Jira requirements.
- **Settings View**:
  - Configuration fields for Ollama, Groq, OpenAI, Claude, LM Studio, and Gemini.
  - Actions: "Test Connection" and "Save" buttons.

**4. Project Constraints**
- Output must strictly adhere to Jira format.
- Generator must support both functional and non-functional test cases.
- Follow **Protocol 0**: No code until this Blueprint is approved.

---

## Phase 0: Initialization (Completed)
- [x] Create `task_plan.md`, `findings.md`, `progress.md`, `context.md`.

## Phase 1: Discovery & Blueprint (Current)
- [x] Ask Discovery Questions.
- [x] Receive answers from the user.
- [x] Create Blueprint in `task_plan.md`.
- [ ] Get Blueprint approval.

## Phase 2: Implementation (Pending Blueprint Approval)
- [ ] Initialize Node.js Backend with TypeScript.
- [ ] Initialize React Frontend with TypeScript.
- [ ] Implement Settings View & Configuration storage.
- [ ] Implement LLM Integration layers (Ollama, Groq, OpenAI, etc.).
- [ ] Implement Main Chat Interface & History.
- [ ] Implement Prompt Engineering for Jira-formatted output.

## Phase 3: Testing & Refinement
- [ ] End-to-end testing of test case generation.
- [ ] Verification of functional and non-functional outputs.
