import { randomUUID } from 'crypto';
import { ConsultationSession, ConsultationResponse } from './agent-consulting-service';
import { counselingNotifications } from './counseling-notifications';

// ============================================
// COUNSELING PROGRESS TRACKING & MILESTONES
// ============================================

export interface CounselingProgress {
  sessionId: string;
  agentId: string;
  overallProgress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'on_track' | 'at_risk' | 'completed' | 'stalled';
  milestones: CounselingMilestone[];
  metrics: ProgressMetrics;
  timeline: {
    startedAt?: Date;
    targetCompletion?: Date;
    actualCompletion?: Date;
    lastActivity: Date;
  };
  blockers: ProgressBlocker[];
  achievements: Achievement[];
  nextActions: NextAction[];
  updatedAt: Date;
}

export interface CounselingMilestone {
  id: string;
  name: string;
  description: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  criteria: string[];
  deliverables: string[];
  progress: number; // 0-100
  startedAt?: Date;
  completedAt?: Date;
  dueDate?: Date;
  weight: number; // Contribution to overall progress (0-1)
  dependencies: string[]; // Milestone IDs that must be completed first
}

export interface ProgressMetrics {
  responseTime: number; // Average hours to respond
  engagementScore: number; // 0-100 based on participation
  goalCompletion: number; // Percentage of goals achieved
  skillImprovement: number; // Measured improvement score
  satisfactionRating?: number; // 1-5 if available
}

export interface ProgressBlocker {
  id: string;
  type: 'resource' | 'knowledge' | 'dependency' | 'external' | 'priority_conflict';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  assignedTo?: string;
}

export interface Achievement {
  id: string;
  type: 'milestone_complete' | 'skill_mastered' | 'goal_achieved' | 'improvement_noted' | 'recognition';
  title: string;
  description: string;
  awardedAt: Date;
  awardedBy: string;
  icon?: string;
}

export interface NextAction {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  relatedMilestoneId?: string;
}

export interface ProgressReport {
  reportId: string;
  sessionId: string;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    overallProgress: number;
    milestonesCompleted: number;
    milestonesTotal: number;
    blockersResolved: number;
    blockersActive: number;
    achievements: number;
  };
  trends: {
    progressVelocity: number; // Progress per week
    engagementTrend: 'improving' | 'stable' | 'declining';
    riskLevel: 'low' | 'medium' | 'high';
  };
  recommendations: string[];
  detailedMetrics: ProgressMetrics;
  milestoneDetails: CounselingMilestone[];
}

class CounselingProgressTracker {
  private progress: Map<string, CounselingProgress> = new Map();
  private reports: Map<string, ProgressReport> = new Map();

  // ============================================
  // PROGRESS INITIALIZATION
  // ============================================

  initializeProgress(
    sessionId: string,
    agentId: string,
    template: {
      milestones: {
        name: string;
        description: string;
        criteria: string[];
        deliverables: string[];
        dueDate?: Date;
        weight?: number;
        dependencies?: string[];
      }[];
      targetCompletion?: Date;
    }
  ): CounselingProgress {
    const now = new Date();
    
    const milestones: CounselingMilestone[] = template.milestones.map((m, index) => ({
      id: randomUUID(),
      name: m.name,
      description: m.description,
      order: index,
      status: index === 0 ? 'in_progress' : 'pending',
      criteria: m.criteria,
      deliverables: m.deliverables,
      progress: index === 0 ? 0 : 0,
      dueDate: m.dueDate,
      weight: m.weight || (1 / template.milestones.length),
      dependencies: m.dependencies || [],
    }));

    const progress: CounselingProgress = {
      sessionId,
      agentId,
      overallProgress: 0,
      status: 'not_started',
      milestones,
      metrics: {
        responseTime: 0,
        engagementScore: 0,
        goalCompletion: 0,
        skillImprovement: 0,
      },
      timeline: {
        lastActivity: now,
        targetCompletion: template.targetCompletion,
      },
      blockers: [],
      achievements: [],
      nextActions: [],
      updatedAt: now,
    };

    this.progress.set(sessionId, progress);
    return progress;
  }

  // ============================================
  // MILESTONE MANAGEMENT
  // ============================================

