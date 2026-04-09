# kaytx Platform API Documentation

## Overview

This document provides comprehensive API documentation for all endpoints in the kaytx/kaytx platform. The API follows RESTful principles with proper authentication, validation, and error handling.

## Base URL

```
Production: https://api.kaytx.com
Development: http://localhost:3000/api
```

## Authentication

All API endpoints (except public ones) require authentication using Bearer tokens:

```http
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### POST /auth/login
Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "user",
      "organizationId": "org_456"
    },
    "expiresAt": "2024-01-01T12:00:00Z"
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2024-01-01T12:00:00Z"
  }
}
```

#### POST /auth/logout
Logout user and invalidate tokens.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## AI Agent Service

### Agent Management

#### GET /agents
List all agents for the authenticated user's organization.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `type`: Filter by agent type
- `status`: Filter by status

**Response:**
```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "agent_123",
        "name": "Customer Support Agent",
        "type": "voice-assistant",
        "status": "active",
        "model": "gpt-4",
        "createdAt": "2024-01-01T10:00:00Z",
        "updatedAt": "2024-01-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

#### POST /agents
Create a new AI agent.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Sales Assistant",
  "type": "voice-assistant",
  "systemPrompt": "You are a helpful sales assistant...",
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 1000,
  "tools": ["schedule_appointment", "transfer_call"],
  "capabilities": ["conversation", "scheduling"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "agent_456",
    "name": "Sales Assistant",
    "type": "voice-assistant",
    "status": "active",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

#### GET /agents/{agentId}
Get details of a specific agent.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "agent_123",
    "name": "Customer Support Agent",
    "type": "voice-assistant",
    "systemPrompt": "You are a helpful customer support agent...",
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 1000,
    "tools": ["schedule_appointment", "transfer_call"],
    "capabilities": ["conversation", "scheduling"],
    "status": "active",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

#### PUT /agents/{agentId}
Update an existing agent.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Agent Name",
  "systemPrompt": "Updated system prompt...",
  "temperature": 0.8
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "agent_123",
    "name": "Updated Agent Name",
    "updatedAt": "2024-01-01T11:00:00Z"
  }
}
```

#### DELETE /agents/{agentId}
Delete an agent.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Agent deleted successfully"
}
```

### Conversations

#### POST /agents/{agentId}/conversations
Start a new conversation with an agent.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "user_789",
  "metadata": {
    "source": "web",
    "campaign": "summer_sale"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "conversationId": "conv_123",
    "agentId": "agent_456",
    "status": "active",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

#### POST /agents/{agentId}/conversations/{conversationId}/messages
Send a message to an agent conversation.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello, I need help with my order",
  "metadata": {
    "timestamp": "2024-01-01T10:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messageId": "msg_456",
    "response": "Hello! I'd be happy to help you with your order...",
    "conversationId": "conv_123",
    "agentId": "agent_456",
    "timestamp": "2024-01-01T10:00:00Z"
  }
}
```

#### GET /agents/{agentId}/conversations/{conversationId}/messages
Get conversation history.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit`: Number of messages to retrieve (default: 50)
- `before`: Get messages before this timestamp

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123",
        "role": "user",
        "content": "Hello, I need help with my order",
        "timestamp": "2024-01-01T10:00:00Z"
      },
      {
        "id": "msg_456",
        "role": "assistant",
        "content": "Hello! I'd be happy to help you with your order...",
        "timestamp": "2024-01-01T10:01:00Z"
      }
    ],
    "hasMore": false
  }
}
```

---

## Memory Service

### Memory Management

#### POST /memories
Store a new memory entry.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "conversation",
  "content": "User asked about pricing plans",
  "importance": 7,
  "priority": "medium",
  "tags": ["pricing", "sales"],
  "metadata": {
    "category": "business",
    "sessionId": "session_123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mem_123",
    "type": "conversation",
    "content": "User asked about pricing plans",
    "importance": 7,
    "priority": "medium",
    "tags": ["pricing", "sales"],
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

#### GET /memories
Retrieve memories with filtering and search.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: Filter by memory type
- `tags`: Filter by tags (comma-separated)
- `importance`: Minimum importance level
- `priority`: Filter by priority
- `search`: Search query (supports semantic search)
- `limit`: Number of results (default: 20)
- `offset`: Offset for pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "memories": [
      {
        "id": "mem_123",
        "type": "conversation",
        "content": "User asked about pricing plans",
        "importance": 7,
        "priority": "medium",
        "tags": ["pricing", "sales"],
        "similarity": 0.95,
        "createdAt": "2024-01-01T10:00:00Z"
      }
    ],
    "pagination": {
      "limit": 20,
      "offset": 0,
      "total": 100
    }
  }
}
```

#### GET /memories/{memoryId}
Get a specific memory by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mem_123",
    "type": "conversation",
    "content": "User asked about pricing plans",
    "importance": 7,
    "priority": "medium",
    "tags": ["pricing", "sales"],
    "metadata": {
      "category": "business",
      "sessionId": "session_123"
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

#### PUT /memories/{memoryId}
Update an existing memory.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Updated memory content",
  "importance": 8,
  "tags": ["pricing", "sales", "updated"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mem_123",
    "content": "Updated memory content",
    "importance": 8,
    "tags": ["pricing", "sales", "updated"],
    "updatedAt": "2024-01-01T11:00:00Z"
  }
}
```

