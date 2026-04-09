import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/drizzle-schema';
import { logger } from './production-logger';

/**
 * Database utility functions and connection management
 */

export class DatabaseUtils {
  private static connection: postgres.Sql | null = null;
  private static db: ReturnType<typeof drizzle> | null = null;

  /**
   * Initialize database connection
   */
  static initialize(connectionString?: string) {
    if (this.connection) {
      return this.db;
    }

    const url = connectionString || process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is required');
    }

    // Create connection with production-ready settings
    this.connection = postgres(url, {
      max: 20, // Maximum number of connections
      idle_timeout: 20, // Close idle connections after 20 seconds
      connect_timeout: 10, // Connection timeout
      prepare: false, // Disable prepared statements for better performance
    });

    this.db = drizzle(this.connection, { schema });
    return this.db;
  }

  /**
   * Get database instance
   */
  static getDatabase() {
    if (!this.db) {
      return this.initialize();
    }
    return this.db;
  }

  /**
   * Close database connection
   */
  static async close() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      this.db = null;
    }
  }

  /**
   * Execute transaction with retry logic
   */
  static async withTransaction<T>(
    callback: (tx: ReturnType<typeof drizzle>) => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    const db = this.getDatabase();
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await db.transaction(callback);
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof Error && (
          error.message.includes('unique constraint') ||
          error.message.includes('foreign key constraint') ||
          error.message.includes('check constraint')
        )) {
          throw error;
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await this.delay(Math.pow(2, attempt) * 100);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Bulk insert with batch size control
   */
  static async bulkInsert<T>(
    table: any,
    data: T[],
    batchSize: number = 1000
  ) {
    const db = this.getDatabase();
    const results = [];

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const result = await db.insert(table).values(batch).returning();
      results.push(...result);
    }

    return results;
  }

  /**
   * Soft delete helper
   */
  static async softDelete(
    table: any,
    where: any,
    deletedBy?: string
  ) {
    const db = this.getDatabase();
    return db.update(table).set({
      deletedAt: new Date(),
      deletedBy,
      updatedAt: new Date(),
    } as any).where(where);
  }

  /**
   * Restore soft deleted record
   */
  static async restore(table: any, where: any) {
    const db = this.getDatabase();
    return db.update(table).set({
      deletedAt: null,
      deletedBy: null,
      updatedAt: new Date(),
    } as any).where(where);
  }

  /**
   * Get records with soft delete filter
   */
  static getWithoutDeleted(table: any) {
    const db = this.getDatabase();
    return db.select().from(table).where(
      (table as any).deletedAt === null
    );
  }

  /**
   * Pagination helper
   */
  static async paginate<T>(
    query: any,
    page: number = 1,
    limit: number = 50
  ): Promise<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const offset = (page - 1) * limit;
    
    // Get total count
    const countQuery = query.$dynamic();
    const [{ count }] = await countQuery.limit(1);
    
    // Get data
    const data = await query.limit(limit).offset(offset);
    
    const total = Number(count);
    const totalPages = Math.ceil(total / limit);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Search helper with text search
   */
  static async search(
    table: any,
    searchColumns: string[],
    searchTerm: string,
    options: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
    } = {}
  ) {
    const db = this.getDatabase();
    const { limit = 50, offset = 0, orderBy, orderDirection = 'desc' } = options;
    
    let query = db.select().from(table);
    
    // Add search conditions
    if (searchTerm && searchColumns.length > 0) {
      const searchConditions = searchColumns.map(column => 
        (table as any)[column].toLowerCase().like(`%${searchTerm.toLowerCase()}%`)
      );
      
      // Use OR condition for search
      query = query.where(
        // This would need to be adapted based on your ORM syntax
        // For Drizzle, you'd use or() function
      );
    }
    
    // Add ordering
    if (orderBy) {
      const column = (table as any)[orderBy];
      query = query.orderBy(
        orderDirection === 'asc' ? column.asc() : column.desc()
      );
    }
    
    return query.limit(limit).offset(offset);
  }

  /**
   * Health check for database
   */
  static async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency?: number;
    error?: string;
  }> {
    try {
      const start = Date.now();
      await this.getDatabase().execute('SELECT 1');
      const latency = Date.now() - start;
      
      return {
        status: latency < 1000 ? 'healthy' : 'degraded',
        latency,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get database statistics
   */
  static async getStats(): Promise<{
    connectionCount: number;
    idleConnections: number;
    activeConnections: number;
  }> {
    // This would need to be adapted based on your database
    // For PostgreSQL, you could query pg_stat_activity
    const db = this.getDatabase();
    
    try {
      const result = await db.execute(`
        SELECT 
          count(*) as total_connections,
          count(*) FILTER (WHERE state = 'idle') as idle_connections,
          count(*) FILTER (WHERE state = 'active') as active_connections
        FROM pg_stat_activity 
        WHERE datname = current_database()
      `);
      
      return result[0] || {
        connectionCount: 0,
        idleConnections: 0,
        activeConnections: 0,
      };
    } catch (error) {
      return {
        connectionCount: 0,
        idleConnections: 0,
        activeConnections: 0,
      };
    }
  }

  /**
   * Backup helper (for development/testing)
   */
  static async createBackup(tableName: string): Promise<string> {
    // This is a simplified backup function
    // In production, you'd use proper backup tools
    const db = this.getDatabase();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `${tableName}_backup_${timestamp}`;
    
    await db.execute(`
      CREATE TABLE ${backupName} AS 
      SELECT * FROM ${tableName}
    `);
    
    return backupName;
  }

  /**
   * Utility delay function
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Migration helper
   */
  static async runMigration(migrationSQL: string): Promise<void> {
    const db = this.getDatabase();
    await this.withTransaction(async (tx) => {
      await tx.execute(migrationSQL);
    });
  }

  /**
   * Cache invalidation helper
   */
  static async invalidateCache(pattern: string): Promise<void> {
    // This would integrate with your caching solution
    // For now, it's a placeholder
    logger.info(`Cache invalidated for pattern: ${pattern}`);
  }
}

export default DatabaseUtils;
