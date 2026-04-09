import { Hono } from 'hono';
import { z } from 'zod';
import { db as pgDb } from '../../db/connection';
import { 
  gdprRequests, 
  consentRecords, 
  users,
  organizations 
} from '../../db/drizzle-schema';
import { 
  requireAuth, 
  requirePermission 
} from '../../middleware/rbac-middleware';
import { 
  validateBody, 
  validateQuery, 
  validateParams 
} from '../../middleware/validate';
import { 
  Permission 
} from '../../lib/rbac';
import { 
  eq, 
  desc, 
  and, 
  or, 
  like, 
  count 
} from 'drizzle-orm';
import { 
  jsonApiError 
} from '../../lib/api-error';
import { createAuditLog } from '../audit/index';
import { gdprServiceSimple } from '../../services/gdpr-service-simple';
import crypto from 'crypto';

const gdprRouter = new Hono();

// Apply authentication to all GDPR routes
gdprRouter.use('*', requireAuth());

// =============================================================================
// GDPR REQUEST MANAGEMENT
// =============================================================================

const createGDPRRequestSchema = z.object({
  type: z.enum(['access', 'rectification', 'erasure', 'portability', 'restriction', 'objection']),
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  requestData: z.record(z.any()).optional().default({}),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional().default('medium'),
  dueDate: z.string().datetime().optional(),
  notes: z.string().optional(),
}).refine(
  (data) => data.userId || data.email,
  {
    message: "Either userId or email must be provided",
    path: ["userId", "email"]
  }
);

