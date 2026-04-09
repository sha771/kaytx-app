# Backend Library Documentation

## Configuration (`lib/config.ts`)

All environment variables are centrally managed and validated via `lib/config.ts`. This ensures type safety and defaults.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (`development`, `production`, `test`) | `development` |
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `localhost` |
| `API_BASE_URL` | Base URL for API | `http://localhost:3000` |
| `WEBHOOK_BASE_URL` | Base URL for webhooks | `API_BASE_URL` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `DATABASE_URL` | PostgreSQL connection string | **Required** |
| `JWT_SECRET` | JWT signing secret | **Required** |
| `ONE_TIME_TOKEN_SECRET` | Secret for one-time tokens (email verification, password reset) | Falls back to `JWT_SECRET` |
| `OPENAI_API_KEY` | OpenAI API key | Optional |
| `ANTHROPIC_API_KEY` | Anthropic API key | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Optional |
| `SMTP_HOST` | SMTP server host | Optional |
| `SMTP_PORT` | SMTP server port | Optional |
| `SMTP_USER` | SMTP username | Optional |
| `SMTP_PASS` | SMTP password | Optional |
| `FILE_UPLOAD_MAX_SIZE` | Max file upload size in bytes | `10485760` (10MB) |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window for API | `100` |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | Max requests per window for auth endpoints | `5` |
| `PASSWORD_MIN_LENGTH` | Minimum password length | `8` |
| `SESSION_EXPIRY_MS` | Session token expiry in ms | `86400000` (24h) |
| `REFRESH_TOKEN_EXPIRY_MS` | Refresh token expiry in ms | `604800000` (7d) |
| `API_KEY_DEFAULT_EXPIRY_DAYS` | Default API key expiry in days | `90` |
| `LOG_LEVEL` | Logging level (`error`, `warn`, `info`, `debug`) | `info` |
| `ENABLE_METRICS` | Enable metrics collection | `true` |
| `ENABLE_AUDIT_LOG` | Enable audit logging | `true` |

### Usage

```typescript
import { config } from './lib/config';

// Example: Access configuration
console.log(`Server running on ${config.host}:${config.port}`);
console.log(`Database URL: ${config.database.url}`);
console.log(`JWT secret set: ${!!config.auth.jwtSecret}`);
```

### Security Notes

- All secrets are validated at startup; the app will crash if required secrets are missing.
- Use a strong, unique `JWT_SECRET` in production.
- `ONE_TIME_TOKEN_SECRET` should be set separately from `JWT_SECRET` for better security.
- Password policy length is configurable via `PASSWORD_MIN_LENGTH`.

### Development vs Production

- In development, defaults are used for most values.
- In production, ensure all required variables are set and secrets are strong.

## Rate Limiting (`lib/rate-limiter-hono.ts`)

Provides Hono-compatible rate limiting middleware with configurable windows and limits.

### Pre-configured Limiters

- `apiLimiter`: General API rate limiting (configurable via env)
- `authLimiter`: Stricter limits for auth endpoints (configurable via env)
- `passwordResetLimiter`: Very strict for password reset (3 attempts per hour)

### Custom Limiter

```typescript
import { createRateLimiter } from './lib/rate-limiter-hono';

const customLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 10, // 10 requests per minute
  keyGenerator: (c) => c.req.header('x-user-id') || 'anonymous',
  skip: (c) => c.req.path === '/health',
});

app.use('/api/custom', customLimiter);
```

## File Upload Validation (`lib/file-upload.ts`)

Validates file uploads with allowed MIME types and size limits.

### Usage

```typescript
import { validateFileUpload, fileUploadSchema } from './lib/file-upload';

// Manual validation
const result = validateFileUpload(file);
if (!result.valid) {
  console.error(result.error);
}

// Zod schema for tRPC
const uploadProcedure = publicProcedure
  .input(fileUploadSchema)
  .mutation(async ({ input }) => {
    // input.file is validated
  });
```

### Allowed MIME Types

- Images: JPEG, PNG, GIF, WebP
- Documents: PDF
- Spreadsheets: CSV, Excel (both formats)

