import { randomUUID } from 'crypto';
import { agentConsultingService, ConsultationSession } from './agent-consulting-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('CounselingNotifications');

// ============================================
// COUNSELING NOTIFICATIONS & ALERTS SYSTEM
// ============================================

export type NotificationType = 
  | 'session_created'
  | 'session_reminder'
  | 'session_starting'
  | 'response_received'
  | 'session_completed'
  | 'session_escalated'
  | 'session_cancelled'
  | 'session_rescheduled'
  | 'milestone_reached'
  | 'deadline_approaching'
  | 'counseling_needed'
  | 'achievement_unlocked';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface CounselingNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  agentId: string;
  sessionId?: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  actionRequired?: boolean;
  actionType?: 'respond' | 'review' | 'schedule' | 'escalate' | 'dismiss';
  actionUrl?: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface NotificationPreference {
  agentId: string;
  channels: {
    push: boolean;
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    timezone: string;
  };
  filters: {
    minPriority: NotificationPriority;
    types: NotificationType[];
    muteEscalations: boolean;
    muteNonUrgent: boolean;
  };
  digest: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly';
    time: string; // HH:mm
  };
}

export interface NotificationAlert {
  id: string;
  type: 'overdue_session' | 'unresponded_request' | 'escalation_needed' | 'counseling_overload' | 'performance_decline';
  severity: 'warning' | 'critical';
  agentId: string;
  sessionId?: string;
  message: string;
  recommendation: string;
  autoAction?: string;
  createdAt: Date;
  acknowledgedAt?: Date;
}

class CounselingNotificationService {
  private notifications: Map<string, CounselingNotification> = new Map();
  private preferences: Map<string, NotificationPreference> = new Map();
  private alerts: Map<string, NotificationAlert> = new Map();
  private subscribers: Map<string, Set<(notification: CounselingNotification) => void>> = new Map();

  // ============================================
  // NOTIFICATION CREATION
  // ============================================

  createNotification(params: Omit<CounselingNotification, 'id' | 'createdAt' | 'read'>): CounselingNotification {
    const notification: CounselingNotification = {
      ...params,
      id: randomUUID(),
      read: false,
      createdAt: new Date(),
    };

    this.notifications.set(notification.id, notification);
    
    // Notify real-time subscribers
    this.notifySubscribers(notification.agentId, notification);
    
    // Check if should send to other channels
    this.dispatchToChannels(notification);

    return notification;
  }

  private dispatchToChannels(notification: CounselingNotification): void {
    const prefs = this.preferences.get(notification.agentId);
    if (!prefs) return;

    // Check quiet hours
    if (this.isInQuietHours(prefs.quietHours)) {
      if (notification.priority !== 'critical') return;
    }

    // Filter by preferences
    if (notification.priority === 'low' && prefs.filters.muteNonUrgent) return;
    if (notification.type === 'session_escalated' && prefs.filters.muteEscalations) return;

    // Dispatch to enabled channels
    if (prefs.channels.push) {
      this.sendPushNotification(notification);
    }
    if (prefs.channels.email) {
      this.sendEmailNotification(notification);
    }
    if (prefs.channels.inApp) {
      // Already stored in notifications map
    }
    if (prefs.channels.sms && notification.priority === 'critical') {
      this.sendSMSNotification(notification);
    }
  }

  private isInQuietHours(quietHours: NotificationPreference['quietHours']): boolean {
    if (!quietHours.enabled) return false;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return currentTime >= quietHours.startTime && currentTime <= quietHours.endTime;
  }

  private notifySubscribers(agentId: string, notification: CounselingNotification): void {
    const subs = this.subscribers.get(agentId);
    if (subs) {
      for (const callback of subs) {
        try {
          callback(notification);
        } catch (err) {
          logger.error('[CounselingNotification] Subscriber error', err as Error);
        }
      }
    }
  }

  private sendPushNotification(notification: CounselingNotification): void {
    // Integration point: Push notification service (Firebase Cloud Messaging, OneSignal, etc.)
    logger.info(`[Push] ${notification.title}: ${notification.message}`);
  }

