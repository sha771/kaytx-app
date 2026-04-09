/**
 * Property-based tests for configuration validation
 * Feature: platform-audit-and-cleanup
 * Property 9: Configuration Validation
 * Validates: Requirements 4.6, 4.7, 4.8
 */

import { describe, test, expect } from '@jest/globals';
import * as fc from 'fast-check';
import {
  validateConfig,
  validateConfigSafe,
  validateEnvironmentVariables,
  validateEnvironmentVariablesSafe,
  DEFAULT_AUDIT_CONFIG,
  mergeWithDefaults,
} from '../config/schema';
import type { AuditConfig } from '../models/types';

describe('Feature: platform-audit-and-cleanup, Property 9: Configuration Validation', () => {
  describe('Configuration validation', () => {
    test('should accept valid configurations', () => {
      const validConfig = {
        scanning: {
          includePatterns: ['**/*.ts'],
          excludePatterns: ['**/*.test.ts'],
          maxFileSize: 1024 * 1024,
          parallelWorkers: 4,
          followSymlinks: false,
          maxDepth: 50,
        },
        detection: {
          duplicateThreshold: 0.7,
          complexityThreshold: 20,
          coverageThreshold: 0.8,
          securityRules: [],
          enabledDetectors: [
            'duplicate_service',
            'incomplete_implementation',
            'unused_code',
            'configuration_issue',
            'security_issue',
            'documentation_gap',
            'test_coverage_gap',
            'complexity_issue',
            'dependency_cycle',
          ],
        },
        execution: {
          autoExecute: true,
          testAfterEachAction: true,
          rollbackOnFailure: true,
          backupRetentionDays: 30,
          dryRun: false,
        },
        reporting: {
          defaultFormat: 'json',
          includeGraphs: true,
          emailNotifications: false,
          outputDirectory: './reports',
        },
      };
      
      expect(() => validateConfig(validConfig)).not.toThrow();
      expect(validateConfigSafe(validConfig).success).toBe(true);
    });
  });
});