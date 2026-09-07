/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { db } from '../db/connection';
import { knowledgeNodes, knowledgeContributions, knowledgePersons, knowledgeDocuments, knowledgeVerifications } from '../db/drizzle-schema';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { companyBrainWebSocketService } from './company-brain-websocket';

export interface KnowledgeTransferWorkflow {
  id: string;
  organizationId: string;
  fromEmployeeId: string;
  fromEmployeeName: string;
  toEmployeeId: string;
  toEmployeeName: string;
  status: 'pending' | 'scheduled' | 'in_progress' | 'complete' | 'failed';
  knowledgeAreas: string[];
  scheduledSessions: TransferSession[];
  documentsToReview: number;
  conversationsToReview: number;
  progress: number;
  startDate: Date;
  targetDate: Date;
  created: Date;
}

export interface TransferSession {
  id: string;
  title: string;
  description: string;
  scheduledDate: Date;
  duration: number;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  recordingUrl?: string;
}

export interface TransferChecklist {
  id: string;
  workflowId: string;
  category: string;
  items: ChecklistItem[];
  completed: number;
  total: number;
}

export interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  assignee?: string;
  dueDate?: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface CreateTransferWorkflowData {
  organizationId: string;
  fromEmployeeId: string;
  fromEmployeeName: string;
  toEmployeeId: string;
  toEmployeeName: string;
  knowledgeAreas: string[];
  targetDate: Date;
}

export interface UpdateTransferSessionData {
  sessionId: string;
  status: 'completed' | 'cancelled';
  notes?: string;
  recordingUrl?: string;
}

export interface TransferReadinessScore {
  score: number;
  knowledgeNodesCount: number;
  documentsCount: number;
  contributionsCount: number;
  verificationsCount: number;
}

export class CompanyBrainSuccessionService {
  private workflows: Map<string, KnowledgeTransferWorkflow> = new Map();
  private checklists: Map<string, TransferChecklist> = new Map();

