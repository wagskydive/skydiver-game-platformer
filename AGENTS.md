# AGENTS.md

## 🧠 Codex AI Development Agents – Skydiver Platformer Project

This document defines the roles and scopes of Codex agents in our game development process. Each agent assists with a specific part of the project.

---

## 🔄 Agent Reporting & Task Check-off

Each Codex Agent is responsible for marking their assigned tasks as complete once implemented. This should be done in `CODING_PROMPTS.md` using:

- [x] Task complete  
- [ ] Task incomplete

Agents should:
1. Check off completed items in `CODING_PROMPTS.md`
2. Add a brief comment with the filename or function where it was implemented
3. Include `// Completed: [task-id]` in code where applicable

---

## 🤖 Autonomous Execution

Agents must:
- Read `CODING_PROMPTS.md`
- Identify the **first unchecked task**
- Complete it in full
- Check it off
- Comment the work with `// Completed: [task-id]`
- Log which file was updated and what changed

---

## 📋 Agents Overview

### GameLogicAgent
Implements all gameplay behavior and scene flow.

### AssetManagerAgent
Handles asset loading, registration, and animation.

### TestAgent
Creates test cases, debug overlays, and visual validators.

### LevelDesignerAgent
Generates tilemaps, object placements, and parallax setups.

### DocsAgent
Maintains all documentation, usage guides, and changelogs.

---

## ✅ Agent Access Matrix

| Agent               | Can Edit Code | Can Read Assets | Can Write Docs |
|--------------------|----------------|------------------|----------------|
| GameLogicAgent      | ✅             | ✅               | ✅             |
| AssetManagerAgent   | ✅             | ✅               | ✅             |
| TestAgent           | ✅             | ✅               | ✅             |
| LevelDesignerAgent  | ✅             | ✅               | ✅             |
| DocsAgent           | ❌             | ✅               | ✅             |
