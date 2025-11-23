# Feature Spec: Workflow Listing
**Objective:** Allow the user to query the Orchestrator for a list of available capabilities.

**User Story:**
> As an Agency Owner, I want to ask "What can you do?" or "List workflows" so that I can see the IDs required for the Documentation Scribe.

**Technical Implementation:**
1. Update AI Intent to recognize `list_workflows`.
2. Add n8n API Call: `GET /workflows`.
3. Format output to: `[ID] Name`.