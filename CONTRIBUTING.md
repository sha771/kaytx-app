# Contributing to Kaytx

Thanks for your interest in contributing! This guide covers setup, workflow, and standards.

## 1. Prerequisites

- **Node.js** 20+ (use `nvm install 20`)
- **npm** 10+ (we use `package-lock.json`, not yarn/pnpm)
- **PostgreSQL** 16+ (local or Docker)
- **Redis** 7+ (local or Docker)
- **Expo CLI**: `npm install -g expo-cli`
- For iOS: Xcode 15+ + CocoaPods
- For Android: Android Studio + SDK 34

## 2. Quick Start

```bash
# 1. Clone and install
git clone <repo-url> kaytx
cd kaytx
npm ci

# 2. Copy env template and fill in values
cp .env.example .env
# Edit .env with your local Postgres, Redis, and AI API keys

# 3. Start infrastructure (optional — uses Docker)
docker compose -f docker-compose.dev.yml up -d postgres redis

# 4. Run database migrations
npm run db:migrate

# 5. Start the backend (mock mode for development)
npm run backend

# 6. Start the frontend
npm start
# Press 'w' for web, 'i' for iOS, 'a' for Android
```

## 3. Development Workflow

### Branching
```bash
git checkout main
git pull
git checkout -b feature/your-feature-name
# ... make changes ...
git push -u origin feature/your-feature-name
# Open a PR against main
```

**Branch naming**:
- `feature/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling, deps, refactors
- `docs/<short-description>` — documentation only

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add SSO login via SAML
fix(billing): correct proration calculation for mid-cycle upgrades
chore(deps): bump expo to 54.0.35
docs(api): document /agents endpoint
```

**Types**: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`

### Pull Request Checklist
Before requesting review, ensure:
- [ ] Code passes `npm run lint`
- [ ] Types pass: `npx tsc --noEmit`
- [ ] Tests pass: `npm test`
- [ ] New code has tests (≥80% coverage for new lines)
- [ ] No `console.log` in production code (use the logger)
- [ ] No secrets committed (`.env` is gitignored)
- [ ] Documentation updated if API changed
- [ ] Database migrations are reversible (include `down` if SQL)

### Review Requirements
- **1 approval** for non-critical changes
- **2 approvals** for: `backend/lib/auth*`, `backend/lib/security*`, `backend/webhooks/`,
  `backend/db/migrations/`, anything touching payments
- All CI checks must pass (lint, typecheck, unit, integration, security)

## 4. Code Standards

### TypeScript
- **Strict mode** enabled (`tsconfig.json`)
- No `any` without a comment explaining why
- Prefer `interface` for object shapes, `type` for unions
- Use Zod for runtime validation at API boundaries

### React / React Native
- Functional components only (no class components)
- Hooks for state and side effects
- `StyleSheet.create()` for styling (no inline styles in hot paths)
- Wrap heavy/lazy components with `lazyComponent()` from `app/lib/lazy.ts`

### Backend
- Use the **Repository pattern** for data access (`backend/repositories/`)
- Validate all inputs with Zod schemas (`backend/schemas/`)
- Services should be framework-agnostic (no Hono/Express imports in services)
- Use the structured logger, not `console.log`

### Naming Conventions
| Type | Convention | Example |
|---|---|---|
| Files (components) | PascalCase.tsx | `AgentDashboard.tsx` |
| Files (utilities) | kebab-case.ts | `api-client.ts` |
| Files (tests) | *.test.ts | `cache.test.ts` |
| Variables/functions | camelCase | `getUserById` |
| Classes | PascalCase | `UserService` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Types/Interfaces | PascalCase | `UserCreateInput` |
| Zod schemas | camelCase + Schema | `loginSchema` |

## 5. Testing

### Run Tests
```bash
npm test                    # all tests
npm run test:unit           # unit only
npm run test:integration    # integration (needs Postgres + Redis)
npm run test:security       # security tests
npm run test:coverage       # with coverage report
```

### Test Placement
- **Unit**: `tests/unit/**/*.test.ts` or colocated `__tests__/` directories
- **Integration**: `tests/integration/**/*.test.ts`
- **E2E**: `tests/e2e/**/*.test.ts`
- **Backend**: `backend/__tests__/**/*.test.ts`

### Writing Tests
```typescript
import { describe, it, expect } from '@jest/globals';

describe('MyService', () => {
  it('should do the thing', () => {
    expect(result).toBe(expected);
  });
});
```

**Coverage targets**:
- Backend services: ≥50%
- Auth/security: ≥80%
- Utilities: ≥70%
- Frontend: critical flows only for now

## 6. Database Migrations

```bash
# Create a new migration (manually — follow the numbering)
# File: backend/db/migrations/020_<description>.sql

# Apply migrations
npm run db:migrate
```

**Rules**:
- Never edit an applied migration — create a new one
- Every migration must be reversible
- Test both up AND down before merging
- Include data migrations for breaking schema changes

## 7. Adding a New AI Agent Screen

1. Create the directory: `app/ai-agent/<department>/`
2. Add `index.tsx` (landing) and optionally `<agent-name>.tsx`
3. For sub-agents: `app/ai-agent/<department>/sub-agents/<name>.tsx`
4. Use `AgentPageWrapper` from `components/ai-agent/AgentPageWrapper.tsx` for consistent layout
5. Add the agent to the navigation in `app/ai-agent/category.tsx`
6. Add a corresponding service in `backend/services/` if backend logic is needed

## 8. Adding a New API Endpoint (tRPC)

1. Create the route directory: `backend/trpc/routes/<feature>/<action>/route.ts`
2. Define input/output with Zod: `backend/schemas/<feature>-schemas.ts`
3. Register the route in `backend/trpc/app-router.ts`
4. Add tests in `backend/__tests__/integration/`

Example:
```typescript
// backend/trpc/routes/feature/action/route.ts
import { z } from 'zod';
import { router } from '../../create-context';

export const actionRoute = router()
  .input(z.object({ id: z.string().uuid() }))
  .query(({ input }) => {
    return repository.findById(input.id);
  });
```

## 9. Environment Variables

- **Never commit** `.env`, `.env.local`, or `.env.production`
- Add new variables to `.env.example` with placeholder values
- Document required variables in this guide
- Use `process.env.VAR_NAME` — never hardcode

## 10. Release Process

1. **Version bump**: Update `version` in `package.json` and `app.json`
2. **Changelog**: Update `CHANGELOG.md` (if present)
3. **Tag**: `git tag v2.5.10 && git push --tags`
4. **CI/CD**: Pushing to `main` triggers the deploy workflow
5. **OTA updates**: For JS-only changes, EAS Update pushes to production channel
6. **Native changes**: Submit new build via `eas build --platform all`

## 11. Getting Help

- **Slack**: `#engineering` channel
- **Code owners**: See `CODEOWNERS` file (if present)
- **Issues**: Use GitHub Issues with the appropriate template
- **Architecture questions**: See `ARCHITECTURE.md` or ask in `#architecture`

## 12. Code of Conduct

Be respectful, inclusive, and constructive. We follow the
[Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
