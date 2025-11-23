# Event Tabs Form Fill (12 hours)

## Purpose
Automates the process of retrieving event product details from a Google Sheet and posting them to the Event Tabs admin interface.

## Trigger
Manual trigger activated by clicking "Execute workflow".

## Process Flow
1. Manual trigger initiates the workflow.
2. Fetches rows from a specified Google Sheet.
3. Sends a GET HTTP request to the Event Tabs admin products page for a specific event.
4. Parses the HTML to extract an authenticity token required for form submission.
5. Performs a POST HTTP request to Event Tabs with product data from the Google Sheet, using the extracted authenticity token.
   
## Key Integrations
- Google Sheets API (via OAuth2)
- Event Tabs (custom HTTP requests with authentication cookie)
  
## Data Output
New products are created or updated in the Event Tabs event administration system using data sourced directly from the Google Sheet.

---

# System - Scribe

## Purpose
Automates the analysis and documentation generation of n8n workflows using AI, and posts the auto-generated Markdown documentation to a GitHub repository.

## Trigger
Triggered via a webhook on receiving a POST request at `/scribe`.

## Process Flow
1. Webhook node receives the request with workflow JSON.
2. Fetches full workflow details from the n8n API using the workflow ID.
3. Sends the workflow JSON data to an OpenAI-compatible chat model for technical writing.
4. AI generates professional Markdown documentation summarizing the workflow.
5. Saves the generated documentation file to a specified GitHub repository.
   
## Key Integrations
- n8n REST API
- OpenAI API (chat model)
- GitHub API

## Data Output
Auto-generated Markdown documentation file created or updated in GitHub based on the submitted workflow.

---

# Backup n8n workflows

## Purpose
Backs up all active n8n workflows to a GitHub repository, managing differences and new workflow files intelligently to avoid duplication or unnecessary writes.

## Trigger
Manual trigger activated by clicking "Execute workflow" or scheduled via trigger node.

## Process Flow
1. Trigger initiates backup.
2. Fetches list of all active workflows from the n8n instance.
3. For each workflow:
   - Retrieves the current workflow JSON file from GitHub.
   - Compares local workflow JSON with GitHub file content (beautified for accurate comparison).
   - Determines if the file is new, updated, or unchanged.
4. Depending on comparison result:
   - Creates a new file in GitHub if the workflow JSON does not exist.
   - Edits the existing file for any changes.
   - Skips writing if no difference is detected.
5. Supports chunked processing to reduce memory usage.

## Key Integrations
- n8n REST API
- GitHub API

## Data Output
Up-to-date full backups of n8n workflows stored as JSON files in GitHub.

---

# My workflow 7 (Documentation Page Indexing & Vector Store)

## Purpose
Indexes documentation pages from a target website, extracts and cleans content, and stores this data in a vector store for retrieval-augmented generation (RAG) AI chatbot.

## Trigger
Manual trigger activated by clicking "Execute workflow".

## Process Flow
1. Retrieve all documentation page links via HTTP request.
2. Extract anchor tag links from HTML.
3. Filter and clean duplicate links, keeping only valid documentation paths.
4. Loop over each documentation page link.
5. Fetch each documentation page content.
6. Extract the main article content, ignoring irrelevant sections.
7. Clean the content for normalization.
8. Remove duplicate content seen in previous executions.
9. Split content recursively into text chunks.
10. Generate embeddings for each chunk with Google Gemini.
11. Insert the chunks into an in-memory vector store.
12. Allows efficient retrieval for an AI chatbot interface.

## Key Integrations
- HTTP Requests
- n8n built-in HTML extraction
- Google Gemini embeddings API
- In-memory vector store

## Data Output
Vectorized and indexed documentation content stored for retrieval in an AI chatbot.

---

# Hacker News workflow

## Purpose
Fetches the 10 latest Hacker News articles on-demand.

## Trigger
Manual trigger activated by clicking "Execute workflow".

## Process Flow
1. Manual trigger activates.
2. Retrieves the latest 10 items from Hacker News API.

## Key Integrations
- Hacker News API

## Data Output
List of latest 10 Hacker News articles retrieved.

---

# Build Your First AI Agent

## Purpose
Creates an AI chatbot agent that uses connected tools such as weather, news, and email to respond to user queries in a conversational way.

## Trigger
Manual trigger or chat trigger node for interactive chatbot experience.

