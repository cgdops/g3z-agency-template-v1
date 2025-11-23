# Event Tabs Form Fill (12 hours)

## Purpose
Automates the process of importing product data from a Google Sheet and submitting it to EventTabs' event management system for event ID 51.

## Trigger
Manual trigger when the user clicks 'Execute workflow' in n8n.

## Process Flow
1. Triggered manually by user execution.
2. Retrieve rows from a specified Google Sheets document ("RLDC 2026", Sheet1).
3. Send an HTTP GET request to EventTabs to fetch existing product admin page content, authenticated via cookie.
4. Extract the `authenticity_token` from HTML content for form submission purposes.
5. Perform an HTTP POST request to EventTabs using the authenticity token and form data from the spreadsheet row to create or update a product for event 51.

## Key Integrations
- Google Sheets (to obtain product data)
- EventTabs (via HTTP requests using authenticated cookies)
- HTML extraction (to retrieve CSRF token)

## Data Output
New or updated product entries are posted to the EventTabs event admin interface for event ID 51 based on the spreadsheet data.


# System - Scribe

## Purpose
Automates documentation generation for n8n workflows by taking workflow JSON data and producing Markdown documentation files on GitHub.

## Trigger
HTTP POST webhook at path `/scribe`.

## Process Flow
1. Receive POST request containing workflow JSON via webhook.
2. Fetch detailed workflow JSON data from the n8n API using the provided workflow ID.
3. Use an OpenAI GPT chat model configured as a Senior Technical Writer to analyze the workflow JSON.
4. Generate professional Markdown documentation describing the workflow.
5. Create or update a Markdown file in a GitHub repository with the generated documentation.

## Key Integrations
- n8n API (to fetch workflow details)
- OpenAI GPT (for technical writing)
- GitHub API (to store generated Markdown documentation)

## Data Output
Markdown documentation files for workflows saved in a GitHub repository under `docs/workflows/` directory.


# Backup n8n workflows

## Purpose
Automates backing up all active n8n workflows to a GitHub repository as JSON files.

## Trigger
Manual trigger on executing the workflow or a scheduled trigger (every 2 hours).

## Process Flow
1. Triggered manually or on a schedule.
2. Calls n8n API to fetch all active workflows.
3. Fetch the file content of each workflow from GitHub repository.
4. Compares the current workflow JSON with the stored version.
5. If the workflow is new or different, creates or updates the JSON file in GitHub repository.
6. Uses a subworkflow to execute for each workflow to manage memory efficiently.

## Key Integrations
- n8n API (to retrieve workflows)
- GitHub API (to backup workflows)
- Internal sub-workflow to process workflows sequentially.

## Data Output
JSON backup files of all workflows stored in a specified GitHub repo folder.


# My workflow 7

## Purpose
Indexes DataForSEO documentation by extracting links from their documentation site and adding content to a vector store for AI-powered search and retrieval.

## Trigger
Manual trigger when user starts workflow or runs sub-workflow per documentation page.

## Process Flow
1. Manually triggered.
2. Fetches main DataForSEO documentation page.
3. Extracts all hyperlinks (`<a>` tags).
4. Splits links into individual items.
5. Removes duplicate links.
6. Filters to keep only documentation page paths.
7. Processes each documentation page by:
   - Fetching page content.
   - Extracting main article content.
   - Cleaning the text.
   - Generating embeddings with Google Gemini.
   - Storing embeddings in an in-memory vector store.
8. Provides vector store for AI agents to query.

## Key Integrations
- HTTP request to fetch documentation pages
- HTML content extraction
- Google Gemini embeddings
- n8n vector store for in-memory storage (Langchain)

## Data Output
Prepared vector store of DataForSEO documentation for intelligent retrieval and AI chatbot integration.


# Hacker News workflow

## Purpose
Retrieves the 10 latest articles from Hacker News.

## Trigger
Manual trigger on execution.

## Process Flow
1. Triggered manually by clicking 'Execute workflow'.
2. Uses Hacker News integration node to fetch recent 10 news articles.

## Key Integrations
- Hacker News API

## Data Output
List of latest 10 Hacker News articles with relevant metadata.


# Build Your First AI Agent

## Purpose
Showcases an AI Agent built using n8n Langchain nodes that interacts with users, calls multiple tool nodes, and responds conversationally.

## Trigger
Manual trigger or user messages sent to the public chat interface.

## Process Flow
1. Triggered manually or on chat input.
2. Uses the OpenAI language model with Gemini integration.
3. Agent receives user messages, maintains memory buffer of conversations.
4. Depending on query, agent calls RSS feed (Get News), weather API (Get Weather), or other tools.
5. Responds with live, helpful conversational replies based on tool outputs and system prompts.

## Key Integrations
- OpenAI GPT (with Gemini model)
- RSS Feed Reader
- Weather Forecast API (Open-Meteo)
- n8n chat trigger node
- Langchain AI agent framework

## Data Output
Conversational agent responses fetching live data such as news articles or weather forecasts.


# Scope of Work Generator

## Purpose
Generates a detailed Scope of Work (SOW) document and email draft from Sales Qualified Lead information using AI, then saves the data back to an Excel sheet and drafts an email.

