Phase 1: Plan & Branch (Git)

Goal: Create a workspace for this feature so we don't pollute the main history.

Open your Terminal (or VS Code connected to your repo).

Create a Feature Branch:

Bash

git checkout -b feature/list-workflows


Create the Spec File: Create a file named docs/specs/001-list-workflows.md and paste this plan. This ensures you know exactly what you are building before dragging nodes.

Markdown

# Feature Spec: Workflow Listing
**Objective:** Allow the user to query the Orchestrator for a list of available capabilities.

**User Story:**
> As an Agency Owner, I want to ask "What can you do?" or "List workflows" so that I can see the IDs required for the Documentation Scribe.

**Technical Implementation:**
1. Update AI Intent to recognize `list_workflows`.
2. Add n8n API Call: `GET /workflows`.
3. Format output to: `[ID] Name`.


Commit the Plan:

Bash

git add .
git commit -m "chore: added spec for list-workflows feature"