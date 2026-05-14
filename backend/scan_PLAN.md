# Backend Scan & Upgrade Plan

## Information Gathered
- Repo root contains `backend/` with a Hono-based backend (`backend/hono.ts`) and server entry (`backend/server.ts`).
- `backend/server.ts` wires together monitoring, OpenTelemetry, realtime service, Twilio calling service, AI agent service, and (optionally) RabbitMQ workers.
- `backend/hono.ts` is the primary API router: it sets security headers, CORS, route protection, rate limits, CSRF validation, Prometheus metrics, RBAC-protected alert endpoints, auth endpoints (SSO, MFA, login/logout, register), webhook endpoints (Stripe/Twilio), and health endpoints.
- `backend/server-mock.ts` is an Express mock server.
- Root `package.json` defines `npm run typecheck` and a `npm run backend` script.
- Existing scan artifacts exist in the repo root: `backend-errors.txt` and `backend-errors2.txt`.
- No obvious TODO/FIXME results were found via quick grep (may be due to search pattern limitations).

## Plan
### Phase A — Establish baseline health (no code changes)
1. Run TypeScript typecheck using `tsconfig.server.json`.
2. Run backend unit/integration tests (if present).
3. Run backend start script and hit:
   - `GET /health`
   - `GET /metrics` (if enabled)
   - `GET /openapi.yaml` (if available)

### Phase B — Upgrade backend safely
4. Dependency check: identify any backend-related outdated or conflicting versions (drizzle/hono/trpc/otel/etc.).
5. Run `npm audit fix` and/or targeted upgrades for backend packages only.
6. Re-run typecheck and tests after dependency changes.

### Phase C — Scan for actual backend errors and fix them
7. Parse `backend-errors.txt` and `backend-errors2.txt` to determine the failing modules and error categories.
8. Run a full backend build/typecheck with verbose output (if available) and fix:
   - import/exports issues
   - runtime crashes (missing env vars, misconfigured routes)
   - incorrect middleware ordering (security/CSRF/rate-limit)
   - any broken webhook signature verification logic

### Phase D — Code quality and production robustness
9. Reduce unsafe casts (`as any`) in hot paths (auth/webhooks/trpc context) where feasible.
10. Remove or gate any noisy `console.log`/`logger` misuse in backend.
11. Ensure consistent error responses via `jsonApiError` across endpoints.

### Phase E — Final verification
12. Re-run typecheck, lint, and tests.
13. Produce a concise report: what was changed, why it was fixed, and how to validate.

## Dependent Files to be edited (likely)
- `backend/hono.ts`
- `backend/server.ts`
- Backend middleware and auth/MFA utilities under `backend/middleware/` and `backend/lib/`
- Webhook handlers under `backend/webhooks/` and services under `backend/services/`
- Any failing files discovered from `backend-errors*.txt`

## Followup steps
- Run:
  - `npm run typecheck`
  - `npm run backend`
  - `npm test` (or backend-specific tests)
  - `npm run lint`

<ask_followup_question>
Approve this phased plan for scanning, upgrading dependencies, and fixing backend errors in `backend/` (starting from typecheck, tests, and reading backend-errors.txt/log artifacts before code edits).
</ask_followup_question>