  updateMilestone(
    sessionId: string,
    milestoneId: string,
    updates: Partial<Pick<CounselingMilestone, 'status' | 'progress' | 'deliverables'>>
  ): CounselingMilestone | null {
    const progress = this.progress.get(sessionId);
    if (!progress) return null;

    const milestone = progress.milestones.find(m => m.id === milestoneId);
    if (!milestone) return null;

    // Check dependencies
    if (updates.status && updates.status !== 'pending') {
      const incompleteDeps = milestone.dependencies.filter(depId => {
        const dep = progress.milestones.find(m => m.id === depId);
        return dep && dep.status !== 'completed';
      });
      
      if (incompleteDeps.length > 0) {
        throw new Error(`Cannot start milestone - dependencies not complete: ${incompleteDeps.join(', ')}`);
      }
    }

    Object.assign(milestone, updates);
    
    if (updates.status === 'completed' && !milestone.completedAt) {
      milestone.completedAt = new Date();
      
      // Award achievement
      this.addAchievement(sessionId, {
        type: 'milestone_complete',
        title: `Milestone Completed: ${milestone.name}`,
        description: `Successfully completed the milestone: ${milestone.description}`,
        awardedBy: 'system',
      });

      // Notify
      counselingNotifications.notifyMilestoneReached(
        progress.agentId,
        milestone.name,
        progress.sessionId
      );

      // Activate next milestone
      this.activateNextMilestone(sessionId);
    }

    if (updates.status === 'in_progress' && !milestone.startedAt) {
      milestone.startedAt = new Date();
    }

    this.recalculateProgress(sessionId);
    return milestone;
  }

  private activateNextMilestone(sessionId: string): void {
    const progress = this.progress.get(sessionId);
    if (!progress) return;

    const nextMilestone = progress.milestones
      .filter(m => m.status === 'pending')
      .sort((a, b) => a.order - b.order)[0];

    if (nextMilestone) {
      // Check if dependencies are met
      const depsComplete = nextMilestone.dependencies.every(depId => {
        const dep = progress.milestones.find(m => m.id === depId);
        return dep?.status === 'completed';
      });

      if (depsComplete) {
        nextMilestone.status = 'in_progress';
        nextMilestone.startedAt = new Date();
      }
    }
  }

  addMilestone(
    sessionId: string,
    milestone: Omit<CounselingMilestone, 'id' | 'order'>
  ): CounselingMilestone {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    const newMilestone: CounselingMilestone = {
      ...milestone,
      id: randomUUID(),
      order: progress.milestones.length,
    };

    progress.milestones.push(newMilestone);
    this.recalculateProgress(sessionId);
    
    return newMilestone;
  }

  // ============================================
  // PROGRESS CALCULATION
  // ============================================

  private recalculateProgress(sessionId: string): void {
    const progress = this.progress.get(sessionId);
    if (!progress) return;

    // Calculate weighted progress
    let totalWeight = 0;
    let weightedProgress = 0;

    for (const milestone of progress.milestones) {
      totalWeight += milestone.weight;
      
      if (milestone.status === 'completed') {
        weightedProgress += milestone.weight * 100;
      } else if (milestone.status === 'in_progress') {
        weightedProgress += milestone.weight * milestone.progress;
      }
    }

    progress.overallProgress = totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : 0;

    // Determine status
    const completedCount = progress.milestones.filter(m => m.status === 'completed').length;
    const totalCount = progress.milestones.length;
    const atRiskCount = progress.milestones.filter(m => 
      m.status !== 'completed' && m.dueDate && new Date() > m.dueDate
    ).length;

    if (completedCount === totalCount) {
      progress.status = 'completed';
      progress.timeline.actualCompletion = new Date();
    } else if (atRiskCount > 0) {
      progress.status = 'at_risk';
    } else if (completedCount > 0) {
      progress.status = 'on_track';
    } else if (progress.milestones.some(m => m.status === 'in_progress')) {
      progress.status = 'in_progress';
    }

    // Check for stalled progress (no activity for 7 days)
    const daysSinceActivity = (new Date().getTime() - progress.timeline.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceActivity > 7 && progress.status !== 'completed') {
      progress.status = 'stalled';
    }

    progress.updatedAt = new Date();
  }

  recordActivity(sessionId: string, activityType: string, details?: Record<string, any>): void {
    const progress = this.progress.get(sessionId);
    if (!progress) return;

    progress.timeline.lastActivity = new Date();
    
    // Update engagement score
    progress.metrics.engagementScore = Math.min(100, progress.metrics.engagementScore + 5);
    
    progress.updatedAt = new Date();
  }

  // ============================================
  // BLOCKERS
  // ============================================

  reportBlocker(
    sessionId: string,
    blocker: Omit<ProgressBlocker, 'id' | 'reportedAt'>
  ): ProgressBlocker {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    const newBlocker: ProgressBlocker = {
      ...blocker,
      id: randomUUID(),
      reportedAt: new Date(),
    };

    progress.blockers.push(newBlocker);
    
    // Update status if critical blocker
    if (blocker.severity === 'critical') {
      progress.status = 'at_risk';
    }

    progress.updatedAt = new Date();
    return newBlocker;
  }

  resolveBlocker(sessionId: string, blockerId: string, resolution: string): boolean {
    const progress = this.progress.get(sessionId);
    if (!progress) return false;

    const blocker = progress.blockers.find(b => b.id === blockerId);
    if (!blocker || blocker.resolvedAt) return false;

    blocker.resolvedAt = new Date();
    blocker.resolution = resolution;

    progress.updatedAt = new Date();
    return true;
  }

