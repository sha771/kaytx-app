/**
 * Agent Self-Improvement and Self-Learning Service
 * 
 * This service manages autonomous self-improvement and self-learning capabilities for AI agents,
 * enabling continuous learning from experiences, feedback, and data without explicit programming.
 */

import { db } from '../db';
import { agent_learning_log, agent_memories, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';

export type LearningType = 'reinforcement' | 'supervised' | 'unsupervised' | 'transfer' | 'collaborative' | 'experience';
export type LearningSource = 'interaction' | 'feedback' | 'data' | 'peer_agent' | 'self_reflection';

export interface LearningEntry {
  id?: string;
  organizationId: string;
  agentId: string;
  learningType: LearningType;
  lessonTitle?: string;
  lessonContent: string;
  source: LearningSource;
  confidenceScore?: number;
  appliedToTask?: string;
  validated?: boolean;
  validationMethod?: string;
  metadata?: Record<string, any>;
}

export interface ImprovementGoal {
  id: string;
  area: string;
  target: number;
  current: number;
  deadline?: Date;
  status: 'active' | 'completed' | 'abandoned';
  progress: number; // 0-100
  metrics: Record<string, any>;
}

export interface SelfImprovementMetrics {
  performanceScore: number;
  learningRate: number;
  improvementVelocity: number;
  goalCompletionRate: number;
  feedbackIncorporationRate: number;
  skillAcquisitionRate: number;
}

class SelfImprovementLearningService {
  /**
   * Log a new learning entry
   */
  async logLearning(learning: LearningEntry): Promise<LearningEntry> {
    const result = await db.insert(agent_learning_log).values({
      organization_id: learning.organizationId,
      agent_id: learning.agentId,
      learning_type: learning.learningType,
      lesson_title: learning.lessonTitle,
      lesson_content: learning.lessonContent,
      source: learning.source,
      confidence_score: learning.confidenceScore,
      applied_to_task: learning.appliedToTask,
      validated: learning.validated || false,
      validation_method: learning.validationMethod,
      metadata: learning.metadata || {},
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      learningType: result[0].learning_type as LearningType,
      lessonTitle: result[0].lesson_title,
      lessonContent: result[0].lesson_content,
      source: result[0].source as LearningSource,
      confidenceScore: result[0].confidence_score,
      appliedToTask: result[0].applied_to_task,
      validated: result[0].validated,
      validationMethod: result[0].validation_method,
      metadata: result[0].metadata,
    };
  }

  /**
   * Get learning history for an agent
   */
  async getLearningHistory(agentId: string, options?: {
    limit?: number;
    learningType?: LearningType;
    source?: LearningSource;
    validated?: boolean;
  }): Promise<LearningEntry[]> {
    let query = db.select()
      .from(agent_learning_log)
      .where(eq(agent_learning_log.agent_id, agentId))
      .orderBy(desc(agent_learning_log.created_at));

    if (options?.learningType) {
      query = query.where(and(
        eq(agent_learning_log.agent_id, agentId),
        eq(agent_learning_log.learning_type, options.learningType)
      ));
    }

    if (options?.source) {
      query = query.where(and(
        eq(agent_learning_log.agent_id, agentId),
        eq(agent_learning_log.source, options.source)
      ));
    }

    if (options?.validated !== undefined) {
      query = query.where(and(
        eq(agent_learning_log.agent_id, agentId),
        eq(agent_learning_log.validated, options.validated)
      ));
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      learningType: row.learning_type as LearningType,
      lessonTitle: row.lesson_title,
      lessonContent: row.lesson_content,
      source: row.source as LearningSource,
      confidenceScore: row.confidence_score,
      appliedToTask: row.applied_to_task,
      validated: row.validated,
      validationMethod: row.validation_method,
      metadata: row.metadata,
    }));
  }

  /**
   * Update agent's self-improvement goals
   */
  async updateImprovementGoals(agentId: string, goals: ImprovementGoal[]): Promise<void> {
    await db.update(aiAgents)
      .set({ 
        improvement_goals: goals,
        updated_at: new Date()
      })
      .where(eq(aiAgents.id, agentId));
  }

  /**
   * Get agent's improvement goals
   */
  async getImprovementGoals(agentId: string): Promise<ImprovementGoal[]> {
    const result = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    return result[0].improvement_goals || [];
  }

  /**
   * Track progress on an improvement goal
   */
  async trackGoalProgress(agentId: string, goalId: string, progress: number, metrics: Record<string, any>): Promise<void> {
    const goals = await this.getImprovementGoals(agentId);
    const goalIndex = goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      throw new Error(`Goal not found: ${goalId}`);
    }

    goals[goalIndex].progress = progress;
    goals[goalIndex].current = metrics.current || goals[goalIndex].current;
    goals[goalIndex].metrics = { ...goals[goalIndex].metrics, ...metrics };

    if (progress >= 100) {
      goals[goalIndex].status = 'completed';
    }

    await this.updateImprovementGoals(agentId, goals);

    // Store learning from goal progress
    await this.logLearning({
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      learningType: 'experience',
      lessonTitle: `Progress on goal: ${goals[goalIndex].area}`,
      lessonContent: `Made ${progress}% progress on improvement goal: ${goals[goalIndex].area}. Current: ${goals[goalIndex].current}, Target: ${goals[goalIndex].target}`,
      source: 'self_reflection',
      confidenceScore: progress / 100,
      metadata: { goalId, goalArea: goals[goalIndex].area },
    });
  }

  /**
   * Analyze learning patterns and generate insights
   */
  async analyzeLearningPatterns(agentId: string): Promise<{
    topLearningSources: Record<LearningSource, number>;
    mostEffectiveLearningTypes: Record<LearningType, number>;
    averageConfidenceScore: number;
    validationRate: number;
    learningVelocity: number; // learnings per week
    recommendations: string[];
  }> {
    const learnings = await this.getLearningHistory(agentId);

    const topLearningSources: Record<LearningSource, number> = {
      interaction: 0,
      feedback: 0,
      data: 0,
      peer_agent: 0,
      self_reflection: 0,
    };

    const mostEffectiveLearningTypes: Record<LearningType, number> = {
      reinforcement: 0,
      supervised: 0,
      unsupervised: 0,
      transfer: 0,
      collaborative: 0,
      experience: 0,
    };

    let totalConfidence = 0;
    let confidenceCount = 0;
    let validatedCount = 0;

    learnings.forEach(learning => {
      topLearningSources[learning.source]++;
      mostEffectiveLearningTypes[learning.learningType]++;

      if (learning.confidenceScore) {
        totalConfidence += learning.confidenceScore;
        confidenceCount++;
      }

      if (learning.validated) {
        validatedCount++;
      }
    });

    // Find top 3 learning types by effectiveness (highest average confidence)
    const learningTypeEffectiveness: Record<LearningType, { total: number; count: number }> = {
      reinforcement: { total: 0, count: 0 },
      supervised: { total: 0, count: 0 },
      unsupervised: { total: 0, count: 0 },
      transfer: { total: 0, count: 0 },
      collaborative: { total: 0, count: 0 },
      experience: { total: 0, count: 0 },
    };

    learnings.forEach(learning => {
      if (learning.confidenceScore) {
        learningTypeEffectiveness[learning.learningType].total += learning.confidenceScore;
        learningTypeEffectiveness[learning.learningType].count++;
      }
    });

    const recommendations: string[] = [];

    // Generate recommendations based on analysis
    const avgConfidence = confidenceCount > 0 ? totalConfidence / confidenceCount : 0;
    if (avgConfidence < 0.7) {
      recommendations.push('Consider improving validation processes to increase learning confidence');
    }

    const validationRate = learnings.length > 0 ? validatedCount / learnings.length : 0;
    if (validationRate < 0.5) {
      recommendations.push('Increase validation rate to ensure learning quality');
    }

    // Calculate learning velocity (learnings per week)
    const learningVelocity = learnings.length > 0 
      ? learnings.length / Math.max(1, this.getWeeksSinceFirstLearning(learnings))
      : 0;

    return {
      topLearningSources,
      mostEffectiveLearningTypes,
      averageConfidenceScore: avgConfidence,
      validationRate,
      learningVelocity,
      recommendations,
    };
  }

  /**
   * Get self-improvement metrics for an agent
   */
  async getSelfImprovementMetrics(agentId: string): Promise<SelfImprovementMetrics> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const learningMetrics = agent[0].learning_metrics || {};
    const goals = await this.getImprovementGoals(agentId);
    const completedGoals = goals.filter(g => g.status === 'completed').length;

    return {
      performanceScore: learningMetrics.performanceScore || 0,
      learningRate: learningMetrics.learningRate || 0,
      improvementVelocity: learningMetrics.improvementVelocity || 0,
      goalCompletionRate: goals.length > 0 ? completedGoals / goals.length : 0,
      feedbackIncorporationRate: learningMetrics.feedbackIncorporationRate || 0,
      skillAcquisitionRate: learningMetrics.skillAcquisitionRate || 0,
    };
  }

  /**
   * Update self-improvement metrics
   */
  async updateSelfImprovementMetrics(agentId: string, metrics: Partial<SelfImprovementMetrics>): Promise<void> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const updatedMetrics = { ...agent[0].learning_metrics, ...metrics };

    await db.update(aiAgents)
      .set({ 
        learning_metrics: updatedMetrics,
        updated_at: new Date()
      })
      .where(eq(aiAgents.id, agentId));
  }

  /**
   * Extract lessons from a task outcome
   */
  async extractLessonsFromTask(agentId: string, taskOutcome: {
    taskId: string;
    success: boolean;
    duration: number;
    feedback?: string;
    metrics?: Record<string, any>;
    observations?: string[];
  }): Promise<LearningEntry[]> {
    const learnings: LearningEntry[] = [];

    // Learn from success or failure
    learnings.push({
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      learningType: 'experience',
      lessonTitle: taskOutcome.success ? 'Successful task completion' : 'Task failure analysis',
      lessonContent: taskOutcome.success
        ? `Successfully completed task ${taskOutcome.taskId} in ${taskOutcome.duration}ms. Key success factors: ${JSON.stringify(taskOutcome.metrics)}`
        : `Failed to complete task ${taskOutcome.taskId}. Duration: ${taskOutcome.duration}ms. Feedback: ${taskOutcome.feedback}. Observations: ${taskOutcome.observations?.join(', ')}`,
      source: 'interaction',
      confidenceScore: taskOutcome.success ? 0.9 : 0.7,
      metadata: { taskId, success: taskOutcome.success },
    });

    // Learn from feedback if provided
    if (taskOutcome.feedback) {
      learnings.push({
        organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
        agentId,
        learningType: 'reinforcement',
        lessonTitle: 'Feedback-based improvement',
        lessonContent: `Incorporating feedback: ${taskOutcome.feedback}`,
        source: 'feedback',
        confidenceScore: 0.8,
        metadata: { taskId, feedback: taskOutcome.feedback },
      });
    }

    // Log all learnings
    const loggedLearnings: LearningEntry[] = [];
    for (const learning of learnings) {
      const logged = await this.logLearning(learning);
      loggedLearnings.push(logged);
    }

    return loggedLearnings;
  }

  /**
   * Share learning with peer agents (collaborative learning)
   */
  async shareLearningWithPeers(agentId: string, learningId: string, peerAgentIds: string[]): Promise<void> {
    const learning = await db.select()
      .from(agent_learning_log)
      .where(and(
        eq(agent_learning_log.id, learningId),
        eq(agent_learning_log.agent_id, agentId)
      ))
      .limit(1);

    if (!learning[0]) {
      throw new Error(`Learning not found: ${learningId}`);
    }

    // Share with peer agents by storing in their memory
    for (const peerId of peerAgentIds) {
      await this.logLearning({
        organizationId: learning[0].organization_id,
        agentId: peerId,
        learningType: 'collaborative',
        lessonTitle: `Shared from agent ${agentId}: ${learning[0].lesson_title}`,
        lessonContent: learning[0].lesson_content,
        source: 'peer_agent',
        confidenceScore: learning[0].confidence_score,
        metadata: { ...learning[0].metadata, sharedFrom: agentId, originalLearningId: learningId },
      });
    }
  }

  /**
   * Helper: Calculate weeks since first learning
   */
  private getWeeksSinceFirstLearning(learnings: LearningEntry[]): number {
    if (learnings.length === 0) return 1;

    const sorted = learnings.sort((a, b) => {
      const dateA = new Date(a.metadata?.createdAt || new Date());
      const dateB = new Date(b.metadata?.createdAt || new Date());
      return dateA.getTime() - dateB.getTime();
    });

    const firstLearning = sorted[sorted.length - 1]; // Last in sorted array (oldest)
    const firstDate = new Date(firstLearning.metadata?.createdAt || new Date());
    const now = new Date();
    const diffMs = now.getTime() - firstDate.getTime();
    const diffWeeks = diffMs / (1000 * 60 * 60 * 24 * 7);

    return Math.max(1, Math.ceil(diffWeeks));
  }
}

export const selfImprovementLearningService = new SelfImprovementLearningService();