## Trigger
Manual trigger on form completion or chat message received.

## Process Flow
1. Triggered manually or on chat input.
2. Reads client lead data from Microsoft Excel.
3. Switches workflow branch if lead status matches "Generate SOW".
4. Uses Langchain AI agent (OpenAI GPT-4o-mini) with a project management system prompt to generate HTML-formatted SOW and email content.
5. Parses structured output including recipient email and subject.
6. Saves the generated email subject and body into the Excel sheet for the client.
7. Creates a draft email via Microsoft Outlook API.

## Key Integrations
- Microsoft Excel Online
- Microsoft Outlook API
- OpenAI GPT (Langchain agent)

## Data Output
Well-crafted Scope of Work HTML document and email draft saved back into the client's Excel sheet and Outlook draft folder.


# Analyze Any Website with OpenAI And Get On-Page SEO Audit

## Purpose
Performs a detailed On-Page SEO content and technical audit of any specified website URL using OpenAI models.

## Trigger
Web form submission of a landing page URL.

## Process Flow
1. Web form collects landing page URL.
2. Fetches the webpage HTML content via HTTP request.
3. Sends the webpage content to two OpenAI agents:
   - One performs content quality and keyword audit.
   - The other performs technical SEO audit.
4. Merges the analysis results.
5. Converts the results to Markdown and then HTML.
6. Sends the audit report via Gmail to the configured recipient.

## Key Integrations
- HTTP Request (web scraping)
- OpenAI GPT models (SEO Specialist system prompts)
- Gmail API

## Data Output
Detailed, structured SEO audit report email sent to the user.


# AI Agent : Google calendar assistant using OpenAI

## Purpose
Provides a conversational AI assistant to create and retrieve Google Calendar events via chat interface.

## Trigger
Chat message received via Langchain chat trigger.

## Process Flow
1. User message triggers the chat trigger node.
2. OpenAI GPT-4o processes user input with a system prompt acting as Google Calendar assistant.
3. AI agent uses two Google Calendar tools:
   - Get Events: Retrieves events by date range.
   - Create Events: Schedules new calendar events after confirming details.
4. Agent maintains recent conversation memory.
5. Returns conversational responses including event information.

## Key Integrations
- Google Calendar API (for events retrieval and creation)
- OpenAI GPT model
- Langchain agent framework in n8n

## Data Output
Conversational responses enabling calendar management through chat interface.


# System - CRM Ingest

## Purpose
Ingests CRM lead data submitted from external sources into a Supabase database table.

## Trigger
Webhook HTTP POST at `/submit-form`.

## Process Flow
1. A form or system posts lead data to the webhook.
2. Extract relevant fields (client_name, customer_name, email, message) from the POST body.
3. Creates a new row in the Supabase 'leads' table with the extracted data.

## Key Integrations
- Supabase (database for CRM data)
- HTTP Webhook

## Data Output
New lead records created in the CRM database.


# PROD - Orchestrator & DEV - Orchestrator

## Purpose
Acts as a central orchestrator AI agent to process user intents related to autonomous agency commands, including building websites, updating CRM, listing workflows, and documenting workflows.

## Trigger
HTTP POST webhook receiving chat input or commands.

## Process Flow
1. Receives user input from webhook.
2. Sends input to OpenAI agent acting as orchestrator to classify intent (e.g., website_build, crm_update).
3. Splits workflow execution branch via switch node based on intent.
4. Calls corresponding workflows:
   - Website Builder Agent
   - CRM update workflow
   - System - Scribe (for documentation)
   - List Workflows workflow
5. Responds back to user through webhook with proper acknowledgment or result.

## Key Integrations
- OpenAI GPT for natural language understanding
- n8n sub-workflows for each task
- HTTP Webhook for receiving external commands

## Data Output
Execution of sub-workflows or system commands according to classified user intent; response text sent back to calling client.


# AI Blog

## Purpose
Generates a blog post from a given topic using OpenAI, formats the content in Markdown, and creates a new post file on GitHub.

## Trigger
Manual workflow execution trigger.

## Process Flow
1. User specifies a blog topic via a set node.
2. OpenAI agent generates a blog article with a title and content.
3. Passes output to a Markdown formatting agent for readability enhancements.
4. Prepares front matter and markdown content for posting.
5. Commits the new blog post file to GitHub in a specified directory.

## Key Integrations
- OpenAI GPT (content generation & markdown editing)
- GitHub API

## Data Output
New formatted blog post Markdown file created and committed to GitHub repository.


# Summary

This collection includes a range of n8n workflows designed for automation tasks across various domains, including event data posting, documentation generation, backup, SEO auditing, AI agent chatbots, calendar assistants, CRM ingestion, orchestrator command management, AI blogging, and comprehensive social media intelligence. Key integrations leveraged include OpenAI GPT, Google Gemini, GitHub, Google Sheets, Google Drive, Microsoft Excel & Outlook, Supabase, and specialized APIs like EventTabs and Bright Data MCP. Together, they support robust automation, AI-driven insights, and workflow orchestration.