#### DELETE /memories/{memoryId}
Delete a memory.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Memory deleted successfully"
}
```

### Memory Analytics

#### GET /memories/stats
Get memory statistics.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalMemories": 1500,
    "memoriesByType": {
      "conversation": 800,
      "knowledge": 400,
      "preference": 200,
      "context": 100
    },
    "averageImportance": 6.5,
    "memoriesByPriority": {
      "low": 300,
      "medium": 600,
      "high": 400,
      "critical": 200
    },
    "topTags": [
      { "tag": "pricing", "count": 150 },
      { "tag": "sales", "count": 120 },
      { "tag": "support", "count": 100 }
    ]
  }
}
```

---

## Analytics Service

### Usage Analytics

#### GET /analytics/usage
Get usage analytics data.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `metric`: Metric type (active_users, total_sessions, feature_usage, api_calls)
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)
- `granularity`: Time granularity (hour, day, week, month)
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "value": 1250,
      "metric": "active_users"
    },
    {
      "timestamp": "2024-01-01T01:00:00Z",
      "value": 1180,
      "metric": "active_users"
    }
  ]
}
```

### Performance Analytics

#### GET /analytics/performance
Get performance analytics.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)
- `includeErrors`: Include error metrics (default: false)
- `service`: Filter by service name (optional)
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "requestCount": 50000,
    "averageResponseTime": 250,
    "p95ResponseTime": 800,
    "p99ResponseTime": 1500,
    "errorRate": 0.02,
    "throughput": 200,
    "errors": [
      {
        "type": "timeout",
        "count": 50,
        "percentage": 0.1
      },
      {
        "type": "database_error",
        "count": 30,
        "percentage": 0.06
      }
    ]
  }
}
```

### Dashboard Analytics

#### GET /analytics/dashboard
Get comprehensive dashboard analytics.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "usage": {
      "activeUsers": 2500,
      "totalSessions": 15000,
      "apiCalls": 500000,
      "featureUsage": {
        "ai_agents": 1800,
        "memory_service": 1200,
        "analytics": 900
      }
    },
    "performance": {
      "averageResponseTime": 250,
      "uptime": 99.9,
      "errorRate": 0.02,
      "throughput": 200
    },
    "reports": {
      "generatedToday": 25,
      "scheduledReports": 150,
      "lastReportDate": "2024-01-01T10:00:00Z"
    }
  }
}
```

### Reports

#### POST /analytics/reports
Generate a comprehensive report.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "performance",
  "dateRange": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "format": "pdf",
  "sections": ["response_times", "error_rates", "throughput"],
  "organizationId": "org_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reportId": "report_123",
    "type": "performance",
    "format": "pdf",
    "status": "generating",
    "estimatedCompletion": "2024-01-01T10:05:00Z",
    "downloadUrl": "/api/analytics/reports/report_123/download"
  }
}
```

#### GET /analytics/reports/{reportId}/download
Download a generated report.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
Binary file content (PDF, CSV, or JSON)

---

## Audit Service

### Audit Logs

