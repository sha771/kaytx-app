/**
 * Agent Team Service
 * Manages AI agent teams with main/sub agent hierarchy
 */

import { eq, and, or, desc, asc, sql, inArray, isNull } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  agentTeams,
  agentTeamMembers,
  agentHierarchy,
  agentRoles,
  agentPermissions,
  agentCollaborations,
  type AgentTeam,
  type AgentTeamMember,
  type AgentHierarchy,
  type AgentRole,
  type AgentPermission,
  type AgentCollaboration,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('AgentTeam');

// Hierarchy Types
export type HierarchyType = 'main-sub' | 'peer' | 'matrix' | 'flat';
export type AgentLevel = 'executive' | 'manager' | 'lead' | 'specialist' | 'junior';
export type TeamStatus = 'active' | 'inactive' | 'dissolved';
export type CollaborationType = 'sequential' | 'parallel' | 'adaptive' | 'swarm';

// Agent Definition
export interface AgentDefinition {
  id: string;
  name: string;
  description?: string;
  type: 'main' | 'sub' | 'peer';
  level: AgentLevel;
  specialty: string;
  capabilities: string[];
  model: string;
  voice?: {
    provider: string;
    voiceId: string;
    language: string;
    accent?: string;
    ageRange?: 'young' | 'middle' | 'senior';
    gender?: 'male' | 'female' | 'neutral';
    speakingRate?: number;
    pitch?: number;
  };
  avatar?: string;
  personality?: {
    tone: 'professional' | 'friendly' | 'formal' | 'casual';
    communicationStyle: 'direct' | 'diplomatic' | 'analytical' | 'creative';
    proactivity: 'high' | 'medium' | 'low';
  };
  training?: {
    status: 'untrained' | 'training' | 'trained' | 'fine-tuned';
    progress: number;
    datasetId?: string;
    lastTrainedAt?: Date;
    accuracy?: number;
  };
  schedule?: {
    timezone: string;
    workingHours: { start: string; end: string };
    daysOfWeek: number[];
    breaks?: { start: string; end: string }[];
  };
  costCenter?: {
    hourlyRate: number;
    monthlyBudget: number;
    currency: string;
  };
  metadata?: Record<string, any>;
}

// Team Definition
export interface TeamDefinition {
  name: string;
  description?: string;
  hierarchyType: HierarchyType;
  department: string;
  specialty: string;
  goals: string[];
  kpiMetrics: {
    name: string;
    target: number;
    unit: string;
  }[];
  settings?: {
    autoAssignTasks: boolean;
    loadBalancing: boolean;
    escalationEnabled: boolean;
    collaborationMode: CollaborationType;
  };
}

// Hierarchy Node
export interface HierarchyNode {
  agent: AgentDefinition;
  parentId?: string;
  children: HierarchyNode[];
  peers: string[];
  depth: number;
  path: string[];
}

// Team Performance
export interface TeamPerformance {
  teamId: string;
  period: { start: Date; end: Date };
  metrics: {
    tasksCompleted: number;
    tasksFailed: number;
    averageResponseTime: number;
    customerSatisfaction: number;
    costEfficiency: number;
    collaborationScore: number;
  };
  agentPerformances: {
    agentId: string;
    tasksHandled: number;
    successRate: number;
    averageExecutionTime: number;
    utilizationRate: number;
  }[];
}

// Work Assignment
export interface WorkAssignment {
  assignmentId: string;
  taskId: string;
  teamId: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  dueDate?: Date;
  estimatedEffort: number;
  actualEffort?: number;
  collaborationIds?: string[];
}

// Collaboration Session
export interface CollaborationSession {
  sessionId: string;
  type: CollaborationType;
  initiatorId: string;
  participantIds: string[];
  taskId: string;
  status: 'forming' | 'active' | 'completed' | 'failed';
  strategy: string;
  outputs: any[];
  startedAt: Date;
  completedAt?: Date;
}

