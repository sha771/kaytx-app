/**
 * Test database utilities for integration tests
 */
import { ProductionLogger } from './production-logger';

// In-memory storage for tests
const testUsers = new Map<string, any>();
const testSessions = new Map<string, any>();

export function setupTestDatabase() {
  ProductionLogger.info('[TEST-DB] Setting up test database');
  // Override database for tests
  const mockDb = {
    select: () => ({
      from: (table: any) => {
        // Handle different table references
        const tableName = table?.name || table?.tableName || 'users';
        
        return {
          where: (condition: any) => {
            // Handle different condition types
            let filteredUsers = Array.from(testUsers.values());
            
            // Try to extract user ID from condition
            if (condition && typeof condition === 'object') {
              ProductionLogger.debug(`[TEST-DB] Processing condition`, { condition });
              
              // Handle eq() conditions from Drizzle
              if (condition.left && condition.right) {
                const fieldName = condition.left.name || condition.left.column?.name || condition.left.table?.name || 'id';
                const value = condition.right;
                
                ProductionLogger.debug(`[TEST-DB] Filtering by field`, { fieldName, value });
                
                if (fieldName === 'id') {
                  filteredUsers = filteredUsers.filter(user => user.id === value);
                } else if (fieldName === 'email') {
                  filteredUsers = filteredUsers.filter(user => user.email === value);
                }
              }
              // Handle simple object conditions
              else if (condition.id) {
                filteredUsers = filteredUsers.filter(user => user.id === condition.id);
              }
              // Handle nested conditions with operators
              else if (condition.ops && condition.ops.length > 0) {
                const op = condition.ops[0];
                if (op.name === 'eq' && op.args && op.args.length >= 2) {
                  const fieldName = op.args[0].name || op.args[0].column?.name || 'id';
                  const value = op.args[1];
                  ProductionLogger.debug(`[TEST-DB] Filtering by eq field`, { fieldName, value });
                  
                  if (fieldName === 'id') {
                    filteredUsers = filteredUsers.filter(user => user.id === value);
                  } else if (fieldName === 'email') {
                    filteredUsers = filteredUsers.filter(user => user.email === value);
                  }
                }
              }
            }
            
            return {
              limit: (limit?: number) => {
                const result = limit ? filteredUsers.slice(0, limit) : filteredUsers;
                ProductionLogger.debug(`[TEST-DB] User lookup`, { condition, resultCount: result.length, limit, availableUsers: Array.from(testUsers.keys()) });
                return Promise.resolve(result);
              },
            };
          },
          orderBy: () => ({
            where: () => ({
              limit: () => {
                if (tableName.includes('user')) {
                  const users = Array.from(testUsers.values());
                  ProductionLogger.debug(`[TEST-DB] Returning users`, { count: users.length, source: 'ordered+where' });
                  return Promise.resolve(users);
                }
                return Promise.resolve([]);
              },
            }),
            limit: () => {
              if (tableName.includes('user')) {
                const users = Array.from(testUsers.values());
                ProductionLogger.debug(`[TEST-DB] Returning users`, { count: users.length, source: 'ordered' });
                return Promise.resolve(users);
              }
              return Promise.resolve([]);
            },
          }),
          limit: () => {
            if (tableName.includes('user')) {
              const users = Array.from(testUsers.values());
              ProductionLogger.debug(`[TEST-DB] Returning users`, { count: users.length, source: 'limited' });
              return Promise.resolve(users);
            }
            return Promise.resolve([]);
          },
        };
      },
    }),
    insert: (table: any) => ({
      values: (data: any) => ({
        returning: () => {
          const tableName = table?.name || table?.tableName || 'users';
          ProductionLogger.debug(`[TEST-DB] Insert into table`, { table: tableName, data });
          if (tableName.includes('user')) {
            const user = {
              id: data.id || 'test-user-' + Date.now(),
              ...data,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            testUsers.set(user.id, user);
            ProductionLogger.info(`[TEST-DB] Created user`, { userId: user.id, totalUsers: testUsers.size });
            return Promise.resolve([user]);
          }
          return Promise.resolve([]);
        },
      }),
    }),
    update: (table: any) => ({
      set: (data: any) => ({
        where: (condition: any) => ({
          returning: () => Promise.resolve([]),
        }),
      }),
    }),
    delete: (table: any) => ({
      where: (condition: any) => ({
        returning: () => Promise.resolve([]),
      }),
    }),
    execute: () => Promise.resolve({ rows: [] }),
  };

  return mockDb;
}

export function clearTestDatabase() {
  testUsers.clear();
  testSessions.clear();
  ProductionLogger.info('[TEST-DB] Cleared all test data');
}

export function getTestUsers() {
  return testUsers;
}

export function getTestSessions() {
  return testSessions;
}
