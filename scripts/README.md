# Scripts

## Week 1 Cleanup

This repository includes a **safe cleanup script** that removes only the explicit file list from the Enterprise Readiness Executive Report.

- Default behavior is **dry-run** (no changes).
- To actually delete files you must pass `--apply`.

### What it removes

The script reads the "### Files to Remove" list from:

- `.kiro/specs/enterprise-platform-completion/EXECUTIVE_REPORT.md`

and targets exactly those paths.

- `GAP_RESOLUTION_COMPLETE_2026.md`
- `DISASTER_RECOVERY_PLAN_2026.md`
- `MULTI_REGION_DEPLOYMENT_2026.md`
- `OPERATIONAL_RUNBOOKS_COMPLETE_2026.md`
- `WEEK_1_DIAGNOSTIC.ps1`
- `WEEK_1_DIAGNOSTIC.sh`
- `setup-gaps.js`
- `setup-gaps-execution.log`
- `backend/db/migrations/001_initial_schema_2026-01-21.sql`
- `backend/services/queue-service.ts`

### Run (dry-run)

From the repo root:

```bash
npm run cleanup:week1
```

Or:

```bash
npx tsx scripts/week1-cleanup.ts
```

### Run (apply deletions)

```bash
npm run cleanup:week1:apply
```

Or:

```bash
npx tsx scripts/week1-cleanup.ts --apply
```

### Optional: specify repo root

If you run it from another working directory:

```bash
npx tsx scripts/week1-cleanup.ts --root "C:\\path\\to\\repo"
```

### Optional: specify executive report path

By default the script reads:

- `.kiro/specs/enterprise-platform-completion/EXECUTIVE_REPORT.md`

To override:

```bash
npx tsx scripts/week1-cleanup.ts --report ".kiro/specs/enterprise-platform-completion/EXECUTIVE_REPORT.md"
```

### Safety checks

- The script refuses to operate outside the provided repo root.
- It skips directories.
- It prints a summary and exits non-zero if any delete fails in apply mode.

## PostgreSQL Backups

The repository includes `scripts/backup-postgres.sh`.

### Run manually

```bash
./scripts/backup-postgres.sh
```

Optional restore verification (restores into a temporary DB, runs a sanity query, then drops it):

```bash
./scripts/backup-postgres.sh --verify
```

Environment variables:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD` (optional)
- `AWS_S3_BUCKET` (optional)
- `VERIFY_DB_NAME` (optional override)

### Linux automation (cron)

Example daily backup at 02:00:

```bash
0 2 * * * /path/to/repo/scripts/backup-postgres.sh --verify
```

### Windows automation (Task Scheduler)

This repo includes `scripts/create-scheduled-task.ps1` which creates/updates a daily scheduled task that runs the backup via WSL.

```powershell
powershell -ExecutionPolicy Bypass -File scripts\create-scheduled-task.ps1 -RepoRoot "C:\path\to\repo" -Verify
```