  private sendEmailNotification(notification: CounselingNotification): void {
    // Integration point: Email service (SendGrid, AWS SES, etc.)
    logger.info(`[Email] ${notification.title}: ${notification.message}`);
  }

  private sendSMSNotification(notification: CounselingNotification): void {
    // Integration point: SMS service (Twilio, AWS SNS, etc.)
    logger.info(`[SMS] ${notification.title}: ${notification.message}`);
  }

  // ============================================
  // SESSION-BASED NOTIFICATIONS
  // ============================================

  notifySessionCreated(session: ConsultationSession, forAgentId: string): void {
    const isInitiator = session.initiator.agentId === forAgentId;
    
    this.createNotification({
      type: 'session_created',
      priority: 'medium',
      agentId: forAgentId,
      sessionId: session.id,
      title: isInitiator ? 'Counseling Session Initiated' : 'New Counseling Session',
      message: isInitiator 
        ? `You initiated a counseling session with ${session.participants[0]?.agentName || 'a colleague'}`
        : `${session.initiator.agentName} has initiated a counseling session with you`,
      data: { session, isInitiator },
      actionRequired: !isInitiator,
      actionType: isInitiator ? undefined : 'respond',
      actionUrl: `/ai-agent/counseling/${session.id}`,
    });
  }

  notifyResponseReceived(session: ConsultationSession, forAgentId: string, responderName: string): void {
    const isInitiator = session.initiator.agentId === forAgentId;
    if (!isInitiator) return; // Only notify initiator

    this.createNotification({
      type: 'response_received',
      priority: 'high',
      agentId: forAgentId,
      sessionId: session.id,
      title: 'New Response Received',
      message: `${responderName} has responded to your counseling request`,
      data: { session },
      actionRequired: true,
      actionType: 'review',
      actionUrl: `/ai-agent/counseling/${session.id}`,
    });
  }

  notifySessionCompleted(session: ConsultationSession, forAgentId: string): void {
    this.createNotification({
      type: 'session_completed',
      priority: 'medium',
      agentId: forAgentId,
      sessionId: session.id,
      title: 'Counseling Session Completed',
      message: 'Your counseling session has been marked as complete',
      data: { session },
      actionRequired: false,
    });
  }

  notifySessionEscalated(session: ConsultationSession, forAgentId: string, escalatedTo: string): void {
    this.createNotification({
      type: 'session_escalated',
      priority: 'critical',
      agentId: forAgentId,
      sessionId: session.id,
      title: 'Session Escalated',
      message: `This session has been escalated to ${escalatedTo}`,
      data: { session, escalatedTo },
      actionRequired: true,
      actionType: 'escalate',
      actionUrl: `/ai-agent/counseling/${session.id}`,
    });
  }

  notifyReminder(session: ConsultationSession, forAgentId: string, minutesBefore: number): void {
    this.createNotification({
      type: 'session_reminder',
      priority: 'high',
      agentId: forAgentId,
      sessionId: session.id,
      title: `Session Starting in ${minutesBefore} minutes`,
      message: 'Your counseling session is about to begin',
      data: { session, minutesBefore },
      actionRequired: true,
      actionType: 'review',
      actionUrl: `/ai-agent/counseling/${session.id}`,
      expiresAt: new Date(Date.now() + minutesBefore * 60000 + 300000), // Expire 5 min after session start
    });
  }

  notifyCounselingNeeded(agentId: string, reason: string, recommendedType: string): void {
    this.createNotification({
      type: 'counseling_needed',
      priority: 'medium',
      agentId,
      title: 'Counseling Recommended',
      message: `Based on ${reason}, ${recommendedType} counseling is recommended`,
      data: { reason, recommendedType },
      actionRequired: true,
      actionType: 'schedule',
      actionUrl: '/ai-agent/agent-counseling',
    });
  }

  notifyMilestoneReached(agentId: string, milestoneName: string, context: string): void {
    this.createNotification({
      type: 'milestone_reached',
      priority: 'low',
      agentId,
      title: 'Milestone Achieved',
      message: `You've reached the milestone: ${milestoneName}`,
      data: { milestoneName, context },
      actionRequired: false,
    });
  }

