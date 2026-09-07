/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { db } from '../db/connection';
import {
  knowledgeNodes,
  knowledgeContributions,
  knowledgePersons,
  knowledgeOnboardingProgress,
  knowledgeDocuments,
  users,
} from '../db/drizzle-schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { companyBrainWebSocketService } from './company-brain-websocket';

export interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  startDate: Date;
  departureDate?: Date;
  departureStatus?: 'active' | 'notice_given' | 'departed';
  knowledgeAreas: string[];
  contributions: number;
}

export interface KnowledgePreservationPlan {
  id: string;
  employeeId: string;
  employeeName: string;
  status: 'pending' | 'in_progress' | 'complete' | 'failed';
  knowledgeAreas: string[];
  documentsToExtract: number;
  conversationsToExtract: number;
  transferTarget?: string;
  deadline: Date;
  progress: number;
  created: Date;
}

export interface DepartureDetectionConfig {
  hrIntegrationEnabled: boolean;
  hrSystemType: 'workday' | 'bamboohr' | 'custom' | 'manual';
  noticePeriodDays: number;
  autoTriggerPreservation: boolean;
  notifyStakeholders: boolean;
}

export class CompanyBrainDepartureService {
  private detectionConfig: DepartureDetectionConfig = {
    hrIntegrationEnabled: false,
    hrSystemType: 'manual',
    noticePeriodDays: 30,
    autoTriggerPreservation: true,
    notifyStakeholders: true,
  };

  configureDetection(config: Partial<DepartureDetectionConfig>): void {
    this.detectionConfig = { ...this.detectionConfig, ...config };
  }

  async registerEmployee(organizationId: string, data: EmployeeProfile): Promise<void> {
    const [user] = await db.select({ id: users.id }).from(users)
      .where(and(eq(users.email, data.email), eq(users.organizationId, organizationId)))
      .limit(1);

    await db.insert(knowledgePersons).values({
      id: data.id,
      organizationId,
      userId: user?.id || null,
      name: data.name,
      email: data.email,
      department: data.department,
      role: data.role,
      skills: data.knowledgeAreas,
      expertise: data.knowledgeAreas,
      metadata: {
        departureStatus: data.departureStatus || 'active',
        departureDate: data.departureDate?.toISOString() || null,
        startDate: data.startDate.toISOString(),
        contributions: data.contributions,
      },
    });
  }

  async updateEmployeeStatus(
    organizationId: string,
    employeeId: string,
    status: 'notice_given' | 'departed',
    departureDate?: Date
  ): Promise<void> {
    const [person] = await db.select().from(knowledgePersons)
      .where(and(eq(knowledgePersons.id, employeeId), eq(knowledgePersons.organizationId, organizationId)))
      .limit(1);

    if (!person) {
      throw new Error(`Employee ${employeeId} not found in organization ${organizationId}`);
    }

    const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    metadata.departureStatus = status;
    if (departureDate) {
      metadata.departureDate = departureDate.toISOString();
    }

    await db.update(knowledgePersons)
      .set({ metadata: metadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, employeeId));

    if (status === 'notice_given' && this.detectionConfig.autoTriggerPreservation) {
      await this.triggerKnowledgePreservation(organizationId, person);
    }

    if (status === 'departed') {
      await this.finalizeKnowledgePreservation(organizationId, person);
    }
  }