## Circuit Breaker (`lib/circuit-breaker.ts`)

Resilience pattern to prevent cascading failures when external services are down.

### Basic Usage

```typescript
import { CircuitBreaker, circuitBreakerRegistry } from './lib/circuit-breaker';

const breaker = new CircuitBreaker('external-api', {
  failureThreshold: 5,
  recoveryTimeout: 60000,
  operationTimeout: 30000,
});

try {
  const result = await breaker.execute(() => fetchExternalData());
} catch (error) {
  if (error instanceof CircuitBreakerOpenError) {
    // Circuit is open; use fallback
  }
}
```

### Decorator

```typescript
class ExternalService {
  @withCircuitBreaker('external-api', { failureThreshold: 3 })
  async fetchData() {
    // Automatically wrapped in circuit breaker
  }
}
```

### Registry

```typescript
import { circuitBreakerRegistry } from './lib/circuit-breaker';

// Get all metrics
const metrics = circuitBreakerRegistry.getAllMetrics();

// Reset a specific circuit breaker
circuitBreakerRegistry.reset('external-api');
```

## Repository Pattern (`lib/repository.ts`)

Provides a generic base repository for database operations with pagination, soft delete, and common query builders.

### Example: UserRepository

```typescript
import { BaseRepository } from './lib/repository';
import { users } from './db/drizzle-schema';

class UserRepository extends BaseRepository<User, UserCreateInput, UserUpdateInput> {
  constructor() {
    super(users);
  }

  async findByEmail(email: string) {
    return this.findOne(eq(users.email, email.toLowerCase()));
  }
}
```

### Pagination

```typescript
import { paginate } from './lib/repository';

const result = await paginate(userRepository, { page: 1, limit: 20 }, whereClause);
// result.data, result.pagination
```

## CSRF Protection (`lib/csrf.ts`)

Generates and validates CSRF tokens for state-changing requests.

### Usage

```typescript
import { generateCSRFToken, validateCSRFToken } from './lib/csrf';

// Generate token for forms
const token = generateCSRFToken(sessionId);

// Validate on request
if (!validateCSRFToken(token, sessionId)) {
  throw new Error('Invalid CSRF token');
}
```

## Security Hardening (`lib/security-hardening.ts`)

Enterprise-grade security utilities including rate limiting, headers, CORS, input validation, CSRF, and API key management.

### API Key Management

```typescript
import { generateApiKey, hashApiKey, verifyApiKey } from './lib/security-hardening';

const rawKey = generateApiKey();
const hashedKey = hashApiKey(rawKey);
const isValid = verifyApiKey(providedKey, hashedKey);
```

## Audit Logging (`lib/audit.ts`)

Comprehensive audit logging for security events.

### Usage

```typescript
import { logAudit, AuditActions } from './lib/audit';

logAudit({
  userId: 'user-123',
  organizationId: 'org-456',
  action: AuditActions.USER_LOGIN,
  resource: 'session',
  resourceId: 'session-789',
  ipAddress: '192.168.1.1',
  status: 'success',
});
```

## Event Bus (`lib/event-bus.ts`)

Decoupled event system with middleware, metrics, and persistence.

### Usage

```typescript
import { eventBus } from './lib/event-bus';

// Subscribe
eventBus.subscribe('user.created', (event) => {
  console.log('User created:', event.data);
});

// Emit
eventBus.emit('user.created', { userId: '123', email: 'test@example.com' });
```

## Cache (`lib/cache.ts`)

Redis-based caching service with mock mode for development.

### Usage

```typescript
import { cacheService } from './lib/cache';

await cacheService.set('key', { data: 'value' }, 3600);
const data = await cacheService.get('key');
await cacheService.delete('key');
```

## API Gateway (`services/api-gateway.ts`)

Centralized request routing, middleware, rate limiting, caching, and metrics.

### Usage

```typescript
import { apiGateway } from './services/api-gateway';

// Register route
apiGateway.registerRoute('GET', '/users', getUsersHandler, [authMiddleware]);

// Handle request
const response = await apiGateway.handleRequest(req);
```
