import { randomUUID } from 'crypto';
import { agentConsultingService, ConsultationSession } from './agent-consulting-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('CounselingScheduler');

// ============================================
// COUNSELING SCHEDULING SYSTEM
// ============================================

export interface ScheduledCounselingSession {
  id: string;
  sessionId?: string;
  scheduledAt: Date;
  duration: number; // minutes
  sourceAgentId: string;
  targetAgentId: string;
  counselingMode: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
  counselingType: string;
  topic: string;
  agenda: string[];
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    endDate?: Date;
    occurrences?: number;
  };
  reminderSettings: {
    beforeMinutes: number[];
    channels: ('push' | 'email' | 'in_app')[];
  };
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'missed';
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CounselingCalendar {
  agentId: string;
  scheduledSessions: ScheduledCounselingSession[];
  availabilitySlots: {
    dayOfWeek: number; // 0-6
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    isAvailable: boolean;
  }[];
  blockedDates: Date[];
  preferences: {
    defaultDuration: number;
    bufferTime: number;
    maxSessionsPerDay: number;
    preferredCounselingModes: string[];
  };
}

class CounselingSchedulerService {
  private schedules: Map<string, CounselingCalendar> = new Map();
  private scheduledSessions: Map<string, ScheduledCounselingSession> = new Map();
  private checkInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.startScheduler();
  }

  private startScheduler(): void {
    // Check for upcoming sessions every minute
    this.checkInterval = setInterval(() => {
      this.checkUpcomingSessions();
    }, 60000);
  }

  private checkUpcomingSessions(): void {
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

    for (const session of this.scheduledSessions.values()) {
      if (session.status !== 'scheduled') continue;

      const scheduledTime = new Date(session.scheduledAt);
      
      // Check if session should start
      if (scheduledTime <= now) {
        this.initiateScheduledSession(session.id);
      }
      // Check for reminders
      else if (scheduledTime <= fiveMinutesFromNow) {
        this.sendReminders(session);
      }
    }
  }

  private async initiateScheduledSession(scheduledId: string): Promise<void> {
    const scheduled = this.scheduledSessions.get(scheduledId);
    if (!scheduled || scheduled.status !== 'scheduled') return;

    try {
      // Create the actual counseling session
      const session = await agentConsultingService.initiateComprehensiveCounseling(
        scheduled.sourceAgentId,
        scheduled.targetAgentId,
        scheduled.counselingMode,
        {
          programType: this.mapTypeToProgram(scheduled.counselingType),
          severity: 'medium',
          duration: 'single_session',
          confidentiality: 'team'
        },
        {
          primaryObjectives: scheduled.agenda,
          specificIssues: [],
          expectedOutcomes: [],
          successMetrics: []
        },
        {},
        {
          priority: 'medium'
        }
      );

      // Update scheduled session
      scheduled.status = 'in_progress';
      scheduled.sessionId = session.id;
      scheduled.updatedAt = new Date();
      this.scheduledSessions.set(scheduledId, scheduled);

      // Handle recurrence
      if (scheduled.recurrence) {
        this.scheduleNextRecurrence(scheduled);
      }
    } catch (err) {
      logger.error('[CounselingScheduler] Failed to initiate scheduled session', err as Error);
      scheduled.status = 'missed';
      scheduled.updatedAt = new Date();
      this.scheduledSessions.set(scheduledId, scheduled);
    }
  }

  private mapTypeToProgram(type: string): any {
    const typeMap: Record<string, any> = {
      'performance_review': 'performance_improvement',
      'development': 'skill_development',
      'coordination': 'coordination_alignment',
      'crisis': 'crisis_intervention',
      'guidance': 'career_guidance',
      'escalation': 'crisis_intervention',
      'collaboration': 'coordination_alignment',
      'knowledge_sharing': 'skill_development',
    };
    return typeMap[type] || 'skill_development';
  }

  private scheduleNextRecurrence(scheduled: ScheduledCounselingSession): void {
    if (!scheduled.recurrence) return;

    const nextDate = this.calculateNextOccurrence(
      new Date(scheduled.scheduledAt),
      scheduled.recurrence.frequency
    );

    if (scheduled.recurrence.endDate && nextDate > scheduled.recurrence.endDate) {
      return;
    }

    this.scheduleSession({
      agentId: scheduled.sourceAgentId,
      scheduledAt: nextDate,
      duration: scheduled.duration,
      targetAgentId: scheduled.targetAgentId,
      counselingMode: scheduled.counselingMode,
      counselingType: scheduled.counselingType,
      topic: scheduled.topic,
      agenda: scheduled.agenda,
      recurrence: scheduled.recurrence,
      reminderSettings: scheduled.reminderSettings,
    });
  }

  private calculateNextOccurrence(currentDate: Date, frequency: string): Date {
    const next = new Date(currentDate);
    switch (frequency) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'biweekly':
        next.setDate(next.getDate() + 14);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
    }
    return next;
  }

  private sendReminders(session: ScheduledCounselingSession): void {
    // Integration point: Connect with notification service
    logger.info(`[CounselingScheduler] Sending reminders for session ${session.id}`);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  async scheduleSession(params: {
    agentId: string;
    scheduledAt: Date;
    duration: number;
    targetAgentId: string;
    counselingMode: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
    counselingType: string;
    topic: string;
    agenda?: string[];
    recurrence?: ScheduledCounselingSession['recurrence'];
    reminderSettings?: Partial<ScheduledCounselingSession['reminderSettings']>;
  }): Promise<ScheduledCounselingSession> {
    const id = randomUUID();
    
    const session: ScheduledCounselingSession = {
      id,
      scheduledAt: params.scheduledAt,
      duration: params.duration,
      sourceAgentId: params.agentId,
      targetAgentId: params.targetAgentId,
      counselingMode: params.counselingMode,
      counselingType: params.counselingType,
      topic: params.topic,
      agenda: params.agenda || [],
      recurrence: params.recurrence,
      reminderSettings: {
        beforeMinutes: params.reminderSettings?.beforeMinutes || [15, 5],
        channels: params.reminderSettings?.channels || ['push', 'in_app'],
      },
      status: 'scheduled',
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.scheduledSessions.set(id, session);
    
    // Update agent's calendar
    this.addToCalendar(params.agentId, session);

    return session;
  }

  private addToCalendar(agentId: string, session: ScheduledCounselingSession): void {
    let calendar = this.schedules.get(agentId);
    if (!calendar) {
      calendar = this.createDefaultCalendar(agentId);
    }
    calendar.scheduledSessions.push(session);
    this.schedules.set(agentId, calendar);
  }

  private createDefaultCalendar(agentId: string): CounselingCalendar {
    return {
      agentId,
      scheduledSessions: [],
      availabilitySlots: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true },
      ],
      blockedDates: [],
      preferences: {
        defaultDuration: 30,
        bufferTime: 15,
        maxSessionsPerDay: 5,
        preferredCounselingModes: ['main_to_sub', 'peer_to_peer'],
      },
    };
  }

  getScheduledSessions(
    agentId: string,
    filters?: {
      status?: ScheduledCounselingSession['status'];
      fromDate?: Date;
      toDate?: Date;
    }
  ): ScheduledCounselingSession[] {
    const calendar = this.schedules.get(agentId);
    if (!calendar) return [];

    return calendar.scheduledSessions.filter(session => {
      if (filters?.status && session.status !== filters.status) return false;
      if (filters?.fromDate && new Date(session.scheduledAt) < filters.fromDate) return false;
      if (filters?.toDate && new Date(session.scheduledAt) > filters.toDate) return false;
      return true;
    }).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  getUpcomingSessions(agentId: string, limit: number = 10): ScheduledCounselingSession[] {
    const now = new Date();
    return this.getScheduledSessions(agentId, { status: 'scheduled' })
      .filter(s => new Date(s.scheduledAt) >= now)
      .slice(0, limit);
  }

  cancelScheduledSession(scheduledId: string, reason?: string): boolean {
    const session = this.scheduledSessions.get(scheduledId);
    if (!session) return false;

    session.status = 'cancelled';
    session.updatedAt = new Date();
    session.metadata.cancellationReason = reason;
    this.scheduledSessions.set(scheduledId, session);

    return true;
  }

  rescheduleSession(
    scheduledId: string,
    newDate: Date,
    reason?: string
  ): ScheduledCounselingSession | null {
    const session = this.scheduledSessions.get(scheduledId);
    if (!session) return null;

    session.scheduledAt = newDate;
    session.status = 'scheduled';
    session.updatedAt = new Date();
    session.metadata.rescheduledFrom = session.scheduledAt;
    session.metadata.rescheduleReason = reason;
    this.scheduledSessions.set(scheduledId, session);

    return session;
  }

  updateCalendarPreferences(
    agentId: string,
    preferences: Partial<CounselingCalendar['preferences']>
  ): CounselingCalendar {
    let calendar = this.schedules.get(agentId);
    if (!calendar) {
      calendar = this.createDefaultCalendar(agentId);
    }
    
    calendar.preferences = { ...calendar.preferences, ...preferences };
    this.schedules.set(agentId, calendar);
    
    return calendar;
  }

  getCalendar(agentId: string): CounselingCalendar {
    return this.schedules.get(agentId) || this.createDefaultCalendar(agentId);
  }

  checkAvailability(agentId: string, date: Date, duration: number): boolean {
    const calendar = this.getCalendar(agentId);
    const dayOfWeek = date.getDay();
    const timeStr = date.toTimeString().slice(0, 5);

    // Check if day is available
    const daySlot = calendar.availabilitySlots.find(s => s.dayOfWeek === dayOfWeek && s.isAvailable);
    if (!daySlot) return false;

    // Check if within available hours
    if (timeStr < daySlot.startTime || timeStr > daySlot.endTime) return false;

    // Check for conflicts
    const endTime = new Date(date.getTime() + duration * 60000);
    const conflicts = calendar.scheduledSessions.filter(s => {
      if (s.status !== 'scheduled') return false;
      const sessionStart = new Date(s.scheduledAt);
      const sessionEnd = new Date(sessionStart.getTime() + s.duration * 60000);
      return (date < sessionEnd && endTime > sessionStart);
    });

    // Check max sessions per day
    const sessionsToday = calendar.scheduledSessions.filter(s => {
      if (s.status !== 'scheduled') return false;
      const sessionDate = new Date(s.scheduledAt);
      return sessionDate.toDateString() === date.toDateString();
    });

    if (sessionsToday.length >= calendar.preferences.maxSessionsPerDay) {
      return false;
    }

    return conflicts.length === 0;
  }

  suggestAvailableSlots(
    agentId: string,
    targetAgentId: string,
    fromDate: Date,
    daysToCheck: number = 7
  ): { date: Date; duration: number }[] {
    const slots: { date: Date; duration: number }[] = [];
    const calendar = this.getCalendar(agentId);
    const targetCalendar = this.getCalendar(targetAgentId);

    for (let i = 0; i < daysToCheck; i++) {
      const checkDate = new Date(fromDate);
      checkDate.setDate(checkDate.getDate() + i);
      const dayOfWeek = checkDate.getDay();

      const daySlot = calendar.availabilitySlots.find(s => s.dayOfWeek === dayOfWeek && s.isAvailable);
      const targetDaySlot = targetCalendar.availabilitySlots.find(s => s.dayOfWeek === dayOfWeek && s.isAvailable);
      
      if (!daySlot || !targetDaySlot) continue;

      // Find overlapping hours
      const startHour = Math.max(
        parseInt(daySlot.startTime.split(':')[0]),
        parseInt(targetDaySlot.startTime.split(':')[0])
      );
      const endHour = Math.min(
        parseInt(daySlot.endTime.split(':')[0]),
        parseInt(targetDaySlot.endTime.split(':')[0])
      );

      for (let hour = startHour; hour < endHour; hour++) {
        const slotDate = new Date(checkDate);
        slotDate.setHours(hour, 0, 0, 0);
        
        if (this.checkAvailability(agentId, slotDate, calendar.preferences.defaultDuration) &&
            this.checkAvailability(targetAgentId, slotDate, targetCalendar.preferences.defaultDuration)) {
          slots.push({
            date: slotDate,
            duration: Math.min(calendar.preferences.defaultDuration, targetCalendar.preferences.defaultDuration),
          });
        }
      }
    }

    return slots.slice(0, 5); // Return top 5 suggestions
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.schedules.clear();
    this.scheduledSessions.clear();
  }
}

