/**
 * Audit Service
 * Provides auditing functionality for the application
 */

export interface AuditEvent {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  userId?: string;
  organizationId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  status: 'success' | 'failure' | 'pending';
}

export class AuditService {
  private events: AuditEvent[] = [];

  async logEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<AuditEvent> {
    const newEvent: AuditEvent = {
      ...event,
      id: `audit_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: new Date(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async getEvents(filter?: { userId?: string; organizationId?: string; action?: string }): Promise<AuditEvent[]> {
    let filtered = this.events;
    if (filter?.userId) {
      filtered = filtered.filter(e => e.userId === filter.userId);
    }
    if (filter?.organizationId) {
      filtered = filtered.filter(e => e.organizationId === filter.organizationId);
    }
    if (filter?.action) {
      filtered = filtered.filter(e => e.action === filter.action);
    }
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getEventById(eventId: string): Promise<AuditEvent | null> {
    return this.events.find(e => e.id === eventId) || null;
  }
}

export const auditService = new AuditService();
