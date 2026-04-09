/**
 * Alerting Service
 * Provides alerting functionality
 */

export interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
}

export class AlertingService {
  private alerts: Alert[] = [];

  async triggerAlert(severity: Alert['severity'], message: string): Promise<Alert> {
    const alert: Alert = {
      id: `alert_${Date.now()}`,
      severity,
      message,
      timestamp: new Date()
    };
    this.alerts.push(alert);
    return alert;
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return this.alerts;
  }

  async resolveAlert(alertId: string): Promise<boolean> {
    this.alerts = this.alerts.filter(a => a.id !== alertId);
    return true;
  }
}

export const alertingService = new AlertingService();
