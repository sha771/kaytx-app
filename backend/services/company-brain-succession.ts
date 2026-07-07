/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { companyBrainWebSocketService } from './company-brain-websocket';
import { companyBrainDepartureService } from './company-brain-departure';
import { skillBrainService } from './skill-brain-service';

/**
 * Company Brain Succession Planning Service
 * Automated knowledge transfer workflows for employee transitions
 * Ensures seamless knowledge handover when employees leave
 */

export interface KnowledgeTransferWorkflow {
  id: string;
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
  duration: number; // minutes
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

export class CompanyBrainSuccessionService {
  private workflows: Map<string, KnowledgeTransferWorkflow> = new Map();
  private checklists: Map<string, TransferChecklist> = new Map();

  /**
   * Create automated knowledge transfer workflow
   */
  async createTransferWorkflow(
    fromEmployeeId: string,
    fromEmployeeName: string,
    toEmployeeId: string,
    toEmployeeName: string,
    knowledgeAreas: string[],
    targetDate: Date
  ): Promise<KnowledgeTransferWorkflow> {
    const workflow: KnowledgeTransferWorkflow = {
      id: `transfer-${fromEmployeeId}-${toEmployeeId}-${Date.now()}`,
      fromEmployeeId,
      fromEmployeeName,
      toEmployeeId,
      toEmployeeName,
      status: 'pending',
      knowledgeAreas,
      scheduledSessions: [],
      documentsToReview: 0, // Would calculate from database
      conversationsToReview: 0, // Would calculate from database
      progress: 0,
      startDate: new Date(),
      targetDate,
      created: new Date(),
    };

    this.workflows.set(workflow.id, workflow);

    // Create skill transfer plan from Skill Brain
    const skillTransferPlan = skillBrainService.createTransferPlan(
      fromEmployeeId,
      fromEmployeeName,
      toEmployeeId,
      toEmployeeName
    );
    console.log(`Skill transfer plan created: ${skillTransferPlan.id} with ${skillTransferPlan.skills.length} skills`);

    // Auto-generate transfer checklist
    await this.generateTransferChecklist(workflow);

    // Auto-schedule transfer sessions
    await this.scheduleTransferSessions(workflow);

    // Notify via WebSocket
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'transfer_workflow_created',
      workflowId: workflow.id,
      fromEmployee: fromEmployeeName,
      toEmployee: toEmployeeName,
      knowledgeAreas,
      targetDate,
      skillCount: skillTransferPlan.skills.length,
      skillTransferPlanId: skillTransferPlan.id,
    });

