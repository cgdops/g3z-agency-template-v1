# DEV - Orchestrator

## Purpose
This workflow acts as a multi-agent orchestrator that receives user commands via webhook, classifies their intent using an OpenAI model, and routes requests to specific sub-workflows such as website building, CRM updating, workflow listing, or documentation.

## Trigger
The workflow is triggered either by an incoming HTTP webhook call from:

- The public "Webhook" endpoint that serves a web-based user console.
- The "Orch Webhook" endpoint that accepts JSON chat input for automated processing.

## Process Flow
1. **Webhook (User Interface)**  
   An HTTP webhook receives a GET request and responds with an interactive web-based console for users to submit commands.

2. **Orch Webhook (Chat Input API)**  
   Another HTTP webhook receives user chat input in JSON format (`chatInput`) and triggers the orchestrator logic.

3. **Orchestrator Agent**  
   Uses an OpenAI GPT-4o-mini model to classify user input by extracting structured intent data (e.g., intent type, client name, industry, workflow ID).

4. **Structured Output Parser**  
   Parses the JSON output from the language model to obtain structured fields.

5. **Edit Fields**  
   Sets extracted data fields (`intent`, `client`, `industry`, `workflowId`) for downstream routing.

6. **Switch Node**  
   Routes workflow execution based on the `intent` extracted:  
   - `website_build` → Calls **Website Builder Agent** workflow.  
   - `crm_update` → (Not explicitly routed in this workflow; can be extended).  
   - `list_workflows` → Calls **List Workflows** workflow.  
   - `document_workflow` → Calls **System - Scribe** workflow.

7. **Sub-Workflows Execution**  
   Invokes the corresponding workflows based on the user's intent to fulfill the requested operation.

8. **Respond to Webhook**  
   Returns HTML content for the web interface or JSON responses for API calls, delivering results or messages back to the user.

## Key Integrations
- **OpenAI API** (GPT-4o-mini model) for natural language understanding and intent classification.  
- **n8n Webhook** nodes for receiving user commands via HTTP.  
- **n8n Sub-Workflows** invoked for specific tasks like website building, workflow listing, and documentation.  
- **Frontend UI** served via webhook for user interaction, styled with Pico.css and markdown rendering with marked.js.

## Data Output
- For UI webhook requests, a dynamic HTML console is rendered, allowing users to enter commands and receive formatted responses interactively.  
- For chat input webhook requests, JSON responses containing the orchestrator's interpretation and results of invoked sub-workflows are returned to the caller.  
- Ultimately, the system produces specific workflow executions or documentation outputs corresponding to classified user intents, enabling automated multitasking orchestration.