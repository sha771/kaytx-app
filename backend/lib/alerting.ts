/**
 * Alerting Module
 * Provides alerting functionality for monitoring
 */

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
}

export interface Alert {
  id: string;
  ruleId: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
}

class AlertManager {
  private rules: AlertRule[] = [];
  private alerts: Alert[] = [];

  addRule(rule: Omit<AlertRule, 'id'>): AlertRule {
    const newRule: AlertRule = {
      ...rule,
      id: `rule_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    };
    this.rules.push(newRule);
    return newRule;
  }

  getRules(): AlertRule[] {
    return this.rules;
  }

  triggerAlert(ruleId: string, message: string, severity: Alert['severity']): Alert {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      ruleId,
      message,
      severity,
      timestamp: new Date(),
      acknowledged: false,
    };
    this.alerts.push(alert);
    return alert;
  }

  getActiveAlerts(): Alert[] {
    return this.alerts.filter(a => !a.acknowledged);
  }

  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      return true;
    }
    return false;
  }
}

export const alertManager = new AlertManager();
