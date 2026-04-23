import { AIServiceLogger } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { agentConsultingService } from './agent-consulting-service';
import { randomUUID } from 'crypto';

// ============================================
// TEAM COLLABORATION TYPES
// ============================================

export type TeamRole = 'leader' | 'manager' | 'member' | 'observer' | 'contributor' | 'reviewer';
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'blocked' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical';
export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled' | 'archived';

export interface Team {
  id: string;
  name: string;
  description: string;
  
  // Members
  members: TeamMember[];
  memberCount: number;
  
  // AI Integration
  aiAgents: TeamAIAgent[];
  aiConfig: {
    autoAssignEnabled: boolean;
    workloadBalancingEnabled: boolean;
    consultationEnabled: boolean;
    primaryAgentId?: string;
    consultedAgents: string[];
  };
  
  // Structure
  projects: string[];
  departments: string[];
  
  // Settings
  settings: TeamSettings;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  department?: string;
  
  // Skills & Workload
  skills: string[];
  capacity: number; // Hours per day
  currentLoad: number; // Current assigned hours
  availability: 'available' | 'busy' | 'away' | 'offline';
  
  // Performance
  stats: MemberStats;
  
  // AI Preferences
  aiPreferences: {
    autoSuggestTasks: boolean;
    consultationEnabled: boolean;
    preferredConsultants: string[];
  };
  
  joinedAt: Date;
  lastActiveAt: Date;
}

export interface TeamAIAgent {
  agentId: string;
  agentName: string;
  role: 'assistant' | 'specialist' | 'consultant' | 'executor';
  expertise: string[];
  assignedTasks: string[];
  isActive: boolean;
  consultationRate: number;
}

export interface MemberStats {
  tasksCompleted: number;
  tasksInProgress: number;
  onTimeDelivery: number; // percentage
  avgCompletionTime: number; // hours
  collaborationScore: number; // 0-100
  qualityScore: number; // 0-100
  lastReviewAt?: Date;
}

export interface TeamSettings {
  workflow: WorkflowConfig;
  notifications: NotificationConfig;
  permissions: PermissionConfig;
  integrations: string[];
}

export interface WorkflowConfig {
  defaultTaskStatus: TaskStatus;
  requireApprovalFor: TaskStatus[];
  autoAssignStrategy: 'round_robin' | 'skill_based' | 'workload_balanced' | 'ai_optimized';
  reviewRequired: boolean;
  allowedTransitions: Record<TaskStatus, TaskStatus[]>;
}

export interface NotificationConfig {
  channels: ('email' | 'push' | 'slack' | 'teams' | 'in_app')[];
  notifyOn: {
    taskAssigned: boolean;
    taskCompleted: boolean;
    mention: boolean;
    deadlineApproaching: boolean;
    blockerRaised: boolean;
  };
  quietHours?: {
    start: string;
    end: string;
    timezone: string;
  };
}

export interface PermissionConfig {
  canCreateTasks: TeamRole[];
  canDeleteTasks: TeamRole[];
  canAssignTasks: TeamRole[];
  canViewAnalytics: TeamRole[];
  canManageMembers: TeamRole[];
  canManageSettings: TeamRole[];
}

export interface Project {
  id: string;
  teamId: string;
  name: string;
  description: string;
  
  // Status
  status: ProjectStatus;
  health: 'excellent' | 'good' | 'at_risk' | 'critical';
  
  // Timeline
  startDate: Date;
  targetEndDate?: Date;
  actualEndDate?: Date;
  
  // Structure
  milestones: Milestone[];
  tasks: string[];
  
  // AI Management
  aiConfig: {
    projectManagerAgentId?: string;
    consultedAgents: string[];
    autoSchedulingEnabled: boolean;
    riskPredictionEnabled: boolean;
  };
  
  // Resources
  budget?: {
    allocated: number;
    spent: number;
    currency: string;
  };
  
  // Performance
  progress: {
    total: number;
    completed: number;
    percentage: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'missed';
  targetDate: Date;
  completedAt?: Date;
  deliverables: string[];
  dependencies: string[];
}

export interface Task {
  id: string;
  projectId: string;
  teamId: string;
  
  // Basic Info
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  
  // Assignment
  assignee?: {
    userId?: string;
    agentId?: string;
    name: string;
    assignedAt: Date;
    assignedBy: string;
  };
  
  // Timeline
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  startedAt?: Date;
  completedAt?: Date;
  