  // ============================================
  // ALERTS SYSTEM
  // ============================================

  createAlert(params: Omit<NotificationAlert, 'id' | 'createdAt'>): NotificationAlert {
    const alert: NotificationAlert = {
      ...params,
      id: randomUUID(),
      createdAt: new Date(),
    };

    this.alerts.set(alert.id, alert);

    // Also create notification for the alert
    this.createNotification({
      type: 'session_escalated',
      priority: alert.severity === 'critical' ? 'critical' : 'high',
      agentId: params.agentId,
      sessionId: params.sessionId,
      title: alert.type.replace(/_/g, ' ').toUpperCase(),
      message: alert.message,
      data: { alert },
      actionRequired: true,
      actionType: 'review',
    });

    return alert;
  }

  checkAndCreateAlerts(session: ConsultationSession): void {
    const now = new Date();
    const lastRequest = session.requests[session.requests.length - 1];
    const lastResponse = session.responses[session.responses.length - 1];

    // Check for overdue response
    if (!lastResponse && lastRequest) {
      const requestAge = now.getTime() - new Date(lastRequest.timestamp).getTime();
      const hoursSinceRequest = requestAge / (1000 * 60 * 60);

      if (hoursSinceRequest > 24) {
        // Alert participants
        for (const participant of session.participants) {
          this.createAlert({
            type: 'unresponded_request',
            severity: hoursSinceRequest > 72 ? 'critical' : 'warning',
            agentId: participant.agentId,
            sessionId: session.id,
            message: `Counseling request has been pending for ${Math.floor(hoursSinceRequest)} hours`,
            recommendation: 'Respond to the counseling request or escalate if unable to help',
          });
        }
      }
    }

    // Check for stale sessions
    const sessionAge = now.getTime() - new Date(session.createdAt).getTime();
    const daysSinceCreation = sessionAge / (1000 * 60 * 60 * 24);

    if (session.status === 'in_progress' && daysSinceCreation > 7) {
      this.createAlert({
        type: 'overdue_session',
        severity: daysSinceCreation > 14 ? 'critical' : 'warning',
        agentId: session.initiator.agentId,
        sessionId: session.id,
        message: `Counseling session has been in progress for ${Math.floor(daysSinceCreation)} days`,
        recommendation: 'Review session status and mark complete if resolved',
      });
    }
  }

  // ============================================
  // SUBSCRIPTION API
  // ============================================

  subscribe(agentId: string, callback: (notification: CounselingNotification) => void): () => void {
    if (!this.subscribers.has(agentId)) {
      this.subscribers.set(agentId, new Set());
    }

    const subs = this.subscribers.get(agentId)!;
    subs.add(callback);

    return () => {
      subs.delete(callback);
      if (subs.size === 0) {
        this.subscribers.delete(agentId);
      }
    };
  }

  // ============================================
  // PREFERENCES API
  // ============================================

  setPreferences(agentId: string, preferences: Partial<NotificationPreference>): NotificationPreference {
    const existing = this.preferences.get(agentId);
    const updated: NotificationPreference = {
      ...existing,
      ...preferences,
      agentId,
      channels: { ...(existing?.channels || { push: true, email: true, inApp: true, sms: false }), ...(preferences.channels || {}) },
      quietHours: { ...(existing?.quietHours || { enabled: false, startTime: '22:00', endTime: '08:00', timezone: 'UTC' }), ...(preferences.quietHours || {}) },
      filters: { ...(existing?.filters || { minPriority: 'low', types: [], muteEscalations: false, muteNonUrgent: false }), ...(preferences.filters || {}) },
      digest: { ...(existing?.digest || { enabled: false, frequency: 'daily', time: '09:00' }), ...(preferences.digest || {}) },
    };

    this.preferences.set(agentId, updated);
    return updated;
  }

  getPreferences(agentId: string): NotificationPreference {
    return this.preferences.get(agentId) || this.getDefaultPreferences(agentId);
  }

