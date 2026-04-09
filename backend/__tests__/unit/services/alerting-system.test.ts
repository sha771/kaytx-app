/**
 * Alerting System Unit Tests
 */

import { alertingSystem, AlertSeverity, AlertStatus, AlertChannel } from '../../../lib/alerting-system';

describe('Alerting System', () => {
  beforeEach(() => {
    // Clear all alerts before each test
    const alerts = alertingSystem.getAlerts();
    for (const alert of alerts) {
      alertingSystem.resolveAlert(alert.id);
    }
  });

  describe('Alert Creation', () => {
    it('should create a new alert with valid data', () => {
      const alertData = {
        name: 'Test Alert',
        description: 'Test alert description',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test-source',
        labels: { component: 'test' },
        annotations: { description: 'Test annotation' },
        channels: [AlertChannel.EMAIL],
        message: 'Test message',
      };

      const alert = alertingSystem.createAlert(alertData);

      expect(alert).toBeDefined();
      expect(alert.id).toBeDefined();
      expect(alert.name).toBe('Test Alert');
      expect(alert.severity).toBe(AlertSeverity.HIGH);
      expect(alert.status).toBe(AlertStatus.FIRING);
      expect(alert.escalationLevel).toBe(0);
      expect(alert.fingerprint).toBeDefined();
    });

    it('should deduplicate alerts with same fingerprint', () => {
      const alertData = {
        name: 'Test Alert',
        description: 'Test alert description',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test-source',
        labels: { component: 'test' },
        annotations: { description: 'Test annotation' },
        channels: [AlertChannel.EMAIL],
        message: 'Test message',
      };

      const alert1 = alertingSystem.createAlert(alertData);
      const alert2 = alertingSystem.createAlert(alertData);

      // Should return the same alert (updated) due to deduplication
      expect(alert1.id).toBe(alert2.id);
      expect(alert2.status).toBe(AlertStatus.FIRING);
      expect(alert2.updatedAt.getTime()).toBeGreaterThan(alert1.updatedAt.getTime());
    });

    it('should handle different alert severities', () => {
      const severities = [AlertSeverity.LOW, AlertSeverity.MEDIUM, AlertSeverity.HIGH, AlertSeverity.CRITICAL];
      
      severities.forEach(severity => {
        const alert = alertingSystem.createAlert({
          name: `Test ${severity} Alert`,
          description: 'Test alert',
          severity,
          status: AlertStatus.FIRING,
          source: 'test',
          labels: {},
          annotations: {},
          channels: [AlertChannel.EMAIL],
        });

        expect(alert.severity).toBe(severity);
      });
    });
  });

  describe('Alert Management', () => {
    it('should acknowledge an alert', () => {
      const alert = alertingSystem.createAlert({
        name: 'Test Alert',
        description: 'Test',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      const result = alertingSystem.acknowledgeAlert(alert.id);
      
      expect(result).toBe(true);
      
      const updatedAlert = alertingSystem.getAlert(alert.id);
      expect(updatedAlert?.status).toBe(AlertStatus.ACKNOWLEDGED);
    });

    it('should resolve an alert', () => {
      const alert = alertingSystem.createAlert({
        name: 'Test Alert',
        description: 'Test',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      const result = alertingSystem.resolveAlert(alert.id);
      
      expect(result).toBe(true);
      
      const updatedAlert = alertingSystem.getAlert(alert.id);
      expect(updatedAlert?.status).toBe(AlertStatus.RESOLVED);
      expect(updatedAlert?.resolvedAt).toBeDefined();
    });

    it('should suppress an alert temporarily', async () => {
      const alert = alertingSystem.createAlert({
        name: 'Test Alert',
        description: 'Test',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      const result = alertingSystem.suppressAlert(alert.id, 1); // 1 second
      
      expect(result).toBe(true);
      
      const updatedAlert = alertingSystem.getAlert(alert.id);
      expect(updatedAlert?.status).toBe(AlertStatus.SUPPRESSED);

      // Wait for suppression to expire
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const finalAlert = alertingSystem.getAlert(alert.id);
      expect(finalAlert?.status).toBe(AlertStatus.OPEN);
    });

    it('should return false for non-existent alert operations', () => {
      const result = alertingSystem.acknowledgeAlert('non-existent-id');
      expect(result).toBe(false);

      const result2 = alertingSystem.resolveAlert('non-existent-id');
      expect(result2).toBe(false);

      const result3 = alertingSystem.suppressAlert('non-existent-id', 60);
      expect(result3).toBe(false);
    });
  });

  describe('Alert Querying', () => {
    beforeEach(() => {
      // Create test alerts with different properties
      alertingSystem.createAlert({
        name: 'High Severity Alert',
        description: 'Test',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'source1',
        labels: { component: 'auth' },
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      alertingSystem.createAlert({
        name: 'Low Severity Alert',
        description: 'Test',
        severity: AlertSeverity.LOW,
        status: AlertStatus.RESOLVED,
        source: 'source2',
        labels: { component: 'api' },
        annotations: {},
        channels: [AlertChannel.SLACK],
      });

      alertingSystem.createAlert({
        name: 'Critical Alert',
        description: 'Test',
        severity: AlertSeverity.CRITICAL,
        status: AlertStatus.ACKNOWLEDGED,
        source: 'source1',
        labels: { component: 'database' },
        annotations: {},
        channels: [AlertChannel.PAGERDUTY],
      });
    });

    it('should get all alerts', () => {
      const alerts = alertingSystem.getAlerts();
      expect(alerts).toHaveLength(3);
    });

    it('should filter alerts by status', () => {
      const firingAlerts = alertingSystem.getAlerts({ status: AlertStatus.FIRING });
      expect(firingAlerts).toHaveLength(1);
      expect(firingAlerts[0].severity).toBe(AlertSeverity.HIGH);

      const resolvedAlerts = alertingSystem.getAlerts({ status: AlertStatus.RESOLVED });
      expect(resolvedAlerts).toHaveLength(1);
      expect(resolvedAlerts[0].severity).toBe(AlertSeverity.LOW);
    });

    it('should filter alerts by severity', () => {
      const highAlerts = alertingSystem.getAlerts({ severity: AlertSeverity.HIGH });
      expect(highAlerts).toHaveLength(1);

      const criticalAlerts = alertingSystem.getAlerts({ severity: AlertSeverity.CRITICAL });
      expect(criticalAlerts).toHaveLength(1);
    });

    it('should filter alerts by source', () => {
      const source1Alerts = alertingSystem.getAlerts({ source: 'source1' });
      expect(source1Alerts).toHaveLength(2);

      const source2Alerts = alertingSystem.getAlerts({ source: 'source2' });
      expect(source2Alerts).toHaveLength(1);
    });

    it('should combine multiple filters', () => {
      const filteredAlerts = alertingSystem.getAlerts({
        source: 'source1',
        severity: AlertSeverity.CRITICAL
      });
      expect(filteredAlerts).toHaveLength(1);
      expect(filteredAlerts[0].name).toBe('Critical Alert');
    });
  });

  describe('Statistics', () => {
    beforeEach(() => {
      // Create alerts for statistics testing
      alertingSystem.createAlert({
        name: 'Alert 1',
        description: 'Test',
        severity: AlertSeverity.HIGH,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      alertingSystem.createAlert({
        name: 'Alert 2',
        description: 'Test',
        severity: AlertSeverity.LOW,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.SLACK],
      });

      alertingSystem.createAlert({
        name: 'Alert 3',
        description: 'Test',
        severity: AlertSeverity.CRITICAL,
        status: AlertStatus.RESOLVED,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.PAGERDUTY],
      });
    });

    it('should calculate correct statistics', () => {
      const stats = alertingSystem.getStatistics();

      expect(stats.total).toBe(3);
      expect(stats.activeAlerts).toBe(2); // FIRING + OPEN alerts
      expect(stats.byStatus[AlertStatus.FIRING]).toBe(2);
      expect(stats.byStatus[AlertStatus.RESOLVED]).toBe(1);
      expect(stats.bySeverity[AlertSeverity.HIGH]).toBe(1);
      expect(stats.bySeverity[AlertSeverity.LOW]).toBe(1);
      expect(stats.bySeverity[AlertSeverity.CRITICAL]).toBe(1);
      expect(stats.byChannel[AlertChannel.EMAIL]).toBe(1);
      expect(stats.byChannel[AlertChannel.SLACK]).toBe(1);
      expect(stats.byChannel[AlertChannel.PAGERDUTY]).toBe(1);
    });

    it('should calculate mean time to resolution', async () => {
      // Create and immediately resolve an alert
      const alert = alertingSystem.createAlert({
        name: 'Quick Alert',
        description: 'Test',
        severity: AlertSeverity.MEDIUM,
        status: AlertStatus.FIRING,
        source: 'test',
        labels: {},
        annotations: {},
        channels: [AlertChannel.EMAIL],
      });

      // Wait a bit then resolve
      await new Promise(resolve => setTimeout(resolve, 100));
      alertingSystem.resolveAlert(alert.id);

      const stats = alertingSystem.getStatistics();
      expect(stats.meanTimeToResolution).toBeGreaterThan(0);
    });
  });

  describe('Rule Management', () => {
    it('should add and retrieve rules', () => {
      const rule = {
        id: 'test-rule',
        name: 'Test Rule',
        description: 'Test rule description',
        enabled: true,
        condition: 'rate(errors_total[5m]) > 0.1',
        severity: AlertSeverity.HIGH,
        channels: [AlertChannel.EMAIL],
        threshold: 0.1,
        duration: 300,
        cooldown: 600,
        labels: { team: 'test' },
        annotations: { description: 'Test rule' },
      };

      alertingSystem.addRule(rule);
      
      const rules = alertingSystem.getRules();
      expect(rules).toContainEqual(rule);
    });

    it('should remove rules', () => {
      const rule = {
        id: 'test-rule-to-remove',
        name: 'Test Rule to Remove',
        description: 'Test rule description',
        enabled: true,
        condition: 'rate(errors_total[5m]) > 0.1',
        severity: AlertSeverity.HIGH,
        channels: [AlertChannel.EMAIL],
        threshold: 0.1,
        duration: 300,
        cooldown: 600,
        labels: { team: 'test' },
        annotations: { description: 'Test rule' },
      };

      alertingSystem.addRule(rule);
      
      const rulesBefore = alertingSystem.getRules();
      expect(rulesBefore).toContainEqual(rule);

      const result = alertingSystem.removeRule('test-rule-to-remove');
      expect(result).toBe(true);

      const rulesAfter = alertingSystem.getRules();
      expect(rulesAfter).not.toContainEqual(rule);
    });

    it('should return false when removing non-existent rule', () => {
      const result = alertingSystem.removeRule('non-existent-rule');
      expect(result).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty alert data gracefully', () => {
      expect(() => {
        alertingSystem.createAlert({
          name: '',
          description: '',
          severity: AlertSeverity.LOW,
          status: AlertStatus.OPEN,
          source: '',
          labels: {},
          annotations: {},
          channels: [],
        });
      }).not.toThrow();
    });

    it('should handle large number of alerts', () => {
      const alertCount = 100;
      
      for (let i = 0; i < alertCount; i++) {
        alertingSystem.createAlert({
          name: `Alert ${i}`,
          description: `Test alert ${i}`,
          severity: AlertSeverity.MEDIUM,
          status: AlertStatus.FIRING,
          source: 'test',
          labels: { index: i.toString() },
          annotations: {},
          channels: [AlertChannel.EMAIL],
        });
      }

      const alerts = alertingSystem.getAlerts();
      expect(alerts.length).toBeGreaterThanOrEqual(alertCount);
    });

    it('should handle concurrent operations', async () => {
      const promises = Array.from({ length: 10 }, (_, i) =>
        alertingSystem.createAlert({
          name: `Concurrent Alert ${i}`,
          description: 'Test',
          severity: AlertSeverity.MEDIUM,
          status: AlertStatus.FIRING,
          source: 'test',
          labels: { index: i.toString() },
          annotations: {},
          channels: [AlertChannel.EMAIL],
        })
      );

      const results = await Promise.all(promises);
      expect(results).toHaveLength(10);
      
      // All alerts should have unique IDs
      const ids = results.map(alert => alert.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(10);
    });
  });
});
