import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { logger } from '../lib/production-logger';

// Export schema types
export * from './schema';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

type DbLike = {
  select: (...args: any[]) => any;
  insert: (...args: any[]) => any;
  update: (...args: any[]) => any;
  delete: (...args: any[]) => any;
  execute: (...args: any[]) => Promise<any>;
};

function createTestDbStub(): DbLike {
  const stub: any = {};

  const chainable = () => stub;

  stub.select = () => ({
    from: () => ({
      where: () => ({
        orderBy: () => ({
          limit: async () => [],
        }),
        limit: async () => [],
      }),
      orderBy: () => ({
        where: () => ({
          limit: () => ({
            offset: async () => [],
          }),
        }),
        limit: () => ({
          offset: async () => [],
        }),
      }),
      limit: async () => [],
    }),
  });

  stub.insert = () => ({
    values: () => ({
      returning: async () => [],
      onConflictDoNothing: async () => [],
    }),
  });

  stub.update = () => ({
    set: () => ({
      where: () => ({
        returning: async () => [],
      }),
    }),
  });

  stub.delete = () => ({
    where: () => ({
      returning: async () => [],
    }),
  });

  stub.execute = async () => ({ rows: [] });
  stub.transaction = async (cb: any) => cb(stub);

  return stub as DbLike;
}

const connectionString = process.env.DATABASE_URL || (isProduction ? '' : 'postgresql://localhost:5432/enterprise_db');

// ✅ DATABASE ACTIVATED - PostgreSQL is now the default and required for production

let dbInstance: any = null;
let connectionError: Error | null = null;

export function getDb() {
  if (nodeEnv === 'test') {
    logger.info('[DB] Using test database setup');
    const { setupTestDatabase } = require('../lib/test-database');
    return setupTestDatabase() as any;
  }

  if (dbInstance) return dbInstance;

  try {
    if (!connectionString && isProduction) {
      throw new Error('DATABASE_URL is required in production');
    }

    if (!connectionString) {
      logger.warn('[DB] No connection string provided, falling back to mock');
      dbInstance = createTestDbStub();
      return dbInstance;
    }

    const client = postgres(connectionString, {
      max: 20,
      idle_timeout: 20,
      connect_timeout: 5,
      backoff: (retries) => Math.exp(Math.min(retries, 3)) * 1000,
    });
    
    dbInstance = drizzle(client, { schema, logger: process.env.NODE_ENV === 'development' });
    
    // Test connection asynchronously
    client`SELECT 1`.then(() => {
      logger.info('[DB] ✅ PostgreSQL connection established successfully');
    }).catch((err) => {
      if (isProduction) {
        logger.error('[DB] ❌ CRITICAL: PostgreSQL connection failed in production:', err.message);
        // In production, we don't want to fall back to mock if it's explicitly configured
        connectionError = err;
      } else {
        logger.error('[DB] ❌ PostgreSQL connection failed, falling back to mock:', err.message);
        dbInstance = createTestDbStub();
      }
    });

    if (isProduction && !dbInstance) {
       // Ensure we don't proceed without a real DB in production if initialization failed
       throw new Error('CRITICAL: Database initialization failed in production. Mock fallback is disabled.');
    }

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (isProduction) {
      logger.error('[DB] ❌ CRITICAL: Failed to initialize database in production', err);
      throw err;
    }
    logger.error('[DB] ❌ Failed to initialize database, falling back to mock', err);
    dbInstance = createTestDbStub();
  }

  return dbInstance;
}

// Export db as the initialized database instance (lazy initialization)
export const db = getDb();

// Export schema
export { schema };
