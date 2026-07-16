import { Hono } from 'hono';
import crypto from 'crypto';
import { requireAuth } from '../../middleware/rbac-middleware';
import { validateInput, validateBody, validateParams, validateQuery , validationSchemas } from '../../middleware/comprehensive-validation';
import { logAudit } from '../../lib/audit';
import { DatabaseUtils } from '../../utils/database-utils';
import type { RouteContext } from './route-types';

const consent = new Hono<{ Variables: RouteContext['env']['Variables'] }>();

type AppContext = RouteContext;

// Apply authentication to all consent routes
consent.use('*', requireAuth());

// Consent management endpoints
consent.get('/preferences', async (c: AppContext) => {
  try {
    const auth = c.get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    // Get user's current consent preferences
    const [userConsent] = await db.select()
      .from(db.schema?.userConsent || 'user_consent')
      .where((table: any) => table.userId === auth.userId)
      .limit(1);
    
    return c.json({
      success: true,
      data: userConsent || {
        userId: auth.userId,
        emailMarketing: false,
        analytics: false,
        personalization: false,
        thirdPartySharing: false,
        cookies: {
          essential: true,
          functional: false,
          analytics: false,
          marketing: false,
        },
        dataProcessing: {
          profiling: false,
          automatedDecisionMaking: false,
        },
        version: '1.0',
        lastUpdated: null,
      }
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch consent preferences' }, 500);
  }
});

consent.put('/preferences', validateBody(validationSchemas.consentPreferences), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const auth = c.get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    await DatabaseUtils.withTransaction(async (tx) => {
      // Upsert consent preferences
      await tx.insert(db.schema?.userConsent || 'user_consent')
        .values({
          userId: auth.userId,
          organizationId: auth.organizationId,
          ...body,
          version: '1.0',
          lastUpdated: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: (table: any) => table.userId,
          set: {
            ...body,
            version: '1.0',
            lastUpdated: new Date(),
            updatedAt: new Date(),
          }
        });
    });
    
    // Log consent update
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'CONSENT_PREFERENCES_UPDATED',
      resource: 'consent',
      metadata: {
        preferences: body,
        version: '1.0',
      },
      status: 'success',
      severity: 'info',
    });
    
    return c.json({ success: true, message: 'Consent preferences updated successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to update consent preferences' }, 500);
  }
});

// Consent history
consent.get('/history', validateQuery(validationSchemas.consentHistoryQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as any;
    const auth = c.get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    const history = await db.select()
      .from(db.schema?.consentHistory || 'consent_history')
      .where((table: any) => table.userId === auth.userId)
      .orderBy((table: any) => table.createdAt.desc())
      .limit(query.limit || 50)
      .offset(query.offset || 0);
    
    return c.json({
      success: true,
      data: history,
      pagination: {
        limit: query.limit || 50,
        offset: query.offset || 0,
        hasMore: history.length === (query.limit || 50),
      }
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch consent history' }, 500);
  }
});

// Data subject rights
consent.post('/data-request', validateBody(validationSchemas.dataSubjectRequest), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const auth = c.get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    const requestId = crypto.randomUUID();
    
    await DatabaseUtils.withTransaction(async (tx) => {
      await tx.insert(db.schema?.dataSubjectRequests || 'data_subject_requests')
        .values({
          id: requestId,
          userId: auth.userId,
          organizationId: auth.organizationId,
          type: body.type,
          reason: body.reason,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    });
    
    // Log data request
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'DATA_SUBJECT_REQUEST_CREATED',
      resource: 'consent',
      resourceId: requestId,
      metadata: {
        requestType: body.type,
        reason: body.reason,
      },
      status: 'success',
      severity: 'info',
    });
    
    return c.json({
      success: true,
      data: {
        requestId,
        type: body.type,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    return c.json({ error: 'Failed to create data subject request' }, 500);
  }
});

consent.get('/data-requests', validateQuery(validationSchemas.dataSubjectRequestQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as any;
    const auth = c.get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    const requests = await db.select()
      .from(db.schema?.dataSubjectRequests || 'data_subject_requests')
      .where((table: any) => table.userId === auth.userId)
      .orderBy((table: any) => table.createdAt.desc())
      .limit(query.limit || 20)
      .offset(query.offset || 0);
    
    return c.json({
      success: true,
      data: requests,
      pagination: {
        limit: query.limit || 20,
        offset: query.offset || 0,
        hasMore: requests.length === (query.limit || 20),
      }
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch data subject requests' }, 500);
  }
});

// Cookie consent
consent.get('/cookies', async (c: AppContext) => {
  try {
    const auth = (c as any).get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    const [cookieConsent] = await db.select()
      .from(db.schema?.cookieConsent || 'cookie_consent')
      .where(((table: any) => table.userId === auth.userId) as any)
      .limit(1);
    
    return c.json({
      success: true,
      data: cookieConsent || {
        userId: auth.userId,
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
        lastUpdated: null,
      }
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch cookie consent' }, 500);
  }
});

consent.put('/cookies', validateBody(validationSchemas.cookieConsent), async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    await DatabaseUtils.withTransaction(async (tx) => {
      await tx.insert(db.schema?.cookieConsent || 'cookie_consent')
        .values({
          userId: auth.userId,
          organizationId: auth.organizationId,
          ...body,
          lastUpdated: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate(({
          target: (db.schema?.cookieConsent as any)?.userId,
          set: {
            ...body,
            lastUpdated: new Date(),
            updatedAt: new Date(),
          }
        } as any));
    });
    
    // Log cookie consent update
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'COOKIE_CONSENT_UPDATED',
      resource: 'consent',
      metadata: {
        consent: body,
      },
      status: 'success',
      severity: 'info',
    });
    
    return c.json({ success: true, message: 'Cookie consent updated successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to update cookie consent' }, 500);
  }
});

// Withdraw consent
consent.post('/withdraw', validateBody(validationSchemas.consentWithdrawal), async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    await DatabaseUtils.withTransaction(async (tx) => {
      // Update consent preferences to withdraw specific consents
      const updateData: any = {
        lastUpdated: new Date(),
        updatedAt: new Date(),
      };
      
      body.consents.forEach((consentType: string) => {
        updateData[consentType] = false;
      });
      
      await tx.update(db.schema?.userConsent || 'user_consent')
        .set(updateData)
        .where(((table: any) => table.userId === auth.userId) as any);
      
      // Log withdrawal
      await tx.insert(db.schema?.consentHistory || 'consent_history')
        .values({
          userId: auth.userId,
          organizationId: auth.organizationId,
          action: 'withdraw',
          consentTypes: body.consents,
          reason: body.reason,
          createdAt: new Date(),
        });
    });
    
    // Log consent withdrawal
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'CONSENT_WITHDRAWN',
      resource: 'consent',
      metadata: {
        consentTypes: body.consents,
        reason: body.reason,
      },
      status: 'success',
      severity: 'warning',
    });
    
    return c.json({ success: true, message: 'Consent withdrawn successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to withdraw consent' }, 500);
  }
});