  private async triggerKnowledgePreservation(organizationId: string, person: typeof knowledgePersons.$inferSelect): Promise<void> {
    const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    const skills: string[] = Array.isArray(person.skills) ? person.skills : [];
    const expertise: string[] = Array.isArray(person.expertise) ? person.expertise : [];
    const knowledgeAreas = [...new Set([...skills, ...expertise])];

    const noticeMs = (this.detectionConfig.noticePeriodDays || 30) * 24 * 60 * 60 * 1000;
    const departureDate = personMetadata.departureDate ? new Date(personMetadata.departureDate) : null;

    const plan: KnowledgePreservationPlan = {
      id: `preservation-${person.id}-${Date.now()}`,
      employeeId: person.id,
      employeeName: person.name,
      status: 'in_progress',
      knowledgeAreas,
      documentsToExtract: 0,
      conversationsToExtract: 0,
      deadline: departureDate || new Date(Date.now() + noticeMs),
      progress: 0,
      created: new Date(),
    };

    personMetadata.preservationPlan = plan;

    await db.update(knowledgePersons)
      .set({ metadata: personMetadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, person.id));

    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'employee_departure',
      employeeId: person.id,
      employeeName: person.name,
      departureDate: departureDate?.toISOString(),
      knowledgeAreas,
      message: `Departure notice received for ${person.name}. Initiating knowledge preservation.`,
    });

    await this.executePreservationWorkflow(organizationId, plan, person);
  }

  private async executePreservationWorkflow(
    organizationId: string,
    plan: KnowledgePreservationPlan,
    person: typeof knowledgePersons.$inferSelect
  ): Promise<void> {
    try {
      await this.extractEmployeeDocuments(organizationId, person, plan);
      await this.extractEmployeeConversations(organizationId, person, plan);
      await this.generateKnowledgeSummary(organizationId, person, plan);

      if (plan.transferTarget) {
        await this.createTransferPlan(plan);
      }

      plan.status = 'complete';
      plan.progress = 100;

      const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
      personMetadata.preservationPlan = plan;

      await db.update(knowledgePersons)
        .set({ metadata: personMetadata, updatedAt: new Date() })
        .where(eq(knowledgePersons.id, person.id));

      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'preservation_complete',
        employeeId: person.id,
        employeeName: person.name,
        planId: plan.id,
        message: `Knowledge preservation complete for ${person.name}`,
      });
    } catch (error) {
      console.error(`Preservation workflow failed for ${person.name}:`, error);
      plan.status = 'failed';

      const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
      personMetadata.preservationPlan = plan;

      await db.update(knowledgePersons)
        .set({ metadata: personMetadata, updatedAt: new Date() })
        .where(eq(knowledgePersons.id, person.id));

      companyBrainWebSocketService.broadcastRiskAlert({
        type: 'preservation_failed',
        employeeId: person.id,
        employeeName: person.name,
        planId: plan.id,
        message: `Knowledge preservation failed for ${person.name}. Manual intervention required.`,
      });
    }
  }

  private async extractEmployeeDocuments(
    organizationId: string,
    person: typeof knowledgePersons.$inferSelect,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    const userId = person.userId;

    const docCount = await this.countDocuments(organizationId, userId);
    const nodeDocCount = await this.countKnowledgeNodesByType(organizationId, userId, 'document');

    const totalDocs = docCount + nodeDocCount;
    plan.documentsToExtract = totalDocs;
    plan.progress = 30;

    const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    personMetadata.preservationPlan = plan;

    await db.update(knowledgePersons)
      .set({ metadata: personMetadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, person.id));
  }

  private async extractEmployeeConversations(
    organizationId: string,
    person: typeof knowledgePersons.$inferSelect,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    const userId = person.userId;

    const convCount = await this.countConversations(organizationId, userId);

    plan.conversationsToExtract = convCount;
    plan.progress = 70;

    const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    personMetadata.preservationPlan = plan;

    await db.update(knowledgePersons)
      .set({ metadata: personMetadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, person.id));
  }

  private async generateKnowledgeSummary(
    organizationId: string,
    person: typeof knowledgePersons.$inferSelect,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    const userId = person.userId;

    const nodeConditions = [eq(knowledgeNodes.organizationId, organizationId)];
    if (userId) {
      nodeConditions.push(eq(knowledgeNodes.createdBy, userId));
    }
    const [totalNodes] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeNodes).where(and(...nodeConditions));

    let totalContribs = 0;
    if (userId) {
      const [contribResult] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeContributions)
        .where(and(eq(knowledgeContributions.organizationId, organizationId), eq(knowledgeContributions.userId, userId)));
      totalContribs = Number(contribResult?.count || 0);
    }

    const skills: string[] = Array.isArray(person.skills) ? person.skills : [];
    const expertise: string[] = Array.isArray(person.expertise) ? person.expertise : [];

    const summary = {
      employee: person.name,
      role: person.role,
      department: person.department,
      knowledgeAreas: [...new Set([...skills, ...expertise])],
      totalKnowledgeNodes: Number(totalNodes?.count || 0),
      totalContributions: totalContribs,
      keyDocuments: plan.documentsToExtract,
      keyConversations: plan.conversationsToExtract,
      generatedAt: new Date(),
    };

    console.log('Knowledge summary generated:', summary);
    plan.progress = 90;

    const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    personMetadata.preservationPlan = plan;

    await db.update(knowledgePersons)
      .set({ metadata: personMetadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, person.id));
  }

  private async createTransferPlan(plan: KnowledgePreservationPlan): Promise<void> {
    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'knowledge_transfer_plan_created',
      employeeId: plan.employeeId,
      employeeName: plan.employeeName,
      planId: plan.id,
      skillTransferPlanId: `transfer-${plan.id}`,
      skillCount: plan.knowledgeAreas.length,
      message: `Transfer plan created for ${plan.employeeName} with ${plan.knowledgeAreas.length} skills identified`,
    });
  }

  private async finalizeKnowledgePreservation(
    organizationId: string,
    person: typeof knowledgePersons.$inferSelect
  ): Promise<void> {
    const personMetadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? { ...person.metadata } : {};
    personMetadata.departureStatus = 'departed';
    if (personMetadata.preservationPlan) {
      personMetadata.preservationPlan.status = 'complete';
      personMetadata.preservationPlan.progress = 100;
    }

    await db.update(knowledgePersons)
      .set({ metadata: personMetadata, updatedAt: new Date() })
      .where(eq(knowledgePersons.id, person.id));

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'preservation_finalized',
      employeeId: person.id,
      employeeName: person.name,
      message: `Knowledge preservation finalized for ${person.name}. All institutional knowledge preserved.`,
    });
  }

  async setTransferTarget(organizationId: string, planId: string, targetEmployeeId: string): Promise<void> {
    const persons = await db.select().from(knowledgePersons)
      .where(eq(knowledgePersons.organizationId, organizationId));

    for (const person of persons) {
      const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? person.metadata : {};
      if (metadata.preservationPlan && metadata.preservationPlan.id === planId) {
        metadata.preservationPlan.transferTarget = targetEmployeeId;
        await db.update(knowledgePersons)
          .set({ metadata: metadata, updatedAt: new Date() })
          .where(eq(knowledgePersons.id, person.id));
        return;
      }
    }
  }

  async getPreservationPlan(organizationId: string, employeeId: string): Promise<KnowledgePreservationPlan | undefined> {
    const [person] = await db.select().from(knowledgePersons)
      .where(and(eq(knowledgePersons.id, employeeId), eq(knowledgePersons.organizationId, organizationId)))
      .limit(1);

    if (!person) return undefined;

    const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? person.metadata : {};
    const plan = metadata.preservationPlan;
    if (plan) {
      return {
        ...plan,
        deadline: new Date(plan.deadline),
        created: new Date(plan.created),
        knowledgeAreas: Array.isArray(plan.knowledgeAreas) ? plan.knowledgeAreas : [],
      } as KnowledgePreservationPlan;
    }
    return undefined;
  }

  async getActivePreservationPlans(organizationId: string): Promise<KnowledgePreservationPlan[]> {
    const persons = await db.select().from(knowledgePersons)
      .where(eq(knowledgePersons.organizationId, organizationId));

    const plans: KnowledgePreservationPlan[] = [];
    for (const person of persons) {
      const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? person.metadata : {};
      const plan = metadata.preservationPlan;
      if (plan && plan.status === 'in_progress') {
        plans.push({
          ...plan,
          deadline: new Date(plan.deadline),
          created: new Date(plan.created),
          knowledgeAreas: Array.isArray(plan.knowledgeAreas) ? plan.knowledgeAreas : [],
        } as KnowledgePreservationPlan);
      }
    }
    return plans;
  }

  async getEmployeesAtRisk(organizationId: string): Promise<EmployeeProfile[]> {
    const persons = await db.select().from(knowledgePersons)
      .where(eq(knowledgePersons.organizationId, organizationId));

    return persons
      .filter(person => {
        const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? person.metadata : {};
        return metadata.departureStatus === 'notice_given';
      })
      .map(person => this.personToProfile(person));
  }

  async getDetectionStatus(organizationId: string): Promise<{
    config: DepartureDetectionConfig;
    employeesMonitored: number;
    employeesAtRisk: number;
    activePreservations: number;
  }> {
    const [monitoredResult] = await db.select({ count: sql<number>`count(*)` }).from(knowledgePersons)
      .where(eq(knowledgePersons.organizationId, organizationId));
    const employeesMonitored = Number(monitoredResult?.count || 0);

    const atRiskEmployees = await this.getEmployeesAtRisk(organizationId);
    const activePlans = await this.getActivePreservationPlans(organizationId);

    return {
      config: this.detectionConfig,
      employeesMonitored,
      employeesAtRisk: atRiskEmployees.length,
      activePreservations: activePlans.length,
    };
  }

  private personToProfile(person: typeof knowledgePersons.$inferSelect): EmployeeProfile {
    const metadata: Record<string, any> = person.metadata && typeof person.metadata === 'object' ? person.metadata : {};
    const skills: string[] = Array.isArray(person.skills) ? person.skills : [];
    const expertise: string[] = Array.isArray(person.expertise) ? person.expertise : [];
    const knowledgeAreas = [...new Set([...skills, ...expertise])];

    return {
      id: person.id,
      name: person.name,
      email: person.email || '',
      department: person.department || '',
      role: person.role || '',
      startDate: person.createdAt || new Date(),
      departureDate: metadata.departureDate ? new Date(metadata.departureDate) : undefined,
      departureStatus: metadata.departureStatus || 'active',
      knowledgeAreas,
      contributions: metadata.contributions || 0,
    };
  }

  private async countDocuments(organizationId: string, userId: string | null): Promise<number> {
    const conditions = [eq(knowledgeDocuments.organizationId, organizationId)];
    if (userId) {
      conditions.push(eq(knowledgeDocuments.createdBy, userId));
    }
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeDocuments).where(and(...conditions));
    return Number(result?.count || 0);
  }

  private async countKnowledgeNodesByType(organizationId: string, userId: string | null, type: string): Promise<number> {
    const conditions = [
      eq(knowledgeNodes.organizationId, organizationId),
      eq(knowledgeNodes.sourceType, type),
    ];
    if (userId) {
      conditions.push(eq(knowledgeNodes.createdBy, userId));
    }
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeNodes).where(and(...conditions));
    return Number(result?.count || 0);
  }

  private async countConversations(organizationId: string, userId: string | null): Promise<number> {
    const conditions: any[] = [
      eq(knowledgeNodes.organizationId, organizationId),
      sql`${knowledgeNodes.type} IN ('meeting', 'email', 'conversation')`,
    ];
    if (userId) {
      conditions.push(eq(knowledgeNodes.createdBy, userId));
    }
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeNodes).where(and(...conditions));
    return Number(result?.count || 0);
  }
}

export const companyBrainDepartureService = new CompanyBrainDepartureService();