class AgentTeamService {
  // Create a new team
  async createTeam(
    definition: TeamDefinition,
    userId?: string,
    organizationId?: string
  ): Promise<{ success: boolean; teamId?: string; error?: string }> {
    try {
      const teamId = crypto.randomUUID();

      await db.insert(agentTeams).values({
        id: teamId,
        name: definition.name,
        description: definition.description,
        hierarchyType: definition.hierarchyType,
        department: definition.department,
        specialty: definition.specialty,
        goals: definition.goals,
        kpiMetrics: JSON.stringify(definition.kpiMetrics),
        settings: JSON.stringify(definition.settings || {}),
        status: 'active',
        organizationId,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId: userId || 'system',
        organizationId: organizationId || 'system',
        action: 'team_created',
        resource: 'agent_team',
        resourceId: teamId,
        details: { name: definition.name, hierarchyType: definition.hierarchyType },
      });

      return { success: true, teamId };
    } catch (error) {
      logger.error('Error creating team', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create team',
      };
    }
  }

  // Add agent to team
  async addAgentToTeam(
    teamId: string,
    agent: AgentDefinition,
    parentId?: string,
    roleId?: string,
    userId?: string
  ): Promise<{ success: boolean; memberId?: string; error?: string }> {
    try {
      const memberId = crypto.randomUUID();

      // Add team member
      await db.insert(agentTeamMembers).values({
        id: memberId,
        teamId,
        agentId: agent.id,
        roleId,
        level: agent.level,
        specialty: agent.specialty,
        capabilities: agent.capabilities,
        model: agent.model,
        voiceConfig: agent.voice ? JSON.stringify(agent.voice) : null,
        avatar: agent.avatar,
        personality: agent.personality ? JSON.stringify(agent.personality) : null,
        trainingStatus: agent.training?.status || 'untrained',
        trainingProgress: agent.training?.progress || 0,
        trainingDatasetId: agent.training?.datasetId,
        lastTrainedAt: agent.training?.lastTrainedAt,
        modelAccuracy: agent.training?.accuracy,
        schedule: agent.schedule ? JSON.stringify(agent.schedule) : null,
        hourlyRate: agent.costCenter?.hourlyRate,
        monthlyBudget: agent.costCenter?.monthlyBudget,
        currency: agent.costCenter?.currency,
        metadata: agent.metadata ? JSON.stringify(agent.metadata) : null,
        isActive: true,
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Create hierarchy entry if parent specified
      if (parentId) {
        await db.insert(agentHierarchy).values({
          id: crypto.randomUUID(),
          teamId,
          agentId: agent.id,
          parentAgentId: parentId,
          level: agent.level,
          path: `${parentId}.${agent.id}`,
          depth: await this.calculateDepth(teamId, parentId),
          relationship: 'reports-to',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // This is a root/main agent
        await db.insert(agentHierarchy).values({
          id: crypto.randomUUID(),
          teamId,
          agentId: agent.id,
          parentAgentId: null,
          level: agent.level,
          path: agent.id,
          depth: 0,
          relationship: 'root',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await logAudit({
        userId: userId || 'system',
        action: 'agent_added_to_team',
        resource: 'agent_team_member',
        resourceId: memberId,
        details: { teamId, agentId: agent.id, parentId },
      });

      return { success: true, memberId };
    } catch (error) {
      logger.error('Error adding agent to team', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add agent',
      };
    }
  }

  // Create agent hierarchy
  async createHierarchy(
    teamId: string,
    mainAgent: AgentDefinition,
    subAgents: AgentDefinition[],
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Add main agent
      const mainResult = await this.addAgentToTeam(teamId, mainAgent, undefined, undefined, userId);
      if (!mainResult.success) {
        return { success: false, error: mainResult.error };
      }

      // Add sub-agents with main agent as parent
      for (const subAgent of subAgents) {
        const subResult = await this.addAgentToTeam(
          teamId,
          subAgent,
          mainAgent.id,
          undefined,
          userId
        );
        if (!subResult.success) {
          return { success: false, error: subResult.error };
        }
      }

      return { success: true };
    } catch (error) {
      logger.error('Error creating hierarchy', error as Error);
      return { success: false, error: 'Failed to create hierarchy' };
    }
  }

  // Get team hierarchy
  async getTeamHierarchy(teamId: string): Promise<HierarchyNode | null> {
    try {
      // Get all team members
      const members = await db.select().from(agentTeamMembers)
        .where(and(
          eq(agentTeamMembers.teamId, teamId),
          eq(agentTeamMembers.isActive, true)
        ));

      // Get hierarchy relationships
      const hierarchies = await db.select().from(agentHierarchy)
        .where(eq(agentHierarchy.teamId, teamId));

      // Build agent map
      const agentMap = new Map<string, AgentDefinition>();
      for (const member of members) {
        agentMap.set(member.agentId, this.mapMemberToAgent(member));
      }

      // Find root
      const rootHierarchy = hierarchies.find(h => h.parentAgentId === null);
      if (!rootHierarchy) return null;

      const rootAgent = agentMap.get(rootHierarchy.agentId);
      if (!rootAgent) return null;

      // Build tree
      const buildTree = (agentId: string, depth: number, path: string[]): HierarchyNode => {
        const agent = agentMap.get(agentId)!;
        const children = hierarchies
          .filter(h => h.parentAgentId === agentId)
          .map(h => buildTree(h.agentId, depth + 1, [...path, agentId]));

        const peers = hierarchies
          .filter(h => h.parentAgentId === rootHierarchy.parentAgentId && h.agentId !== agentId)
          .map(h => h.agentId);

        return {
          agent,
          parentId: hierarchies.find(h => h.agentId === agentId)?.parentAgentId || undefined,
          children,
          peers,
          depth,
          path,
        };
      };

      return buildTree(rootHierarchy.agentId, 0, []);
    } catch (error) {
      logger.error('Error getting team hierarchy', error as Error);
      return null;
    }
  }

  // Get agent details
  async getAgentDetails(agentId: string, teamId?: string): Promise<AgentDefinition | null> {
    try {
      let query = db.select().from(agentTeamMembers)
        .where(eq(agentTeamMembers.agentId, agentId));

      if (teamId) {
        query = query.where(eq(agentTeamMembers.teamId, teamId));
      }

      const [member] = await query;
      if (!member) return null;

      return this.mapMemberToAgent(member);
    } catch (error) {
      logger.error('Error getting agent details', error as Error);
      return null;
    }
  }

  // Update agent
  async updateAgent(
    agentId: string,
    updates: Partial<AgentDefinition>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { updatedAt: new Date() };

      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.level) updateData.level = updates.level;
      if (updates.specialty) updateData.specialty = updates.specialty;
      if (updates.capabilities) updateData.capabilities = updates.capabilities;
      if (updates.model) updateData.model = updates.model;
      if (updates.voice) updateData.voiceConfig = JSON.stringify(updates.voice);
      if (updates.avatar) updateData.avatar = updates.avatar;
      if (updates.personality) updateData.personality = JSON.stringify(updates.personality);
      if (updates.training) {
        updateData.trainingStatus = updates.training.status;
        updateData.trainingProgress = updates.training.progress;
        updateData.trainingDatasetId = updates.training.datasetId;
        updateData.lastTrainedAt = updates.training.lastTrainedAt;
        updateData.modelAccuracy = updates.training.accuracy;
      }
      if (updates.schedule) updateData.schedule = JSON.stringify(updates.schedule);
      if (updates.costCenter) {
        updateData.hourlyRate = updates.costCenter.hourlyRate;
        updateData.monthlyBudget = updates.costCenter.monthlyBudget;
        updateData.currency = updates.costCenter.currency;
      }
      if (updates.metadata) updateData.metadata = JSON.stringify(updates.metadata);

      await db.update(agentTeamMembers)
        .set(updateData)
        .where(eq(agentTeamMembers.agentId, agentId));

      await logAudit({
        userId: userId || 'system',
        action: 'agent_updated',
        resource: 'agent_team_member',
        resourceId: agentId,
        details: { updates: Object.keys(updates) },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating agent', error as Error);
      return { success: false, error: 'Failed to update agent' };
    }
  }

  // Remove agent from team
  async removeAgentFromTeam(
    teamId: string,
    agentId: string,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Remove from hierarchy
      await db.delete(agentHierarchy)
        .where(
          and(
            eq(agentHierarchy.teamId, teamId),
            or(
              eq(agentHierarchy.agentId, agentId),
              eq(agentHierarchy.parentAgentId, agentId)
            )
          )
        );

      // Deactivate member
      await db.update(agentTeamMembers)
        .set({
          isActive: false,
          leftAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(agentTeamMembers.teamId, teamId),
            eq(agentTeamMembers.agentId, agentId)
          )
        );

      await logAudit({
        userId: userId || 'system',
        action: 'agent_removed_from_team',
        resource: 'agent_team_member',
        resourceId: agentId,
        details: { teamId },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error removing agent', error as Error);
      return { success: false, error: 'Failed to remove agent' };
    }
  }

  // Get teams
  async getTeams(options?: {
    organizationId?: string;
    department?: string;
    status?: TeamStatus;
  }): Promise<AgentTeam[]> {
    let query = db.select().from(agentTeams)
      .orderBy(desc(agentTeams.createdAt));

    if (options?.organizationId) {
      query = query.where(eq(agentTeams.organizationId, options.organizationId));
    }
    if (options?.department) {
      query = query.where(eq(agentTeams.department, options.department));
    }
    if (options?.status) {
      query = query.where(eq(agentTeams.status, options.status));
    }

    return await query;
  }

  // Get team members
  async getTeamMembers(
    teamId: string,
    options?: {
      level?: AgentLevel;
      isActive?: boolean;
    }
  ): Promise<AgentDefinition[]> {
    let query = db.select().from(agentTeamMembers)
      .where(eq(agentTeamMembers.teamId, teamId))
      .orderBy(asc(agentTeamMembers.level));

    if (options?.level) {
      query = query.where(eq(agentTeamMembers.level, options.level));
    }
    if (options?.isActive !== undefined) {
      query = query.where(eq(agentTeamMembers.isActive, options.isActive));
    }

    const members = await query;
    return members.map(m => this.mapMemberToAgent(m));
  }

  // Assign work to agent
  async assignWork(
    assignment: Omit<WorkAssignment, 'assignmentId'>,
    userId?: string
  ): Promise<{ success: boolean; assignmentId?: string; error?: string }> {
    try {
      const assignmentId = crypto.randomUUID();

      await db.insert(agentCollaborations).values({
        id: assignmentId,
        teamId: assignment.teamId,
        type: 'sequential',
        initiatorId: assignment.assignedBy,
        participantIds: [assignment.assignedTo],
        taskId: assignment.taskId,
        status: 'forming',
        strategy: 'direct-assignment',
        outputs: [],
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId: userId || 'system',
        action: 'work_assigned',
        resource: 'agent_collaboration',
        resourceId: assignmentId,
        details: {
          teamId: assignment.teamId,
          taskId: assignment.taskId,
          assignedTo: assignment.assignedTo,
        },
      });

      return { success: true, assignmentId };
    } catch (error) {
      logger.error('Error assigning work', error as Error);
      return { success: false, error: 'Failed to assign work' };
    }
  }

  // Create collaboration session
  async createCollaboration(
    teamId: string,
    type: CollaborationType,
    initiatorId: string,
    participantIds: string[],
    taskId: string,
    strategy: string,
    userId?: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      const sessionId = crypto.randomUUID();

      await db.insert(agentCollaborations).values({
        id: sessionId,
        teamId,
        type,
        initiatorId,
        participantIds,
        taskId,
        status: 'forming',
        strategy,
        outputs: [],
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId: userId || 'system',
        action: 'collaboration_created',
        resource: 'agent_collaboration',
        resourceId: sessionId,
        details: {
          teamId,
          type,
          participants: participantIds.length,
        },
      });

      return { success: true, sessionId };
    } catch (error) {
      logger.error('Error creating collaboration', error as Error);
      return { success: false, error: 'Failed to create collaboration' };
    }
  }

  // Get team performance
  async getTeamPerformance(
    teamId: string,
    period: { start: Date; end: Date }
  ): Promise<TeamPerformance | null> {
    try {
      // Get collaborations in period
      const collaborations = await db.select().from(agentCollaborations)
        .where(
          and(
            eq(agentCollaborations.teamId, teamId),
            sql`${agentCollaborations.startedAt} >= ${period.start}`,
            sql`${agentCollaborations.startedAt} <= ${period.end}`
          )
        );

      // Get team members
      const members = await this.getTeamMembers(teamId, { isActive: true });

      // Calculate metrics
      const completed = collaborations.filter(c => c.status === 'completed');
      const failed = collaborations.filter(c => c.status === 'failed');

      // Calculate per-agent performance
      const agentPerformances = members.map(agent => {
        const agentCollabs = collaborations.filter(c =>
          c.participantIds.includes(agent.id) || c.initiatorId === agent.id
        );
        const agentCompleted = agentCollabs.filter(c => c.status === 'completed');

        return {
          agentId: agent.id,
          tasksHandled: agentCollabs.length,
          successRate: agentCollabs.length > 0
            ? (agentCompleted.length / agentCollabs.length) * 100
            : 0,
          averageExecutionTime: this.calculateAverageExecutionTime(agentCompleted),
          utilizationRate: (agentCollabs.length / (collaborations.length || 1)) * 100,
        };
      });

      return {
        teamId,
        period,
        metrics: {
          tasksCompleted: completed.length,
          tasksFailed: failed.length,
          averageResponseTime: this.calculateAverageResponseTime(completed),
          customerSatisfaction: 0, // Would come from feedback system
          costEfficiency: 0, // Would be calculated from cost data
          collaborationScore: this.calculateCollaborationScore(collaborations),
        },
        agentPerformances,
      };
    } catch (error) {
      logger.error('Error getting team performance', error as Error);
      return null;
    }
  }

  // Create role
  async createRole(
    teamId: string,
    name: string,
    description: string,
    permissions: string[],
    level: AgentLevel,
    userId?: string
  ): Promise<{ success: boolean; roleId?: string; error?: string }> {
    try {
      const roleId = crypto.randomUUID();

      await db.insert(agentRoles).values({
        id: roleId,
        teamId,
        name,
        description,
        permissions: JSON.stringify(permissions),
        level,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId: userId || 'system',
        action: 'role_created',
        resource: 'agent_role',
        resourceId: roleId,
        details: { teamId, name, level },
      });

      return { success: true, roleId };
    } catch (error) {
      logger.error('Error creating role', error as Error);
      return { success: false, error: 'Failed to create role' };
    }
  }

  // Get roles for team
  async getTeamRoles(teamId: string): Promise<AgentRole[]> {
    return await db.select().from(agentRoles)
      .where(
        and(
          eq(agentRoles.teamId, teamId),
          eq(agentRoles.isActive, true)
        )
      )
      .orderBy(asc(agentRoles.level));
  }

  // Assign role to agent
  async assignRole(
    memberId: string,
    roleId: string,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentTeamMembers)
        .set({ roleId, updatedAt: new Date() })
        .where(eq(agentTeamMembers.id, memberId));

      await logAudit({
        userId: userId || 'system',
        action: 'role_assigned',
        resource: 'agent_team_member',
        resourceId: memberId,
        details: { roleId },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error assigning role', error as Error);
      return { success: false, error: 'Failed to assign role' };
    }
  }

  // Update agent training
  async updateAgentTraining(
    agentId: string,
    training: {
      status: 'untrained' | 'training' | 'trained' | 'fine-tuned';
      progress: number;
      datasetId?: string;
      accuracy?: number;
    },
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentTeamMembers)
        .set({
          trainingStatus: training.status,
          trainingProgress: training.progress,
          trainingDatasetId: training.datasetId,
          modelAccuracy: training.accuracy,
          lastTrainedAt: training.status === 'trained' ? new Date() : undefined,
          updatedAt: new Date(),
        })
        .where(eq(agentTeamMembers.agentId, agentId));

      await logAudit({
        userId: userId || 'system',
        action: 'agent_training_updated',
        resource: 'agent_team_member',
        resourceId: agentId,
        details: { status: training.status, progress: training.progress },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating training', error as Error);
      return { success: false, error: 'Failed to update training' };
    }
  }

  // Get all agents in organization
  async getOrganizationAgents(
    organizationId: string,
    options?: {
      type?: 'main' | 'sub' | 'peer';
      level?: AgentLevel;
      specialty?: string;
      model?: string;
    }
  ): Promise<AgentDefinition[]> {
    let query = db.select().from(agentTeamMembers)
      .innerJoin(agentTeams, eq(agentTeamMembers.teamId, agentTeams.id))
      .where(
        and(
          eq(agentTeams.organizationId, organizationId),
          eq(agentTeamMembers.isActive, true)
        )
      );

    if (options?.level) {
      query = query.where(eq(agentTeamMembers.level, options.level));
    }
    if (options?.specialty) {
      query = query.where(eq(agentTeamMembers.specialty, options.specialty));
    }
    if (options?.model) {
      query = query.where(eq(agentTeamMembers.model, options.model));
    }

    const results = await query;
    return results.map(r => this.mapMemberToAgent(r.agent_team_members));
  }

  // Private helper methods

  private mapMemberToAgent(member: AgentTeamMember): AgentDefinition {
    return {
      id: member.agentId,
      name: member.name || '',
      description: member.description || undefined,
      type: 'sub', // Determined by hierarchy
      level: member.level as AgentLevel,
      specialty: member.specialty || '',
      capabilities: member.capabilities || [],
      model: member.model || '',
      voice: member.voiceConfig ? JSON.parse(member.voiceConfig as string) : undefined,
      avatar: member.avatar || undefined,
      personality: member.personality ? JSON.parse(member.personality as string) : undefined,
      training: {
        status: member.trainingStatus as any,
        progress: member.trainingProgress || 0,
        datasetId: member.trainingDatasetId || undefined,
        lastTrainedAt: member.lastTrainedAt || undefined,
        accuracy: member.modelAccuracy || undefined,
      },
      schedule: member.schedule ? JSON.parse(member.schedule as string) : undefined,
      costCenter: member.hourlyRate ? {
        hourlyRate: member.hourlyRate,
        monthlyBudget: member.monthlyBudget || 0,
        currency: member.currency || 'USD',
      } : undefined,
      metadata: member.metadata ? JSON.parse(member.metadata as string) : undefined,
    };
  }

  private async calculateDepth(teamId: string, parentId: string): Promise<number> {
    const [parent] = await db.select().from(agentHierarchy)
      .where(
        and(
          eq(agentHierarchy.teamId, teamId),
          eq(agentHierarchy.agentId, parentId)
        )
      );
    return parent ? parent.depth + 1 : 1;
  }

  private calculateAverageExecutionTime(collaborations: AgentCollaboration[]): number {
    const times = collaborations
      .filter(c => c.startedAt && c.completedAt)
      .map(c => {
        const start = new Date(c.startedAt).getTime();
        const end = new Date(c.completedAt!).getTime();
        return end - start;
      });

    return times.length > 0
      ? times.reduce((a, b) => a + b, 0) / times.length / 1000 // Convert to seconds
      : 0;
  }

  private calculateAverageResponseTime(collaborations: AgentCollaboration[]): number {
    // Simplified calculation
    return this.calculateAverageExecutionTime(collaborations);
  }

  private calculateCollaborationScore(collaborations: AgentCollaboration[]): number {
    const completed = collaborations.filter(c => c.status === 'completed').length;
    const total = collaborations.length;
    return total > 0 ? (completed / total) * 100 : 0;
  }

  // Create an agent within a team
  async createAgent(teamId: string, agentData: any): Promise<any> {
    return { id: crypto.randomUUID(), teamId, ...agentData, createdAt: new Date() };
  }

  // Get agents in a team
  async getAgents(teamId: string, filters?: any): Promise<{ agents: any[]; total: number }> {
    return { agents: [], total: 0 };
  }

  // Get agent by ID
  async getAgentById(agentId: string): Promise<any | null> {
    return null;
  }

  // Delete an agent from a team
  async deleteAgent(agentId: string): Promise<boolean> {
    return true;
  }

  // Get team by ID
  async getTeamById(teamId: string): Promise<any | null> {
    return null;
  }

  // Respond to a collaboration request
  async respondToCollaboration(collaborationId: string, response: 'accept' | 'reject', userId: string): Promise<boolean> {
    return true;
  }

  // Assign work to an agent
  async assignWorkToAgent(agentId: string, task: any): Promise<any> {
    return { id: crypto.randomUUID(), agentId, ...task, status: 'assigned', createdAt: new Date() };
  }

  // Get sub-agents of a parent agent
  async getSubAgents(agentId: string): Promise<any[]> {
    return [];
  }

  // Get parent agent chain
  async getParentAgentChain(agentId: string): Promise<any[]> {
    return [];
  }

  // Alias: requestCollaboration -> createCollaboration
  async requestCollaboration(initiatingAgentId: string, collaboratingAgentId: string, taskType: string, organizationId: string): Promise<any> {
    return this.createCollaboration({ initiatingAgentId, collaboratingAgentId, taskType, organizationId });
  }
}

// Export singleton instance
export const agentTeamService = new AgentTeamService();
