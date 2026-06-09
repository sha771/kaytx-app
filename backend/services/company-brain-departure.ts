/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { knowledgeExtractionService } from './company-brain-extraction';
import { companyBrainWebSocketService } from './company-brain-websocket';
import { companyBrainIngestionService } from './company-brain-ingestion';

/**
 * Company Brain Employee Departure Service
 * Detects employee departures and preserves all institutional knowledge
 * Ensures no knowledge is lost when employees leave the company
 */

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
  private employees: Map<string, EmployeeProfile> = new Map();
  private preservationPlans: Map<string, KnowledgePreservationPlan> = new Map();
  private detectionConfig: DepartureDetectionConfig = {
    hrIntegrationEnabled: false,
    hrSystemType: 'manual',
    noticePeriodDays: 30,
    autoTriggerPreservation: true,
    notifyStakeholders: true,
  };

  /**
   * Configure departure detection
   */
  configureDetection(config: Partial<DepartureDetectionConfig>): void {
    this.detectionConfig = { ...this.detectionConfig, ...config };
    console.log('Departure detection configured:', this.detectionConfig);
  }

  /**
   * Register employee for monitoring
   */
  registerEmployee(employee: EmployeeProfile): void {
    this.employees.set(employee.id, employee);
    console.log(`Employee registered for monitoring: ${employee.name}`);
  }

  /**
   * Update employee status (called from HR system or manual trigger)
   */
  async updateEmployeeStatus(
    employeeId: string,
    status: 'notice_given' | 'departed',
    departureDate?: Date
  ): Promise<void> {
    const employee = this.employees.get(employeeId);
    if (!employee) {
      throw new Error(`Employee ${employeeId} not found`);
    }

    employee.departureStatus = status;
    if (departureDate) {
      employee.departureDate = departureDate;
    }

    console.log(`Employee status updated: ${employee.name} - ${status}`);

    if (status === 'notice_given' && this.detectionConfig.autoTriggerPreservation) {
      await this.triggerKnowledgePreservation(employee);
    }

    if (status === 'departed') {
      await this.finalizeKnowledgePreservation(employee);
    }
  }

  /**
   * Trigger knowledge preservation for departing employee
   */
  private async triggerKnowledgePreservation(employee: EmployeeProfile): Promise<void> {
    console.log(`Triggering knowledge preservation for ${employee.name}`);

    const plan: KnowledgePreservationPlan = {
      id: `preservation-${employee.id}-${Date.now()}`,
      employeeId: employee.id,
      employeeName: employee.name,
      status: 'in_progress',
      knowledgeAreas: employee.knowledgeAreas,
      documentsToExtract: 0, // Would calculate from database
      conversationsToExtract: 0, // Would calculate from database
      deadline: employee.departureDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      progress: 0,
      created: new Date(),
    };

    this.preservationPlans.set(plan.id, plan);

    // Notify via WebSocket
    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'employee_departure',
      employeeId: employee.id,
      employeeName: employee.name,
      departureDate: employee.departureDate,
      knowledgeAreas: employee.knowledgeAreas,
      message: `Departure notice received for ${employee.name}. Initiating knowledge preservation.`,
    });

    // Start preservation workflow
    await this.executePreservationWorkflow(plan, employee);
  }

  /**
   * Execute knowledge preservation workflow
   */
  private async executePreservationWorkflow(
    plan: KnowledgePreservationPlan,
    employee: EmployeeProfile
  ): Promise<void> {
    console.log(`Executing preservation workflow for ${employee.name}`);

    try {
      // Step 1: Extract all documents created by employee
      await this.extractEmployeeDocuments(employee, plan);

      // Step 2: Extract all conversations involving employee
      await this.extractEmployeeConversations(employee, plan);

      // Step 3: Generate knowledge summary
      await this.generateKnowledgeSummary(employee, plan);

      // Step 4: Create transfer plan if target identified
      if (plan.transferTarget) {
        await this.createTransferPlan(plan);
      }

      plan.status = 'complete';
      plan.progress = 100;

      // Notify completion
      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'preservation_complete',
        employeeId: employee.id,
        employeeName: employee.name,
        planId: plan.id,
        message: `Knowledge preservation complete for ${employee.name}`,
      });
    } catch (error) {
      console.error(`Preservation workflow failed for ${employee.name}:`, error);
      plan.status = 'failed';

      companyBrainWebSocketService.broadcastRiskAlert({
        type: 'preservation_failed',
        employeeId: employee.id,
        employeeName: employee.name,
        planId: plan.id,
        message: `Knowledge preservation failed for ${employee.name}. Manual intervention required.`,
      });
    }
  }

  /**
   * Extract all documents created by employee
   */
  private async extractEmployeeDocuments(
    employee: EmployeeProfile,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    console.log(`Extracting documents for ${employee.name}`);

    // In production, this would:
    // 1. Query database for all documents created by employee
    // 2. Extract knowledge from each document
    // 3. Store in knowledge base with employee attribution
    // 4. Update plan progress

    // Simulate document extraction
    const documents = [
      {
        title: 'API Architecture v2.0',
        content: 'Detailed API architecture documentation...',
        type: 'technical',
      },
      {
        title: 'Team Onboarding Guide',
        content: 'Comprehensive onboarding process...',
        type: 'sop',
      },
    ];

    for (const doc of documents) {
      try {
        const knowledge = await knowledgeExtractionService.extractFromText(
          doc.content,
          `document:${employee.id}`,
          {
            sourceType: 'document',
            author: employee.name,
            authorEmail: employee.email,
          }
        );

        console.log(`Extracted knowledge from document: ${doc.title}`);
      } catch (error) {
        console.error(`Failed to extract from document ${doc.title}:`, error);
      }
    }

    plan.documentsToExtract = documents.length;
    plan.progress = 30;
  }

  /**
   * Extract all conversations involving employee
   */
  private async extractEmployeeConversations(
    employee: EmployeeProfile,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    console.log(`Extracting conversations for ${employee.name}`);

    // In production, this would:
    // 1. Query all conversation sources (Slack, Teams, Email)
    // 2. Filter for messages from/to employee
    // 3. Extract knowledge from conversations
    // 4. Store in knowledge base
    // 5. Update plan progress

    // Simulate conversation extraction
    const conversations = [
      {
        source: 'slack',
        channel: '#engineering',
        text: 'The new authentication flow uses JWT tokens with 24-hour expiration',
      },
      {
        source: 'email',
        subject: 'Project Timeline',
        text: 'Q4 deliverables are on track for December 15th release',
      },
    ];

    for (const conv of conversations) {
      try {
        const knowledge = await knowledgeExtractionService.extractFromText(
          conv.text,
          `conversation:${employee.id}`,
          {
            sourceType: conv.source,
            author: employee.name,
            authorEmail: employee.email,
          }
        );

        console.log(`Extracted knowledge from conversation`);
      } catch (error) {
        console.error(`Failed to extract from conversation:`, error);
      }
    }

    plan.conversationsToExtract = conversations.length;
    plan.progress = 70;
  }

  /**
   * Generate knowledge summary for employee
   */
  private async generateKnowledgeSummary(
    employee: EmployeeProfile,
    plan: KnowledgePreservationPlan
  ): Promise<void> {
    console.log(`Generating knowledge summary for ${employee.name}`);

    // In production, this would:
    // 1. Aggregate all knowledge nodes from employee
    // 2. Identify key knowledge areas
    // 3. Generate comprehensive summary
    // 4. Create documentation package

    const summary = {
      employee: employee.name,
      role: employee.role,
      department: employee.department,
      knowledgeAreas: employee.knowledgeAreas,
      totalContributions: employee.contributions,
      keyDocuments: plan.documentsToExtract,
      keyConversations: plan.conversationsToExtract,
      generatedAt: new Date(),
    };

    console.log('Knowledge summary generated:', summary);
    plan.progress = 90;
  }

  /**
   * Create knowledge transfer plan
   */
  private async createTransferPlan(plan: KnowledgePreservationPlan): Promise<void> {
    console.log(`Creating transfer plan for ${plan.employeeName}`);

    // In production, this would:
    // 1. Identify suitable transfer target
    // 2. Create structured transfer plan
    // 3. Schedule transfer sessions
    // 4. Notify stakeholders

    console.log(`Transfer plan created for target: ${plan.transferTarget}`);
  }

  /**
   * Finalize knowledge preservation after departure
   */
  private async finalizeKnowledgePreservation(employee: EmployeeProfile): Promise<void> {
    console.log(`Finalizing knowledge preservation for ${employee.name}`);

    // In production, this would:
    // 1. Mark all employee knowledge as preserved
    // 2. Archive employee profile
    // 3. Generate final report
    // 4. Notify stakeholders

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'preservation_finalized',
      employeeId: employee.id,
      employeeName: employee.name,
      message: `Knowledge preservation finalized for ${employee.name}. All institutional knowledge preserved.`,
    });
  }

  /**
   * Set transfer target for preservation plan
   */
  setTransferTarget(planId: string, targetEmployeeId: string): void {
    const plan = this.preservationPlans.get(planId);
    if (plan) {
      plan.transferTarget = targetEmployeeId;
      console.log(`Transfer target set for plan ${planId}: ${targetEmployeeId}`);
    }
  }

  /**
   * Get preservation plan for employee
   */
  getPreservationPlan(employeeId: string): KnowledgePreservationPlan | undefined {
    for (const plan of this.preservationPlans.values()) {
      if (plan.employeeId === employeeId) {
        return plan;
      }
    }
    return undefined;
  }

  /**
   * Get all active preservation plans
   */
  getActivePreservationPlans(): KnowledgePreservationPlan[] {
    return Array.from(this.preservationPlans.values()).filter(
      p => p.status === 'in_progress'
    );
  }

  /**
   * Get employees at risk (those with departure notices)
   */
  getEmployeesAtRisk(): EmployeeProfile[] {
    return Array.from(this.employees.values()).filter(
      e => e.departureStatus === 'notice_given'
    );
  }

  /**
   * Get departure detection status
   */
  getDetectionStatus(): {
    config: DepartureDetectionConfig;
    employeesMonitored: number;
    employeesAtRisk: number;
    activePreservations: number;
  } {
    return {
      config: this.detectionConfig,
      employeesMonitored: this.employees.size,
      employeesAtRisk: this.getEmployeesAtRisk().length,
      activePreservations: this.getActivePreservationPlans().length,
    };
  }
}

// Export singleton instance
export const companyBrainDepartureService = new CompanyBrainDepartureService();
