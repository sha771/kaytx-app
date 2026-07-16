# Technology & Engineering Knowledge Base

## Architecture Principles

### Core Tenets
1. **API-First Design**: All features must expose a versioned API before UI implementation
2. **Stateless Services**: Horizontally scalable; no sticky sessions
3. **Eventual Consistency**: Prefer async messaging over distributed transactions
4. **Defense in Depth**: Multiple security layers (WAF, API gateway, service mesh, app-level)

### Tech Stack Standards
| Layer | Approved Technology | Notes |
|---|---|---|
| Frontend | React Native (Expo) | Single codebase for iOS/Android/Web |
| Backend API | Hono + tRPC | Type-safe end-to-end |
| Database | PostgreSQL 16 | With pgvector for AI embeddings |
| Cache | Redis 7 | Session + hot data |
| Queue | RabbitMQ | Async task processing |
| AI | Multi-provider (OpenAI, Anthropic, Google) | Failover via abstraction layer |

## Development Workflow

### Git Branching Strategy
- `main` — Production-ready, protected
- `develop` — Integration branch
- `feature/*` — New features (squash-merge to develop)
- `hotfix/*` — Production fixes (merge to main AND develop)

### Code Review Requirements
- Minimum 1 approval for non-critical changes
- Minimum 2 approvals for: auth, payments, security, migrations
- All PRs must pass: lint, typecheck, unit tests, integration tests
- No direct pushes to main or develop

### Definition of Done
- [ ] Code written and self-reviewed
- [ ] Unit tests added (≥80% coverage for new code)
- [ ] Integration tests pass
- [ ] Documentation updated
- [ ] PR approved
- [ ] Deployed to staging
- [ ] Smoke tests pass

## Deployment Pipeline
1. **Commit** → triggers CI (lint, test, build)
2. **Merge to develop** → auto-deploy to staging
3. **Merge to main** → manual approval → deploy to production
4. **Post-deploy** → health checks + synthetic monitoring

### Rollback Strategy
- Database migrations: Always reversible (down migration required)
- Application: Blue-green deployment with instant rollback (< 30 seconds)
- Feature flags: Use LaunchDarkly for gradual rollouts

## Monitoring & Observability
- **Logs**: Structured JSON, 30-day retention, PII-scrubbed
- **Metrics**: Prometheus + Grafana dashboards
- **Traces**: OpenTelemetry with Jaeger
- **Alerts**: PagerDuty integration, critical alerts page on-call within 5 minutes

## Incident Response
| Severity | Response Time | Escalation |
|---|---|---|
| SEV-1 (Outage) | 5 minutes | CTO + On-call |
| SEV-2 (Degraded) | 30 minutes | Engineering Lead |
| SEV-3 (Minor) | 4 hours | Ticket queue |
| SEV-4 (Cosmetic) | Next sprint | Backlog |

Post-mortem required for all SEV-1 and SEV-2 incidents within 48 hours.
