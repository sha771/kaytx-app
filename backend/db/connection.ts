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

  const createQueryChain = (result = []) => {
    const chain: any = {};
    
    const addChainable = (methods: string[]) => {
      methods.forEach(method => {
        chain[method] = () => chain;
      });
    };
    
    addChainable(['from', 'where', 'orderBy', 'having', 'groupBy', 'innerJoin', 'leftJoin', 'rightJoin', 'fullJoin']);
    
    chain.limit = () => {
      chain.offset = () => chain;
      chain.then = (resolve: any) => resolve(result);
      return chain;
    };
    
    chain.offset = () => chain;
    chain.then = (resolve: any) => resolve(result);
    
    return chain;
  };

  stub.select = () => createQueryChain();

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

const connectionString = process.env.DATABASE_URL || '';

let dbInstance: any = null;

export function getDb() {
  if (nodeEnv === 'test') {
    logger.info('[DB] Using test database setup');
    const { setupTestDatabase } = require('../lib/test-database');
    return setupTestDatabase() as any;
  }

  if (dbInstance) return dbInstance;

  try {
    if (!connectionString) {
      if (isProduction) {
        throw new Error('DATABASE_URL is required in production');
      }
      logger.warn('[DB] No DATABASE_URL set, using mock database');
      dbInstance = createTestDbStub();
      return dbInstance;
    }

    const client = postgres(connectionString, {
      max: 20,
      idle_timeout: 20,
      connect_timeout: 5,
    });

    dbInstance = drizzle(client, { schema, logger: nodeEnv === 'development' });

    client`SELECT 1`.then(() => {
      logger.info('[DB] PostgreSQL connection established');
    }).catch((err: Error) => {
      logger.error('[DB] PostgreSQL connection failed, falling back to mock:', err);
      dbInstance = createTestDbStub();
    });

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (isProduction) {
      logger.error('[DB] Failed to initialize database', err);
      throw err;
    }
    logger.warn('[DB] Database unavailable, using mock:', err.message);
    dbInstance = createTestDbStub();
  }

  return dbInstance;
}

// Export db as the initialized database instance (lazy initialization)
export const db = getDb();

// Export schema
export { schema };
