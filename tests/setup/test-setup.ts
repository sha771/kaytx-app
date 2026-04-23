import { Hono } from 'hono';
import { appRouter } from '../../backend/trpc/app-router';

let testApp: Hono | null = null;

export function setupTestApp(): Hono {
  if (testApp) {
    return testApp;
  }

  testApp = new Hono();
  
  return testApp;
}

export function cleanupTestApp(): void {
  testApp = null;
}

export async function createTestUser(overrides: Partial<any> = {}): Promise<any> {
  return {
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'user',
    organizationId: 'test-org-id',
    ...overrides
  };
}

export async function createTestOrganization(overrides: Partial<any> = {}): Promise<any> {
  return {
    id: 'test-org-id',
    name: 'Test Organization',
    ...overrides
  };
}
