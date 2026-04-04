# Implementation Guide: Real Login & Platform Connection Flow

## Overview
This guide details the complete implementation of real authentication, platform connections, AI agents, and calling functionality.

## Architecture

### 1. **Platform Authentication Service** (`backend/services/platform-auth-service.ts`)
Handles OAuth flows and credential management for all supported platforms.

**Supported Platforms:**
- WhatsApp Business API
- Instagram
- Facebook
- LinkedIn
- Twitter
- Telegram
- Signal
- Slack

**Key Methods:**
- `generateOAuthUrl()` - Generate OAuth authorization URL
- `exchangeOAuthCode()` - Exchange authorization code for tokens
- `storeCredentials()` - Encrypt and store platform credentials
- `retrieveCredentials()` - Decrypt and retrieve stored credentials
- `validateCredentials()` - Validate token with platform API
- `refreshAccessToken()` - Refresh expired tokens
- `disconnect()` - Revoke platform connection

### 2. **WhatsApp Service** (`backend/services/whatsapp-service.ts`)
Specialized service for WhatsApp Business API integration.

**Features:**
- QR code generation for WhatsApp Web
- Session management with encryption
- Webhook handling for connection verification
- Test message sending
- Message history retrieval
- Account disconnection

### 3. **Twilio Calling Service** (`backend/services/twilio-calling-service.ts`)
Manages voice calls, recordings, and transcriptions.

**Features:**
- Outbound call initiation
- Call status tracking
- Recording and transcription management
- Call transfers
- Call metrics and history
- Webhook integration

### 4. **AI Agent Service** (`backend/services/ai-agent-service.ts`)
Manages AI agents with different capabilities.

**Agent Types:**
- Voice Assistant - Handles incoming calls
- Receptionist - Routes and manages calls
- Negotiator - Assists with negotiations
- Workflow Automator - Automates processes
- Data Analyst - Analyzes business data

## Backend Integration

### TRPC Routes

#### Platform Connection Routes
```
POST /trpc/platforms.connectQR
POST /trpc/platforms.connectOAuth
POST /trpc/platforms.connectCredentials
POST /trpc/platforms.verify2FA
```

#### Calling Routes
```
POST /trpc/calling.initiateCall
POST /trpc/calling.endCall
GET  /trpc/calling.getCallStatus
GET  /trpc/calling.getCallMetrics
GET  /trpc/calling.getCallHistory
```

#### AI Agent Routes
```
POST /trpc/ai-agents.startConversation
POST /trpc/ai-agents.sendMessage
POST /trpc/ai-agents.executeTool
POST /trpc/ai-agents.endConversation
GET  /trpc/ai-agents.getAgent
GET  /trpc/ai-agents.listAgents
GET  /trpc/ai-agents.getConversationHistory
```

## Frontend Implementation

### 1. **useAIAgent Hook** (`hooks/useAIAgent.ts`)
React hook for AI agent interactions.

**Usage:**
```typescript
const { startConversation, sendMessage, agents, loading } = useAIAgent();

// Start conversation with agent
const result = await startConversation('voice-assistant-1');

// Send message
const response = await sendMessage(result.sessionId, 'Hello');
```

### 2. **useEnhancedCalling Hook** (`utils/enhancedCallingService.ts`)
React hook for call management.

**Usage:**
```typescript
const { initiateCall, endCall, activeCalls, metrics } = useEnhancedCalling();

// Initiate a call
await initiateCall('+1234567890', 'Customer Name');

// End call
await endCall(callId);
```

### 3. **usePlatformConnection Hook** (Updated - `hooks/usePlatformConnection.ts`)
Updated to use real services instead of mocks.

**Connection Methods:**
- QR Code (WhatsApp, Signal, etc.)
- OAuth (Instagram, Facebook, LinkedIn, etc.)
- Credentials (Email/Password based)
- 2FA Verification

## Environment Setup

### Required Environment Variables
See `.env.example` for complete list. Key variables:

```bash
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# WhatsApp
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_ACCESS_TOKEN=

# OpenAI (for AI agents)
OPENAI_API_KEY=

# Encryption
ENCRYPTION_KEY=<32+ character key>
```

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install twilio qrcode axios
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Twilio Setup**
   - Create Twilio account at twilio.com
   - Get Account SID and Auth Token
   - Set up phone numbers for calling
   - Configure webhook URLs

