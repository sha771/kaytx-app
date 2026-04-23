# kaytx - Enterprise AI Platform

> A production-ready enterprise-grade platform for AI-powered communication, automation, and business intelligence with comprehensive security, monitoring, and compliance features.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Security](https://img.shields.io/badge/Security-Enterprise%20Grade-red.svg)](#security)
**🚀 Ready for Production Deployment!**

See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring & Observability](#monitoring--observability)
- [Compliance](#compliance)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This platform provides a unified solution for enterprises to leverage AI across communication, automation, and analytics. Built with modern technologies and enterprise-grade security, it offers scalable AI services with comprehensive audit trails and compliance features.

### Key Capabilities

- **AI-Powered Communication**: Multi-model AI assistants with context awareness
- **Business Intelligence**: Real-time analytics and reporting
- **Automation**: Workflow orchestration and intelligent task management
- **Enterprise Security**: End-to-end encryption, RBAC, and audit logging
- **Scalable Architecture**: Microservices with event-driven design
- **Compliance Ready**: GDPR, SOC2, and HIPAA compliant infrastructure

---

## Features

### AI Services
- **Multi-Provider AI Model Abstraction**: Support for OpenAI, Anthropic, and local models
- **Context-Aware Conversations**: Persistent memory and session management
- **Custom AI Agent Workflows**: Configurable automation pipelines
- **Real-Time AI Calling**: Voice transcription and intelligent call routing
- **Enterprise AI Governance**: Model versioning, A/B testing, and performance monitoring
- Custom report generation

### Security & Compliance
- Role-based access control (RBAC)
- End-to-end encryption for sensitive data
- Comprehensive audit logging
- GDPR and compliance tools
- API key management with rotation

### Integration & Automation
- Event-driven architecture
- Webhook integrations
- Workflow automation
- Third-party service integrations

### Cross-Platform
- Web dashboard (React)
- Mobile applications (React Native)
- RESTful API with tRPC
- Real-time updates

---

## Architecture

### System Design

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │  Mobile Client  │    │  External APIs  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │      API Gateway         │
                    │   (Hono + tRPC)         │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────┴─────┐        ┌─────┴─────┐        ┌─────┴─────┐
    │   Auth    │        │   AI      │        │ Business  │
    │ Service   │        │ Service   │        │ Logic     │
    └─────┬─────┘        └─────┬─────┘        └─────┬─────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                    ┌─────────────┴─────────────┐
                    │     Event Bus             │
                    │   (Redis + Memory)        │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────┴─────┐        ┌─────┴─────┐        ┌─────┴─────┐
    │ PostgreSQL│        │    Redis   │        │   Storage │
    │ Database  │        │   Cache    │        │   (S3)    │
    └───────────┘        └────────────┘        └───────────┘
```

### Key Patterns

- **Repository Pattern**: Clean data access abstraction
- **Service Layer**: Business logic encapsulation
- **Circuit Breaker**: Resilient external service calls
- **Event-Driven**: Decoupled microservice communication
- **API Gateway**: Centralized request routing and middleware

---

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.9
- **Framework**: Hono + tRPC
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis
- **Authentication**: JWT + bcrypt
- **File Storage**: AWS S3 compatible
- **Queue**: Redis Bull Queue

### Frontend
- **Web**: React 18 + Next.js
- **Mobile**: React Native 0.81
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (optional)
- **CI/CD**: GitHub Actions
- **Monitoring**: Custom metrics + OpenTelemetry
- **Logging**: Winston + structured logs

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kaytx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up databases**
   ```bash
   # Start PostgreSQL and Redis
   docker-compose up -d postgres redis

   # Run migrations
   npm run db:migrate

   # Seed database (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kaytx

# Authentication
JWT_SECRET=your-super-secret-jwt-key
ONE_TIME_TOKEN_SECRET=your-one-time-token-secret

# Redis
REDIS_URL=redis://localhost:6379
```

### Optional Variables

```bash
# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=kaytx-storage

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX_REQUESTS=5
PASSWORD_MIN_LENGTH=8

# Features
ENABLE_METRICS=true
ENABLE_AUDIT_LOG=true
LOG_LEVEL=info
```

For a complete list, see [backend/lib/config.ts](./backend/lib/config.ts)

---

## API Documentation

### Authentication

All API requests require authentication via JWT tokens or API keys.

#### JWT Authentication
```bash
curl -H "Authorization: Bearer <jwt-token>" \
     https://api.example.com/api/trpc/user.getProfile
```

#### API Key Authentication
```bash
curl -H "X-API-Key: <api-key>" \
     https://api.example.com/api/trpc/enterprise.analytics.getDashboard
```

### Core Endpoints

#### User Management
- `POST /api/trpc/auth.register` - Register new user
- `POST /api/trpc/auth.login` - User login
- `POST /api/trpc/auth.logout` - User logout
- `GET /api/trpc/user.getProfile` - Get user profile

#### AI Services
- `POST /api/trpc/ai.chat` - Send chat message
- `GET /api/trpc/ai.models.list` - List available models
- `POST /api/trpc/ai.assistants.create` - Create AI assistant

#### Enterprise Features
- `GET /api/trpc/enterprise.analytics.getDashboard` - Dashboard analytics
- `POST /api/trpc/enterprise.apiKeys.create` - Create API key
- `GET /api/trpc/enterprise.auditLogs.get` - Get audit logs

### Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per email/IP
- **Password Reset**: 3 requests per hour per IP

### Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error context"
  }
}
```

### Full API Reference

For detailed API documentation, visit:
- **Development**: `http://localhost:3000/api/docs`
- **Production**: `https://api.example.com/api/docs`

---

## Security

### Authentication & Authorization

- **JWT Tokens**: Short-lived access tokens (15 min) + refresh tokens (7 days)
- **API Keys**: Rotatable keys with configurable expiry
- **RBAC**: Role-based access control with granular permissions
- **MFA**: Time-based one-time passwords (TOTP) support

### Data Protection

- **Encryption**: AES-256-GCM for sensitive data at rest
- **Hashing**: bcrypt for passwords, HMAC-SHA256 for tokens
- **PII Protection**: Field-level encryption for personal data
- **Audit Logging**: Comprehensive audit trail for all actions

### Security Headers

All API responses include security headers:
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

### CSRF Protection

State-changing requests require CSRF tokens when not using bearer authentication.

### Compliance Features

- **GDPR**: Data subject rights implementation
- **Data Retention**: Configurable retention policies
- **Consent Management**: Granular consent tracking
- **Data Portability**: Export user data on request

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.ts

# Run tests in watch mode
npm run test:watch
```

### Test Structure

```
tests/
├── unit/           # Unit tests for individual functions
├── integration/    # API integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data and utilities
```

### Coverage

Current test coverage: **60%+**

Target coverage: **80%**

### Writing Tests

```typescript
import { describe, it, expect } from '@jest/globals';
import { validatePasswordStrength } from '../lib/auth';

describe('validatePasswordStrength', () => {
  it('should validate strong passwords', () => {
    const result = validatePasswordStrength('StrongP@ssw0rd!');
    expect(result.valid).toBe(true);
  });

  it('should reject weak passwords', () => {
    const result = validatePasswordStrength('weak');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Password must be at least 8 characters long');
  });
});
```

---

## Deployment

### Production Deployment

#### 1. Environment Setup

```bash
# Set production environment
export NODE_ENV=production

# Configure production database
export DATABASE_URL=postgresql://prod_user:password@db.example.com/prod_db

# Set secure secrets
export JWT_SECRET=your-production-jwt-secret
export ONE_TIME_TOKEN_SECRET=your-production-token-secret
```

#### 2. Build Application

```bash
# Build for production
npm run build

# Start production server
npm start
```

#### 3. Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t kaytx .
docker run -p 3000:3000 --env-file .env.production kaytx
```

#### 4. Kubernetes Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kaytx-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kaytx-api
  template:
    metadata:
      labels:
        app: kaytx-api
    spec:
      containers:
      - name: api
        image: kaytx:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: kaytx-secrets
              key: database-url
```

### Monitoring & Observability

#### Health Checks

```bash
# Application health
curl https://api.example.com/health

# Database health
curl https://api.example.com/health/db

# Redis health
curl https://api.example.com/health/redis
```

#### Metrics

Prometheus metrics available at `/metrics`

#### Logging

Structured JSON logs with correlation IDs for request tracing.

---

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes with tests
4. **Run** tests: `npm test`
5. **Commit** your changes: `git commit -m 'Add amazing feature'`
6. **Push** to the branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed
- Keep PRs focused and small

### Commit Convention

```
type(scope): description

feat: add new feature
fix: fix bug
docs: update documentation
style: code formatting
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Security

For security vulnerabilities, please email security@example.com instead of opening an issue.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

- **Documentation**: [docs.kaytx.ai](https://docs.kaytx.ai)
- **API Reference**: [api.kaytx.ai/docs](https://api.kaytx.ai/docs)
- **Issues**: [GitHub Issues](https://github.com/kaytx/kaytx/issues)
- **Email**: support@kaytx.ai

---

## Acknowledgments

- OpenAI for AI model capabilities
- Anthropic for Claude integration
- The TypeScript and React communities
- All contributors and users

---

*Built with ❤️ by the Kaytx Team*