## Process Flow
1. User sends chat message through webhook or UI.
2. AI Agent processes the input using a Gemini-based language model.
3. The agent selects appropriate tools:
   - RSS Feed Reader for news
   - HTTP Request for weather API
   - Email sending via Gmail
4. Agent uses conversational memory to maintain context.
5. Agent responds to user with informative messages or data fetched via tools.

## Key Integrations
- Google Gemini Model
- RSS Feeds (news)
- Open-Meteo Weather API via HTTP Request
- Gmail API for sending emails
- Chat memory node for contextual understanding

## Data Output
Dynamic chatbot responses utilizing real-time data and action tools.

---

# Scope of Work Generator

## Purpose
Generates comprehensive Scope of Work (SOW) documents based on client lead data, formulated by AI with project management expertise, and sends drafts via email.

## Trigger
Manual trigger or chat message received.

## Process Flow
1. Retrieves lead data rows from a Microsoft Excel sheet.
2. Checks lead status and routes qualified leads to AI Agent.
3. AI Agent (using OpenAI GPT-4o-mini) generates SOW based on lead data and user input (BANT or SWOT analysis).
4. Parses AI output into structured format.
5. Creates an email draft in Microsoft Outlook with the SOW and sends it.
6. Updates Excel sheet with email subject and body content.

## Key Integrations
- Microsoft Excel Online (Office365)
- OpenAI API
- Microsoft Outlook API

## Data Output
Generated and emailed Scope of Work documents tailored to sales qualified leads.

---

# Analyze Any Website with OpenAI And Get On-Page SEO Audit

## Purpose
Automates the on-page SEO audit of a specified landing page URL by scraping content and analyzing with GPT-4 based AI models.

## Trigger
Form trigger that accepts landing page URL input from user.

## Process Flow
1. Receives URL via form submission.
2. HTTP Request scrapes the full webpage content.
3. Feeds webpage HTML content to two AI agents:
   - Content Audit Agent: assesses content quality, keyword usage, readability.
   - Technical Audit Agent: assesses on-page technical SEO factors.
4. Merges audit outputs.
5. Formats combined audit results into Markdown.
6. Converts Markdown to HTML.
7. Sends the audit report via Gmail email.

## Key Integrations
- HTTP Request (scraping)
- OpenAI GPT-4o Mini chat models
- Gmail SMTP for sending reports

## Data Output
Detailed on-page technical and content SEO audit delivered to specified email.

---

# AI Agent : Google calendar assistant using OpenAI

## Purpose
Provides an AI-based chat interface to assist users with Google Calendar tasks, including event creation and event retrieval via conversational commands.

## Trigger
Chat messages received via webhook.

## Process Flow
1. Receives chat input.
2. AI Agent parses user intent (create or retrieve events).
3. Uses Google Calendar API tools to:
   - Fetch calendar events for requested date ranges.
   - Create events with title, description, start/end times.
4. Maintains conversation memory window for context.
5. Responds with appropriate data or confirmations.

## Key Integrations
- Google Calendar API
- OpenAI Language Model (gpt-4o)
- Chat trigger node for conversational interface

## Data Output
Calendar events fetched or created based on natural language user requests.

---

# System - CRM Ingest

## Purpose
Ingests form submission data into a Supabase database to capture CRM leads.

## Trigger
Webhook that listens for POST requests at `/submit-form`.

## Process Flow
1. Webhook receives JSON data from form submission.
2. Extracts lead information (client name, customer name, email, message).
3. Inserts a new row into Supabase table `leads` with submitted data.

## Key Integrations
- Supabase API for database insertion

## Data Output
New customer lead records stored in Supabase.

---

# PROD - Orchestrator

## Purpose
Acts as a central AI-driven orchestrator to route user requests to various specialized n8n workflows based on intent.

## Trigger
Webhook listening for POST requests.

## Process Flow
1. Webhook receives chat input commands.
2. Sends input to an AI agent to classify intent, client, and industry.
3. Based on intent, switches to:
   - Trigger website build workflow
   - Update CRM workflow
   - List workflows
   - Document workflow
4. Executes the targeted workflow with relevant inputs.
5. Responds to the user with results via the webhook.

## Key Integrations
- n8n REST API
- OpenAI LLM (gpt-4o-mini)
- Internal n8n workflows

## Data Output
Dynamic execution of specialized workflows based on user natural language commands.

---

# AI Blog