  async createTransferWorkflow(data: CreateTransferWorkflowData): Promise<KnowledgeTransferWorkflow> {
    const workflow: KnowledgeTransferWorkflow = {
      id: `transfer-${data.fromEmployeeId}-${data.toEmployeeId}-${Date.now()}`,
      organizationId: data.organizationId,
      fromEmployeeId: data.fromEmployeeId,
      fromEmployeeName: data.fromEmployeeName,
      toEmployeeId: data.toEmployeeId,
      toEmployeeName: data.toEmployeeName,
      status: 'pending',
      knowledgeAreas: data.knowledgeAreas,
      scheduledSessions: [],
      documentsToReview: 0,
      conversationsToReview: 0,
      progress: 0,
      startDate: new Date(),
      targetDate: data.targetDate,
      created: new Date(),
    };

    this.workflows.set(workflow.id, workflow);
    await this.generateTransferChecklist(workflow);
    await this.scheduleTransferSessions(workflow);

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'transfer_workflow_created',
      workflowId: workflow.id,
      fromEmployee: data.fromEmployeeName,
      toEmployee: data.toEmployeeName,
      knowledgeAreas: data.knowledgeAreas,
      targetDate: data.targetDate,
    });

    return workflow;
  }

  private async generateTransferChecklist(workflow: KnowledgeTransferWorkflow): Promise<void> {
    const checklistItems: ChecklistItem[] = [];

    for (const area of workflow.knowledgeAreas) {
      checklistItems.push(
        {
          id: `item-${area}-1`,
          description: `Review and document ${area} processes`,
          completed: false,
          assignee: workflow.fromEmployeeId,
          priority: 'high',
          dueDate: new Date(workflow.startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: `item-${area}-2`,
          description: `Conduct knowledge transfer session for ${area}`,
          completed: false,
          assignee: workflow.toEmployeeId,
          priority: 'high',
          dueDate: new Date(workflow.startDate.getTime() + 14 * 24 * 60 * 60 * 1000),
        },
        {
          id: `item-${area}-3`,
          description: `Create ${area} documentation and SOPs`,
          completed: false,
          assignee: workflow.fromEmployeeId,
          priority: 'medium',
          dueDate: new Date(workflow.startDate.getTime() + 21 * 24 * 60 * 60 * 1000),
        },
        {
          id: `item-${area}-4`,
          description: `Hands-on practice session for ${area}`,
          completed: false,
          assignee: workflow.toEmployeeId,
          priority: 'medium',
          dueDate: new Date(workflow.startDate.getTime() + 28 * 24 * 60 * 60 * 1000),
        }
      );
    }

    checklistItems.push(
      {
        id: 'item-general-1',
        description: 'Introduce key stakeholders and contacts',
        completed: false,
        assignee: workflow.fromEmployeeId,
        priority: 'high',
        dueDate: new Date(workflow.startDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'item-general-2',
        description: 'Share access to relevant tools and systems',
        completed: false,
        assignee: workflow.fromEmployeeId,
        priority: 'high',
        dueDate: new Date(workflow.startDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'item-general-3',
        description: 'Review ongoing projects and deadlines',
        completed: false,
        assignee: workflow.fromEmployeeId,
        priority: 'high',
        dueDate: new Date(workflow.startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'item-general-4',
        description: 'Document unwritten rules and tribal knowledge',
        completed: false,
        assignee: workflow.fromEmployeeId,
        priority: 'medium',
        dueDate: new Date(workflow.startDate.getTime() + 10 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'item-general-5',
        description: 'Final sign-off and readiness assessment',
        completed: false,
        assignee: workflow.toEmployeeId,
        priority: 'high',
        dueDate: workflow.targetDate,
      }
    );

    const checklist: TransferChecklist = {
      id: `checklist-${workflow.id}`,
      workflowId: workflow.id,
      category: 'knowledge_transfer',
      items: checklistItems,
      completed: 0,
      total: checklistItems.length,
    };

    this.checklists.set(checklist.id, checklist);
  }

  private async scheduleTransferSessions(workflow: KnowledgeTransferWorkflow): Promise<void> {
    const sessions: TransferSession[] = [];
    const sessionCount = Math.min(workflow.knowledgeAreas.length, 5);
    const daysBetweenSessions = Math.floor(
      (workflow.targetDate.getTime() - workflow.startDate.getTime()) / (sessionCount * 24 * 60 * 60 * 1000)
    );

    for (let i = 0; i < sessionCount; i++) {
      const sessionDate = new Date(
        workflow.startDate.getTime() + (i + 1) * daysBetweenSessions * 24 * 60 * 60 * 1000
      );

      sessions.push({
        id: `session-${workflow.id}-${i}`,
        title: `Knowledge Transfer: ${workflow.knowledgeAreas[i] || 'General Overview'}`,
        description: `Transfer session for ${workflow.knowledgeAreas[i] || 'general knowledge'}`,
        scheduledDate: sessionDate,
        duration: 60,
        attendees: [workflow.fromEmployeeId, workflow.toEmployeeId],
        status: 'scheduled',
      });
    }

    sessions.push({
      id: `session-${workflow.id}-final`,
      title: 'Final Review and Sign-off',
      description: 'Final knowledge transfer review and readiness assessment',
      scheduledDate: new Date(workflow.targetDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      duration: 90,
      attendees: [workflow.fromEmployeeId, workflow.toEmployeeId],
      status: 'scheduled',
    });

    workflow.scheduledSessions = sessions;
    workflow.status = 'scheduled';
  }

  async startTransferWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    workflow.status = 'in_progress';
    workflow.startDate = new Date();

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'transfer_workflow_started',
      workflowId,
      fromEmployee: workflow.fromEmployeeName,
      toEmployee: workflow.toEmployeeName,
    });
  }

  completeChecklistItem(workflowId: string, itemId: string): void {
    const checklist = this.getWorkflowChecklist(workflowId);
    if (!checklist) {
      throw new Error(`Checklist for workflow ${workflowId} not found`);
    }

    const item = checklist.items.find(i => i.id === itemId);
    if (item) {
      item.completed = true;
      checklist.completed++;

      const workflow = this.workflows.get(checklist.workflowId);
      if (workflow) {
        workflow.progress = Math.round((checklist.completed / checklist.total) * 100);

        if (checklist.completed === checklist.total) {
          workflow.status = 'complete';
          companyBrainWebSocketService.broadcastAnalyticsUpdate({
            type: 'transfer_workflow_complete',
            workflowId: workflow.id,
            fromEmployee: workflow.fromEmployeeName,
            toEmployee: workflow.toEmployeeName,
          });
        }
      }
    }
  }

  updateTransferSession(workflowId: string, sessionData: UpdateTransferSessionData): void {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const session = workflow.scheduledSessions.find(s => s.id === sessionData.sessionId);
    if (session) {
      session.status = sessionData.status;
      if (sessionData.notes !== undefined) session.notes = sessionData.notes;
      if (sessionData.recordingUrl !== undefined) session.recordingUrl = sessionData.recordingUrl;
    }
  }

  getWorkflow(workflowId: string): KnowledgeTransferWorkflow | undefined {
    return this.workflows.get(workflowId);
  }

  getWorkflowChecklist(workflowId: string): TransferChecklist | undefined {
    for (const checklist of this.checklists.values()) {
      if (checklist.workflowId === workflowId) {
        return checklist;
      }
    }
    return undefined;
  }

  getActiveWorkflows(organizationId: string): KnowledgeTransferWorkflow[] {
    return Array.from(this.workflows.values()).filter(
      w => w.organizationId === organizationId && (w.status === 'in_progress' || w.status === 'scheduled')
    );
  }

  getEmployeeWorkflows(organizationId: string, employeeId: string): {
    outgoing: KnowledgeTransferWorkflow[];
    incoming: KnowledgeTransferWorkflow[];
  } {
    const orgWorkflows = Array.from(this.workflows.values()).filter(
      w => w.organizationId === organizationId
    );
    return {
      outgoing: orgWorkflows.filter(w => w.fromEmployeeId === employeeId),
      incoming: orgWorkflows.filter(w => w.toEmployeeId === employeeId),
    };
  }

  async getTransferReadinessScore(organizationId: string, employeeId: string): Promise<TransferReadinessScore> {
    const [nodeResult] = await db.select({ count: count() })
      .from(knowledgeNodes)
      .where(and(
        eq(knowledgeNodes.organizationId, organizationId),
        eq(knowledgeNodes.createdBy, employeeId)
      ));

    const [docResult] = await db.select({ count: count() })
      .from(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.organizationId, organizationId),
        eq(knowledgeDocuments.createdBy, employeeId)
      ));

    const [contributionResult] = await db.select({ count: count() })
      .from(knowledgeContributions)
      .where(and(
        eq(knowledgeContributions.organizationId, organizationId),
        eq(knowledgeContributions.userId, employeeId)
      ));

    const [verificationResult] = await db.select({ count: count() })
      .from(knowledgeVerifications)
      .where(and(
        eq(knowledgeVerifications.organizationId, organizationId),
        eq(knowledgeVerifications.verifiedBy, employeeId)
      ));

    const nodeCount = Number(nodeResult?.count ?? 0);
    const docCount = Number(docResult?.count ?? 0);
    const contributionCount = Number(contributionResult?.count ?? 0);
    const verificationCount = Number(verificationResult?.count ?? 0);

    const score = Math.min(100,
      Math.round(
        Math.min(25, nodeCount * 2.5) +
        Math.min(25, docCount * 5) +
        Math.min(25, contributionCount * 2.5) +
        Math.min(25, verificationCount * 5)
      )
    );

    return {
      score,
      knowledgeNodesCount: nodeCount,
      documentsCount: docCount,
      contributionsCount: contributionCount,
      verificationsCount: verificationCount,
    };
  }
}

export const companyBrainSuccessionService = new CompanyBrainSuccessionService();
