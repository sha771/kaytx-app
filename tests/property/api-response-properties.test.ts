import { describe, it, expect } from '@jest/globals';
import * as fc from 'fast-check';
import { z } from 'zod';

// API response property-based tests
describe('API Response Properties', () => {
  // Common API response schemas
  const successResponseSchema = z.object({
    success: z.literal(true),
    data: z.any(),
    message: z.string().optional(),
    timestamp: z.string().datetime(),
    requestId: z.string().uuid()
  });

  const errorResponseSchema = z.object({
    success: z.literal(false),
    error: z.object({
      code: z.string(),
      message: z.string(),
      details: z.any().optional()
    }),
    timestamp: z.string().datetime(),
    requestId: z.string().uuid()
  });

  describe('Response Structure Validation', () => {
    it('should validate success response structure', () => {
      fc.assert(
        fc.property(
          fc.lorem(),
          fc.uuid(),
          (data, requestId) => {
            const response = {
              success: true,
              data,
              message: undefined,
              timestamp: new Date().toISOString(),
              requestId
            };

            const result = successResponseSchema.safeParse(response);
            expect(result.success).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should validate error response structure', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.oneof(fc.lorem(), fc.constant(undefined)),
          fc.uuid(),
          (errorCode, errorMessage, details, requestId) => {
            const response = {
              success: false,
              error: {
                code: errorCode,
                message: errorMessage,
                details
              },
              timestamp: new Date().toISOString(),
              requestId
            };

            const result = errorResponseSchema.safeParse(response);
            expect(result.success).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Pagination Properties', () => {
    const paginationGenerators = {
      paginatedResponse: fc.record({
        data: fc.array(fc.lorem(), { minLength: 0, maxLength: 100 }),
        pagination: fc.record({
          page: fc.integer({ min: 1, max: 1000 }),
          limit: fc.integer({ min: 1, max: 100 }),
          total: fc.integer({ min: 0, max: 10000 }),
          totalPages: fc.integer({ min: 0, max: 1000 }),
          hasNext: fc.boolean(),
          hasPrev: fc.boolean()
        }),
        success: fc.constant(true),
        timestamp: fc.date().map(d => d.toISOString()),
        requestId: fc.uuid()
      })
    };

    it('should maintain pagination consistency', () => {
      fc.assert(
        fc.property(
          paginationGenerators.paginatedResponse,
          (response) => {
            const { pagination } = response;
            const { page, limit, total, totalPages, hasNext, hasPrev } = pagination;

            // Verify pagination math
            const calculatedTotalPages = Math.ceil(total / limit);
            expect(totalPages).toBe(calculatedTotalPages);

            // Verify navigation flags
            expect(hasPrev).toBe(page > 1);
            expect(hasNext).toBe(page < totalPages);

            // Verify data length doesn't exceed limit
            expect(response.data.length).toBeLessThanOrEqual(limit);

            // Verify page bounds
            expect(page).toBeGreaterThanOrEqual(1);
            expect(page).toBeLessThanOrEqual(totalPages || 1);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Error Handling Properties', () => {
    const errorGenerators = {
      httpError: fc.record({
        status: fc.integer({ min: 400, max: 599 }),
        code: fc.string({ minLength: 1, maxLength: 50 }),
        message: fc.string({ minLength: 1, maxLength: 200 }),
        details: fc.oneof(
          fc.constant(undefined),
          fc.record({
            field: fc.string(),
            value: fc.lorem(),
            constraint: fc.string()
          }),
          fc.array(fc.record({
            field: fc.string(),
            message: fc.string()
          }))
        )
      })
    };

    it('should maintain error response consistency', () => {
      fc.assert(
        fc.property(
          errorGenerators.httpError,
          fc.uuid(),
          (error, requestId) => {
            const response = {
              success: false,
              error,
              timestamp: new Date().toISOString(),
              requestId
            };

            // Verify error structure
            expect(response.success).toBe(false);
            expect(response.error.status).toBeGreaterThanOrEqual(400);
            expect(response.error.status).toBeLessThan(600);
            expect(response.error.code).toBeTruthy();
            expect(response.error.message).toBeTruthy();
            expect(response.requestId).toBe(requestId);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