## Purpose
Generates a 500+ word blog article on a specified topic using AI and publishes it to GitHub repository in markdown.

## Trigger
Manual trigger activated by clicking "Execute workflow".

## Process Flow
1. Sets a topic string for the blog.
2. Agent requests an article from OpenAI GPT-5 model.
3. Parses AI response structured JSON.
4. Sends content to a Markdown editor agent for formatting.
5. Parses edited response.
6. Prepares post frontmatter and markdown content.
7. Commits markdown file to GitHub repo under `_posts` folder.

## Key Integrations
- OpenAI GPT-5
- GitHub API

## Data Output
New blog post markdown files created and committed to specified GitHub repo.

---

# Backup n8n credentials

## Purpose
Backs up all n8n credentials to GitHub by exporting and comparing existing files to avoid redundancy.

## Trigger
Manual trigger activated by clicking "Execute Command" node or scheduled.

## Process Flow
1. Exports all credentials from n8n CLI command.
2. Formats and beautifies the JSON output.
3. Loops through each credential:
   - Compares with GitHub stored version.
   - Decides whether to create new, update, or skip.
4. Writes changes to the GitHub repo in credentials folder.

## Key Integrations
- n8n CLI (export command)
- GitHub API

## Data Output
Up-to-date credential JSON files safely stored in GitHub.

---

# Collect feedback

## Purpose
Collects user feedback submitted via a form and saves the responses into Google Sheets.

## Trigger
Form trigger with feedback questions.

## Process Flow
1. User submits feedback form.
2. Parses form fields including radio questions and text feedback.
3. Appends a new row into Google Sheet containing the form data.

## Key Integrations
- Google Sheets API

## Data Output
Structured feedback data appended into a Google Sheet for review.

---

# n8n expert assistant

## Purpose
AI assistant specialized in n8n automation knowledge, helping users with advice and instructions for building n8n workflows.

## Trigger
Chat messages received via webhook.

## Process Flow
1. Receives chat input.
2. AI agent (using Google Gemini model) answers based on up-to-date n8n knowledge.
3. Maintains simple conversation memory to provide coherent and context-aware help.

## Key Integrations
- Google Gemini language model

## Data Output
Natural language responses assisting n8n users.

---

# 1) Build an Email List

## Purpose
Captures email signups via webhook and appends them to a Google Sheet mailing list.

## Trigger
Webhook triggered by POST requests with signup data.

## Process Flow
1. Webhook receives form data with email and optional names.
2. Checks if additional form fields like website are empty.
3. Appends the record to a Google Sheet email list with source info.

## Key Integrations
- Google Sheets API

## Data Output
Updated email list stored in Google Sheets.

---

# Track SEO Keyword Rankings with Bright Data MCP and GPT-4o AI Analysis

## Purpose
Daily/weekly monitoring and logging of keyword rankings on Google with AI analysis of top competitors.

## Trigger
Scheduled trigger runs daily or weekly at specified time.

## Process Flow
1. Scheduled trigger fires.
2. Sets keyword and domain to track.
3. Uses Bright Data MCP proxy to scrape top 5 SERP results for the keyword.
4. AI agent formats and interprets SERP data.
5. Code node splits results into separate rows.
6. Appends or updates rows in Google Sheets to log ranking history.

## Key Integrations
- Bright Data MCP proxy API
- OpenAI GPT-4o-mini
- Google Sheets API

## Data Output
Historical SEO ranking data recorded in Google Sheets with AI-generated insights.

---

# Echo Workflow

## Purpose
Basic manual trigger workflow that outputs the n8n API key for testing or verification.

## Trigger
Manual trigger.

## Process Flow
1. Trigger node starts workflow.
2. Sets JSON field with n8n API key environment variable.

## Key Integrations
- None external, uses environment variables.

## Data Output
Outputs the stored n8n API key.

---

# Scrape an Article and give me a tldr

## Purpose
Fetches a specified article from a URL and generates a concise TL;DR summary using AI.

## Trigger
Manual trigger.

## Process Flow
1. Manual trigger starts workflow.
2. Sets article URL.
3. HTTP Request fetches the article HTML.
4. HTML node extracts header and content sections.
5. AI Agent summarizes the content into a TL;DR.

## Key Integrations
- HTTP Request
- OpenAI or Google Gemini models for summarization

## Data Output
Concise summary of the article content.

---

# System - List Workflows