#### GET /audit/logs
Retrieve audit logs with filtering.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `userId`: Filter by user ID
- `action`: Filter by action
- `resource`: Filter by resource
- `status`: Filter by status (success, failure)
- `severity`: Filter by severity (info, warning, error, critical)
- `category`: Filter by category
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)
- `limit`: Number of results (default: 50)
- `offset`: Offset for pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "audit_123",
        "userId": "user_456",
        "organizationId": "org_789",
        "action": "USER_LOGIN",
        "resource": "authentication",
        "status": "success",
        "severity": "info",
        "category": "authentication",
        "subcategory": "login",
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "riskScore": 2,
        "complianceTags": ["gdpr"],
        "timestamp": "2024-01-01T10:00:00Z",
        "metadata": {
          "loginMethod": "password"
        }
      }
    ],
    "pagination": {
      "limit": 50,
      "offset": 0,
      "total": 1000
    }
  }
}
```

#### GET /audit/logs/{logId}
Get a specific audit log.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "audit_123",
    "userId": "user_456",
    "organizationId": "org_789",
    "action": "USER_LOGIN",
    "resource": "authentication",
    "status": "success",
    "severity": "info",
    "category": "authentication",
    "subcategory": "login",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "riskScore": 2,
    "complianceTags": ["gdpr"],
    "timestamp": "2024-01-01T10:00:00Z",
    "signature": "hmac_signature",
    "hash": "audit_hash",
    "metadata": {
      "loginMethod": "password"
    }
  }
}
```

### Audit Analytics

#### GET /audit/integrity
Verify audit log integrity.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)
- `limit`: Number of logs to verify (default: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLogs": 1000,
    "verifiedLogs": 998,
    "invalidLogs": 2,
    "brokenChains": 1,
    "integrityScore": 99.8,
    "issues": [
      {
        "logId": "audit_456",
        "issue": "Signature verification failed",
        "timestamp": "2024-01-01T09:00:00Z"
      }
    ]
  }
}
```

#### GET /audit/suspicious
Detect suspicious activity.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)
- `severity`: Filter by severity level

**Response:**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "type": "brute_force",
        "severity": "high",
        "count": 15,
        "description": "Multiple failed login attempts detected",
        "ipAddress": "192.168.1.100",
        "timestamp": "2024-01-01T10:00:00Z"
      },
      {
        "type": "anomalous_access",
        "severity": "medium",
        "count": 5,
        "description": "Unusual access pattern detected",
        "userId": "user_789",
        "timestamp": "2024-01-01T09:30:00Z"
      }
    ]
  }
}
```

---

## Platform Sync Service

### Sync Analytics

#### GET /sync/analytics
Get platform synchronization analytics.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSyncs": 500,
    "successfulSyncs": 485,
    "failedSyncs": 15,
    "averageSyncTime": 2500,
    "totalRecordsProcessed": 50000,
    "recordsByPlatform": {
      "salesforce": 20000,
      "hubspot": 15000,
      "slack": 10000,
      "stripe": 5000
    },
    "syncsByTimeRange": [
      {
        "date": "2024-01-01",
        "syncCount": 20,
        "successRate": 96,
        "avgTime": 2400
      }
    ],
    "errorDistribution": {
      "timeout": 5,
      "authentication": 3,
      "rate_limit": 4,
      "data_validation": 3
    },
    "performanceMetrics": {
      "fastestSync": 800,
      "slowestSync": 8000,
      "averageThroughput": 20
    }
  }
}
```

### Platform Metrics

#### GET /sync/platforms/{platform}/metrics
Get platform-specific metrics.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `platform`: Platform name (salesforce, hubspot, slack, stripe, etc.)

**Query Parameters:**
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "platform": "salesforce",
    "totalConnections": 10,
    "activeConnections": 8,
    "totalContacts": 15000,
    "totalDeals": 2500,
    "totalMessages": 5000,
    "lastSyncAt": "2024-01-01T09:00:00Z",
    "syncFrequency": 2.5,
    "errorRate": 0.04,
    "dataFreshness": 2.5
  }
}
```

### Data Quality

#### GET /sync/platforms/{platform}/quality
Get data quality metrics.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `platform`: Platform name

**Query Parameters:**
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "platform": "salesforce",
    "totalRecords": 15000,
    "duplicateRecords": 750,
    "incompleteRecords": 450,
    "staleRecords": 300,
    "dataCompleteness": 97.0,
    "dataAccuracy": 95.0,
    "lastValidation": "2024-01-01T08:00:00Z"
  }
}
```

### Recommendations

#### GET /sync/recommendations
Get performance recommendations.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Organization ID (optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "type": "performance",
      "priority": "high",
      "title": "Slow Sync Performance",
      "description": "Average sync time is 45s, which exceeds the 30s threshold",
      "action": "Optimize sync queries, implement batching, or increase API rate limits",
      "impact": "Improves user experience and reduces resource consumption"
    },
    {
      "type": "reliability",
      "priority": "critical",
      "title": "Low Sync Success Rate",
      "description": "Success rate is 94.5%, below the 95% threshold",
      "action": "Implement better error handling, retry logic, and monitoring",
      "impact": "Ensures data consistency and reliability"
    }
  ]
}
```