  // Estimation
  estimatedHours?: number;
  actualHours?: number;
  
  // Structure
  parentTaskId?: string;
  subtasks: string[];
  dependencies: string[];
  blockedBy?: string[];
  
  // AI Processing
  aiAnalysis: {
    complexity: number; // 1-10
    suggestedAssignees: string[];
    estimatedHours: number;
    riskLevel: 'low' | 'medium' | 'high';
    consultedAgents: string[];
  };
  
  // Worklog
  worklog: WorklogEntry[];
  
  // Collaboration
  comments: Comment[];
  attachments: Attachment[];
  mentions: string[];
  
  // Categorization
  tags: string[];
  category?: string;
  labels: string[];
}

export interface WorklogEntry {
  id: string;
  userId: string;
  hours: number;
  description: string;
  timestamp: Date;
  aiAssisted: boolean;
  consultedAgents?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  mentions: string[];
  attachments: Attachment[];
  reactions: Record<string, number>;
  isAIAssisted: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface WorkloadAnalysis {
  teamId: string;
  timestamp: Date;
  
  overall: {
    totalCapacity: number;
    utilizedCapacity: number;
    utilizationRate: number;
    availableCapacity: number;
  };
  
  byMember: Record<string, {
    capacity: number;
    utilized: number;
    available: number;
    utilizationRate: number;
    overload: boolean;
    underload: boolean;
  }>;
  
  bySkill: Record<string, {
    demand: number;
    supply: number;
    gap: number;
    utilizationRate: number;
  }>;
  
  aiRecommendations: {
    rebalancing: string[];
    hiring: string[];
    training: string[];
    consultedAgents: string[];
  };
}

export interface TeamMeeting {
  id: string;
  teamId: string;
  title: string;
  description: string;
  
  // Schedule
  startTime: Date;
  endTime: Date;
  timezone: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    interval: number;
  };
  
  // Participants
  organizer: string;
  attendees: string[];
  optionalAttendees: string[];
  aiAgents: string[];
  
  // AI Features
  aiFeatures: {
    transcriptionEnabled: boolean;
    summarizationEnabled: boolean;
    actionItemExtraction: boolean;
    sentimentAnalysis: boolean;
    consultedAgents: string[];
  };
  
  // Outcome
  outcomes: {
    transcript?: string;
    summary?: string;
    actionItems: ActionItem[];
    decisions: Decision[];
    sentiment?: 'positive' | 'neutral' | 'negative';
  };
  
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdFromMeeting: string;
}

export interface Decision {
  id: string;
  topic: string;
  decision: string;
  rationale: string;
  approvedBy: string[];
  rejectedBy: string[];
  timestamp: Date;
}

// ============================================
// TEAM COLLABORATION SERVICE
// ============================================

class TeamCollaborationService {
  private teams: Map<string, Team> = new Map();
  private projects: Map<string, Project> = new Map();
  private tasks: Map<string, Task> = new Map();
  private meetings: Map<string, TeamMeeting> = new Map();
  
  private workloadCheckInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startWorkloadMonitoring();
  }

  // ============================================
  // TEAM MANAGEMENT
  // ============================================
  
  async createTeam(
    name: string,
    description: string,
    creatorId: string,
    options: {
      initialMembers?: Omit<TeamMember, 'id' | 'joinedAt' | 'lastActiveAt'>[];
      configureAI?: boolean;
    } = {}
  ): Promise<Team> {
    const teamId = randomUUID();
    const now = new Date();

    const team: Team = {
      id: teamId,
      name,
      description,
      members: [],
      memberCount: 0,
      aiAgents: [],
      aiConfig: {
        autoAssignEnabled: true,
        workloadBalancingEnabled: true,
        consultationEnabled: true,
        consultedAgents: []
      },
      projects: [],
      departments: [],
      settings: {
        workflow: {
          defaultTaskStatus: 'backlog',
          requireApprovalFor: ['completed'],
          autoAssignStrategy: 'ai_optimized',
          reviewRequired: true,
          allowedTransitions: {
            backlog: ['todo'],
            todo: ['in_progress', 'backlog'],
            in_progress: ['in_review', 'blocked', 'completed'],
            in_review: ['completed', 'in_progress'],
            blocked: ['in_progress'],
            completed: [],
            cancelled: []
          }
        },
        notifications: {
          channels: ['in_app', 'email'],
          notifyOn: {
            taskAssigned: true,
            taskCompleted: true,
            mention: true,
            deadlineApproaching: true,
            blockerRaised: true
          }
        },
        permissions: {
          canCreateTasks: ['leader', 'manager', 'member'],
          canDeleteTasks: ['leader', 'manager'],
          canAssignTasks: ['leader', 'manager'],
          canViewAnalytics: ['leader', 'manager'],
          canManageMembers: ['leader', 'manager'],
          canManageSettings: ['leader']
        },
        integrations: []
      },
      createdAt: now,
      updatedAt: now,
      createdBy: creatorId
    };

    // Add initial members
    if (options.initialMembers) {
      for (const memberData of options.initialMembers) {
        const member: TeamMember = {
          id: randomUUID(),
          ...memberData,
          joinedAt: now,
          lastActiveAt: now
        };
        team.members.push(member);
        team.memberCount++;
      }
    }

    // Configure AI if requested
    if (options.configureAI !== false) {
      await this.configureAITeam(teamId);
    }

    this.teams.set(teamId, team);

    AIServiceLogger.logAgentEvent('team_created', 'team-collaboration', {
      teamId,
      name,
      memberCount: team.memberCount
    });

    return team;
  }

