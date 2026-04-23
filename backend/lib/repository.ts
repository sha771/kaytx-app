import { eq, and, or, desc, asc, ilike, SQL, inArray } from 'drizzle-orm';
import { db as pgDb } from '../db/connection';
import { z } from 'zod';

// Generic repository interface
export interface IRepository<T, CreateInput, UpdateInput> {
  create(data: CreateInput, options?: { transaction?: any }): Promise<T>;
  createMany(data: CreateInput[], options?: { transaction?: any }): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOne(where: SQL): Promise<T | null>;
  findMany(options?: {
    where?: SQL;
    orderBy?: SQL;
    limit?: number;
    offset?: number;
  }): Promise<T[]>;
  update(id: string, data: UpdateInput): Promise<T | null>;
  updateMany(where: SQL, data: UpdateInput): Promise<T[]>;
  delete(id: string): Promise<boolean>;
  permanentDelete(id: string): Promise<T | null>;
  count(where?: SQL): Promise<number>;
}

// Generic base repository implementation
export abstract class BaseRepository<T, CreateInput, UpdateInput> implements IRepository<T, CreateInput, UpdateInput> {
  protected table: any;
  protected defaultSelectFields: Record<string, boolean> = {};

  constructor(table: any, defaultSelectFields?: Record<string, boolean>) {
    this.table = table;
    this.defaultSelectFields = defaultSelectFields || {};
  }

  async create(data: CreateInput, options?: { transaction?: any }): Promise<T> {
    const [result] = await pgDb
      .insert(this.table)
      .values(data as any)
      .returning();
    return result as T;
  }

  async createMany(data: CreateInput[], options?: { transaction?: any }): Promise<T[]> {
    const results = await pgDb
      .insert(this.table)
      .values(data as any[])
      .returning();
    return results as T[];
  }

  async findById(id: string): Promise<T | null> {
    const [result] = await pgDb
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);
    return (result as T) || null;
  }

  async findOne(where: SQL): Promise<T | null> {
    const [result] = await pgDb
      .select()
      .from(this.table)
      .where(where)
      .limit(1);
    return (result as T) || null;
  }

  async findMany(options: {
    where?: SQL;
    orderBy?: SQL;
    limit?: number;
    offset?: number;
  } = {}): Promise<T[]> {
    let query = pgDb.select().from(this.table);

    if (options.where) {
      query = query.where(options.where);
    }

    if (options.orderBy) {
      query = query.orderBy(options.orderBy);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return (await query) as T[];
  }

  async update(id: string, data: UpdateInput): Promise<T | null> {
    const [result] = await pgDb
      .update(this.table)
      .set(data as any)
      .where(eq(this.table.id, id))
      .returning();
    return (result as T) || null;
  }

  async updateMany(where: SQL, data: UpdateInput): Promise<T[]> {
    const results = await pgDb
      .update(this.table)
      .set(data as any)
      .where(where)
      .returning();
    return results as T[];
  }

  async delete(id: string): Promise<boolean> {
    const result = await pgDb
      .delete(this.table)
      .where(eq(this.table.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async permanentDelete(id: string): Promise<T | null> {
    // Permanently delete record without soft delete and return the deleted record
    const [result] = await pgDb
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();
    return (result as T) || null;
  }

  async count(where?: SQL): Promise<number> {
    let query = pgDb.select({ count: this.table.id }).from(this.table);
    if (where) {
      query = query.where(where);
    }
    const result = await query;
    return result.length;
  }

  // Common query builders
  protected buildSearchQuery(searchFields: string[], searchTerm: string): SQL {
    if (!searchTerm || searchFields.length === 0) {
      return sql`1=1`;
    }

    const searchConditions = searchFields.map(field => 
      ilike(this.table[field], `%${searchTerm}%`)
    );

    return or(...searchConditions) || sql`1=1`;
  }

  protected buildDateRangeQuery(
    dateField: string,
    startDate?: Date,
    endDate?: Date
  ): SQL {
    const conditions: SQL[] = [];

    if (startDate) {
      conditions.push(sql`${this.table[dateField]} >= ${startDate}`);
    }

    if (endDate) {
      conditions.push(sql`${this.table[dateField]} <= ${endDate}`);
    }

    return conditions.length > 0 ? and(...conditions) : sql`1=1`;
  }

  protected buildInQuery(field: string, values: (string | number)[]): SQL {
    if (values.length === 0) {
      return sql`1=0`;
    }
    return inArray(this.table[field], values);
  }
}

// Pagination helper
export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export async function paginate<T>(
  repository: BaseRepository<T, any, any>,
  options: PaginationOptions,
  where?: SQL,
  orderBy?: SQL
): Promise<PaginatedResult<T>> {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    repository.findMany({ where, orderBy, limit, offset }),
    repository.count(where)
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}

// Soft delete mixin
export interface SoftDeleteEntity {
  id: string;
  deletedAt: Date | null;
}

export class SoftDeleteRepository<T extends SoftDeleteEntity, CreateInput, UpdateInput> 
  extends BaseRepository<T, CreateInput, UpdateInput> {
  
  async findById(id: string): Promise<T | null> {
    const [result] = await pgDb
      .select()
      .from(this.table)
      .where(and(eq(this.table.id, id), sql`${this.table.deletedAt} IS NULL`))
      .limit(1);
    return (result as T) || null;
  }

  async findOne(where: SQL): Promise<T | null> {
    const [result] = await pgDb
      .select()
      .from(this.table)
      .where(and(where, sql`${this.table.deletedAt} IS NULL`))
      .limit(1);
    return (result as T) || null;
  }

  async findMany(options: {
    where?: SQL;
    orderBy?: SQL;
    limit?: number;
    offset?: number;
  } = {}): Promise<T[]> {
    let query = pgDb.select().from(this.table);

    const baseWhere = sql`${this.table.deletedAt} IS NULL`;
    const finalWhere = options.where ? and(options.where, baseWhere) : baseWhere;

    query = query.where(finalWhere);

    if (options.orderBy) {
      query = query.orderBy(options.orderBy);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return (await query) as T[];
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await pgDb
      .update(this.table)
      .set({ deletedAt: new Date() } as any)
      .where(eq(this.table.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await pgDb
      .update(this.table)
      .set({ deletedAt: null } as any)
      .where(eq(this.table.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}
