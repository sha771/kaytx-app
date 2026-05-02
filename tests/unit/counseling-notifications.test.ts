import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import {
  counselingNotifications,
  CounselingNotification,
  NotificationPreference,
  NotificationType,
  NotificationPriority,
  NotificationAlert,
} from '../../backend/services/counseling-notifications';
import { randomUUID } from 'crypto';

describe('Counseling Notifications Service', () => {
  const mockAgentId = randomUUID();
  const mockSessionId = randomUUID();

  beforeEach(() => {
    // Clear all internal state
    (counselingNotifications as any).notifications.clear();
    (counselingNotifications as any).alerts.clear();
    (counselingNotifications as any).preferences.clear();
    (counselingNotifications as any).subscribers.clear();
  });

  describe('createNotification', () => {
    it('should create a notification with required fields', () => {
      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'New Session',
        message: 'A counseling session has been created',
        sessionId: mockSessionId,
      });

      expect(notification).toBeDefined();
      expect(notification.id).toBeDefined();
      expect(notification.agentId).toBe(mockAgentId);
      expect(notification.sessionId).toBe(mockSessionId);
      expect(notification.read).toBe(false);
      expect(notification.createdAt).toBeInstanceOf(Date);
    });

    it('should generate unique IDs for each notification', () => {
      const notification1 = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'First',
        message: 'First notification',
      });

      const notification2 = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Second',
        message: 'Second notification',
      });

      expect(notification1.id).not.toBe(notification2.id);
    });

    it('should support all notification types', () => {
      const types: NotificationType[] = [
        'session_created',
        'session_reminder',
        'session_starting',
        'response_received',
        'session_completed',
        'session_escalated',
        'session_cancelled',
        'session_rescheduled',
        'milestone_reached',
        'deadline_approaching',
        'counseling_needed',
        'achievement_unlocked',
      ];

      types.forEach((type) => {
        const notification = counselingNotifications.createNotification({
          type,
          priority: 'medium',
          agentId: mockAgentId,
          title: `Test ${type}`,
          message: `Test message for ${type}`,
        });

        expect(notification.type).toBe(type);
      });
    });

    it('should support all priority levels', () => {
      const priorities: NotificationPriority[] = ['low', 'medium', 'high', 'critical'];

      priorities.forEach((priority) => {
        const notification = counselingNotifications.createNotification({
          type: 'session_created',
          priority,
          agentId: mockAgentId,
          title: `Test ${priority}`,
          message: `Test message for ${priority}`,
        });

        expect(notification.priority).toBe(priority);
      });
    });

    it('should include optional data', () => {
      const data = {
        sessionId: randomUUID(),
        customField: 'custom value',
      };

      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Session Created',
        message: 'A session has been created',
        data,
      });

      expect(notification.data).toEqual(data);
    });

    it('should include action details when provided', () => {
      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Action Required',
        message: 'Please review this session',
        actionRequired: true,
        actionType: 'review',
        actionUrl: '/ai-agent/counseling/session-123',
      });

      expect(notification.actionRequired).toBe(true);
      expect(notification.actionType).toBe('review');
      expect(notification.actionUrl).toBe('/ai-agent/counseling/session-123');
    });
  });

  describe('getNotifications', () => {
    it('should return all notifications for an agent', () => {
      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'First',
        message: 'First notification',
      });

      counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Second',
        message: 'Second notification',
      });

      const notifications = counselingNotifications.getNotifications(mockAgentId);

      expect(notifications).toHaveLength(2);
    });

    it('should Filter by read status', () => {
      const unread = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Unread',
        message: 'Unread notification',
      });

      const read = counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Read',
        message: 'Read notification',
      });

      counselingNotifications.markAsRead(read.id);

      const unreadNotifications = counselingNotifications.getNotifications(mockAgentId, { unreadOnly: true });

      expect(unreadNotifications).toHaveLength(1);
      expect(unreadNotifications[0].id).toBe(unread.id);
    });

    it('should Filter by type', () => {
      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Session',
        message: 'Session notification',
      });

      counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Completed',
        message: 'Completed notification',
      });

      const sessionNotifications = counselingNotifications.getNotifications(mockAgentId, { type: 'session_created' });

      expect(sessionNotifications).toHaveLength(1);
      expect(sessionNotifications[0].type).toBe('session_created');
    });

    it('should Filter by priority', () => {
      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'High Priority',
        message: 'High priority notification',
      });

      counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'low',
        agentId: mockAgentId,
        title: 'Low Priority',
        message: 'Low priority notification',
      });

      const highPriority = counselingNotifications.getNotifications(mockAgentId, { priority: 'high' });

      expect(highPriority).toHaveLength(1);
      expect(highPriority[0].priority).toBe('high');
    });

    it('should respect limit parameter', () => {
      for (let i = 0; i < 5; i++) {
        counselingNotifications.createNotification({
          type: 'session_created',
          priority: 'medium',
          agentId: mockAgentId,
          title: `Notification ${i}`,
          message: `Message ${i}`,
        });
      }

      const limited = counselingNotifications.getNotifications(mockAgentId, { limit: 3 });

      expect(limited).toHaveLength(3);
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', () => {
      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      const result = counselingNotifications.markAsRead(notification.id);

      expect(result).toBe(true);

      const updated = counselingNotifications.getNotifications(mockAgentId)[0];
      expect(updated.read).toBe(true);
      expect(updated.readAt).toBeInstanceOf(Date);
    });

    it('should return false for non-existent notification', () => {
      const result = counselingNotifications.markAsRead(randomUUID());

      expect(result).toBe(false);
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', () => {
      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'First',
        message: 'First message',
      });

      counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Second',
        message: 'Second message',
      });

      const count = counselingNotifications.markAllAsRead(mockAgentId);

      expect(count).toBe(2);

      const notifications = counselingNotifications.getNotifications(mockAgentId);
      expect(notifications.every((n) => n.read)).toBe(true);
    });

    it('should return 0 when no notifications exist', () => {
      const count = counselingNotifications.markAllAsRead(mockAgentId);

      expect(count).toBe(0);
    });

    it('should only mark notifications for specified agent', () => {
      const otherAgentId = randomUUID();

      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Agent 1',
        message: 'Agent 1 message',
      });

      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: otherAgentId,
        title: 'Agent 2',
        message: 'Agent 2 message',
      });

      counselingNotifications.markAllAsRead(mockAgentId);

      const agent1Notifications = counselingNotifications.getNotifications(mockAgentId);
      const agent2Notifications = counselingNotifications.getNotifications(otherAgentId);

      expect(agent1Notifications[0].read).toBe(true);
      expect(agent2Notifications[0].read).toBe(false);
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', () => {
      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      const result = counselingNotifications.deleteNotification(notification.id);

      expect(result).toBe(true);
      expect(counselingNotifications.getNotifications(mockAgentId)).toHaveLength(0);
    });

    it('should return false for non-existent notification', () => {
      const result = counselingNotifications.deleteNotification(randomUUID());

      expect(result).toBe(false);
    });
  });

  describe('getUnreadCount', () => {
    it('should return count of unread notifications', () => {
      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Unread 1',
        message: 'Unread 1 message',
      });

      const readNotification = counselingNotifications.createNotification({
        type: 'session_completed',
        priority: 'medium',
        agentId: mockAgentId,
        title: 'Read',
        message: 'Read message',
      });

      counselingNotifications.markAsRead(readNotification.id);

      const count = counselingNotifications.getUnreadCount(mockAgentId);

      expect(count).toBe(1);
    });

    it('should return 0 when all notifications are read', () => {
      const notification = counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      counselingNotifications.markAsRead(notification.id);

      const count = counselingNotifications.getUnreadCount(mockAgentId);

      expect(count).toBe(0);
    });

    it('should return 0 when no notifications exist', () => {
      const count = counselingNotifications.getUnreadCount(mockAgentId);

      expect(count).toBe(0);
    });
  });

  describe('createAlert', () => {
    it('should create an alert with required fields', () => {
      const alert = counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Session is overdue',
        recommendation: 'Please review and close the session',
      });

      expect(alert).toBeDefined();
      expect(alert.id).toBeDefined();
      expect(alert.severity).toBe('warning');
      expect(alert.acknowledgedAt).toBeUndefined();
      expect(alert.createdAt).toBeInstanceOf(Date);
    });

    it('should support all alert types', () => {
      const types: NotificationAlert['type'][] = [
        'overdue_session',
        'unresponded_request',
        'escalation_needed',
        'counseling_overload',
        'performance_decline',
      ];

      types.forEach((type, index) => {
        const alert = counselingNotifications.createAlert({
          type,
          severity: 'warning',
          agentId: mockAgentId,
          message: `Test ${type}`,
          recommendation: `Recommendation for ${type}`,
        });

        expect(alert.type).toBe(type);
      });
    });

    it('should support both severity levels', () => {
      const warningAlert = counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Warning alert',
        recommendation: 'Warning recommendation',
      });

      const criticalAlert = counselingNotifications.createAlert({
        type: 'escalation_needed',
        severity: 'critical',
        agentId: mockAgentId,
        message: 'Critical alert',
        recommendation: 'Critical recommendation',
      });

      expect(warningAlert.severity).toBe('warning');
      expect(criticalAlert.severity).toBe('critical');
    });
  });

  describe('getAlerts', () => {
    it('should return all alerts for an agent', () => {
      counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'First alert',
        recommendation: 'First recommendation',
      });

      counselingNotifications.createAlert({
        type: 'escalation_needed',
        severity: 'critical',
        agentId: mockAgentId,
        message: 'Second alert',
        recommendation: 'Second recommendation',
      });

      const alerts = counselingNotifications.getAlerts(mockAgentId);

      expect(alerts).toHaveLength(2);
    });

    it('should Filter by severity', () => {
      counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Warning alert',
        recommendation: 'Warning recommendation',
      });

      counselingNotifications.createAlert({
        type: 'escalation_needed',
        severity: 'critical',
        agentId: mockAgentId,
        message: 'Critical alert',
        recommendation: 'Critical recommendation',
      });

      const criticalAlerts = counselingNotifications.getAlerts(mockAgentId, { severity: 'critical' });

      expect(criticalAlerts).toHaveLength(1);
      expect(criticalAlerts[0].severity).toBe('critical');
    });

    it('should Filter by acknowledged status', () => {
      const unacknowledged = counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Unacknowledged',
        recommendation: 'Unacknowledged recommendation',
      });

      const acknowledged = counselingNotifications.createAlert({
        type: 'escalation_needed',
        severity: 'critical',
        agentId: mockAgentId,
        message: 'Acknowledged',
        recommendation: 'Acknowledged recommendation',
      });

      counselingNotifications.acknowledgeAlert(acknowledged.id);

      const unacknowledgedAlerts = counselingNotifications.getAlerts(mockAgentId, { acknowledged: false });
      const acknowledgedAlerts = counselingNotifications.getAlerts(mockAgentId, { acknowledged: true });

      expect(unacknowledgedAlerts).toHaveLength(1);
      expect(acknowledgedAlerts).toHaveLength(1);
    });

    it('should only return alerts for specified agent', () => {
      const otherAgentId = randomUUID();

      counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Agent 1 alert',
        recommendation: 'Agent 1 recommendation',
      });

      counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: otherAgentId,
        message: 'Agent 2 alert',
        recommendation: 'Agent 2 recommendation',
      });

      const agent1Alerts = counselingNotifications.getAlerts(mockAgentId);

      expect(agent1Alerts).toHaveLength(1);
      expect(agent1Alerts[0].message).toBe('Agent 1 alert');
    });
  });

  describe('acknowledgeAlert', () => {
    it('should acknowledge an alert', () => {
      const alert = counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Test alert',
        recommendation: 'Test recommendation',
      });

      const result = counselingNotifications.acknowledgeAlert(alert.id);

      expect(result).toBe(true);

      const acknowledged = counselingNotifications.getAlerts(mockAgentId, { acknowledged: true });
      expect(acknowledged).toHaveLength(1);
      expect(acknowledged[0].acknowledgedAt).toBeInstanceOf(Date);
    });

    it('should return false for non-existent alert', () => {
      const result = counselingNotifications.acknowledgeAlert(randomUUID());

      expect(result).toBe(false);
    });
  });

  describe('dismissAlert', () => {
    it('should dismiss an alert', () => {
      const alert = counselingNotifications.createAlert({
        type: 'overdue_session',
        severity: 'warning',
        agentId: mockAgentId,
        message: 'Test alert',
        recommendation: 'Test recommendation',
      });

      const result = counselingNotifications.dismissAlert(alert.id);

      expect(result).toBe(true);
      expect(counselingNotifications.getAlerts(mockAgentId)).toHaveLength(0);
    });

    it('should return false for non-existent alert', () => {
      const result = counselingNotifications.dismissAlert(randomUUID());

      expect(result).toBe(false);
    });
  });

  describe('setPreferences', () => {
    it('should set preferences for an agent', () => {
      const preferences: Partial<NotificationPreference> = {
        channels: {
          push: true,
          email: false,
          inApp: true,
          sms: false,
        },
        quietHours: {
          enabled: true,
          startTime: '22:00',
          endTime: '08:00',
          timezone: 'UTC',
        },
      };

      counselingNotifications.setPreferences(mockAgentId, preferences);

      const retrieved = counselingNotifications.getPreferences(mockAgentId);

      expect(retrieved.channels.push).toBe(true);
      expect(retrieved.channels.email).toBe(false);
      expect(retrieved.quietHours.enabled).toBe(true);
    });

    it('should merge with existing preferences', () => {
      const initial: Partial<NotificationPreference> = {
        channels: { push: true, email: true, inApp: true, sms: false },
      };

      counselingNotifications.setPreferences(mockAgentId, initial);

      const update: Partial<NotificationPreference> = {
        channels: { email: false },
      };

      counselingNotifications.setPreferences(mockAgentId, update);

      const retrieved = counselingNotifications.getPreferences(mockAgentId);

      expect(retrieved.channels.push).toBe(true);
      expect(retrieved.channels.email).toBe(false);
      expect(retrieved.channels.inApp).toBe(true);
    });
  });

  describe('getPreferences', () => {
    it('should return default preferences if none set', () => {
      const preferences = counselingNotifications.getPreferences(mockAgentId);

      expect(preferences.channels.push).toBe(true);
      expect(preferences.channels.email).toBe(true);
      expect(preferences.channels.inApp).toBe(true);
      expect(preferences.channels.sms).toBe(false);
    });

    it('should return saved preferences', () => {
      const custom: Partial<NotificationPreference> = {
        channels: { push: false, email: false, inApp: false, sms: false },
      };

      counselingNotifications.setPreferences(mockAgentId, custom);

      const preferences = counselingNotifications.getPreferences(mockAgentId);

      expect(preferences.channels.push).toBe(false);
      expect(preferences.channels.email).toBe(false);
    });
  });

  describe('subscribe', () => {
    it('should subscribe to notifications', () => {
      const callback = jest.fn();

      const unsubscribe = counselingNotifications.subscribe(mockAgentId, callback);

      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      expect(callback).toHaveBeenCalled();
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should unsubscribe from notifications', () => {
      const callback = jest.fn();

      const unsubscribe = counselingNotifications.subscribe(mockAgentId, callback);
      unsubscribe();

      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      // Callback should not be called after unsubscribe
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('should only notify subscribers for their agent', () => {
      const otherAgentId = randomUUID();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      counselingNotifications.subscribe(mockAgentId, callback1);
      counselingNotifications.subscribe(otherAgentId, callback2);

      counselingNotifications.createNotification({
        type: 'session_created',
        priority: 'high',
        agentId: mockAgentId,
        title: 'Test',
        message: 'Test message',
      });

      expect(callback1).toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe('Session Notifications', () => {
    it('should notify session created', () => {
      const mockSession = {
        id: mockSessionId,
        initiator: { agentId: mockAgentId, agentName: 'Test Agent', role: 'main_agent', category: 'sales' },
        participants: [{ agentId: randomUUID(), agentName: 'Participant', role: 'subagent', status: 'accepted', category: 'support' }],
        requests: [],
        responses: [],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        correlationId: randomUUID(),
        escalationHistory: [],
        metadata: {},
      };

      counselingNotifications.notifySessionCreated(mockSession, mockAgentId);

      const notifications = counselingNotifications.getNotifications(mockAgentId);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications[0].type).toBe('session_created');
    });

    it('should notify response received', () => {
      const mockSession = {
        id: mockSessionId,
        initiator: { agentId: mockAgentId, agentName: 'Test Agent', role: 'main_agent', category: 'sales' },
        participants: [],
        requests: [],
        responses: [],
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        correlationId: randomUUID(),
        escalationHistory: [],
        metadata: {},
      };

      counselingNotifications.notifyResponseReceived(mockSession, mockAgentId, 'Responder');

      const notifications = counselingNotifications.getNotifications(mockAgentId);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications[0].type).toBe('response_received');
    });

    it('should notify session completed', () => {
      const mockSession = {
        id: mockSessionId,
        initiator: { agentId: mockAgentId, agentName: 'Test Agent', role: 'main_agent', category: 'sales' },
        participants: [],
        requests: [],
        responses: [],
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
        correlationId: randomUUID(),
        escalationHistory: [],
        metadata: {},
      };

      counselingNotifications.notifySessionCompleted(mockSession, mockAgentId);

      const notifications = counselingNotifications.getNotifications(mockAgentId);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications[0].type).toBe('session_completed');
    });

    it('should notify session escalated', () => {
      const mockSession = {
        id: mockSessionId,
        initiator: { agentId: mockAgentId, agentName: 'Test Agent', role: 'main_agent', category: 'sales' },
        participants: [],
        requests: [],
        responses: [],
        status: 'escalated',
        createdAt: new Date(),
        updatedAt: new Date(),
        correlationId: randomUUID(),
        escalationHistory: [],
        metadata: {},
      };

      counselingNotifications.notifySessionEscalated(mockSession, mockAgentId, 'Manager');

      const notifications = counselingNotifications.getNotifications(mockAgentId);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications[0].type).toBe('session_escalated');
    });
  });
});