4. **WhatsApp Business Setup**
   - Register for WhatsApp Business API
   - Create business account
   - Verify phone numbers
   - Get access token

5. **OAuth Setup for Each Platform**
   - Create app/project in platform developer console
   - Get Client ID and Client Secret
   - Configure redirect URIs
   - Request necessary permissions

## Usage Examples

### 1. Platform Connection

```typescript
// QR Code Connection (WhatsApp)
const qrResult = await connection.handleQRCodeConnect(platform);
// Display QR code and wait for scan
const verified = await connection.completeQRConnection(platform, linkingCode);

// OAuth Connection (Instagram)
const oauthResult = await connection.handleOAuthConnect(platform);
// User authorizes in browser
// Callback returns token

// Credentials Connection (Email/Password)
const credResult = await connection.handleCredentialsConnect(platform);
if (credResult.requires2FA) {
  // Handle 2FA verification
}
```

### 2. Calling

```typescript
// Initiate a call
const call = await useEnhancedCalling.initiateCall('+1234567890', 'John Doe');

// Listen to call updates
useEffect(() => {
  const unsubscribe = enhancedCallingService.subscribeToCallUpdates((calls) => {
    // Update UI with active calls
  });
  
  return unsubscribe;
}, []);

// End call
await enhancedCalling.endCall(call.id);

// Get metrics
const metrics = enhancedCallingService.getCallMetrics();
```

### 3. AI Agents

```typescript
// Start conversation
const { sessionId } = await aiAgent.startConversation('voice-assistant-1');

// Send message
const response = await aiAgent.sendMessage(sessionId, 'Schedule a meeting for tomorrow');

// Execute tool
const result = await aiAgent.executeTool('voice-assistant-1', 'schedule_appointment', {
  date: '2025-01-22',
  time: '10:00',
  duration: 60,
  title: 'Team Meeting'
});

// End conversation
await aiAgent.endConversation(sessionId);
```

## Security Considerations

1. **Credential Encryption**
   - All platform credentials are encrypted with AES-256-CBC
   - Encryption key should be 32+ characters
   - Stored in secure backend storage

2. **Token Management**
   - OAuth tokens auto-refresh when expired
   - Refresh tokens stored securely
   - Token expiration tracked

3. **Data Protection**
   - HTTPS/SSL for all external API calls
   - CSRF protection on sensitive endpoints
   - Rate limiting on authentication endpoints

4. **Audit Logging**
   - All platform connections logged
   - Call details stored with timestamps
   - Agent interactions tracked

## Error Handling

### Platform Connection Errors
- Invalid QR code scan
- OAuth state mismatch
- 2FA verification failure
- Credential validation failure

### Calling Errors
- Call initiation failure
- Network connectivity issues
- Webhook timeout
- Recording/transcription failures

### AI Agent Errors
- Agent not found
- Conversation session expired
- Tool execution failure
- API rate limit exceeded

## Monitoring & Logging

All services emit structured logs:

```javascript
// WhatsApp Service
[WhatsAppService] QR code generated for session {sessionId}
[WhatsAppService] Connection verified for {phoneNumber}

// Twilio Service
[TwilioCallingService] Outbound call initiated: {callId}
[TwilioCallingService] Call status updated: {callId} -> {status}

// AI Agent Service
[AIAgentService] Conversation started: {sessionId}
[AIAgentService] Message processed for session {sessionId}
```

## Testing

### Test Platform Connection
```bash
npm run test -- platform-auth-service.test.ts
```

### Test Calling
```bash
npm run test -- twilio-calling-service.test.ts
```

### Test AI Agents
```bash
npm run test -- ai-agent-service.test.ts
```

## Troubleshooting

### WhatsApp QR Connection Issues
1. Check if QR code is valid
2. Verify session hasn't expired (5 minutes)
3. Ensure WebSocket connection for auto-verification
4. Check firewall/proxy settings

### Call Initiation Fails
1. Verify Twilio credentials
2. Check phone number format
3. Ensure account has credits
4. Verify webhook URLs are accessible

### AI Agent Not Responding
1. Check OpenAI API key
2. Verify internet connection
3. Check rate limits
4. Review error logs

## Next Steps

1. Integrate with actual database for persistent storage
2. Set up webhook receivers for platform callbacks
3. Implement call recording storage
4. Add comprehensive error tracking (Sentry)
5. Set up monitoring dashboards
6. Create backup/recovery procedures
