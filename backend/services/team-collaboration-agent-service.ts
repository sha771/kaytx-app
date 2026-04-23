/**
 * Team Collaboration AI Agent Integration Service
 * Integrates Operations & Management AI agents with team collaboration features
 * Supports agent-to-agent consulting for task coordination and project management
 */

import { AIAgent } from '../../constants/aiAgentHierarchy';
import { 
  a2aCommunicationService, 
  ConsultationSession 
} from '../services/a2a-communication-service';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface TeamTask {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  assigneeAgentId?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
  dueDate?: Date;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  parentTaskId?: string;
  subtasks?: string[];
  projectId?: string;
}

export interface TeamProject {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed';
  startDate: Date;
  endDate?: Date;
  teamMembers: string[];
  tasks: string[]; // task IDs
  agentAssignments: Record<string, string[]>; // agentId -> taskIds
}

export interface CollaborationTask {
  id: string;
  type: 'task_assignment' | 'workflow_automation' | 'resource_planning' | 'process_optimization' | 'compliance_check';
  agentId: string;
  status: 'pending' | 'in_progress' | 'completed';
  input: Record<string, any>;
  output?: Record<string, any>;
  consultationIds?: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface ResourceAllocation {
  agentId: string;
  allocatedTasks: number;
  availableCapacity: number;
  utilizationRate: number;
  recommendations: string[];
}

// ============================================
// TEAM COLLABORATION AI AGENT SERVICE
// ============================================

class TeamCollaborationAgentService {
  private tasks: Map<string, CollaborationTask> = new Map();
  private teamTasks: Map<string, TeamTask> = new Map();
  private projects: Map<string, TeamProject> = new Map();
  
  // ============================================
  // TASK MANAGEMENT
  // ============================================
  
  /**
   * AI Task Coordinator assigns and manages team tasks
   * Consults with Operations Manager for resource allocation
   */
  async assignTask(
    task: Omit<TeamTask, 'id'>,
    taskCoordinatorId: string = 'ai-task-coordinator'
  ): Promise<{ task: TeamTask; assignment: CollaborationTask; consultation?: ConsultationSession }> {
    // Create team task
    const teamTask: TeamTask = {
      ...task,
      id: this.generateId(),
    };
    this.teamTasks.set(teamTask.id, teamTask);
    
    // Create assignment task
    const assignmentTask = this.createCollaborationTask(
      'task_assignment',
      taskCoordinatorId,
      { teamTaskId: teamTask.id }
    );
    
    let consultation: ConsultationSession | undefined;
    
    // Consult with Resource Planner for optimal assignment
    if (task.priority === 'high' || task.priority === 'critical') {
      consultation = await a2aCommunicationService.peerConsultation(
        taskCoordinatorId,
        'ai-resource-planner',
        'analytical',
        `Resource allocation for task: ${task.title}`,
        `Optimal resource assignment needed for high priority task: ${task.title}`
      );
      assignmentTask.consultationIds = [consultation.id];
    }
    
    this.completeCollaborationTask(assignmentTask.id, {
      assignedTo: task.assignee,
      agentId: task.assigneeAgentId,
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    
    return { task: teamTask, assignment: assignmentTask, consultation };
  }
  
  /**
   * AI Workflow Automation creates automated workflows
   */
  async createWorkflowAutomation(
    projectId: string,
    workflowName: string,
    triggers: string[],
    actions: string[],
    workflowAutomationId: string = 'ai-workflow-automation'
  ): Promise<CollaborationTask> {
    const task = this.createCollaborationTask(
      'workflow_automation',
      workflowAutomationId,
      { projectId, workflowName, triggers, actions }
    );
    
    // Consult with Operations Manager for workflow approval
    const consultation = await a2aCommunicationService.subagentEscalatesToMainAgent(
      workflowAutomationId,
      'operations-management-main',
      `Workflow approval: ${workflowName}`,
      `New workflow automation requires approval for project ${projectId}`
    );
    
    task.consultationIds = [consultation.id];
    
    this.completeCollaborationTask(task.id, {
      workflowId: this.generateId(),
      status: 'active',
      automationEnabled: true,
    });
    
    return task;
  }
  
  // ============================================
  // RESOURCE PLANNING
  // ============================================
  
  /**
   * AI Resource Planner optimizes team capacity
   * Main Agent consults Resource Planner for strategic allocation
   */
  async optimizeResourceAllocation(
    projectId: string,
    mainAgentId: string = 'operations-management-main'
  ): Promise<{ allocations: ResourceAllocation[]; task: CollaborationTask; consultations: ConsultationSession[] }> {
    const task = this.createCollaborationTask(
      'resource_planning',
      'ai-resource-planner',
      { projectId }
    );
    
    // Main agent consults Resource Planner
    const resourceConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      mainAgentId,
      'ai-resource-planner',
      `Resource optimization: ${projectId}`,
      `Optimize resource allocation for project ${projectId}`,
      'high'
    );
    
    // Also consult with Task Coordinator for task distribution
    const coordinationConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      mainAgentId,
      'ai-task-coordinator',
      `Task distribution: ${projectId}`,
      `Coordinate task distribution for project ${projectId}`,
      'medium'
    );
    
    task.consultationIds = [resourceConsultation.id, coordinationConsultation.id];
    
    // Simulate resource optimization
    const allocations: ResourceAllocation[] = [
      {
        agentId: 'ai-task-coordinator',
        allocatedTasks: 15,
        availableCapacity: 20,
        utilizationRate: 0.75,
        recommendations: ['Add 2 more team members', 'Automate routine tasks'],
      },
      {
        agentId: 'ai-workflow-automation',
        allocatedTasks: 8,
        availableCapacity: 15,
        utilizationRate: 0.53,
        recommendations: ['Optimize workflow triggers', 'Reduce manual interventions'],
      },
    ];
    
    this.completeCollaborationTask(task.id, { allocations });
    
    return { 
      allocations, 
      task, 
      consultations: [resourceConsultation, coordinationConsultation] 
    };
  }
  