  private getDefaultPreferences(agentId: string): NotificationPreference {
    return {
      agentId,
      channels: {
        push: true,
        email: true,
        inApp: true,
        sms: false,
      },
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
        timezone: 'UTC',
      },
      filters: {
        minPriority: 'low',
        types: [],
        muteEscalations: false,
        muteNonUrgent: false,
      },
      digest: {
        enabled: false,
        frequency: 'daily',
        time: '09:00',
      },
    };
  }

  // ============================================
  // NOTIFICATION MANAGEMENT
  // ============================================

  getNotifications(
    agentId: string,
    filters?: {
      unreadOnly?: boolean;
      type?: NotificationType;
      priority?: NotificationPriority;
      limit?: number;
    }
  ): CounselingNotification[] {
    let notifs = Array.from(this.notifications.values())
      .filter(n => n.agentId === agentId);

    if (filters?.unreadOnly) {
      notifs = notifs.filter(n => !n.read);
    }

    if (filters?.type) {
      notifs = notifs.filter(n => n.type === filters.type);
    }

    if (filters?.priority) {
      notifs = notifs.filter(n => n.priority === filters.priority);
    }

    // Sort by created date desc, then by priority
    notifs.sort((a, b) => {
      if (a.read !== b.read) return a.read ? 1 : -1;
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (filters?.limit) {
      notifs = notifs.slice(0, filters.limit);
    }

    return notifs;
  }

  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.get(notificationId);
    if (!notification) return false;

    notification.read = true;
    notification.readAt = new Date();
    this.notifications.set(notificationId, notification);
    return true;
  }

  markAllAsRead(agentId: string): number {
    let count = 0;
    for (const [id, notification] of this.notifications.entries()) {
      if (notification.agentId === agentId && !notification.read) {
        notification.read = true;
        notification.readAt = new Date();
        this.notifications.set(id, notification);
        count++;
      }
    }
    return count;
  }

  deleteNotification(notificationId: string): boolean {
    return this.notifications.delete(notificationId);
  }

  getUnreadCount(agentId: string): number {
    return this.getNotifications(agentId, { unreadOnly: true }).length;
  }

  // ============================================
  // ALERTS MANAGEMENT
  // ============================================

  getAlerts(
    agentId: string,
    filters?: {
      severity?: NotificationAlert['severity'];
      acknowledged?: boolean;
      limit?: number;
    }
  ): NotificationAlert[] {
    let alerts = Array.from(this.alerts.values())
      .filter(a => a.agentId === agentId);

    if (filters?.severity) {
      alerts = alerts.filter(a => a.severity === filters.severity);
    }

    if (filters?.acknowledged !== undefined) {
      alerts = alerts.filter(a => 
        filters.acknowledged ? !!a.acknowledgedAt : !a.acknowledgedAt
      );
    }

    alerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters?.limit) {
      alerts = alerts.slice(0, filters.limit);
    }

    return alerts;
  }

  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.acknowledgedAt = new Date();
    this.alerts.set(alertId, alert);
    return true;
  }

  dismissAlert(alertId: string): boolean {
    return this.alerts.delete(alertId);
  }
}

// Singleton instance
export const counselingNotifications = new CounselingNotificationService();

// Convenience functions
export function createCounselingNotification(
  params: Parameters<CounselingNotificationService['createNotification']>[0]
): CounselingNotification {
  return counselingNotifications.createNotification(params);
}

export function getAgentNotifications(
  agentId: string,
  filters?: Parameters<CounselingNotificationService['getNotifications']>[1]
): CounselingNotification[] {
  return counselingNotifications.getNotifications(agentId, filters);
}

export function subscribeToCounselingNotifications(
  agentId: string,
  callback: (notification: CounselingNotification) => void
): () => void {
  return counselingNotifications.subscribe(agentId, callback);
}

export function setNotificationPreferences(
  agentId: string,
  preferences: Parameters<CounselingNotificationService['setPreferences']>[1]
): NotificationPreference {
  return counselingNotifications.setPreferences(agentId, preferences);
}

export function getNotificationPreferences(agentId: string): NotificationPreference {
  return counselingNotifications.getPreferences(agentId);
}

export function getUnreadNotificationCount(agentId: string): number {
  return counselingNotifications.getUnreadCount(agentId);
}

export default counselingNotifications;