  private async configureAITeam(teamId: string): Promise<void> {
    const team = this.teams.get(teamId);
    if (!team) return;

    // Find relevant AI agents
    const projectManagerAgents = agentConsultingService.findConsultantsByExpertise('project_management');
    const taskManagerAgents = agentConsultingService.findConsultantsByExpertise('task_management');
    const operationsAgents = agentConsultingService.findConsultantsByExpertise('operations');

    const consultedAgents: string[] = [];

    if (projectManagerAgents.length > 0) {
      const pmAgent = projectManagerAgents[0];
      consultedAgents.push(pmAgent.agentId);
      
      team.aiAgents.push({
        agentId: pmAgent.agentId,
        agentName: pmAgent.agentName,
        role: 'assistant',
        expertise: pmAgent.expertiseAreas,
        assignedTasks: [],
        isActive: true,
        consultationRate: 0.8
      });

      // Consult with project manager
      await agentConsultingService.initiateConsultation(
        'team-system',
        pmAgent.agentId,
        'Team Setup: Project Management Strategy',
        `Setting up a new team "${team.name}" with ${team.memberCount} members. ` +
        `What project management approach and workflow configuration do you recommend?`,
        { type: 'advisory', priority: 'high' }
      );
    }

    if (taskManagerAgents.length > 0) {
      consultedAgents.push(taskManagerAgents[0].agentId);
    }

    if (operationsAgents.length > 0) {
      consultedAgents.push(operationsAgents[0].agentId);
    }

    team.aiConfig.consultedAgents = consultedAgents;
    this.teams.set(teamId, team);
  }

  // ============================================
  // PROJECT MANAGEMENT
  // ============================================
  
  async createProject(
    teamId: string,
    name: string,
    description: string,
    creatorId: string,
    options: {
      startDate?: Date;
      targetEndDate?: Date;
      budget?: number;
      configureAI?: boolean;
    } = {}
  ): Promise<Project> {
    const team = this.teams.get(teamId);
    if (!team) throw new Error(`Team ${teamId} not found`);

    const projectId = randomUUID();
    const now = new Date();

    const project: Project = {
      id: projectId,
      teamId,
      name,
      description,
      status: 'planning',
      health: 'good',
      startDate: options.startDate || now,
      targetEndDate: options.targetEndDate,
      milestones: [],
      tasks: [],
      aiConfig: {
        consultedAgents: [],
        autoSchedulingEnabled: true,
        riskPredictionEnabled: true
      },
      progress: {
        total: 0,
        completed: 0,
        percentage: 0
      },
      createdAt: now,
      updatedAt: now,
      createdBy: creatorId
    };

    if (options.budget) {
      project.budget = {
        allocated: options.budget,
        spent: 0,
        currency: 'USD'
      };
    }

    // Configure AI for project
    if (options.configureAI !== false) {
      await this.configureAIProject(projectId, teamId);
    }

    this.projects.set(projectId, project);
    team.projects.push(projectId);
    this.teams.set(teamId, team);

    AIServiceLogger.logAgentEvent('project_created', 'team-collaboration', {
      projectId,
      teamId,
      name
    });

    return project;
  }

