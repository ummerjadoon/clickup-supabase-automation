# 📚 API Documentation

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. Health Check

**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Lead Webhook

**POST** `/webhook/lead`

Submit a new lead. Creates entry in Supabase and ClickUp task.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "Acme Corp",
  "message": "Interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "leadId": 1,
    "clickupTaskId": "abc123",
    "status": "processed"
  }
}
```

---

### 3. ClickUp Webhook

**POST** `/webhook/clickup`

Receive updates from ClickUp.

**Request Body:**
```json
{
  "event": "task.updated",
  "data": { }
}
```

**Response:**
```json
{
  "success": true
}
```

---

### 4. Statistics

**GET** `/stats`

Get server statistics.

**Response:**
```json
{
  "uptime": 3600,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```