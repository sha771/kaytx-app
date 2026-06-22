/**
 * =============================================================================
 * OVERSIGHT MONITORING SERVICE - Human on the Loop
 * =============================================================================
 *
 * Provides autonomous AI operation with human oversight, monitoring, and
 * intervention capabilities. Enables agents to operate independently while
 * maintaining human control through configurable autonomy levels.
 *
 * @version 1.0.0
 * @lastUpdated 2026-06-13
 */

import type {
  AutonomyConfig,
  OversightEvent,
  InterventionCapability,
  AutonomyLevel,
} from '../types/builder';

// ============================================
// OVERSIGHT MONITORING SERVICE
// ============================================

export class OversightMonitoringService {
  private static instance: OversightMonitoringService;
  private eventLog: OversightEvent[] = [];
  private activeMonitors: Map<string, NodeJS.Timeout> = new Map();
  private interventionCallbacks: Map<string, (event: OversightEvent) => void> = new Map();

  private constructor() {}

  static getInstance(): OversightMonitoringService {
    if (!OversightMonitoringService.instance) {
      OversightMonitoringService.instance = new OversightMonitoringService();
    }
    return OversightMonitoringService.instance;
  }

  // ============================================
  // ACTION APPROVAL LOGIC
  // ============================================

  /**
   * Determines if an action requires human approval based on autonomy config
   */
  requiresApproval(
    agentId: string,
    actionType: string,
    confidence: number,
    autonomyConfig: AutonomyConfig
  ): { requiresApproval: boolean; reason: string; canAutoApprove: boolean } {
    const {
      requiresApprovalFor,
      autoApproveThreshold,
      interventionTriggers,
    } = autonomyConfig;

    // Check if action type requires approval
    const actionRequiresApproval = requiresApprovalFor.includes('*') || 
                                   requiresApprovalFor.includes(actionType);

    // Check if confidence meets auto-approval threshold
    const canAutoApprove = confidence >= autoApproveThreshold;

    // Check intervention triggers
    const triggeredByConfidence = confidence < interventionTriggers.confidenceBelow;
    const triggeredByAnomaly = interventionTriggers.anomalyDetected && this.detectAnomaly(agentId, actionType);

    if (actionRequiresApproval && !canAutoApprove) {
      return {
        requiresApproval: true,
        reason: 'Action type requires approval and confidence below threshold',
        canAutoApprove: false,
      };
    }

    if (triggeredByConfidence) {
      return {
        requiresApproval: true,
        reason: `Confidence ${confidence.toFixed(2)} below threshold ${interventionTriggers.confidenceBelow}`,
        canAutoApprove: false,
      };
    }

    if (triggeredByAnomaly) {
      return {
        requiresApproval: true,
        reason: 'Anomaly detected in action pattern',
        canAutoApprove: false,
      };
    }

    return {
      requiresApproval: false,
      reason: 'Action meets autonomy criteria',
      canAutoApprove: true,
    };
  }

  /**
   * Records an oversight event for audit trail
   */
  async recordEvent(event: Omit<OversightEvent, 'id' | 'timestamp'>): Promise<OversightEvent> {
    const oversightEvent: OversightEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
    };

    this.eventLog.push(oversightEvent);
    
    // Trigger callback if registered
    const callback = this.interventionCallbacks.get(event.agentId);
    if (callback) {
      callback(oversightEvent);
    }

    // Clean up old events based on retention policy
    this.cleanupOldEvents(event.agentId);

