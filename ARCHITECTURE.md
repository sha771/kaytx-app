# Architecture — Kaytx Platform

> Last updated: 2026-07-07

## 1. High-Level Overview

Kaytx is an enterprise AI agent orchestration platform. It lets organizations deploy, manage, and
coordinate hundreds of specialized AI agents across business departments (Finance, HR, Sales, Legal,
Security, etc.).

```
┌────────────────────────────────────────────────────────────────┐
│                      CLIENT APPS                               │
│  React Native (iOS / Android)   •   React Native Web           │
│  Expo Router v6 (file-based routing, ~120 departments)         │
└──────────────────────────┬─────────────────────────────────────┘
                           │ tRPC over HTTP / WebSocket
┌──────────────────────────▼─────────────────────────────────────┐
│                      API GATEWAY                               │
│  Hono (edge-fast) + Express (admin)                            │
│  Rate limiting, auth (JWT + MFA + SSO), RBAC, input validation │
└──────────┬───────────────────────────────┬─────────────────────┘
           │                               │
┌──────────▼──────────┐         ┌──────────▼──────────┐
│   tRPC ROUTERS      │         │   AI AGENT SERVICE  │
│   ~90 procedures    │         │   (kernel + loop    │
│   auth, agents,     │◄────────┤   engineering:      │
│   billing, privacy  │         │   plan → react →    │
│   enterprise, GDPR  │         │   reflect)          │
└──────────┬──────────┘         └──────────┬──────────┘
           │                               │
┌──────────▼───────────────────────────────▼─────────────────────┐
│                      DOMAIN SERVICES                           │
│  Company Brain • Skill Brain • Predictor • Negotiation •       │
│  Receptionist • Counseling • Agent Scheduling • Cost Tracking  │
└──────────┬───────────────────────────────┬─────────────────────┘
           │                               │
┌──────────▼──────────┐         ┌──────────▼──────────┐
│   AI ABSTRACTION    │         │   INTEGRATIONS      │
│   (OpenAI / Claude /│         │   WhatsApp, Slack,  │
│    Gemini + MCP)    │         │   Email, Twilio,    │
└─────────────────────┘         │   IG, FB, LinkedIn, │
                                │   Twitter, Telegram │
                                └─────────────────────┘
           │
┌──────────▼─────────────────────────────────────────────────────┐
│                    PERSISTENCE & STREAMING                     │
│  PostgreSQL 16 (Drizzle) • Redis 7 • RabbitMQ • pgvector       │
└────────────────────────────────────────────────────────────────┘
```

## 2. Repository Layout

```
kaytx-full-app/
├── app/                    # Expo Router frontend (7,200+ files)
│   ├── (tabs)/             # Bottom-tab navigation
│   ├── ai-agent/           # Department landing pages + sub-agents
│   ├── company-brain/      # Company knowledge graph UI
│   ├── lib/                # Frontend utilities (api-client, i18n, lazy)
│   ├── hooks/              # React hooks (useApi, useRealtime, etc.)
│   └── components/ui/      # Shared UI primitives (Button, Card, Input)
├── components/             # Cross-cutting React components (317)
├── backend/                # Hono + Express + tRPC server (494 files)
│   ├── audit-system/       # Code audit platform (scanner/detector/...)
│   ├── bridges/            # Cross-platform protocol bridges
│   ├── controllers/        # Request handlers
│   ├── db/                 # Drizzle schema + 34 migrations
│   ├── integrations/       # 10 platform integrations
│   ├── lib/                # Core utilities (auth, cache, encryption)
│   ├── middleware/         # Auth, rate-limit, versioning, security
│   ├── repositories/       # Data access layer (agent, org, conversation, user)
│   ├── routes/             # Hono REST routes
│   ├── schemas/            # Zod validation schemas
│   ├── services/           # Business logic (157 services)
│   ├── trpc/               # ~100 tRPC procedures
│   └── webhooks/           # Stripe + platform webhooks
├── agents-brain/           # Department knowledge bases (Markdown)
├── tests/                  # Jest test suites (unit, integration, e2e, security)
├── scripts/                # Active scripts (one-offs archived to _archive/)
└── .github/workflows/      # CI/CD pipelines (ci.yml, deploy.yml, backup.yml)
```

## 3. Key Architectural Decisions

### 3.1 File-Based Routing (Expo Router v6)
Every directory under `app/` is a route. AI agent screens live under
`app/ai-agent/<department>/` with sub-agents in `app/ai-agent/<department>/sub-agents/`.
Deep links use the `kaytx://` scheme.

