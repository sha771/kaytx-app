/**
 * Shared database mock for tests
 * Provides a properly structured drizzle-orm compatible mock
 */

import { jest } from '@jest/globals';

// Create a mock query builder chain
const createQueryBuilder = () => ({
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockResolvedValue([]),
  values: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  returning: jest.fn().mockResolvedValue([]),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
});

// Create a comprehensive database mock
export const createMockDb = () => {
  const queryBuilder = createQueryBuilder();
  
  return {
    select: jest.fn(() => queryBuilder),
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
      })),
    })),
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn(() => ({
          returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
        })),
      })),
    })),
    delete: jest.fn(() => ({
      where: jest.fn(() => ({
        returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
      })),
    })),
    execute: jest.fn().mockResolvedValue({ rows: [] }),
    query: jest.fn().mockResolvedValue({ rows: [] }),
    transaction: jest.fn(async (fn) => await fn({
      select: jest.fn(() => queryBuilder),
      insert: jest.fn(() => ({
        values: jest.fn(() => ({
          returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
        })),
      })),
      update: jest.fn(() => ({
        set: jest.fn(() => ({
          where: jest.fn(() => ({
            returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
          })),
        })),
      })),
      delete: jest.fn(() => ({
        where: jest.fn(() => ({
          returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
        })),
      })),
    })),
  };
};

// Mock the entire db module
export const mockDbModule = () => {
  const mockDb = createMockDb();
  
  jest.mock('../../../backend/db/connection', () => ({
    db: mockDb,
    pgDb: mockDb,
    getDb: jest.fn(() => mockDb),
  }));
  
  return mockDb;
};

// Pre-configured mock responses
export const mockResponses = {
  user: {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  organization: {
    id: 'org-123',
    name: 'Test Organization',
    status: 'active',
    createdAt: new Date(),
  },
  auditLog: {
    id: 'audit-123',
    action: 'TEST_ACTION',
    resource: 'test',
    status: 'success',
    severity: 'info',
    timestamp: new Date(),
  },
};

// Helper to setup mock return values
export const setupMockQuery = (mockDb: any, table: string, data: any[]) => {
  const chain = {
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue(data),
  };
  mockDb.select.mockReturnValue(chain);
  return chain;
};

export default { createMockDb, mockDbModule, mockResponses, setupMockQuery };
