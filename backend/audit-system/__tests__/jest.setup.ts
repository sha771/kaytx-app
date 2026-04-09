/**
 * Jest setup for audit system tests
 */

import { closeDatabase } from '../db/connection';

// Clean up database connections after all tests
afterAll(() => {
  closeDatabase();
});

// Set test timeout
jest.setTimeout(30000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to suppress logs during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