  private async configureAIProject(projectId: string, teamId: string): Promise<void> {
    const project = this.projects.get(projectId);
    const team = this.teams.get(teamId);
    if (!project || !team) return;

    // Consult with project management agents
    const pmAgents = agentConsultingService.findConsultantsByExpertise('project_management');
    const planningAgents = agentConsultingService.findConsultantsByExpertise('project_planning');
    const riskAgents = agentConsultingService.findConsultantsByExpertise('risk_management');

    const consultedAgents: string[] = [];

    if (pmAgents.length > 0) {
      const pmAgent = pmAgents[0];
      consultedAgents.push(pmAgent.agentId);
      project.aiConfig.projectManagerAgentId = pmAgent.agentId;

      await agentConsultingService.initiateConsultation(
        'project-system',
        pmAgent.agentId,
        'Project Setup: Planning & Strategy',
        `Setting up project "${project.name}" for team "${team.name}". ` +
        `Timeline: ${project.startDate.toISOString()} to ${project.targetEndDate?.toISOString() || 'TBD'}. ` +
        `What project structure, milestones, and risk factors should I consider?`,
        { type: 'advisory', priority: 'high' }
      );
    }

    if (planningAgents.length > 0) {
      consultedAgents.push(planningAgents[0].agentId);
    }

    if (riskAgents.length > 0) {
      consultedAgents.push(riskAgents[0].agentId);
    }

    project.aiConfig.consultedAgents = consultedAgents;
    this.projects.set(projectId, project);
  }

  // ============================================
  // TASK MANAGEMENT
  // ============================================
  
  async createTask(
    projectId: string,
    title: string,
    description: string,
    creatorId: string,
    options: {
      priority?: TaskPriority;
      dueDate?: Date;
      estimatedHours?: number;
      assigneeId?: string;
      parentTaskId?: string;
      autoAssign?: boolean;
      tags?: string[];
    } = {}
  ): Promise<Task> {
    const project = this.projects.get(projectId);
    if (!project) throw new Error(`Project ${projectId} not found`);

    const team = this.teams.get(project.teamId);
    if (!team) throw new Error(`Team not found`);

    const taskId = randomUUID();
    const now = new Date();

    // AI analysis for task
    const aiAnalysis = await this.analyzeTask(title, description, team);

    const task: Task = {
      id: taskId,
      projectId,
      teamId: project.teamId,
      title,
      description,
      status: 'backlog',
      priority: options.priority || 'medium',
      createdAt: now,
      updatedAt: now,
      dueDate: options.dueDate,
      estimatedHours: options.estimatedHours || aiAnalysis.estimatedHours,
      parentTaskId: options.parentTaskId,
      subtasks: [],
      dependencies: [],
      aiAnalysis,
      worklog: [],
      comments: [],
      attachments: [],
      mentions: [],
      tags: options.tags || []
    };

    // Auto-assign if enabled and no assignee specified
    if (options.autoAssign !== false && !options.assigneeId) {
      const assignee = await this.findBestAssignee(task, team);
      if (assignee) {
        task.assignee = {
          userId: assignee.userId,
          name: assignee.name,
          assignedAt: now,
          assignedBy: 'ai-system'
        };
      }
    } else if (options.assigneeId) {
      const member = team.members.find(m => m.userId === options.assigneeId);
      if (member) {
        task.assignee = {
          userId: member.userId,
          name: member.name,
          assignedAt: now,
          assignedBy: creatorId
        };
      }
    }

    this.tasks.set(taskId, task);
    project.tasks.push(taskId);
    this.projects.set(projectId, project);

    AIServiceLogger.logAgentEvent('task_created', 'team-collaboration', {
      taskId,
      projectId,
      title,
      assignee: task.assignee?.userId || 'unassigned'
    });

    return task;
  }

  private async analyzeTask(
    title: string,
    description: string,
    team: Team
  ): Promise<Task['aiAnalysis']> {
    // Consult with task management agents
    const taskAgents = agentConsultingService.findConsultantsByExpertise('task_management');
    const consultedAgents: string[] = [];

    if (taskAgents.length > 0) {
      consultedAgents.push(taskAgents[0].agentId);

      await agentConsultingService.initiateConsultation(
        'task-system',
        taskAgents[0].agentId,
        'Task Analysis: Estimation & Assignment',
        `Analyzing task: "${title}"\nDescription: ${description}\n` +
        `Team size: ${team.memberCount}. ` +
        `What is the complexity, estimated hours, and best assignee profile?`,
        { type: 'analytical', priority: 'medium' }
      );
    }

    return {
      complexity: this.estimateComplexity(title, description),
      suggestedAssignees: [],
      estimatedHours: this.estimateHours(title, description),
      riskLevel: 'low',
      consultedAgents
    };
  }

