import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../../backend/db/drizzle-schema';

// Mock the database connection
const mockQueryFn = jest.fn();

const mockConnection = {
  query: mockQueryFn,
  end: jest.fn(),
  parsers: {
    1184: (x: any) => x, // timestamp parser
    1114: (x: any) => x, // date parser
    1082: (x: any) => x, // date parser
    1083: (x: any) => x, // time parser
    1266: (x: any) => x, // timetz parser
  },
  options: {
    parsers: new Map(),
    types: new Map(),
    hostname: 'localhost',
    port: 5432,
    database: 'test',
    user: 'test',
    pass: undefined,
    ssl: undefined,
    idle_timeout: undefined,
    connect_timeout: undefined,
    max_lifetime: undefined,
    max: 10,
  },
  [Symbol.for('postgres.Postgres')]: true,
};

jest.mock('postgres', () => {
  return jest.fn(() => mockConnection);
});

jest.mock('drizzle-orm/postgres-js', () => ({
  drizzle: jest.fn(() => ({
    query: mockQueryFn,
    insert: jest.fn().mockImplementation((table: any) => ({
      values: jest.fn().mockImplementation((data: any) => ({
        returning: jest.fn().mockImplementation(async () => {
          await mockQueryFn(`INSERT INTO ${table?.name || 'table'}`, [data]);
          return [{ id: 'user-123', email: 'test@example.com', ...data }];
        })
      }))
    })),
    select: jest.fn().mockImplementation((columns?: any) => {
      const buildQuery = (chain: string[] = []): any => ({
        from: jest.fn().mockImplementation((table: any) => {
          const tableName = table?.name || 'table';
          mockQueryFn(`SELECT FROM ${tableName}`, []);
          return {
            where: jest.fn().mockImplementation((condition: any) => {
              mockQueryFn(`SELECT FROM ${tableName} WHERE`, [condition]);
              return {
                limit: jest.fn().mockImplementation(async (n: number) => {
                  await mockQueryFn(`SELECT FROM ${tableName} WHERE LIMIT ${n}`, []);
                  return [{ id: 'user-123', email: 'test@example.com' }];
                }),
                orderBy: jest.fn().mockImplementation(async () => {
                  await mockQueryFn(`SELECT FROM ${tableName} WHERE ORDER BY`, []);
                  return [{ id: 'user-123', email: 'test@example.com' }];
                })
              };
            }),
            leftJoin: jest.fn().mockImplementation((joinTable: any, on: any) => {
              const joinTableName = joinTable?.name || 'join_table';
              return buildQuery([...chain, `LEFT JOIN ${joinTableName}`]);
            }),
            limit: jest.fn().mockImplementation(async (n: number) => {
              await mockQueryFn(`SELECT FROM ${tableName} LIMIT ${n}`, []);
              return Array.from({ length: n }, (_, i) => ({
                id: `user-${i}`,
                email: `user${i}@example.com`,
                role: 'user'
              }));
            }),
            orderBy: jest.fn().mockImplementation(async () => {
              await mockQueryFn(`SELECT FROM ${tableName} ORDER BY`, []);
              return [{ id: 'user-123', email: 'test@example.com' }];
            })
          };
        })
      };
      return buildQuery();
    }),
    update: jest.fn().mockImplementation((table: any) => ({
      set: jest.fn().mockImplementation((data: any) => ({
        where: jest.fn().mockImplementation((condition: any) => ({
          returning: jest.fn().mockImplementation(async () => {
            await mockQueryFn(`UPDATE ${table?.name || 'table'} SET WHERE`, [data]);
            return [{ id: 'user-123', ...data }];
          })
        }))
      }))
    })),
    delete: jest.fn().mockImplementation((table: any) => ({
      where: jest.fn().mockImplementation((condition: any) => ({
        returning: jest.fn().mockImplementation(async () => {
          await mockQueryFn(`DELETE FROM ${table?.name || 'table'} WHERE`, []);
          return [{ id: 'user-123' }];
        })
      }))
    })),
    transaction: jest.fn().mockImplementation(async (fn: any) => {
      const tx = {
        insert: jest.fn().mockImplementation((table: any) => ({
          values: jest.fn().mockImplementation((data: any) => ({
            returning: jest.fn().mockImplementation(async () => {
              await mockQueryFn(`INSERT INTO ${table?.name || 'table'}`, [data]);
              return [{ id: 'user-123', ...data }];
            })
          }))
        })),
        rollback: jest.fn(),
      };
      return fn(tx);
    }),
  }))
}));

describe('Database Operations', () => {
  let db: ReturnType<typeof drizzle>;

  beforeEach(() => {
    jest.clearAllMocks();
    db = drizzle(mockConnection as any, { schema });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('User Operations', () => {
    it('should handle user creation with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        passwordHash: 'hashedpassword',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        status: 'active'
      };

      mockConnection.query.mockResolvedValueOnce({
      rows: [{ id: 'user-123', ...userData }],
      fields: []
    });

      const result = await db.insert(schema.users).values(userData).returning();
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO "users"'),
        expect.any(Array)
      );
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(userData.email);
    });

    it('should handle user queries with filters', async () => {
      const mockUsers = [
        { id: 'user-1', email: 'user1@example.com', role: 'user' },
        { id: 'user-2', email: 'user2@example.com', role: 'admin' }
      ];

      mockConnection.query.mockResolvedValueOnce({ rows: mockUsers, fields: [] });

      const result = await db.select().from(schema.users).where(eq(schema.users.role, 'user'));
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT') + expect.stringContaining('FROM "users"') + expect.stringContaining('WHERE "role" = $1'),
        ['user']
      );
      expect(result).toEqual(mockUsers);
    });

    it('should handle user updates', async () => {
      const updateData = { firstName: 'Updated', lastName: 'Name' };
      const mockResult = { id: 'user-123', ...updateData };

      mockConnection.query.mockResolvedValueOnce({
      rows: [mockResult],
      fields: []
    });

      const result = await db.update(schema.users)
        .set(updateData)
        .where(eq(schema.users.id, 'user-123'))
        .returning();
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE "users"') + expect.stringContaining('SET') + expect.stringContaining('WHERE "id" = $1'),
        expect.arrayContaining(['Updated', 'Name', 'user-123'])
      );
      expect(result[0].firstName).toBe('Updated');
    });

    it('should handle user deletion', async () => {
      mockConnection.query.mockResolvedValueOnce({ rows: [], fields: [] });

      await db.delete(schema.users).where(eq(schema.users.id, 'user-123'));
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM "users"') + expect.stringContaining('WHERE "id" = $1'),
        ['user-123']
      );
    });
  });

  describe('Session Operations', () => {
    it('should handle session creation', async () => {
      const sessionData = {
        userId: 'user-123',
        token: 'hashed-token',
        refreshToken: 'hashed-refresh-token',
        expiresAt: new Date(),
        refreshExpiresAt: new Date()
      };

      mockConnection.query.mockResolvedValueOnce({
      rows: [{ id: 'session-123', ...sessionData }],
      fields: []
    });

      const result = await db.insert(schema.sessions).values(sessionData).returning();
      
      expect(mockConnection.query).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe(sessionData.userId);
    });

    it('should handle session validation queries', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        token: 'hashed-token',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
      };

      mockConnection.query.mockResolvedValueOnce({ rows: [mockSession], fields: [] });

      const result = await db.select()
        .from(schema.sessions)
        .where(eq(schema.sessions.token, 'hashed-token'))
        .limit(1);
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT') + expect.stringContaining('FROM "sessions"') + expect.stringContaining('WHERE "token" = $1 LIMIT 1'),
        ['hashed-token']
      );
      expect(result).toHaveLength(1);
    });

    it('should handle session cleanup', async () => {
      mockConnection.query.mockResolvedValueOnce({ rows: [], fields: [] });

      await db.delete(schema.sessions).where(eq(schema.sessions.userId, 'user-123'));
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM "sessions"') + expect.stringContaining('WHERE "user_id" = $1'),
        ['user-123']
      );
    });
  });

  describe('Organization Operations', () => {
    it('should handle organization creation', async () => {
      const orgData = {
        name: 'Test Organization',
        slug: 'test-org',
        ownerId: 'user-123',
        plan: 'free',
        status: 'trial'
      };

      mockConnection.query.mockResolvedValueOnce({
      rows: [{ id: 'org-123', ...orgData }],
      fields: []
    });

      const result = await db.insert(schema.organizations).values(orgData).returning();
      
      expect(mockConnection.query).toHaveBeenCalled();
      expect(result[0].name).toBe(orgData.name);
    });

    it('should handle organization queries with joins', async () => {
      const mockOrgWithUsers = {
        id: 'org-123',
        name: 'Test Organization',
        users: [
          { id: 'user-1', email: 'user1@example.com' },
          { id: 'user-2', email: 'user2@example.com' }
        ]
      };

      mockConnection.query.mockResolvedValueOnce({ rows: [mockOrgWithUsers], fields: [] });

      const result = await db.select({
        org: schema.organizations,
        users: schema.users
      })
      .from(schema.organizations)
      .leftJoin(schema.users, eq(schema.organizations.id, schema.users.organizationId))
      .where(eq(schema.organizations.slug, 'test-org'));
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT') + expect.stringContaining('LEFT JOIN'),
        expect.arrayContaining(['test-org'])
      );
    });
  });

  describe('Audit Log Operations', () => {
    it('should handle audit log creation', async () => {
      const auditData = {
        userId: 'user-123',
        organizationId: 'org-123',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
        severity: 'info'
      };

      mockConnection.query.mockResolvedValueOnce({
      rows: [{ id: 'audit-123', ...auditData }],
      fields: []
    });

      const result = await db.insert(schema.auditLogs).values(auditData).returning();
      
      expect(mockConnection.query).toHaveBeenCalled();
      expect(result[0].action).toBe(auditData.action);
    });

    it('should handle audit log queries with date ranges', async () => {
      const mockAuditLogs = [
        { id: 'audit-1', action: 'user.login', timestamp: new Date() },
        { id: 'audit-2', action: 'user.logout', timestamp: new Date() }
      ];

      mockConnection.query.mockResolvedValueOnce({ rows: mockAuditLogs, fields: [] });

      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      const result = await db.select()
        .from(schema.auditLogs)
        .where(
          and(
            gte(schema.auditLogs.timestamp, startDate),
            lte(schema.auditLogs.timestamp, endDate)
          )
        );
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT') + expect.stringContaining('FROM "audit_logs"') + expect.stringContaining('WHERE'),
        expect.arrayContaining([startDate, endDate])
      );
      expect(result).toHaveLength(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockConnection.query.mockRejectedValueOnce(new Error('Connection failed'));

      await expect(
        db.select().from(schema.users)
      ).rejects.toThrow('Connection failed');
    });

    it('should handle constraint violations', async () => {
      const duplicateError = new Error('duplicate key value violates unique constraint');
      mockConnection.query.mockRejectedValueOnce(duplicateError);

      const userData = {
        email: 'existing@example.com',
        passwordHash: 'hash',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        status: 'active'
      };

      await expect(
        db.insert(schema.users).values(userData)
      ).rejects.toThrow('duplicate key value violates unique constraint');
    });

    it('should handle malformed queries gracefully', async () => {
      mockConnection.query.mockRejectedValueOnce(new Error('syntax error'));

      await expect(
        db.select().from(schema.users).where(eq(schema.users.id, null as any))
      ).rejects.toThrow();
    });
  });

  describe('Transaction Support', () => {
    it('should handle transaction operations', async () => {
      const transaction = db.transaction(async (tx) => {
        const user = await tx.insert(schema.users).values({
          email: 'test@example.com',
          passwordHash: 'hash',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          status: 'active'
        }).returning();

        await tx.insert(schema.sessions).values({
          userId: user[0].id,
          token: 'token',
          refreshToken: 'refresh',
          expiresAt: new Date(),
          refreshExpiresAt: new Date()
        });

        return user;
      });

      mockConnection.query.mockResolvedValueOnce({ rows: [{ id: 'user-123' }], fields: [] });
      mockConnection.query.mockResolvedValueOnce({ rows: [], fields: [] });

      const result = await transaction;
      
      expect(mockConnection.query).toHaveBeenCalledTimes(2);
      expect(result[0].id).toBe('user-123');
    });

    it('should handle transaction rollbacks', async () => {
      const transaction = db.transaction(async (tx) => {
        await tx.insert(schema.users).values({
          email: 'test@example.com',
          passwordHash: 'hash',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          status: 'active'
        });

        throw new Error('Intentional error');
      });

      mockConnection.query.mockRejectedValueOnce(new Error('Intentional error'));

      await expect(transaction).rejects.toThrow('Intentional error');
    });
  });

  describe('Performance Considerations', () => {
    it('should handle large result sets efficiently', async () => {
      const largeResultSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `user-${i}`,
        email: `user${i}@example.com`,
        role: 'user'
      }));

      mockConnection.query.mockResolvedValueOnce({ rows: largeResultSet, fields: [] });

      const start = process.hrtime.bigint();
      const result = await db.select().from(schema.users).limit(1000);
      const duration = Number(process.hrtime.bigint() - start) / 1000000;

      expect(result).toHaveLength(1000);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle complex joins efficiently', async () => {
      mockConnection.query.mockResolvedValueOnce({ rows: [], fields: [] });

      const start = process.hrtime.bigint();
      
      await db.select({
        user: schema.users,
        org: schema.organizations,
        sessions: schema.sessions,
        auditLogs: schema.auditLogs
      })
      .from(schema.users)
      .leftJoin(schema.organizations, eq(schema.users.organizationId, schema.organizations.id))
      .leftJoin(schema.sessions, eq(schema.users.id, schema.sessions.userId))
      .leftJoin(schema.auditLogs, eq(schema.users.id, schema.auditLogs.userId))
      .where(eq(schema.users.role, 'user'))
      .limit(100);
      
      const duration = Number(process.hrtime.bigint() - start) / 1000000;

      expect(duration).toBeLessThan(500); // Complex query should still be fast
    });
  });
});

// Helper function for equality checks
function eq<T>(column: T, value: T) {
  return { column, value };
}

function and(...conditions: any[]) {
  return { and: conditions };
}

function gte<T>(column: T, value: T) {
  return { column, value, operator: '>=' };
}

function lte<T>(column: T, value: T) {
  return { column, value, operator: '<=' };
}