### 3.2 Type-Safe API (tRPC + Drizzle)
- **End-to-end type safety**: Client and server share the same TypeScript types.
- **No code generation**: tRPC infers types from the router definition.
- **Validation**: Zod schemas (in `backend/schemas/`) validate every request.

### 3.3 AI Agent Architecture
- **AI Abstraction Layer** (`backend/lib/ai-abstraction/`): Provider-agnostic interface
  supporting OpenAI, Anthropic, and Google with automatic failover.
- **Loop Engineering** (`backend/lib/loop-engineering/`): Each agent runs a
  Plan → React → Reflect loop for self-correction.
- **AI OS** (`backend/services/ai-os-*`): Kernel, sandbox, quota manager, and
  resource scheduler for multi-tenant agent execution.

### 3.4 Security Layers
1. **Network**: Cloudflare WAF + DDoS protection
2. **API Gateway**: Rate limiting, IP filtering, security headers (Helmet)
3. **Auth**: JWT with hashed session tokens, MFA/TOTP, SSO/SAML
4. **Authorization**: RBAC middleware (admin, manager, member, viewer)
5. **Input**: Zod validation + HTML/SQL sanitization on every endpoint
6. **Data**: AES-256 at rest, TLS 1.3 in transit, PII column-level encryption
7. **Audit**: Comprehensive audit logging + the new audit-system module

### 3.5 Multi-Tenancy
Every table includes `organizationId`. Row-level security in PostgreSQL
enforces isolation. Tenant-scoped query helpers live in `backend/lib/repository.ts`.

## 4. Data Flow Example: User Sends a Chat Message

1. User types in `app/(tabs)/chatter.tsx`
2. `app/lib/api-client.ts` calls `trpc.aiAssistant.chat.send(message)`
3. tRPC validates input against `sendMessageSchema` (Zod)
4. `ConversationRepository.addMessage()` persists the user message
5. `AiAgentService` invokes the AI Abstraction Layer
6. Loop Engineering runs: Plan → call LLM → Reflect → possibly call tools
7. Assistant message persisted via `ConversationRepository.addMessage()`
8. Response streamed back to client via SSE/WebSocket
9. Tokens consumed recorded by `AgentCostTrackingService`

## 5. Performance Strategy

- **Lazy loading**: Heavy agent pages wrapped in `lazyComponent()` (`app/lib/lazy.ts`)
- **Code splitting**: Expo Router auto-splits per route on web
- **Caching**: Redis for sessions, hot queries, and AI responses (where safe)
- **Database**: Read replicas + connection pooling (PgBouncer)
- **CDN**: Static assets via Cloudflare; images via expo-image with caching
- **Bundle monitoring**: `getCurrentChunk()` helper + web bundle analyzer in CI

## 6. Observability

| Signal        | Tool                    | Retention |
|---------------|-------------------------|-----------|
| Logs          | Structured JSON → Loki  | 30 days   |
| Metrics       | Prometheus + Grafana    | 90 days   |
| Traces        | OpenTelemetry + Jaeger  | 7 days    |
| Errors (FE)   | Sentry (planned)        | 90 days   |
| Uptime        | Health check endpoints  | n/a       |

## 7. Scalability Targets

| Layer          | Current   | Target (12 mo) |
|----------------|-----------|----------------|
| Concurrent users | 1,000   | 100,000        |
| Agents running   | 500     | 50,000         |
| Requests/sec     | 200     | 10,000         |
| Database size    | 50 GB   | 5 TB           |

Horizontal scaling via stateless services + Redis-backed sessions.
Database scales via read replicas + Citus sharding when needed.

## 8. Disaster Recovery

- **RPO** (Recovery Point Objective): 1 hour (hourly backups)
- **RTO** (Recovery Time Objective): 4 hours
- **Backups**: Automated via `BackupAutomationService`
  - Hourly (retain 24) → Daily (retain 30) → Weekly (retain 12) → Monthly (retain 12)
- **Multi-region**: Primary (us-east-1) + Standby (eu-west-1)
- **Runbook**: `scripts/disaster-recovery.sh`

## 9. Tech Debt & Cleanup

The codebase grew rapidly via code-generation scripts (now archived to
`scripts/_archive/`). Known debt:
- ~7,000 generated agent screens need audit for real vs. stub content
- Mixed test runners (jest + vitest) — standardizing on Jest
- Heavy dependency surface — ongoing effort to trim unused packages

See `docs/FEATURES_TICKET_LIST.md` for the cleanup backlog.
