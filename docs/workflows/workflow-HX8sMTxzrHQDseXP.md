# System - CRM Ingest

## Purpose
Automatically capture submitted form data and store it as a new lead record in the CRM.

## Trigger
An HTTP POST request to the webhook endpoint `/submit-form` initiates this workflow.

## Process Flow
1. The workflow listens for incoming HTTP POST requests at the `/submit-form` webhook URL.
2. When a form submission is received, it extracts the fields: client_name, name, email, and message from the request body.
3. These extracted values are mapped to corresponding fields in the `leads` table of the Supabase database.
4. A new row is created in the `leads` table with the provided data.

## Key Integrations
- Supabase (for database storage)
- n8n Webhook (for receiving HTTP POST requests)

## Data Output
A new lead entry is added to the Supabase `leads` table, containing the submitted client and customer information along with their message.