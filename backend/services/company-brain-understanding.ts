import { db } from '../db/connection';
import { companyStructure, companyProducts, companyGoals, knowledgeNodes, organizations, users } from '../db/drizzle-schema';
import { eq, and, desc, count } from 'drizzle-orm';
import crypto from 'crypto';

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  size: string;
  departments: CompanyDepartment[];
  products: CompanyProductInfo[];
  goals: CompanyGoalInfo[];
  metrics: CompanyMetrics;
}

export interface CompanyDepartment {
  id: string;
  name: string;
  headName: string;
  memberCount: number;
  knowledgeCoverage: number;
}

export interface CompanyProductInfo {
  id: string;
  name: string;
  type: string;
  category: string;
  status: string;
}

export interface CompanyGoalInfo {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: string;
  deadline: Date | null;
}

export interface CompanyMetrics {
  totalDepartments: number;
  totalEmployees: number;
  totalProducts: number;
  totalGoals: number;
  activeGoals: number;
  knowledgeNodes: number;
  verifiedNodes: number;
}

export class CompanyBrainUnderstandingService {
  async getProfile(organizationId: string): Promise<CompanyProfile> {
    let org: any = { id: organizationId, name: 'Organization', industry: '', companySize: '' };
    try {
      const orgs = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
      if (orgs.length > 0) org = orgs[0];
    } catch {}

    const departments = await this.getDepartments(organizationId);
    const products = await this.getProducts(organizationId);
    const goals = await this.getGoals(organizationId);
    const metrics = await this.getMetrics(organizationId);

    return {
      id: organizationId,
      name: org.name,
      industry: org.industry || '',
      size: org.companySize || '',
      departments,
      products,
      goals,
      metrics,
    };
  }

  async getDepartments(organizationId: string): Promise<CompanyDepartment[]> {
    try {
      const depts = await db.select().from(companyStructure)
        .where(and(eq(companyStructure.organizationId, organizationId), eq(companyStructure.type, 'department')));
      return depts.map(d => ({
        id: d.id,
        name: d.name,
        headName: d.headUserId ? `User ${d.headUserId.substring(0, 8)}` : 'Unassigned',
        memberCount: 0,
        knowledgeCoverage: 75,
      }));
    } catch { return []; }
  }

  async getProducts(organizationId: string): Promise<CompanyProductInfo[]> {
    try {
      const prods = await db.select().from(companyProducts)
        .where(eq(companyProducts.organizationId, organizationId));
      return prods.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        category: p.category || '',
        status: p.status,
      }));
    } catch { return []; }
  }

  async getGoals(organizationId: string): Promise<CompanyGoalInfo[]> {
    try {
      const gs = await db.select().from(companyGoals)
        .where(eq(companyGoals.organizationId, organizationId))
        .orderBy(desc(companyGoals.createdAt));
      return gs.map(g => ({
        id: g.id,
        name: g.name,
        type: g.type,
        progress: parseFloat(g.progress || '0'),
        status: g.status,
        deadline: g.deadline,
      }));
    } catch { return []; }
  }

  async getMetrics(organizationId: string): Promise<CompanyMetrics> {
    let totalEmployees = 0;
    let knowledgeNodesCount = 0;
    let verifiedNodesCount = 0;

    try {
      const members = await db.select({ count: count() }).from(users).where(eq(users.organizationId, organizationId));
      totalEmployees = members[0]?.count || 0;
    } catch {}

    try {
      const nodes = await db.select({ count: count() }).from(knowledgeNodes).where(eq(knowledgeNodes.organizationId, organizationId));
      knowledgeNodesCount = nodes[0]?.count || 0;
    } catch {}

    try {
      const verified = await db.select({ count: count() }).from(knowledgeNodes)
        .where(and(eq(knowledgeNodes.organizationId, organizationId), eq(knowledgeNodes.status, 'verified')));
      verifiedNodesCount = verified[0]?.count || 0;
    } catch {}

    const depts = await this.getDepartments(organizationId);
    const prods = await this.getProducts(organizationId);
    const goals = await this.getGoals(organizationId);

    return {
      totalDepartments: depts.length,
      totalEmployees,
      totalProducts: prods.length,
      totalGoals: goals.length,
      activeGoals: goals.filter(g => g.status === 'active').length,
      knowledgeNodes: knowledgeNodesCount,
      verifiedNodes: verifiedNodesCount,
    };
  }

  async addDepartment(organizationId: string, data: { name: string; description?: string; headUserId?: string }): Promise<any> {
    const id = crypto.randomUUID();
    try {
      await db.insert(companyStructure).values({
        id,
        organizationId,
        type: 'department',
        name: data.name,
        description: data.description || null,
        headUserId: data.headUserId || null,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id, ...data };
    } catch { return null; }
  }

  async addProduct(organizationId: string, data: { name: string; type: string; description?: string; category?: string; pricing?: any }): Promise<any> {
    const id = crypto.randomUUID();
    try {
      await db.insert(companyProducts).values({
        id,
        organizationId,
        type: data.type,
        name: data.name,
        description: data.description || null,
        category: data.category || null,
        pricing: JSON.stringify(data.pricing || {}),
        status: 'active',
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id, ...data };
    } catch { return null; }
  }

  async addGoal(organizationId: string, data: { name: string; type: string; description?: string; targetValue?: string; deadline?: Date }): Promise<any> {
    const id = crypto.randomUUID();
    try {
      await db.insert(companyGoals).values({
        id,
        organizationId,
        type: data.type,
        name: data.name,
        description: data.description || null,
        targetValue: data.targetValue || null,
        status: 'active',
        progress: '0',
        deadline: data.deadline || null,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id, ...data };
    } catch { return null; }
  }

  async updateGoalProgress(goalId: string, progress: number): Promise<boolean> {
    try {
      await db.update(companyGoals)
        .set({ progress: String(progress), updatedAt: new Date() })
        .where(eq(companyGoals.id, goalId));
      return true;
    } catch { return false; }
  }
}

export const companyBrainUnderstandingService = new CompanyBrainUnderstandingService();
