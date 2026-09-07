import { db } from '../db/connection';
import { contextSessions, users, organizations, companyStructure, companyGoals, knowledgeNodes } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';

export interface UserContext {
  userId: string;
  organizationId: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  permissions: string[];
  currentCustomer?: string;
  currentProject?: string;
  currentTask?: string;
  companyGoals: string[];
  recentActivity: string[];
  sessionContext: Record<string, any>;
}

export interface ContextEnrichedQuery {
  originalQuery: string;
  enrichedQuery: string;
  context: UserContext;
  filters: Record<string, any>;
  priorities: string[];
}

export class CompanyBrainContextService {
  async getContext(userId: string, organizationId: string): Promise<UserContext> {
    let userRecord: any = { firstName: 'User', lastName: '', email: '', role: 'user' };
    let orgRecord: any = { name: 'Organization' };
    let department = '';
    let permissions: string[] = ['knowledge:read'];

    try {
      const usersResult = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (usersResult.length > 0) userRecord = usersResult[0];
    } catch {}

    try {
      const orgResult = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
      if (orgResult.length > 0) orgRecord = orgResult[0];
    } catch {}

    try {
      const depts = await db.select().from(companyStructure)
        .where(and(eq(companyStructure.organizationId, organizationId), eq(companyStructure.type, 'department')));
      for (const d of depts) {
        if (d.headUserId === userId) { department = d.name; break; }
      }
    } catch {}

    let companyGoalNames: string[] = [];
    try {
      const goals = await db.select().from(companyGoals)
        .where(and(eq(companyGoals.organizationId, organizationId), eq(companyGoals.status, 'active')));
      companyGoalNames = goals.map(g => g.name);
    } catch {}

    let recentActivity: string[] = [];
    try {
      const recentNodes = await db.select()
        .from(knowledgeNodes)
        .where(and(eq(knowledgeNodes.organizationId, organizationId), eq(knowledgeNodes.createdBy, userId)))
        .orderBy(desc(knowledgeNodes.createdAt))
        .limit(5);
      recentActivity = recentNodes.map(n => n.label);
    } catch {}

    return {
      userId,
      organizationId,
      email: userRecord.email || '',
      name: `${userRecord.firstName || ''} ${userRecord.lastName || ''}`.trim() || 'User',
      role: userRecord.role || 'user',
      department,
      permissions: [...permissions, ...(orgRecord.settings?.permissions || [])],
      companyGoals: companyGoalNames,
      recentActivity,
      sessionContext: {},
    };
  }

  async enrichQuery(originalQuery: string, context: UserContext): Promise<ContextEnrichedQuery> {
    const goalContext = context.companyGoals.length > 0
      ? `Company goals: ${context.companyGoals.join(', ')}. `
      : '';

    const deptContext = context.department
      ? `Department: ${context.department}. `
      : '';

    const enrichedQuery = `[Context: User=${context.name}, Role=${context.role}, ${deptContext}${goalContext}] ${originalQuery}`;

    const filters: Record<string, any> = {};
    if (context.department) filters.department = context.department;

    return {
      originalQuery,
      enrichedQuery,
      context,
      filters,
      priorities: context.companyGoals,
    };
  }

  async createSession(opts: {
    organizationId: string;
    userId: string;
    sessionType: string;
    context?: Record<string, any>;
    ttlMinutes?: number;
  }): Promise<string> {
    const id = crypto.randomUUID();
    try {
      await db.insert(contextSessions).values({
        id,
        organizationId: opts.organizationId,
        userId: opts.userId,
        sessionType: opts.sessionType,
        context: JSON.stringify(opts.context || {}),
        isActive: true,
        expiresAt: opts.ttlMinutes ? new Date(Date.now() + opts.ttlMinutes * 60 * 1000) : null,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch {}
    return id;
  }

  async updateSession(sessionId: string, context: Record<string, any>): Promise<void> {
    try {
      await db.update(contextSessions)
        .set({ context: JSON.stringify(context), updatedAt: new Date() })
        .where(eq(contextSessions.id, sessionId));
    } catch {}
  }

  async getSession(sessionId: string): Promise<any> {
    try {
      const results = await db.select().from(contextSessions).where(eq(contextSessions.id, sessionId)).limit(1);
      if (results.length === 0) return null;
      const r = results[0];
      return { ...r, context: typeof r.context === 'string' ? JSON.parse(r.context) : r.context };
    } catch { return null; }
  }

  async getActiveSessions(organizationId: string, userId: string): Promise<any[]> {
    try {
      const results = await db.select().from(contextSessions)
        .where(and(eq(contextSessions.organizationId, organizationId), eq(contextSessions.userId, userId), eq(contextSessions.isActive, true)));
      return results.map(r => ({ ...r, context: typeof r.context === 'string' ? JSON.parse(r.context) : r.context }));
    } catch { return []; }
  }
}

export const companyBrainContextService = new CompanyBrainContextService();
