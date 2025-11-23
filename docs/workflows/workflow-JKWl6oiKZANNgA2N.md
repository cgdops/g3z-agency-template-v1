# PROD - Orchestrator

## Purpose
An AI-driven orchestrator that interprets user commands via a chat interface and triggers appropriate automated workflows such as website building, CRM updates, workflow listing, or workflow documentation.

## Trigger
This workflow is initiated by incoming HTTP requests to one of two webhooks:
- A public "Webhook" serving the chat UI (HTML interface)
- An internal "Orch Webhook" endpoint receiving commands from the chat client as JSON payloads

## Process Flow
1. **User Interface (Webhook node)**: Serves a stylized web-based chat console where users enter commands. It responds with a dark-themed HTML page that includes an interactive chat frontend using JavaScript.
   
2. **Chat Client Submission**: The frontend captures user input, sends it as JSON (`chatInput`) to the internal "Orch Webhook" via POST.

3. **Orchestrator Agent (LangChain Agent node)**: Receives the user command JSON, uses a configured OpenAI GPT-4o-mini model to classify the intent, client name, and industry from the user's input into structured JSON output.

4. **Structured Output Parsing**: Parses the AI model’s JSON classification to extract the intent and parameters.

5. **Edit Fields Node**: Maps parsed fields (`intent`, `client`, `industry`) into accessible workflow variables.

6. **Switch Node**: Routes the workflow based on the detected `intent`:
   - `"website_build"` → Calls the "Website Builder Agent" workflow.
   - `"crm_update"` → (Placeholder, no connected downstream workflow).
   - `"list_workflows"` → Calls the "List Workflows" workflow.
   - `"document_workflow"` → (Placeholder, no connected downstream workflow).

7. **Execute Workflow Nodes**: Trigger external workflows by workflow IDs based on the intent:
   - Website Builder Agent
   - List Workflows Agent
   
8. **Respond to Webhook Node**: For the public webhook UI, return the rendered HTML page for user interaction.

## Key Integrations
- OpenAI GPT-4o-mini via n8n LangChain nodes for natural language understanding and intent classification.
- n8n multi-workflow execution to dynamically call specialized agent workflows.
- Custom web-based chat interface delivered through a webhook response.

## Data Output
The final result is an orchestrated action depending on user intent:
- Automated invocation of specific workflows (such as building a website for a client or listing workflows).
- Real-time chat responses delivered back to the user via the web UI.
- Structured intent and client data parsed from natural language input to drive workflow routing.