## Purpose
Retrieves a list of all active n8n workflows and formats it as a Markdown list.

## Trigger
Manual trigger activated by executing the workflow.

## Process Flow
1. Fetches all workflows from n8n internal API filtered by active status.
2. Optionally filters out orchestrator workflows.
3. Formats workflows into a Markdown bullet list with ID and name.

## Key Integrations
- n8n internal API

## Data Output
Formatted Markdown list of active workflows for display or further processing.

---

# RAG Chatbot (Build a Documentation Expert Chatbot with Gemini RAG Pipeline)

## Purpose
Creates a Retrieval-Augmented Generation (RAG) AI expert chatbot that uses official n8n docs as its knowledge base to answer user queries.

## Trigger
Manual trigger for indexing and chat message received webhook for query answering.

## Process Flow
**Indexing flow:**
1. Fetch main n8n documentation page and all documentation links.
2. Extract all links and filter out duplicates/non-doc pages.
3. Loop over each doc page URL.
4. Fetch each page content and extract main article text.
5. Remove duplicate content previously indexed.
6. Split text into chunks.
7. Generate embeddings for each chunk using Google Gemini.
8. Store chunks and embeddings in an in-memory vector store under a memory key.

**Chat flow:**
1. User sends a chat message through public chat trigger.
2. Converts user query into embedding.
3. Retrieves similar chunks from the vector store.
4. AI agent uses retrieved doc chunks to generate accurate and factual responses.
5. Stores short-term conversation memory for context retention.

## Key Integrations
- HTTP Requests to n8n docs site
- Google Gemini embedding and chat models
- n8n in-memory vector store

## Data Output
Accurate and context-aware AI chatbot responses based exclusively on official n8n documentation.

---

# Send client summary when work done

## Purpose
Notes the process to send an email summary of completed Todoist tasks daily.

## Trigger
(Not explicitly configured, description only in the sticky note.)

## Process Flow
- Retrieves Todoist items daily at 8 AM.
- Identifies new items in "done" status.
- Logs them and appends what was done into an email.
- Sends the summary email to the client.

## Key Integrations
- Todoist API
- Email sending nodes (assumed)

## Data Output
Summary email of completed tasks sent to the client.

---

# Summit Visa Letters

## Purpose
Automates the generation and sharing of personalized visa letters based on submitted form data.

## Trigger
Form trigger on submission of visa letter request form.

## Process Flow
1. Captures form fields: first name, last name, DOB, passport number, email.
2. Copies a Google Docs visa letter template.
3. Updates the copied document with the submitted personal data.
4. Shares the personalized Google Doc via email with the requester.

## Key Integrations
- Google Forms (via n8n Form Trigger)
- Google Drive API
- Google Docs API (document editing)
- Google Drive sharing permissions

## Data Output
Custom personalized visa letters generated and shared by Google Docs link email.

---

# Social Media Intelligence Workflow with Bright Data and OpenAI

## Purpose
Discovers, verifies, and analyzes someone's social media profiles across multiple platforms, creating a comprehensive intelligence report published to Google Docs.

## Trigger
Form trigger that collects target person’s details for social media research.

## Process Flow
1. Accepts input including full name, email, company, location, known social handles, platforms to search, and search depth.
2. Parses and validates input.
3. Generates name variations and builds smart search queries per platform.
4. Uses AI discovery agent to scrape profiles from web using Bright Data MCP proxy.
5. Validates profiles by checking consistency, confidence scores, and cross-references.
6. Splits verified profiles for platform-specific analysis.
7. Builds specialized prompts for each platform (LinkedIn, Twitter/X, Instagram, YouTube, GitHub, TikTok).
8. Analyzes profiles via specialized AI agents using Bright Data tools.
9. Aggregates all analysis results.
10. Synthesizes a detailed social media intelligence report using GPT-4.1.
11. Converts the report to formatted HTML and creates a Google Doc.
12. Provides direct Google Doc link and auto-redirect for user access.

## Key Integrations
- Bright Data MCP PRO for web scraping
- OpenAI GPT-4.1 Mini
- Google Gemini embedding and chat models
- Google Drive API (docs creation)
- n8n Forms and Data Tables

## Data Output
A professionally formatted, comprehensive social media intelligence report delivered as a Google Document.

---

This concludes the documentation for the supplied n8n workflows. If you need detailed documentation for any specific workflow from the set, please specify.