/**
 * Security Audit Service
 * Provides security auditing and logging functionality
 */

export interface SecurityEvent {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export class SecurityAuditService {
  private events: SecurityEvent[] = [];

  async logEvent(type: string, severity: SecurityEvent['severity'], message: string, metadata?: Record<string, unknown>): Promise<SecurityEvent> {
    const event: SecurityEvent = {
      id: `evt_${Date.now()}`,
      type,
      severity,
      message,
      timestamp: new Date(),
      metadata
    };
    this.events.push(event);
    return event;
  }

  async getEvents(filter?: { type?: string; severity?: SecurityEvent['severity'] }): Promise<SecurityEvent[]> {
    let filtered = this.events;
    if (filter?.type) {
      filtered = filtered.filter(e => e.type === filter.type);
    }
    if (filter?.severity) {
      filtered = filtered.filter(e => e.severity === filter.severity);
    }
    return filtered;
  }

  async cleanupOldEvents(olderThanDays: number = 30): Promise<number> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - olderThanDays);
    const beforeCount = this.events.length;
    this.events = this.events.filter(e => e.timestamp > cutoff);
    return beforeCount - this.events.length;
  }
}

export const securityAuditService = new SecurityAuditService();
