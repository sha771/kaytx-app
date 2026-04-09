import fs from 'fs/promises';
import path from 'path';
import postgres from 'postgres';
import { pathToFileURL } from 'url';
import { logger } from '../lib/production-logger';

function getMigrationsDir(): string {
  return path.resolve(process.cwd(), 'backend', 'db', 'migrations');
}

function normalizeMigrationName(filename: string): string {
  return filename.trim();
}

async function ensureSchemaMigrationsTable(sql: postgres.Sql) {
  await sql.unsafe(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`
  );
}

async function getAppliedMigrations(sql: postgres.Sql): Promise<Set<string>> {
  const rows = await sql.unsafe('SELECT id FROM schema_migrations');
  const out = new Set<string>();
  for (const row of rows as any[]) {
    if (row && typeof row.id === 'string') {
      out.add(row.id);
    }
  }
  return out;
}

async function applyMigration(sql: postgres.Sql, id: string, contents: string) {
  const raw = contents.trimStart();
  const noTransaction = raw.toLowerCase().startsWith('-- no-transaction');
  const body = contents.trim();

  if (noTransaction) {
    if (body) {
      await sql.unsafe(body);
    }
    await sql.unsafe('INSERT INTO schema_migrations (id) VALUES ($1)', [id]);
    return;
  }

  await sql.begin(async (tx) => {
    if (body) {
      await tx.unsafe(body);
    }
    await tx.unsafe('INSERT INTO schema_migrations (id) VALUES ($1)', [id]);
  });
}

async function applyTypeScriptMigration(sql: postgres.Sql, id: string, filePath: string) {
  const moduleUrl = pathToFileURL(filePath).href;
  const mod: any = await import(moduleUrl);

  const up = mod?.up;
  if (typeof up !== 'function') {
    throw new Error(`[db:migrate] TypeScript migration ${id} does not export an up() function`);
  }

  await up();
  await sql.unsafe('INSERT INTO schema_migrations (id) VALUES ($1)', [id]);
}

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    logger.error('[db:migrate] DATABASE_URL is required');
    process.exit(1);
  }

  const client = postgres(connectionString, { max: 1 });
  try {
    await ensureSchemaMigrationsTable(client);

    const applied = await getAppliedMigrations(client);
    const dir = getMigrationsDir();

    const entries = await fs.readdir(dir);
    const candidates = entries
      .filter((f) => {
        const lower = f.toLowerCase();
        if (lower === 'migrate.ts') return false;
        return lower.endsWith('.sql') || lower.endsWith('.ts');
      })
      .sort((a, b) => a.localeCompare(b));

    for (const filename of candidates) {
      const id = normalizeMigrationName(filename);
      if (applied.has(id)) {
        continue;
      }

      const filePath = path.join(dir, filename);

      if (filename.toLowerCase().endsWith('.sql')) {
        const contents = await fs.readFile(filePath, 'utf8');
        if (!contents.trim()) {
          await applyMigration(client, id, '');
          continue;
        }

        logger.info(`[db:migrate] Applying ${id}`);
        await applyMigration(client, id, contents);
        continue;
      }

      if (filename.toLowerCase().endsWith('.ts')) {
        logger.info(`[db:migrate] Applying ${id}`);
        await applyTypeScriptMigration(client, id, filePath);
        continue;
      }
    }

    logger.info('[db:migrate] ✅ Done');
  } finally {
    await client.end({ timeout: 5 });
  }
}

run().catch((err) => {
  logger.error('[db:migrate] ❌ Failed', err);
  process.exit(1);
});