  private findBestAssignee(task: Task, team: Team): TeamMember | null {
    // Find members with available capacity and relevant skills
    const availableMembers = team.members.filter(m => {
      const utilization = m.currentLoad / m.capacity;
      return utilization < 0.8 && m.availability === 'available';
    });

    if (availableMembers.length === 0) return null;

    // Score members based on skills match and workload
    const scoredMembers = availableMembers.map(m => {
      const skillMatch = task.tags.filter(tag => m.skills.includes(tag)).length;
      const workloadScore = 1 - (m.currentLoad / m.capacity);
      const performanceScore = m.stats.onTimeDelivery / 100;
      
      return {
        member: m,
        score: skillMatch * 0.4 + workloadScore * 0.4 + performanceScore * 0.2
      };
    });

    scoredMembers.sort((a, b) => b.score - a.score);
    return scoredMembers[0]?.member || null;
  }

  private estimateComplexity(title: string, description: string): number {
    const text = (title + ' ' + description).toLowerCase();
    let complexity = 5;

    // Increase complexity for certain keywords
    if (text.includes('architecture') || text.includes('design')) complexity += 2;
    if (text.includes('integration') || text.includes('api')) complexity += 1;
    if (text.includes('research') || text.includes('analysis')) complexity += 1;
    if (text.includes('simple') || text.includes('minor')) complexity -= 2;
    if (text.includes('quick') || text.includes('fix')) complexity -= 1;

    return Math.min(Math.max(complexity, 1), 10);
  }

  private estimateHours(title: string, description: string): number {
    const complexity = this.estimateComplexity(title, description);
    return complexity * 2; // Rough estimate: complexity * 2 hours
  }

  // ============================================
  // WORKLOAD MANAGEMENT
  // ============================================
  
  async analyzeWorkload(teamId: string): Promise<WorkloadAnalysis> {
    const team = this.teams.get(teamId);
    if (!team) throw new Error(`Team ${teamId} not found`);

    const now = new Date();
    
    // Get all tasks for team
    const teamTasks = Array.from(this.tasks.values())
      .filter(t => t.teamId === teamId);

    const analysis: WorkloadAnalysis = {
      teamId,
      timestamp: now,
      overall: {
        totalCapacity: 0,
        utilizedCapacity: 0,
        utilizationRate: 0,
        availableCapacity: 0
      },
      byMember: {},
      bySkill: {},
      aiRecommendations: {
        rebalancing: [],
        hiring: [],
        training: [],
        consultedAgents: []
      }
    };

    // Calculate by member
    for (const member of team.members) {
      const assignedTasks = teamTasks.filter(t => 
        t.assignee?.userId === member.userId &&
        ['in_progress', 'todo', 'in_review'].includes(t.status)
      );

      const utilizedHours = assignedTasks.reduce((sum, t) => 
        sum + (t.estimatedHours || 0), 0
      );

      analysis.byMember[member.userId] = {
        capacity: member.capacity,
        utilized: utilizedHours,
        available: member.capacity - utilizedHours,
        utilizationRate: utilizedHours / member.capacity,
        overload: utilizedHours > member.capacity,
        underload: utilizedHours < member.capacity * 0.5
      };

      analysis.overall.totalCapacity += member.capacity;
      analysis.overall.utilizedCapacity += utilizedHours;
    }

    analysis.overall.availableCapacity = 
      analysis.overall.totalCapacity - analysis.overall.utilizedCapacity;
    analysis.overall.utilizationRate = 
      analysis.overall.utilizedCapacity / analysis.overall.totalCapacity;

    // Get AI recommendations
    const operationsAgents = agentConsultingService.findConsultantsByExpertise('operations');
    if (operationsAgents.length > 0) {
      analysis.aiRecommendations.consultedAgents = 
        operationsAgents.slice(0, 2).map(a => a.agentId);
      
      // Generate recommendations based on analysis
      for (const [userId, data] of Object.entries(analysis.byMember)) {
        if (data.overload) {
          analysis.aiRecommendations.rebalancing.push(
            `${userId} is overloaded. Redistribute ${data.utilized - data.capacity} hours.`
          );
        }
        if (data.underload) {
          analysis.aiRecommendations.rebalancing.push(
            `${userId} is underutilized. Assign more tasks.`
          );
        }
      }
    }

    return analysis;
  }

