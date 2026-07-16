/**
 * API Versioning Middleware Tests
 */

import { describe, it, expect } from '@jest/globals';
import {
  API_VERSIONS,
  LATEST_VERSION,
  DEFAULT_VERSION,
  versionedPath,
} from '../../backend/middleware/api-versioning';

describe('API Versioning', () => {
  describe('Constants', () => {
    it('should define supported versions', () => {
      expect(API_VERSIONS).toContain('v1');
      expect(API_VERSIONS).toContain('v2');
    });

    it('should have v2 as latest', () => {
      expect(LATEST_VERSION).toBe('v2');
    });

    it('should default to v1 for backward compatibility', () => {
      expect(DEFAULT_VERSION).toBe('v1');
    });
  });

  describe('versionedPath', () => {
    it('should build a v1 path by default', () => {
      expect(versionedPath('/users')).toBe('/api/v1/users');
    });

    it('should build a v2 path when specified', () => {
      expect(versionedPath('/users', 'v2')).toBe('/api/v2/users');
    });

    it('should handle paths without leading slash', () => {
      expect(versionedPath('users')).toBe('/api/v1/users');
    });
  });
});