    return oversightEvent;
  }

  /**
   * Auto-approves an action if it meets criteria
   */
  async autoApprove(
    agentId: string,
    actionType: string,
    confidence: number,
    autonomyConfig: AutonomyConfig,
    metadata: Record<string, any> = {}
  ): Promise<OversightEvent> {
    const riskLevel = this.assessRiskLevel(actionType, confidence, metadata);

    return this.recordEvent({
      agentId,
      actionType,
      decision: 'auto_approved',
      confidence,
      riskLevel,
      metadata,
    });
  }

  /**
   * Flags an action for human review
   */
  async flagForReview(
    agentId: string,
    actionType: string,
    confidence: number,
    reason: string,
    autonomyConfig: AutonomyConfig,
    metadata: Record<string, any> = {}
  ): Promise<OversightEvent> {
    const riskLevel = this.assessRiskLevel(actionType, confidence, metadata);

    return this.recordEvent({
      agentId,
      actionType,
      decision: 'flagged',
      confidence,
      riskLevel,
      reason,
      metadata,
    });
  }

  // ============================================
  // INTERVENTION MECHANISMS
  // ============================================

  /**
   * Pauses an agent's operations
   */
  async pauseAgent(agentId: string, reason: string): Promise<boolean> {
    const event = await this.recordEvent({
      agentId,
      actionType: 'pause',
      decision: 'intervened',
      confidence: 1.0,
      riskLevel: 'medium',
      reason,
      metadata: { interventionType: 'pause' },
    });

    // Implementation would call agent management service
    console.log(`Agent ${agentId} paused: ${reason}`);
    return true;
  }

  /**
   * Overrides an agent's decision
   */
  async overrideDecision(
    agentId: string,
    actionType: string,
    originalDecision: string,
    newDecision: string,
    reviewer: string,
    reason: string
  ): Promise<OversightEvent> {
    return this.recordEvent({
      agentId,
      actionType,
      decision: 'intervened',
      confidence: 1.0,
      riskLevel: 'high',
      humanReviewer: reviewer,
      reason,
      metadata: {
        interventionType: 'override',
        originalDecision,
        newDecision,
      },
    });
  }

  /**
   * Emergency stop for an agent
   */
  async emergencyStop(agentId: string, reason: string): Promise<boolean> {
    const event = await this.recordEvent({
      agentId,
      actionType: 'emergency_stop',
      decision: 'intervened',
      confidence: 1.0,
      riskLevel: 'critical',
      reason,
      metadata: { interventionType: 'emergency_stop' },
    });

    // Implementation would immediately halt agent operations
    console.log(`EMERGENCY STOP for agent ${agentId}: ${reason}`);
    return true;
  }

  // ============================================
  // MONITORING AND AUDIT
  // ============================================

  /**
   * Starts monitoring an agent at specified interval
   */
  startMonitoring(agentId: string, autonomyConfig: AutonomyConfig): void {
    // Clear existing monitor if any
    this.stopMonitoring(agentId);

    const interval = autonomyConfig.monitoringInterval * 1000; // Convert to milliseconds
    
    if (interval > 0) {
      const monitor = setInterval(async () => {
        await this.performHealthCheck(agentId, autonomyConfig);
      }, interval);

      this.activeMonitors.set(agentId, monitor);
      console.log(`Started monitoring agent ${agentId} at ${autonomyConfig.monitoringInterval}s intervals`);
    }
  }

  /**
   * Stops monitoring an agent
   */
  stopMonitoring(agentId: string): void {
    const monitor = this.activeMonitors.get(agentId);
    if (monitor) {
      clearInterval(monitor);
      this.activeMonitors.delete(agentId);
      console.log(`Stopped monitoring agent ${agentId}`);
    }
  }

  /**
   * Performs a health check on an agent
   */
  private async performHealthCheck(agentId: string, autonomyConfig: AutonomyConfig): Promise<void> {
    // Implementation would check agent health, performance, anomalies
    const healthStatus = await this.checkAgentHealth(agentId);
    
    if (!healthStatus.healthy) {
      await this.recordEvent({
        agentId,
        actionType: 'health_check',
        decision: 'flagged',
        confidence: healthStatus.confidence,
        riskLevel: healthStatus.riskLevel,
        reason: healthStatus.reason,
        metadata: { healthCheck: true },
      });
    }
  }

  /**
   * Gets oversight events for an agent
   */
  getEvents(agentId: string, limit: number = 100): OversightEvent[] {
    return this.eventLog
      .filter(event => event.agentId === agentId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Gets oversight statistics for an agent
   */
  getStatistics(agentId: string): {
    totalEvents: number;
    autoApproved: number;
    flagged: number;
    intervened: number;
    averageConfidence: number;
    riskDistribution: Record<string, number>;
  } {
    const events = this.getEvents(agentId, 1000);
    
    return {
      totalEvents: events.length,
      autoApproved: events.filter(e => e.decision === 'auto_approved').length,
      flagged: events.filter(e => e.decision === 'flagged').length,
      intervened: events.filter(e => e.decision === 'intervened').length,
      averageConfidence: events.reduce((sum, e) => sum + e.confidence, 0) / events.length || 0,
      riskDistribution: events.reduce((acc, e) => {
        acc[e.riskLevel] = (acc[e.riskLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  // ============================================
  // CALLBACK REGISTRATION
  // ============================================

  /**
   * Registers a callback for intervention events
   */
  registerInterventionCallback(agentId: string, callback: (event: OversightEvent) => void): void {
    this.interventionCallbacks.set(agentId, callback);
  }

  /**
   * Unregisters an intervention callback
   */
  unregisterInterventionCallback(agentId: string): void {
    this.interventionCallbacks.delete(agentId);
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private detectAnomaly(agentId: string, actionType: string): boolean {
    // Implementation would use ML/statistical analysis to detect anomalies
    // For now, return false
    return false;
  }

  private assessRiskLevel(
    actionType: string,
    confidence: number,
    metadata: Record<string, any>
  ): 'low' | 'medium' | 'high' | 'critical' {
    // Simple risk assessment based on action type and confidence
    const highRiskActions = ['data_modification', 'critical_actions', 'delete', 'transfer'];
    
    if (highRiskActions.includes(actionType)) {
      return confidence < 0.7 ? 'critical' : 'high';
    }

    if (confidence < 0.5) {
      return 'medium';
    }

    if (confidence < 0.7) {
      return 'low';
    }

    return 'low';
  }

  private async checkAgentHealth(agentId: string): Promise<{
    healthy: boolean;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    reason: string;
  }> {
    // Implementation would check actual agent health
    // For now, return healthy
    return {
      healthy: true,
      confidence: 0.9,
      riskLevel: 'low',
      reason: 'Agent operating normally',
    };
  }

  private cleanupOldEvents(agentId: string): void {
    // Implementation would clean up events older than retention period
    // For now, keep last 1000 events per agent
    const agentEvents = this.eventLog.filter(e => e.agentId === agentId);
    if (agentEvents.length > 1000) {
      const toRemove = agentEvents.length - 1000;
      let removed = 0;
      this.eventLog = this.eventLog.filter(e => {
        if (e.agentId === agentId && removed < toRemove) {
          removed++;
          return false;
        }
        return true;
      });
    }
  }
}

// ============================================
// EXPORTS
// ============================================

export const oversightService = OversightMonitoringService.getInstance();
