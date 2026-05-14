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

  async getEvents(Filter?: { userId?: string; organizationId?: string; action?: string }): Promise<AuditEvent[]> {
    let filtered = this.events;
    if (Filter?.userId) {
      filtered = filtered.filter(e => e.userId === Filter.userId);
    }
    if (Filter?.organizationId) {
      filtered = filtered.filter(e => e.organizationId === Filter.organizationId);
    }
    if (Filter?.action) {
      filtered = filtered.filter(e => e.action === Filter.action);
    }
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getEventById(eventId: string): Promise<AuditEvent | null> {
    return this.events.find(e => e.id === eventId) || null;
  }

  async searchAuditLogs(query: {
    userId?: string;
    organizationId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ logs: AuditEvent[]; total: number }> {
    let filtered = this.events;
    if (query.userId) filtered = filtered.filter(e => e.userId === query.userId);
    if (query.organizationId) filtered = filtered.filter(e => e.organizationId === query.organizationId);
    if (query.action) filtered = filtered.filter(e => e.action === query.action);
    if (query.resource) filtered = filtered.filter(e => e.resource === query.resource);
    if (query.startDate) filtered = filtered.filter(e => e.timestamp >= query.startDate!);
    if (query.endDate) filtered = filtered.filter(e => e.timestamp <= query.endDate!);
    filtered = filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const total = filtered.length;
    const offset = query.offset || 0;
    const limit = query.limit || 50;
    return { logs: filtered.slice(offset, offset + limit), total };
  }
}

export const auditService = new AuditService();