  private startWorkloadMonitoring(): void {
    this.workloadCheckInterval = setInterval(async () => {
      for (const team of this.teams.values()) {
        if (team.aiConfig.workloadBalancingEnabled) {
          await this.analyzeWorkload(team.id);
        }
      }
    }, 3600000); // Check every hour
  }

  // ============================================
  // MEETING MANAGEMENT
  // ============================================
  
  async scheduleMeeting(
    teamId: string,
    title: string,
    startTime: Date,
    endTime: Date,
    organizer: string,
    options: {
      description?: string;
      attendees?: string[];
      aiFeatures?: Partial<TeamMeeting['aiFeatures']>;
    } = {}
  ): Promise<TeamMeeting> {
    const team = this.teams.get(teamId);
    if (!team) throw new Error(`Team ${teamId} not found`);

    const meetingId = randomUUID();

    const meeting: TeamMeeting = {
      id: meetingId,
      teamId,
      title,
      description: options.description || '',
      startTime,
      endTime,
      timezone: 'UTC',
      organizer,
      attendees: options.attendees || [],
      optionalAttendees: [],
      aiAgents: team.aiAgents.map(a => a.agentId),
      aiFeatures: {
        transcriptionEnabled: true,
        summarizationEnabled: true,
        actionItemExtraction: true,
        sentimentAnalysis: true,
        consultedAgents: team.aiConfig.consultedAgents,
        ...options.aiFeatures
      },
      outcomes: {
        actionItems: [],
        decisions: []
      },
      status: 'scheduled'
    };

    this.meetings.set(meetingId, meeting);

    // Notify attendees
    AIServiceLogger.logAgentEvent('meeting_scheduled', 'team-collaboration', {
      meetingId,
      teamId,
      title,
      attendeeCount: meeting.attendees.length
    });

    return meeting;
  }

  // ============================================
  // PUBLIC API
  // ============================================
  
  getTeam(teamId: string): Team | null {
    return this.teams.get(teamId) || null;
  }

  getProject(projectId: string): Project | null {
    return this.projects.get(projectId) || null;
  }

  getTask(taskId: string): Task | null {
    return this.tasks.get(taskId) || null;
  }

  getTasksForProject(projectId: string): Task[] {
    return Array.from(this.tasks.values())
      .filter(t => t.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getTasksForAssignee(assigneeId: string): Task[] {
    return Array.from(this.tasks.values())
      .filter(t => t.assignee?.userId === assigneeId)
      .sort((a, b) => {
        const priorityOrder = { critical: 4, urgent: 3, high: 2, medium: 1, low: 0 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  async updateTaskStatus(
    taskId: string,
    newStatus: TaskStatus,
    userId: string
  ): Promise<Task> {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    const oldStatus = task.status;
    task.status = newStatus;
    task.updatedAt = new Date();

    // Track start/completion
    if (newStatus === 'in_progress' && !task.startedAt) {
      task.startedAt = new Date();
    }
    if (newStatus === 'completed') {
      task.completedAt = new Date();
      
      // Update member stats
      if (task.assignee?.userId) {
        const team = this.teams.get(task.teamId);
        const member = team?.members.find(m => m.userId === task.assignee?.userId);
        if (member) {
          member.stats.tasksCompleted++;
          member.stats.tasksInProgress--;
        }
      }
    }

    AIServiceLogger.logAgentEvent('task_status_updated', 'team-collaboration', {
      taskId,
      oldStatus,
      newStatus,
      userId
    });

    return task;
  }

  getStats(): {
    totalTeams: number;
    totalProjects: number;
    totalTasks: number;
    activeTasks: number;
    totalMeetings: number;
  } {
    return {
      totalTeams: this.teams.size,
      totalProjects: this.projects.size,
      totalTasks: this.tasks.size,
      activeTasks: Array.from(this.tasks.values())
        .filter(t => ['todo', 'in_progress', 'in_review'].includes(t.status)).length,
      totalMeetings: this.meetings.size
    };
  }

  destroy(): void {
    if (this.workloadCheckInterval) {
      clearInterval(this.workloadCheckInterval);
    }
    this.teams.clear();
    this.tasks.clear();
    this.meetings.clear();
    this.removeAllListeners();
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const teamCollaborationService = new TeamCollaborationService();

export default teamCollaborationService;
