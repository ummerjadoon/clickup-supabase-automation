# 📋 Setup Guide

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- PostgreSQL database or Supabase account
- ClickUp account with API access
- Gmail account (or other email service)

## Step 1: Clone Repository

```bash
git clone https://github.com/ummerjadoon/clickup-supabase-automation.git
cd clickup-supabase-automation
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Get API Credentials

### ClickUp API Key
1. Go to ClickUp Settings → Settings → API
2. Generate a new API key
3. Copy the token

### Supabase Setup
1. Create account at supabase.com
2. Create a new project
3. Copy Project URL, Anon Key, Service Role Key

### Email Service (Gmail)
1. Go to myaccount.google.com
2. Security → App passwords
3. Generate app password for Mail

## Step 4: Configure Environment

```bash
cp .env.example .env
```

Edit .env with your credentials:

```
CLICKUP_API_KEY=your_key_here
CLICKUP_TEAM_ID=your_team_id
CLICKUP_LIST_ID=your_list_id
SUPABASE_URL=your_url_here
SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Step 5: Start Server

```bash
node server.js
```

Server will run on http://localhost:3000

## Step 6: Test Health Endpoint

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```