// Export user data (GDPR right to data portability)
consent.get('/export', async (c: AppContext) => {
  try {
    const auth = (c as any).get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    // Collect all user data
    const userData = await DatabaseUtils.withTransaction(async (tx) => {
      const [user] = await tx.select()
        .from(db.schema?.users || 'users')
        .where(((table: any) => table.id === auth.userId) as any)
        .limit(1);
      
      const [consent] = await tx.select()
        .from(db.schema?.userConsent || 'user_consent')
        .where(((table: any) => table.userId === auth.userId) as any)
        .limit(1);
      
      const [cookieConsent] = await tx.select()
        .from(db.schema?.cookieConsent || 'cookie_consent')
        .where(((table: any) => table.userId === auth.userId) as any)
        .limit(1);
      
      const requests = await tx.select()
        .from(db.schema?.dataSubjectRequests || 'data_subject_requests')
        .where(((table: any) => table.userId === auth.userId) as any);
      
      return {
        user: {
          id: user?.id,
          email: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          createdAt: user?.createdAt,
          lastLogin: user?.lastLogin,
        },
        consent,
        cookieConsent,
        dataRequests: requests,
        exportDate: new Date().toISOString(),
      };
    });
    
    // Log data export
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'DATA_EXPORTED',
      resource: 'consent',
      metadata: {
        exportType: 'user_data_portability',
      },
      status: 'success',
      severity: 'info',
    });
    
    return c.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    return c.json({ error: 'Failed to export user data' }, 500);
  }
});

// Delete user data (GDPR right to be forgotten)
consent.delete('/delete', validateBody(validationSchemas.dataDeletion), async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    const db = DatabaseUtils.getDatabase() as any;
    
    await DatabaseUtils.withTransaction(async (tx) => {
      // Soft delete user data
      await tx.update(db.schema?.users || 'users')
        .set({
          deletedAt: new Date(),
          deletedBy: auth.userId,
          email: `deleted-${auth.userId}@deleted.com`,
          firstName: 'Deleted',
          lastName: 'User',
          updatedAt: new Date(),
        })
        .where(((table: any) => table.id === auth.userId) as any);
      
      // Anonymize consent data
      await tx.update(db.schema?.userConsent || 'user_consent')
        .set({
          userId: `deleted-${auth.userId}`,
          updatedAt: new Date(),
        })
        .where(((table: any) => table.userId === auth.userId) as any);
      
      // Log deletion request
      await tx.insert(db.schema?.dataSubjectRequests || 'data_subject_requests')
        .values({
          id: crypto.randomUUID(),
          userId: auth.userId,
          organizationId: auth.organizationId,
          type: 'deletion',
          reason: body.reason,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    });
    
    // Log data deletion
    await logAudit({
      userId: auth.userId,
      organizationId: auth.organizationId,
      action: 'USER_DATA_DELETED',
      resource: 'consent',
      metadata: {
        deletionReason: body.reason,
        retentionPeriod: body.retentionPeriod,
      },
      status: 'success',
      severity: 'critical',
    });
    
    return c.json({ success: true, message: 'User data deletion request processed' });
  } catch (error) {
    return c.json({ error: 'Failed to delete user data' }, 500);
  }
});

export default consent;
