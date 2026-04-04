import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle-schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/enterprise_db';

const isMockMode = !process.env.DATABASE_URL || process.env.USE_MOCK_DB === 'true';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (isMockMode) {
    console.log('[DB] Running in mock mode - using in-memory store');
    return null;
  }

  if (!dbInstance) {
    const client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    dbInstance = drizzle(client, { schema });
    console.log('[DB] PostgreSQL connection established');
  }

  return dbInstance;
}

export const db = getDb();
export { schema };