---

## Error Handling

### Error Response Format

All API endpoints return errors in a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    },
    "timestamp": "2024-01-01T10:00:00Z",
    "requestId": "req_123"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Rate Limiting

API endpoints are rate-limited to prevent abuse:

| Endpoint | Limit | Window |
|----------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| Agent operations | 100 requests | 15 minutes |
| Memory operations | 200 requests | 15 minutes |
| Analytics | 50 requests | 15 minutes |
| Audit logs | 1000 requests | 15 minutes |

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Webhooks

### Configuration

Webhooks allow external systems to receive real-time notifications about platform events.

#### Supported Events

- `user.created` - New user registration
- `user.updated` - User profile updated
- `agent.created` - AI agent created
- `agent.updated` - AI agent updated
- `conversation.started` - New conversation started
- `message.received` - Message received
- `message.sent` - Message sent
- `sync.completed` - Platform sync completed
- `sync.failed` - Platform sync failed

#### Webhook Delivery

Webhooks are delivered with retry logic:

- **Retry attempts**: 3
- **Retry delay**: Exponential backoff (1s, 2s, 4s)
- **Timeout**: 10 seconds per attempt
- **Success criteria**: 2xx HTTP response

#### Webhook Payload

```json
{
  "eventId": "evt_123",
  "eventType": "user.created",
  "timestamp": "2024-01-01T10:00:00Z",
  "data": {
    "user": {
      "id": "user_456",
      "email": "user@example.com",
      "role": "user"
    }
  },
  "signature": "webhook_signature"
}
```

---

## SDK and Libraries

### JavaScript/TypeScript

```bash
npm install @kaytx/api-client
```

```typescript
import { kaytxAPI } from '@kaytx/api-client';

const api = new kaytxAPI({
  baseURL: 'https://api.kaytx.com',
  apiKey: 'your-api-key'
});

// Create an agent
const agent = await api.agents.create({
  name: 'Customer Support',
  type: 'voice-assistant',
  systemPrompt: 'You are a helpful customer support agent...'
});

// Start a conversation
const conversation = await api.agents.startConversation(agent.id, {
  userId: 'user_123'
});

// Send a message
const response = await api.agents.sendMessage(agent.id, conversation.id, {
  message: 'Hello, I need help with my order'
});
```

### Python

```bash
pip install kaytx-python
```

```python
from kaytx import kaytxAPI

api = kaytxAPI(
    base_url='https://api.kaytx.com',
    api_key='your-api-key'
)

# Create an agent
agent = api.agents.create({
    'name': 'Customer Support',
    'type': 'voice-assistant',
    'system_prompt': 'You are a helpful customer support agent...'
})

# Start a conversation
conversation = api.agents.start_conversation(agent.id, {
    'user_id': 'user_123'
})

# Send a message
response = api.agents.send_message(agent.id, conversation.id, {
    'message': 'Hello, I need help with my order'
})
```

---

## Testing

### API Testing

Use the provided test endpoints for API validation:

#### Health Check
```http
GET /health
```

#### Authentication Test
```http
POST /auth/test
```

#### Rate Limit Test
```http
GET /test/rate-limit
```

### Postman Collection

A comprehensive Postman collection is available for testing all API endpoints:

1. Import the collection from `/docs/kaytx-api.postman_collection.json`
2. Set environment variables:
   - `base_url`: API base URL
   - `api_key`: Your API key
   - `organization_id`: Your organization ID

---

## Changelog

### Version 1.0.0 (2024-01-01)
- Initial API release
- Core agent management endpoints
- Memory service endpoints
- Analytics and reporting endpoints
- Audit logging endpoints
- Platform sync endpoints

### Version 1.1.0 (2024-01-15)
- Added webhook support
- Enhanced error handling
- Improved rate limiting
- Added SDK support

---

## Support

### Documentation
- [Services Documentation](./SERVICES_DOCUMENTATION.md)
- [API Reference](./API_REFERENCE.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)

### Community
- [GitHub Discussions](https://github.com/kaytx/platform/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kaytx-api)
- [Discord Community](https://discord.gg/kaytx)

### Support
- Email: api-support@kaytx.com
- Documentation: https://docs.kaytx.com
- Status Page: https://status.kaytx.com

---

## License

This API is licensed under the kaytx Platform License. See the [LICENSE](../LICENSE) file for details.