    console.log(`Transfer workflow created: ${fromEmployeeName} → ${toEmployeeName}`);
    return workflow;
  }

  /**
   * Generate automated transfer checklist
   */
  private async generateTransferChecklist(workflow: KnowledgeTransferWorkflow): Promise<void> {
    const checklistItems: ChecklistItem[] = [];

    // Generate checklist items based on knowledge areas
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

    // Add general items
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
    console.log(`Transfer checklist generated for workflow ${workflow.id}`);
  }

  /**
   * Schedule automated transfer sessions
   */
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

    // Add final review session
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

    console.log(`Scheduled ${sessions.length} transfer sessions for workflow ${workflow.id}`);
  }

  /**
   * Start transfer workflow
   */
  async startTransferWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    workflow.status = 'in_progress';
    workflow.startDate = new Date();

    // Notify via WebSocket
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'transfer_workflow_started',
      workflowId,
      fromEmployee: workflow.fromEmployeeName,
      toEmployee: workflow.toEmployeeName,
    });

    console.log(`Transfer workflow started: ${workflowId}`);
  }

  /**
   * Complete checklist item
   */
  completeChecklistItem(checklistId: string, itemId: string): void {
    const checklist = this.checklists.get(checklistId);
    if (!checklist) {
      throw new Error(`Checklist ${checklistId} not found`);
    }

    const item = checklist.items.find(i => i.id === itemId);
    if (item) {
      item.completed = true;
      checklist.completed++;

      // Update workflow progress
      const workflow = this.workflows.get(checklist.workflowId);
      if (workflow) {
        workflow.progress = Math.round((checklist.completed / checklist.total) * 100);

        // Check if all items completed
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

      console.log(`Checklist item completed: ${itemId}`);
    }
  }

  /**
   * Update transfer session status
   */
  updateTransferSession(
    workflowId: string,
    sessionId: string,
    status: 'completed' | 'cancelled',
    notes?: string,
    recordingUrl?: string
  ): void {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const session = workflow.scheduledSessions.find(s => s.id === sessionId);
    if (session) {
      session.status = status;
      session.notes = notes;
      session.recordingUrl = recordingUrl;

      console.log(`Transfer session updated: ${sessionId} - ${status}`);
    }
  }

  /**
   * Get workflow by ID
   */
  getWorkflow(workflowId: string): KnowledgeTransferWorkflow | undefined {
    return this.workflows.get(workflowId);
  }

  /**
   * Get workflow checklist
   */
  getWorkflowChecklist(workflowId: string): TransferChecklist | undefined {
    for (const checklist of this.checklists.values()) {
      if (checklist.workflowId === workflowId) {
        return checklist;
      }
    }
    return undefined;
  }

  /**
   * Get all active workflows
   */
  getActiveWorkflows(): KnowledgeTransferWorkflow[] {
    return Array.from(this.workflows.values()).filter(
      w => w.status === 'in_progress' || w.status === 'scheduled'
    );
  }

  /**
   * Get workflows for employee
   */
  getEmployeeWorkflows(employeeId: string): {
    outgoing: KnowledgeTransferWorkflow[];
    incoming: KnowledgeTransferWorkflow[];
  } {
    const allWorkflows = Array.from(this.workflows.values());
    return {
      outgoing: allWorkflows.filter(w => w.fromEmployeeId === employeeId),
      incoming: allWorkflows.filter(w => w.toEmployeeId === employeeId),
    };
  }

  /**
   * Get transfer readiness score
   */
  getTransferReadinessScore(workflowId: string): {
    score: number;
    checklistProgress: number;
    sessionsCompleted: number;
    sessionsTotal: number;
    daysRemaining: number;
    skillTransferReadiness: number;
    atRiskSkills: number;
  } {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return { score: 0, checklistProgress: 0, sessionsCompleted: 0, sessionsTotal: 0, daysRemaining: 0, skillTransferReadiness: 0, atRiskSkills: 0 };
    }

    const checklist = this.getWorkflowChecklist(workflowId);
    const checklistProgress = checklist ? (checklist.completed / checklist.total) * 100 : 0;
    const sessionsCompleted = workflow.scheduledSessions.filter(s => s.status === 'completed').length;
    const sessionsTotal = workflow.scheduledSessions.length;
    const daysRemaining = Math.max(
      0,
      Math.floor((workflow.targetDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    );

    // Get skill brain transfer readiness
    const stats = skillBrainService.getStatistics();
    const atRiskSkills = stats.atRiskSkills;
    const transferReady = stats.transferReadyCount;
    const totalSkills = stats.totalSkills;
    const skillTransferReadiness = totalSkills > 0
      ? Math.round((transferReady / totalSkills) * 100)
      : 0;

    // Calculate overall readiness score (incorporating skill transfer readiness)
    const score = Math.round(
      (checklistProgress * 0.4) +
      ((sessionsCompleted / sessionsTotal) * 100 * 0.3) +
      (skillTransferReadiness * 0.3)
    );

    return {
      score,
      checklistProgress,
      sessionsCompleted,
      sessionsTotal,
      daysRemaining,
      skillTransferReadiness,
      atRiskSkills,
    };
  }

  /**
   * Auto-create transfer workflow on employee departure
   */
  async autoCreateTransferOnDeparture(
    departingEmployeeId: string,
    departingEmployeeName: string,
    knowledgeAreas: string[]
  ): Promise<void> {
    console.log(`Auto-creating transfer workflow for departing employee: ${departingEmployeeName}`);

    // Create skill transfer plan using Skill Brain
    const skillTransferPlan = skillBrainService.createTransferPlan(
      departingEmployeeId,
      departingEmployeeName
    );

    console.log(`Skill transfer plan auto-created: ${skillTransferPlan.id}`);
    console.log(`Skills to transfer: ${skillTransferPlan.skills.length}`);
    console.log(`Priority: ${skillTransferPlan.priority}`);

    // Broadcast alert for high-priority departures
    if (skillTransferPlan.priority === 'critical' || skillTransferPlan.priority === 'high') {
      companyBrainWebSocketService.broadcastRiskAlert({
        type: 'critical_departure_skill_risk',
        employeeId: departingEmployeeId,
        employeeName: departingEmployeeName,
        skillCount: skillTransferPlan.skills.length,
        priority: skillTransferPlan.priority,
        message: `CRITICAL: ${departingEmployeeName} has ${skillTransferPlan.skills.length} skills requiring transfer. Priority: ${skillTransferPlan.priority}`,
      });
    }

    // In production, this would:
    // 1. Identify best transfer target based on skills, department, availability
    // 2. Get manager approval
    // 3. Create transfer workflow
    // 4. Notify all stakeholders
  }
}

// Export singleton instance
export const companyBrainSuccessionService = new CompanyBrainSuccessionService();