// Singleton instance
export const counselingScheduler = new CounselingSchedulerService();

// Convenience functions
export async function scheduleCounselingSession(params: Parameters<CounselingSchedulerService['scheduleSession']>[0]): Promise<ScheduledCounselingSession> {
  return counselingScheduler.scheduleSession(params);
}

export function getAgentCalendar(agentId: string): CounselingCalendar {
  return counselingScheduler.getCalendar(agentId);
}

export function getUpcomingCounselingSessions(agentId: string, limit?: number): ScheduledCounselingSession[] {
  return counselingScheduler.getUpcomingSessions(agentId, limit);
}

export function cancelCounselingSession(scheduledId: string, reason?: string): boolean {
  return counselingScheduler.cancelScheduledSession(scheduledId, reason);
}

export function rescheduleCounselingSession(
  scheduledId: string,
  newDate: Date,
  reason?: string
): ScheduledCounselingSession | null {
  return counselingScheduler.rescheduleSession(scheduledId, newDate, reason);
}

export function findAvailableCounselingSlots(
  agentId: string,
  targetAgentId: string,
  fromDate: Date,
  daysToCheck?: number
): { date: Date; duration: number }[] {
  return counselingScheduler.suggestAvailableSlots(agentId, targetAgentId, fromDate, daysToCheck);
}

export default counselingScheduler;