  // ============================================
  // ACHIEVEMENTS
  // ============================================

  addAchievement(
    sessionId: string,
    achievement: Omit<Achievement, 'id' | 'awardedAt'>
  ): Achievement {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    const newAchievement: Achievement = {
      ...achievement,
      id: randomUUID(),
      awardedAt: new Date(),
    };

    progress.achievements.push(newAchievement);
    progress.updatedAt = new Date();

    // Notify
    counselingNotifications.createNotification({
      type: 'achievement_unlocked',
      priority: 'low',
      agentId: progress.agentId,
      sessionId,
      title: achievement.title,
      message: achievement.description,
      data: { achievement },
    });

    return newAchievement;
  }

  // ============================================
  // NEXT ACTIONS
  // ============================================

  addNextAction(
    sessionId: string,
    action: Omit<NextAction, 'id' | 'status'>
  ): NextAction {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    const newAction: NextAction = {
      ...action,
      id: randomUUID(),
      status: 'pending',
    };

    progress.nextActions.push(newAction);
    progress.updatedAt = new Date();
    
    return newAction;
  }

  updateNextAction(
    sessionId: string,
    actionId: string,
    updates: Partial<Pick<NextAction, 'status'>>
  ): NextAction | null {
    const progress = this.progress.get(sessionId);
    if (!progress) return null;

    const action = progress.nextActions.find(a => a.id === actionId);
    if (!action) return null;

    Object.assign(action, updates);
    progress.updatedAt = new Date();
    
    return action;
  }

  // ============================================
  // METRICS UPDATE
  // ============================================

  updateMetrics(
    sessionId: string,
    metrics: Partial<ProgressMetrics>
  ): ProgressMetrics {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    progress.metrics = { ...progress.metrics, ...metrics };
    progress.updatedAt = new Date();
    
    return progress.metrics;
  }

  calculateMetricsFromSession(sessionId: string, session: ConsultationSession): ProgressMetrics {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    // Calculate response time from session data
    let totalResponseTime = 0;
    let responseCount = 0;

    for (let i = 0; i < session.responses.length; i++) {
      const request = session.requests[i];
      const response = session.responses[i];
      
      if (request && response) {
        const requestTime = new Date(request.timestamp).getTime();
        const responseTime = new Date(response.timestamp).getTime();
        const hours = (responseTime - requestTime) / (1000 * 60 * 60);
        totalResponseTime += hours;
        responseCount++;
      }
    }

    const avgResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    // Calculate engagement score based on participation
    const engagementScore = Math.min(100, session.responses.length * 20);

    // Calculate goal completion from responses
    let goalCompletion = 0;
    if (session.responses.length > 0) {
      const lastResponse = session.responses[session.responses.length - 1];
      const completedGoals = lastResponse.recommendations.filter(r => 
        r.toLowerCase().includes('completed') || r.toLowerCase().includes('achieved')
      ).length;
      goalCompletion = Math.min(100, (completedGoals / lastResponse.recommendations.length) * 100);
    }

    return this.updateMetrics(sessionId, {
      responseTime: avgResponseTime,
      engagementScore,
      goalCompletion,
    });
  }

  // ============================================
  // PROGRESS REPORTS
  // ============================================

  generateProgressReport(sessionId: string, periodDays: number = 30): ProgressReport {
    const progress = this.progress.get(sessionId);
    if (!progress) throw new Error('Progress not found');

    const now = new Date();
    const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);

    const completedMilestones = progress.milestones.filter(m => m.status === 'completed').length;
    const resolvedBlockers = progress.blockers.filter(b => b.resolvedAt && b.resolvedAt >= periodStart).length;
    const activeBlockers = progress.blockers.filter(b => !b.resolvedAt).length;

    // Calculate progress velocity
    const recentProgress = progress.milestones
      .filter(m => m.completedAt && m.completedAt >= periodStart)
      .reduce((sum, m) => sum + m.weight * 100, 0);
    const progressVelocity = recentProgress / periodDays * 7; // per week

    // Determine engagement trend
    let engagementTrend: ProgressReport['trends']['engagementTrend'] = 'stable';
    if (progress.metrics.engagementScore > 70) {
      engagementTrend = 'improving';
    } else if (progress.metrics.engagementScore < 30) {
      engagementTrend = 'declining';
    }