gdprRouter.post(
  '/requests',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(createGDPRRequestSchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const gdprRequest = await gdprServiceSimple.createGDPRRequest({
        organizationId: auth.organizationId,
        type: body.type,
        userId: body.userId,
        email: body.email,
        requestData: body.requestData,
        priority: body.priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        notes: body.notes
      });

      return c.json({
        success: true,
        data: gdprRequest,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create GDPR request');
    }
  }
);

gdprRouter.get(
  '/requests',
  requirePermission(Permission.GDPR_READ),
  validateQuery(z.object({
    status: z.string().optional(),
    type: z.string().optional(),
    userId: z.string().uuid().optional(),
    email: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(20),
    offset: z.string().transform(Number).pipe(z.number().min(0)).optional().default(0),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      const result = await gdprServiceSimple.listGDPRRequests(auth.organizationId, {
        status: query.status,
        type: query.type,
        userId: query.userId,
        email: query.email,
        limit: query.limit,
        offset: query.offset,
      });

      return c.json({
        success: true,
        data: result,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch GDPR requests');
    }
  }
);

gdprRouter.get(
  '/requests/:id',
  requirePermission(Permission.GDPR_READ),
  validateParams(z.object({ id: z.string().uuid() })),
  async (c) => {
    const auth = c.get('auth');
    const params = c.get('validatedParams') as any;
    
    try {
      const request = await gdprServiceSimple.getGDPRRequest(params.id);
      
      if (!request) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'GDPR request not found');
      }

      if (request.organizationId !== auth.organizationId) {
        return jsonApiError(c, 403, 'FORBIDDEN', 'Access denied');
      }

      return c.json({
        success: true,
        data: request,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch GDPR request');
    }
  }
);

gdprRouter.put(
  '/requests/:id',
  requirePermission(Permission.GDPR_MANAGE),
  validateParams(z.object({ id: z.string().uuid() })),
  validateBody(z.object({
    status: z.enum(['pending', 'processing', 'completed', 'rejected']).optional(),
    responseData: z.record(z.any()).optional(),
    notes: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const params = c.get('validatedParams') as any;
    const body = c.get('validatedBody') as any;
    
    try {
      // First check if request exists and belongs to organization
      const existingRequest = await gdprServiceSimple.getGDPRRequest(params.id);
      
      if (!existingRequest) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'GDPR request not found');
      }

      if (existingRequest.organizationId !== auth.organizationId) {
        return jsonApiError(c, 403, 'FORBIDDEN', 'Access denied');
      }

      const updatedRequest = await gdprServiceSimple.updateGDPRRequest(params.id, {
        ...body,
        processedBy: auth.userId
      });

      return c.json({
        success: true,
        data: updatedRequest,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to update GDPR request');
    }
  }
);

// =============================================================================
// CONSENT MANAGEMENT
// =============================================================================

const recordConsentSchema = z.object({
  userId: z.string().uuid(),
  purpose: z.enum(['marketing', 'analytics', 'personalization', 'essential', 'third_party_sharing']),
  granted: z.boolean(),
  version: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  consentText: z.string().optional(),
  legalBasis: z.string().optional(),
  processingActivities: z.array(z.string()).optional(),
  dataCategories: z.array(z.string()).optional(),
  retentionPeriod: z.number().optional(),
  thirdParties: z.array(z.string()).optional(),
});

gdprRouter.post(
  '/consent',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(recordConsentSchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const consentRecord = await gdprServiceSimple.recordConsent(
        auth.organizationId,
        body.userId,
        {
          purpose: body.purpose,
          granted: body.granted,
          version: body.version,
          ipAddress: body.ipAddress || c.req.header('x-forwarded-for') || 'unknown',
          userAgent: body.userAgent || c.req.header('user-agent') || 'unknown',
          consentText: body.consentText,
          legalBasis: body.legalBasis,
          processingActivities: body.processingActivities,
          dataCategories: body.dataCategories,
          retentionPeriod: body.retentionPeriod,
          thirdParties: body.thirdParties,
        }
      );

      return c.json({
        success: true,
        data: consentRecord,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to record consent');
    }
  }
);

gdprRouter.get(
  '/consent/check',
  requirePermission(Permission.GDPR_READ),
  validateQuery(z.object({
    userId: z.string().uuid(),
    purpose: z.enum(['marketing', 'analytics', 'personalization', 'essential', 'third_party_sharing']),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      const consentCheck = await gdprServiceSimple.checkConsent(
        auth.organizationId,
        query.userId,
        query.purpose
      );

      return c.json({
        success: true,
        data: consentCheck,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to check consent');
    }
  }
);

gdprRouter.post(
  '/consent/withdraw',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(z.object({
    userId: z.string().uuid(),
    purpose: z.enum(['marketing', 'analytics', 'personalization', 'essential', 'third_party_sharing']),
    reason: z.string().optional(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const result = await gdprServiceSimple.withdrawConsent(
        auth.organizationId,
        body.userId,
        body.purpose,
        body.reason
      );

      return c.json({
        success: true,
        data: { withdrawn: result },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to withdraw consent');
    }
  }
);

gdprRouter.get(
  '/consent/records',
  requirePermission(Permission.GDPR_READ),
  validateQuery(z.object({
    userId: z.string().uuid().optional(),
    purpose: z.enum(['marketing', 'analytics', 'personalization', 'essential', 'third_party_sharing']).optional(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      const records = await gdprServiceSimple.getConsentRecords(
        auth.organizationId,
        query.userId,
        query.purpose
      );

      return c.json({
        success: true,
        data: records,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch consent records');
    }
  }
);

// =============================================================================
// DATA ACCESS REQUESTS
// =============================================================================

gdprRouter.post(
  '/access-request',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(z.object({
    userId: z.string().uuid(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const dataMapping = await gdprServiceSimple.processAccessRequest(
        auth.organizationId,
        body.userId
      );

      return c.json({
        success: true,
        data: dataMapping,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to process access request');
    }
  }
);

gdprRouter.post(
  '/erasure-request',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(z.object({
    userId: z.string().uuid(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const result = await gdprServiceSimple.processErasureRequest(
        auth.organizationId,
        body.userId
      );

      return c.json({
        success: true,
        data: { erased: result },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to process erasure request');
    }
  }
);

gdprRouter.post(
  '/portability-request',
  requirePermission(Permission.GDPR_MANAGE),
  validateBody(z.object({
    userId: z.string().uuid(),
  })),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const exportData = await gdprServiceSimple.processDataPortabilityRequest(
        auth.organizationId,
        body.userId
      );

      return c.json({
        success: true,
        data: exportData,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to process portability request');
    }
  }
);

// =============================================================================
// GDPR DASHBOARD
// =============================================================================

gdprRouter.get(
  '/dashboard',
  requirePermission(Permission.GDPR_READ),
  async (c) => {
    const auth = c.get('auth');
    
    try {
      const orgId = auth.organizationId;
      
      // Get GDPR request metrics
      const [requestMetrics] = await pgDb
        .select({
          totalRequests: count(),
          pendingRequests: count(sql`CASE WHEN status = 'pending' THEN 1 END`),
          processingRequests: count(sql`CASE WHEN status = 'processing' THEN 1 END`),
          completedRequests: count(sql`CASE WHEN status = 'completed' THEN 1 END`),
          rejectedRequests: count(sql`CASE WHEN status = 'rejected' THEN 1 END`),
        })
        .from(gdprRequests)
        .where(eq(gdprRequests.organizationId, orgId));

      // Get consent metrics
      const [consentMetrics] = await pgDb
        .select({
          totalConsents: count(),
          grantedConsents: count(sql`CASE WHEN status = 'granted' THEN 1 END`),
          withdrawnConsents: count(sql`CASE WHEN status = 'withdrawn' THEN 1 END`),
        })
        .from(consentRecords)
        .where(eq(consentRecords.organizationId, orgId));

      // Get requests by type
      const requestsByType = await pgDb
        .select({
          type: gdprRequests.requestType,
          count: count(),
        })
        .from(gdprRequests)
        .where(eq(gdprRequests.organizationId, orgId))
        .groupBy(gdprRequests.requestType);

      // Get recent requests
      const recentRequests = await pgDb
        .select({
          id: gdprRequests.id,
          type: gdprRequests.requestType,
          status: gdprRequests.status,
          priority: gdprRequests.priority,
          createdAt: gdprRequests.createdAt,
          dueDate: gdprRequests.dueDate,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(gdprRequests)
        .leftJoin(users, eq(gdprRequests.userId, users.id))
        .where(eq(gdprRequests.organizationId, orgId))
        .orderBy(desc(gdprRequests.createdAt))
        .limit(10);

      // Calculate compliance scores
      const completionRate = requestMetrics.totalRequests > 0 
        ? (requestMetrics.completedRequests / requestMetrics.totalRequests) * 100 
        : 100;

      const consentHealth = consentMetrics.totalConsents > 0 
        ? (consentMetrics.grantedConsents / consentMetrics.totalConsents) * 100 
        : 100;

      const overallScore = (completionRate + consentHealth) / 2;

      return c.json({
        success: true,
        data: {
          metrics: {
            requests: requestMetrics,
            consents: consentMetrics,
            requestsByType,
          },
          scores: {
            overall: Math.round(overallScore),
            completionRate: Math.round(completionRate),
            consentHealth: Math.round(consentHealth),
          },
          recentRequests,
          recommendations: generateGDPRRecommendations({
            completionRate,
            consentHealth,
            requestMetrics,
          }),
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch GDPR dashboard');
    }
  }
);

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateGDPRRecommendations(metrics: any): any[] {
  const recommendations = [];

  if (metrics.completionRate < 80) {
    recommendations.push({
      category: 'request_processing',
      priority: 'high',
      title: 'Improve Request Processing Time',
      description: 'Many GDPR requests are pending. Consider implementing automated workflows to reduce processing time.',
      estimatedEffort: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (metrics.consentHealth < 90) {
    recommendations.push({
      category: 'consent_management',
      priority: 'medium',
      title: 'Review Consent Records',
      description: 'Some consent records have been withdrawn. Review consent management processes and ensure proper documentation.',
      estimatedEffort: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (metrics.requestMetrics.pendingRequests > 10) {
    recommendations.push({
      category: 'backlog_management',
      priority: 'critical',
      title: 'Address Request Backlog',
      description: `There are ${metrics.requestMetrics.pendingRequests} pending requests. Immediate attention required to meet GDPR deadlines.`,
      estimatedEffort: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return recommendations;
}

export default gdprRouter;