  // ============================================
  // PROJECT MANAGEMENT
  // ============================================
  
  /**
   * AI Operations Manager oversees project execution
   * Coordinates with multiple subagents
   */
  async manageProjectExecution(
    project: TeamProject,
    operationsManagerId: string = 'ai-operations-manager'
  ): Promise<{ project: TeamProject; consultations: ConsultationSession[] }> {
    this.projects.set(project.id, project);
    
    const consultations: ConsultationSession[] = [];
    
    // Consult with Task Coordinator for task management
    const taskConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      'operations-management-main',
      'ai-task-coordinator',
      `Project task management: ${project.name}`,
      `Coordinate task execution for project ${project.name}`,
      'high'
    );
    consultations.push(taskConsultation);
    
    // Consult with Process Optimization Agent
    const processConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      'operations-management-main',
      'ai-process-optimization',
      `Process optimization: ${project.name}`,
      `Optimize processes for project ${project.name}`,
      'medium'
    );
    consultations.push(processConsultation);
    
    // Consult with Quality Control Agent
    const qualityConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      'operations-management-main',
      'ai-quality-control',
      `Quality assurance: ${project.name}`,
      `Ensure quality standards for project ${project.name}`,
      'medium'
    );
    consultations.push(qualityConsultation);
    
    return { project, consultations };
  }
  
  // ============================================
  // PROCESS OPTIMIZATION
  // ============================================
  
  /**
   * AI Process Optimization identifies bottlenecks and improvements
   */
  async optimizeProcess(
    processId: string,
    currentMetrics: Record<string, number>,
    processOptimizationId: string = 'ai-process-optimization'
  ): Promise<{ task: CollaborationTask; recommendations: string[]; consultation: ConsultationSession }> {
    const task = this.createCollaborationTask(
      'process_optimization',
      processOptimizationId,
      { processId, currentMetrics }
    );
    
    // Consult with Operations Manager for approval
    const consultation = await a2aCommunicationService.subagentEscalatesToMainAgent(
      processOptimizationId,
      'operations-management-main',
      `Process optimization proposal: ${processId}`,
      `Recommendations for process ${processId} optimization`
    );
    
    task.consultationIds = [consultation.id];
    
    const recommendations = [
      'Eliminate redundant approval steps',
      'Automate status updates',
      'Implement parallel processing',
      'Set up automated quality checks',
    ];
    
    this.completeCollaborationTask(task.id, { recommendations, processId });
    
    return { task, recommendations, consultation };
  }
  
  // ============================================
  // COMPLIANCE & QUALITY
  // ============================================
  
  /**
   * AI Compliance Monitoring ensures project compliance
   */
  async complianceCheck(
    projectId: string,
    complianceMonitoringId: string = 'ai-compliance-monitoring'
  ): Promise<{ task: CollaborationTask; compliance: { status: string; issues: string[] } }> {
    const task = this.createCollaborationTask(
      'compliance_check',
      complianceMonitoringId,
      { projectId }
    );
    
    // Escalate issues to Operations Manager if found
    const issues: string[] = [];
    
    if (issues.length > 0) {
      const escalation = await a2aCommunicationService.subagentEscalatesToMainAgent(
        complianceMonitoringId,
        'operations-management-main',
        `Compliance issues in project: ${projectId}`,
        `Found ${issues.length} compliance issues requiring attention`
      );
      task.consultationIds = [escalation.id];
    }
    
    const compliance = {
      status: issues.length === 0 ? 'compliant' : 'issues_found',
      issues,
    };
    
    this.completeCollaborationTask(task.id, { compliance });
    
    return { task, compliance };
  }
  
  // ============================================
  // MAIN/SUBAGENT CONSULTING PATTERNS
  // ============================================
  
  /**
   * Main Agent consults multiple subagents for project planning
   */
  async collaborativeProjectPlanning(
    projectId: string,
    subAgentIds: string[]
  ): Promise<ConsultationSession[]> {
    const mainAgentId = 'operations-management-main';
    
    return Promise.all(
      subAgentIds.map(subAgentId =>
        a2aCommunicationService.mainAgentConsultsSubagent(
          mainAgentId,
          subAgentId,
          `Project planning consultation: ${projectId}`,
          `Requesting ${subAgentId} input for project ${projectId} planning`,
          'high'
        )
      )
    );
  }
  
  /**
   * Multi-agent task delegation from Main Agent
   */
  async delegateTasksToAgents(
    taskIds: string[],
    agentAssignments: Record<string, string[]> // agentId -> taskIds
  ): Promise<{ success: boolean; consultations: ConsultationSession[] }> {
    const mainAgentId = 'operations-management-main';
    const consultations: ConsultationSession[] = [];
    
    for (const [agentId, assignedTasks] of Object.entries(agentAssignments)) {
      const consultation = await a2aCommunicationService.mainAgentConsultsSubagent(
        mainAgentId,
        agentId,
        `Task delegation: ${assignedTasks.length} tasks`,
        `Delegating ${assignedTasks.length} tasks for execution`,
        'medium'
      );
      consultations.push(consultation);
    }
    
    return { success: true, consultations };
  }
  
  // ============================================
  // QUERY METHODS
  // ============================================
  
  getTask(taskId: string): CollaborationTask | undefined {
    return this.tasks.get(taskId);
  }
  
  getTeamTask(taskId: string): TeamTask | undefined {
    return this.teamTasks.get(taskId);
  }
  
  getProject(projectId: string): TeamProject | undefined {
    return this.projects.get(projectId);
  }
  
  getTasksByAgent(agentId: string): CollaborationTask[] {
    return Array.from(this.tasks.values()).filter(t => t.agentId === agentId);
  }
  
  getActiveProjects(): TeamProject[] {
    return Array.from(this.projects.values()).filter(
      p => p.status === 'active' || p.status === 'planning'
    );
  }
  
  getServiceStats(): {
    totalTasks: number;
    completedTasks: number;
    activeProjects: number;
    tasksByType: Record<string, number>;
    activeConsultations: number;
  } {
    const tasks = Array.from(this.tasks.values());
    const tasksByType = tasks.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      activeProjects: this.getActiveProjects().length,
      tasksByType,
      activeConsultations: tasks.filter(t => 
        t.consultationIds && t.consultationIds.length > 0
      ).length,
    };
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private createCollaborationTask(
    type: CollaborationTask['type'],
    agentId: string,
    input: Record<string, any>
  ): CollaborationTask {
    const task: CollaborationTask = {
      id: this.generateId(),
      type,
      agentId,
      status: 'pending',
      input,
      createdAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }
  
  private completeCollaborationTask(taskId: string, output: Record<string, any>): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.output = output;
      task.completedAt = new Date();
    }
  }
  
  private generateId(): string {
    return `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ============================================
// EXPORT
// ============================================

export const teamCollaborationAgentService = new TeamCollaborationAgentService();

export const useTeamCollaborationAgents = () => {
  return {
    assignTask: teamCollaborationAgentService.assignTask.bind(teamCollaborationAgentService),
    createWorkflowAutomation: teamCollaborationAgentService.createWorkflowAutomation.bind(teamCollaborationAgentService),
    optimizeResourceAllocation: teamCollaborationAgentService.optimizeResourceAllocation.bind(teamCollaborationAgentService),
    manageProjectExecution: teamCollaborationAgentService.manageProjectExecution.bind(teamCollaborationAgentService),
    optimizeProcess: teamCollaborationAgentService.optimizeProcess.bind(teamCollaborationAgentService),
    complianceCheck: teamCollaborationAgentService.complianceCheck.bind(teamCollaborationAgentService),
    collaborativeProjectPlanning: teamCollaborationAgentService.collaborativeProjectPlanning.bind(teamCollaborationAgentService),
    delegateTasksToAgents: teamCollaborationAgentService.delegateTasksToAgents.bind(teamCollaborationAgentService),
    getTask: teamCollaborationAgentService.getTask.bind(teamCollaborationAgentService),
    getTeamTask: teamCollaborationAgentService.getTeamTask.bind(teamCollaborationAgentService),
    getProject: teamCollaborationAgentService.getProject.bind(teamCollaborationAgentService),
    getTasksByAgent: teamCollaborationAgentService.getTasksByAgent.bind(teamCollaborationAgentService),
    getActiveProjects: teamCollaborationAgentService.getActiveProjects.bind(teamCollaborationAgentService),
    getServiceStats: teamCollaborationAgentService.getServiceStats.bind(teamCollaborationAgentService),
  };
};

export default teamCollaborationAgentService;