    // Determine risk level
    let riskLevel: ProgressReport['trends']['riskLevel'] = 'low';
    if (activeBlockers > 2 || progress.status === 'at_risk') {
      riskLevel = 'high';
    } else if (activeBlockers > 0 || progress.status === 'stalled') {
      riskLevel = 'medium';
    }

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (progress.status === 'stalled') {
      recommendations.push('Schedule a check-in to re-activate progress');
    }
    if (activeBlockers > 0) {
      recommendations.push('Prioritize resolution of active blockers');
    }
    if (progress.metrics.engagementScore < 50) {
      recommendations.push('Increase engagement through more frequent check-ins');
    }
    if (progressVelocity < 10) {
      recommendations.push('Consider breaking milestones into smaller, achievable steps');
    }

    const report: ProgressReport = {
      reportId: randomUUID(),
      sessionId,
      generatedAt: now,
      period: { start: periodStart, end: now },
      summary: {
        overallProgress: progress.overallProgress,
        milestonesCompleted: completedMilestones,
        milestonesTotal: progress.milestones.length,
        blockersResolved: resolvedBlockers,
        blockersActive: activeBlockers,
        achievements: progress.achievements.length,
      },
      trends: {
        progressVelocity,
        engagementTrend,
        riskLevel,
      },
      recommendations,
      detailedMetrics: progress.metrics,
      milestoneDetails: progress.milestones,
    };

    this.reports.set(report.reportId, report);
    return report;
  }

  // ============================================
  // QUERY API
  // ============================================

  getProgress(sessionId: string): CounselingProgress | undefined {
    return this.progress.get(sessionId);
  }

  getProgressForAgent(agentId: string): CounselingProgress[] {
    return Array.from(this.progress.values())
      .filter(p => p.agentId === agentId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  getActiveMilestones(sessionId: string): CounselingMilestone[] {
    const progress = this.progress.get(sessionId);
    if (!progress) return [];

    return progress.milestones
      .filter(m => m.status === 'in_progress')
      .sort((a, b) => a.order - b.order);
  }

  getPendingMilestones(sessionId: string): CounselingMilestone[] {
    const progress = this.progress.get(sessionId);
    if (!progress) return [];

    return progress.milestones
      .filter(m => m.status === 'pending')
      .sort((a, b) => a.order - b.order);
  }

  getCompletedMilestones(sessionId: string): CounselingMilestone[] {
    const progress = this.progress.get(sessionId);
    if (!progress) return [];

    return progress.milestones
      .filter(m => m.status === 'completed')
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  }

  getActiveBlockers(sessionId: string): ProgressBlocker[] {
    const progress = this.progress.get(sessionId);
    if (!progress) return [];

    return progress.blockers.filter(b => !b.resolvedAt);
  }

  getAllReports(sessionId: string): ProgressReport[] {
    return Array.from(this.reports.values())
      .filter(r => r.sessionId === sessionId)
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
  }

  // ============================================
  // ANALYTICS
  // ============================================

  getAgentProgressStats(agentId: string): {
    totalSessions: number;
    completedSessions: number;
    averageProgress: number;
    totalAchievements: number;
    activeBlockers: number;
    atRiskSessions: number;
  } {
    const agentProgress = this.getProgressForAgent(agentId);
    
    return {
      totalSessions: agentProgress.length,
      completedSessions: agentProgress.filter(p => p.status === 'completed').length,
      averageProgress: agentProgress.length > 0 
        ? agentProgress.reduce((sum, p) => sum + p.overallProgress, 0) / agentProgress.length 
        : 0,
      totalAchievements: agentProgress.reduce((sum, p) => sum + p.achievements.length, 0),
      activeBlockers: agentProgress.reduce((sum, p) => sum + p.blockers.filter(b => !b.resolvedAt).length, 0),
      atRiskSessions: agentProgress.filter(p => p.status === 'at_risk').length,
    };
  }
}

// Singleton instance
export const counselingProgressTracker = new CounselingProgressTracker();

// Convenience functions
export function initializeCounselingProgress(
  sessionId: string,
  agentId: string,
  template: Parameters<CounselingProgressTracker['initializeProgress']>[2]
): CounselingProgress {
  return counselingProgressTracker.initializeProgress(sessionId, agentId, template);
}

export function updateCounselingMilestone(
  sessionId: string,
  milestoneId: string,
  updates: Parameters<CounselingProgressTracker['updateMilestone']>[2]
): CounselingMilestone | null {
  return counselingProgressTracker.updateMilestone(sessionId, milestoneId, updates);
}

export function generateCounselingProgressReport(
  sessionId: string,
  periodDays?: number
): ProgressReport {
  return counselingProgressTracker.generateProgressReport(sessionId, periodDays);
}

export function getCounselingProgress(sessionId: string): CounselingProgress | undefined {
  return counselingProgressTracker.getProgress(sessionId);
}

export function reportProgressBlocker(
  sessionId: string,
  blocker: Omit<ProgressBlocker, 'id' | 'reportedAt'>
): ProgressBlocker {
  return counselingProgressTracker.reportBlocker(sessionId, blocker);
}

export default counselingProgressTracker;
