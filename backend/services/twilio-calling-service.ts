import twilio from 'twilio';
import { EventEmitter } from 'events';
import { db as pgDb } from '../db/connection';
import { callLogs , platformConnections } from '../db/drizzle-schema';

import { and, desc, eq, sql } from 'drizzle-orm';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface CallSession {
  id: string;
  sid?: string;
  phoneNumber: string;
  customerName: string;
  status: 'initiated' | 'ringing' | 'in-progress' | 'completed' | 'failed' | 'canceled';
  direction: 'inbound' | 'outbound';
  startTime?: Date;
  endTime?: Date;
  duration: number;
  channel: 'voice' | 'whatsapp' | 'sms';
  recordingEnabled: boolean;
  recordingUrl?: string;
  transcriptionEnabled: boolean;
  transcriptionUrl?: string;
  agentId?: string;
  aiProcessing: boolean;
  metadata?: Record<string, any>;
}

export interface CallMetrics {
  totalCalls: number;
  activeCalls: number;
  completedCalls: number;
  failedCalls: number;
  avgDuration: number;
  successRate: number;
  totalMinutes: number;
}

export class TwilioCallingService extends EventEmitter {
  private client: twilio.Twilio;
  private accountSid: string;
  private authToken: string;
  private twilioPhoneNumber: string;
  private voiceUrl: string;
  private statusCallbackUrl: string;

  private inboundOrgByToNumber: Record<string, string> | null = null;

  private activeCalls: Map<string, CallSession> = new Map();
  private callHistory: CallSession[] = [];
  private metrics: CallMetrics = {
    totalCalls: 0,
    activeCalls: 0,
    completedCalls: 0,
    failedCalls: 0,
    avgDuration: 0,
    successRate: 0,
    totalMinutes: 0,
  };

  constructor() {
    super();
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || '';
    this.authToken = process.env.TWILIO_AUTH_TOKEN || '';
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '';
    this.voiceUrl = process.env.TWILIO_VOICE_WEBHOOK_URL || 'https://api.rork.app/webhooks/twilio/voice';
    this.statusCallbackUrl = process.env.TWILIO_STATUS_CALLBACK_URL || 'https://api.rork.app/webhooks/twilio/status';

    const looksConfigured =
      Boolean(this.accountSid) &&
      Boolean(this.authToken) &&
      String(this.accountSid).startsWith('AC');

    if (process.env.NODE_ENV === 'production' && !looksConfigured) {
      throw new Error('CRITICAL: Twilio credentials missing in production. Twilio service initialization aborted.');
    }

    if (!looksConfigured) {
      logger.warn('[TwilioCallingService] Twilio credentials not configured. Running in mock mode.');
    }

    if (looksConfigured) {
      this.client = twilio(this.accountSid, this.authToken);
      logger.info(`initialized`);
    } else {
      this.client = null as any;
    }
  }

  private async findCallLogBySid(callSid: string): Promise<any | null> {
    try {
      const [row] = await pgDb
        .select()
        .from(callLogs)
        .where(sql`${callLogs.metadata}->>'twilioSid' = ${callSid}`)
        .orderBy(desc(callLogs.createdAt))
        .limit(1);

      return row || null;
    } catch {
      return null;
    }
  }

  private async findCallSessionBySid(callSid: string): Promise<CallSession | null> {
    for (const session of this.activeCalls.values()) {
      if (session.sid === callSid) return session;
    }
    return null;
  }

  private buildSummaryFromTranscription(transcriptionText: string): string {
    const trimmed = transcriptionText.trim();
    if (!trimmed) return '';
    const maxLen = 600;
    if (trimmed.length <= maxLen) return trimmed;
    return `${trimmed.slice(0, maxLen)}...`;
  }

  private computeCallQuality(params: {
    durationSeconds: number;
    hasRecording: boolean;
    hasTranscription: boolean;
    hasSummary: boolean;
    status?: string;
  }): { score: number; signals: Record<string, any> } {
    const durationSeconds = Number.isFinite(params.durationSeconds) ? Math.max(0, params.durationSeconds) : 0;

    let score = 50;

    if (params.status === 'failed' || params.status === 'canceled') {
      score -= 30;
    }

    if (durationSeconds >= 120) score += 30;
    else if (durationSeconds >= 60) score += 20;
    else if (durationSeconds >= 20) score += 10;
    else score -= 10;

    if (params.hasRecording) score += 15;
    if (params.hasTranscription) score += 15;
    if (params.hasSummary) score += 10;

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      signals: {
        durationSeconds,
        hasRecording: params.hasRecording,
        hasTranscription: params.hasTranscription,
        hasSummary: params.hasSummary,
        status: params.status,
      },
    };
  }

  async recordIvrSelection(params: {
    callSid: string;
    selection: string;
    routeType: 'sales' | 'support' | 'operator' | 'unknown';
    dialTo?: string;
  }): Promise<void> {
    const callSid = params.callSid;
    if (!callSid) return;

    const callSession = (await this.findCallSessionBySid(callSid)) || null;
    const row = await this.findCallLogBySid(callSid);

    const nextMeta = {
      ...((callSession?.metadata as any) || {}),
      ...(((row as any)?.metadata as any) || {}),
      ivr: {
        selection: params.selection,
        routeType: params.routeType,
        dialTo: params.dialTo,
        selectedAt: Date.now(),
      },
    };

    if (callSession) {
      callSession.metadata = nextMeta;
      this.activeCalls.set(callSession.id, callSession);
      await this.upsertCallLog(callSession);
      return;
    }

    if ((row as any)?.id) {
      try {
        await pgDb
          .update(callLogs)
          .set({ metadata: nextMeta } as any)
          .where(eq(callLogs.id, (row as any).id as any));
      } catch (e: any) {
        logger.warn('[TwilioCallingService] Failed to persist IVR selection:', e);
      }
    }
  }

  async handleTranscriptionWebhook(payload: any): Promise<void> {
    try {
      const callSid = payload?.CallSid;
      const transcriptionText =
        payload?.TranscriptionText ||
        payload?.transcriptionText ||
        payload?.TranscriptText ||
        payload?.transcript ||
        payload?.Body;

      const status = payload?.TranscriptionStatus || payload?.status;

      if (!callSid || typeof callSid !== 'string') {
        logger.warn('[TwilioCallingService] Transcription webhook missing CallSid');
        return;
      }

      if (!transcriptionText || typeof transcriptionText !== 'string') {
        logger.warn('[TwilioCallingService] Transcription webhook missing TranscriptionText');
        return;
      }

      const callSession = (await this.findCallSessionBySid(callSid)) || null;
      const row = await this.findCallLogBySid(callSid);

      const organizationId =
        callSession?.metadata?.organizationId ||
        (row as any)?.organizationId ||
        (row as any)?.metadata?.organizationId;

      const callId = callSession?.id || String((row as any)?.metadata?.callId || `call-${callSid}`);

      if (row?.id) {
        const existing = typeof (row as any)?.transcription === 'string' ? (row as any).transcription : '';
        const next = existing ? `${existing}\n${transcriptionText}` : transcriptionText;

        const existingSummary = typeof (row as any)?.summary === 'string' ? (row as any).summary : '';
        const nextSummary = existingSummary ? existingSummary : this.buildSummaryFromTranscription(next);

        const existingMetadata = ((row as any)?.metadata && typeof (row as any).metadata === 'object') ? (row as any).metadata : {};
        const quality = this.computeCallQuality({
          durationSeconds: Number((row as any)?.duration || 0),
          hasRecording: Boolean((row as any)?.recordingUrl),
          hasTranscription: Boolean(next && next.trim().length > 0),
          hasSummary: Boolean(nextSummary && nextSummary.trim().length > 0),
          status: String((row as any)?.status || ''),
        });
        const nextMetadata = {
          ...existingMetadata,
          quality: {
            score: quality.score,
            ...quality.signals,
            computedAt: Date.now(),
            source: 'transcription_webhook',
          },
        };

        await pgDb
          .update(callLogs)
          .set({ transcription: next, summary: nextSummary || null, metadata: nextMetadata } as any)
          .where(eq(callLogs.id, row.id as any));
      }

      if (callSession) {
        callSession.metadata = {
          ...(callSession.metadata || {}),
          latestTranscriptionText: transcriptionText,
          latestTranscriptionStatus: status,
          latestTranscriptionAt: Date.now(),
        };
        this.activeCalls.set(callSession.id, callSession);
      }

      this.emit('call:transcription', {
        organizationId,
        callId,
        callSid,
        status,
        transcriptionText,
        call: callSession,
        receivedAt: Date.now(),
      });
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to handle transcription webhook:', error);
    }
  }

  private normalizePhone(input: unknown): string | undefined {
    if (typeof input !== 'string') return undefined;
    const trimmed = input.trim();
    if (!trimmed) return undefined;
    return trimmed.replace(/[\s\-().]/g, '');
  }

  private getInboundOrgMap(): Record<string, string> {
    if (this.inboundOrgByToNumber) return this.inboundOrgByToNumber;

    const raw = process.env.TWILIO_INBOUND_NUMBER_MAP;
    if (!raw) {
      this.inboundOrgByToNumber = {};
      return this.inboundOrgByToNumber;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') {
        this.inboundOrgByToNumber = {};
        return this.inboundOrgByToNumber;
      }

      const map: Record<string, string> = {};
      for (const [k, v] of Object.entries(parsed as any)) {
        const key = this.normalizePhone(k);
        const val = typeof v === 'string' ? v : undefined;
        if (key && val) map[key] = val;
      }
      this.inboundOrgByToNumber = map;
      return map;
    } catch {
      this.inboundOrgByToNumber = {};
      return this.inboundOrgByToNumber;
    }
  }

  private async resolveInboundOrganizationId(to: unknown): Promise<string | undefined> {
    const normalizedTo = this.normalizePhone(to);
    if (!normalizedTo) return process.env.TWILIO_INBOUND_ORGANIZATION_ID;

    const envMap = this.getInboundOrgMap();
    const fromEnv = envMap[normalizedTo];
    if (fromEnv) return fromEnv;

    try {
      const rows = await pgDb
        .select({ organizationId: platformConnections.organizationId, metadata: platformConnections.metadata })
        .from(platformConnections)
        .where(and(eq(platformConnections.platform, 'twilio' as any), eq(platformConnections.isActive, true)));

      for (const row of rows as any[]) {
        const meta = row?.metadata || {};
        const candidates: unknown[] = [
          meta?.twilioPhoneNumber,
          meta?.phoneNumber,
          meta?.inboundPhoneNumber,
          meta?.toNumber,
          meta?.to,
        ];
        for (const c of candidates) {
          const norm = this.normalizePhone(c);
          if (norm && norm === normalizedTo) {
            return String(row.organizationId);
          }
        }

        const list = Array.isArray(meta?.phoneNumbers) ? meta.phoneNumbers : undefined;
        if (list) {
          for (const n of list) {
            const norm = this.normalizePhone(n);
            if (norm && norm === normalizedTo) {
              return String(row.organizationId);
            }
          }
        }
      }
    } catch (e) {
      logger.warn('[TwilioCallingService] Failed to resolve inbound org from DB:', e);
    }

    return process.env.TWILIO_INBOUND_ORGANIZATION_ID;
  }

  async handleVoiceWebhook(payload: any): Promise<CallSession | null> {
    try {
      const callSid = payload?.CallSid;
      const from = payload?.From;
      const to = payload?.To;

      if (!callSid || typeof callSid !== 'string') {
        logger.warn('[TwilioCallingService] Voice webhook missing CallSid');
        return null;
      }

      const callId = `call-${callSid}`;
      const existing = this.activeCalls.get(callId);
      if (existing) {
        return existing;
      }

      const organizationId = await this.resolveInboundOrganizationId(to);
      if (!organizationId) {
        logger.warn('[TwilioCallingService] Inbound voice webhook missing organizationId (no routing match)');
        return null;
      }

      const callSession: CallSession = {
        id: callId,
        sid: callSid,
        phoneNumber: typeof from === 'string' ? from : '',
        customerName: typeof from === 'string' ? from : 'Caller',
        status: 'ringing',
        direction: 'inbound',
        startTime: new Date(),
        duration: 0,
        channel: 'voice',
        recordingEnabled: true,
        transcriptionEnabled: true,
        aiProcessing: true,
        metadata: {
          organizationId,
          twilioTo: to,
          twilioFrom: from,
          callSid,
        },
      };

      this.activeCalls.set(callId, callSession);
      this.callHistory.push(callSession);
      this.metrics.totalCalls++;
      this.metrics.activeCalls++;

      this.emit('call:initiated', callSession);
      this.emit('call:inbound', callSession);

      await this.upsertCallLog(callSession);
      return callSession;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to handle voice webhook:', error);
      return null;
    }
  }

  private async upsertCallLog(callSession: CallSession): Promise<void> {
    const organizationId = callSession.metadata?.organizationId;
    if (!organizationId) return;

    const userId = callSession.metadata?.userId;
    const callId = callSession.id;

    try {
      const whereClause = and(
        eq(callLogs.organizationId, organizationId as any),
        sql`${callLogs.metadata}->>'callId' = ${callId}`
      );

      const [existing] = await pgDb
        .select()
        .from(callLogs)
        .where(whereClause)
        .orderBy(desc(callLogs.createdAt))
        .limit(1);

      const metadata = {
        ...(callSession.metadata || {}),
        callId: callSession.id,
        twilioSid: callSession.sid,
        agentId: callSession.agentId,
        channel: callSession.channel,
      };

      const quality = this.computeCallQuality({
        durationSeconds: Number(callSession.duration || existing?.duration || 0),
        hasRecording: Boolean(callSession.recordingUrl || (existing as any)?.recordingUrl),
        hasTranscription: Boolean((existing as any)?.transcription || (callSession.metadata as any)?.latestTranscriptionText),
        hasSummary: Boolean((existing as any)?.summary),
        status: callSession.status,
      });
      (metadata as any).quality = {
        score: quality.score,
        ...quality.signals,
        computedAt: Date.now(),
        source: 'upsert',
      };

      const baseValues = {
        direction: callSession.direction,
        phoneNumber: callSession.phoneNumber,
        duration: callSession.duration,
        status: callSession.status,
        recordingUrl: callSession.recordingUrl || null,
        startedAt: callSession.startTime || new Date(),
        endedAt: callSession.endTime || null,
        metadata,
      };

      if (existing?.id) {
        await pgDb
          .update(callLogs)
          .set({
            ...baseValues,
          } as any)
          .where(eq(callLogs.id, existing.id as any));
      } else {
        await pgDb.insert(callLogs).values({
          organizationId: organizationId as any,
          userId: userId || null,
          direction: callSession.direction,
          phoneNumber: callSession.phoneNumber,
          duration: callSession.duration,
          status: callSession.status,
          recordingUrl: callSession.recordingUrl || null,
          transcription: null,
          summary: null,
          sentiment: null,
          tags: [],
          metadata,
          startedAt: callSession.startTime || new Date(),
          endedAt: callSession.endTime || null,
        } as any);
      }
    } catch (e) {
      logger.warn('[TwilioCallingService] Failed to persist call log:', e);
    }
  }

  /**
   * Initiate outbound call
   */
  async initiateCall(
    phoneNumber: string,
    customerName: string,
    options?: {
      agentId?: string;
      recordingEnabled?: boolean;
      transcriptionEnabled?: boolean;
      aiProcessing?: boolean;
      metadata?: Record<string, any>;
    }
  ): Promise<CallSession | null> {
    try {
      const callId = `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Format phone number for Twilio
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      // Create call session
      const callSession: CallSession = {
        id: callId,
        phoneNumber: formattedPhone,
        customerName,
        status: 'initiated',
        direction: 'outbound',
        duration: 0,
        channel: 'voice',
        recordingEnabled: options?.recordingEnabled ?? true,
        transcriptionEnabled: options?.transcriptionEnabled ?? true,
        aiProcessing: options?.aiProcessing ?? true,
        ...(options?.agentId ? { agentId: options.agentId } : {}),
        ...(options?.metadata ? { metadata: options.metadata } : {}),
      };

      // Make the call using Twilio
      const call = await this.client.calls.create({
        to: formattedPhone,
        from: this.twilioPhoneNumber,
        url: this.voiceUrl,
        statusCallback: this.statusCallbackUrl,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        record: options?.recordingEnabled ? true : false,
        // Store metadata
        asyncAmd: 'true',
      });

      callSession.sid = call.sid;
      callSession.status = 'ringing';
      callSession.startTime = new Date();

      // Store call session
      this.activeCalls.set(callId, callSession);
      this.callHistory.push(callSession);
      this.metrics.totalCalls++;
      this.metrics.activeCalls++;

      logger.info(`Outbound call initiated: ${callId} to ${formattedPhone}`);
      this.emit('call:initiated', callSession);

      await this.upsertCallLog(callSession);

      return callSession;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to initiate call:', error);
      return null;
    }
  }

  /**
   * End a call
   */
  async endCall(callId: string): Promise<boolean> {
    try {
      const callSession = this.activeCalls.get(callId);

      if (!callSession || !callSession.sid) {
        logger.warn(`Call not found: ${callId}`);
        return false;
      }

      // Update call in Twilio
      await this.client.calls(callSession.sid).update({ status: 'completed' });

      // Update session
      callSession.status = 'completed';
      callSession.endTime = new Date();
      callSession.duration = callSession.startTime
        ? Math.floor((callSession.endTime.getTime() - callSession.startTime.getTime()) / 1000)
        : 0;

      this.metrics.activeCalls--;
      this.metrics.completedCalls++;
      this.metrics.totalMinutes += callSession.duration / 60;

      logger.info(`Call ended: ${callId} (${callSession.duration}s)`);
      this.emit('call:ended', callSession);

      await this.upsertCallLog(callSession);

      // Remove from active calls after a delay
      setTimeout(() => {
        this.activeCalls.delete(callId);
      }, 5000);

      return true;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to end call:', error);
      return false;
    }
  }

  /**
   * Reject a call
   */
  async rejectCall(callId: string): Promise<boolean> {
    try {
      const callSession = this.activeCalls.get(callId);

      if (!callSession || !callSession.sid) {
        return false;
      }

      await this.client.calls(callSession.sid).update({ status: 'canceled' });

      callSession.status = 'canceled';
      this.metrics.activeCalls--;

      this.emit('call:rejected', callSession);
      this.activeCalls.delete(callId);

      return true;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to reject call:', error);
      return false;
    }
  }

  /**
   * Update call recording status
   */
  async updateRecordingStatus(callId: string, enabled: boolean): Promise<boolean> {
    try {
      const callSession = this.activeCalls.get(callId);

      if (!callSession || !callSession.sid) {
        return false;
      }

      if (enabled) {
        // Start recording
        // Note: Twilio handles this at call creation, but can be managed via API
        logger.info(`Recording enabled for call ${callId}`);
      } else {
        logger.info(`Recording disabled for call ${callId}`);
      }

      callSession.recordingEnabled = enabled;
      return true;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to update recording status:', error);
      return false;
    }
  }

  /**
   * Get call recording URL
   */
  async getRecordingUrl(callSid: string): Promise<string | null> {
    try {
      const recordings = await this.client.calls(callSid).recordings.list({ limit: 1 });

      const recording = recordings[0];
      if (recording) {
        const recordingUri = recording.uri;
        return `https://api.twilio.com${recordingUri}`;
      }

      return null;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to get recording URL:', error);
      return null;
    }
  }

  /**
   * Get call transcription
   */
  async getTranscription(callSid: string): Promise<string | null> {
    try {
      // Note: Transcription is typically retrieved via webhook or polling
      // Direct transcription access through call context is not available in Twilio SDK
      // Instead, use recordingUrl and process externally, or use recordings.transcriptions
      const recordings = await this.client.recordings.list({ callSid, limit: 1 });
      const recording = recordings[0];

      if (recording) {
        // Transcriptions are associated with recordings, not calls directly
        // Check if transcription is available
        // Transcription must be fetched separately from the recording object
        // The transcriptions property is a function that returns a TranscriptionListInstance
        try {
          const transcriptionList = recording.transcriptions();
          const transcriptions = await transcriptionList.list({ limit: 1 });
          const transcription = transcriptions[0];
          if (transcription) {
            return transcription.transcriptionText || '';
          }
        } catch (e: any) {
          // Transcription not available yet or not enabled
          logger.info(`Transcription not available for recording`);
        }
        
        return null;
      }

      return null;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to get transcription:', error);
      return null;
    }
  }

  /**
   * Transfer call to another number
   */
  async transferCall(callId: string, toPhoneNumber: string): Promise<boolean> {
    try {
      const callSession = this.activeCalls.get(callId);

      if (!callSession || !callSession.sid) {
        return false;
      }

      const formattedPhone = this.formatPhoneNumber(toPhoneNumber);

      // Update call with transfer (Twilio handles this via TwiML)
      await this.client.calls(callSession.sid).update({
        url: this.voiceUrl, // This would be updated with TwiML for transfer
      });

      logger.info(`Call transferred: ${callId} to ${formattedPhone}`);
      this.emit('call:transferred', { callId, toNumber: formattedPhone });

      return true;
    } catch (error) {
      logger.error('[TwilioCallingService] Failed to transfer call:', error);
      return false;
    }
  }

  /**
   * Get active call details
   */
  getCallSession(callId: string): CallSession | null {
    return this.activeCalls.get(callId) || null;
  }

  /**
   * Get all active calls
   */
  getActiveCalls(): CallSession[] {
    return Array.from(this.activeCalls.values());
  }

  /**
   * Get call metrics
   */
  getMetrics(): CallMetrics {
    const completedCalls = this.callHistory.filter(c => c.status === 'completed');
    const failedCalls = this.callHistory.filter(c => c.status === 'failed');

    const avgDuration = completedCalls.length > 0
      ? completedCalls.reduce((sum, call) => sum + call.duration, 0) / completedCalls.length
      : 0;

    const successRate = this.metrics.totalCalls > 0
      ? (this.metrics.completedCalls / this.metrics.totalCalls) * 100
      : 0;

    return {
      ...this.metrics,
      activeCalls: this.activeCalls.size,
      avgDuration: Math.round(avgDuration),
      successRate: Math.round(successRate * 100) / 100,
    };
  }

  /**
   * Get call history
   */
  getCallHistory(limit: number = 50): CallSession[] {
    return this.callHistory.slice(-limit);
  }

  /**
   * Handle webhook from Twilio
   */
  async handleWebhook(payload: any): Promise<void> {
    try {
      const callSid = payload.CallSid;
      const callStatus = payload.CallStatus;
      const recordingUrl = payload.RecordingUrl || payload.RecordingUrl0;

      if (!callSid) {
        logger.warn('[TwilioCallingService] Webhook missing CallSid');
        return;
      }

      // Find call session by SID
      let callSession: CallSession | null = null;
      for (const session of this.activeCalls.values()) {
        if (session.sid === callSid) {
          callSession = session;
          break;
        }
      }

      if (!callSession) {
        // Try restoring from database (covers server restarts)
        try {
          const [row] = await pgDb
            .select()
            .from(callLogs)
            .where(sql`${callLogs.metadata}->>'twilioSid' = ${callSid}`)
            .orderBy(desc(callLogs.createdAt))
            .limit(1);

          if (row) {
            const meta = (row as any).metadata || {};

            const restoredSession: CallSession = {
              id: String(meta.callId || `call-${callSid}`),
              sid: callSid,
              phoneNumber: String((row as any).phoneNumber || ''),
              customerName: String(meta.customerName || 'Customer'),
              status: ((row as any).status || 'ringing') as any,
              direction: ((row as any).direction || 'inbound') as any,
              duration: Number((row as any).duration || 0),
              channel: (meta.channel || 'voice') as any,
              recordingEnabled: true,
              transcriptionEnabled: true,
              aiProcessing: Boolean(meta.aiProcessing ?? true),
              ...((row as any).startedAt ? { startTime: new Date((row as any).startedAt) } : {}),
              ...((row as any).endedAt ? { endTime: new Date((row as any).endedAt) } : {}),
              ...(meta.agentId ? { agentId: String(meta.agentId) } : {}),
              ...((row as any).recordingUrl ? { recordingUrl: String((row as any).recordingUrl) } : {}),
              metadata: {
                ...(meta || {}),
                organizationId: (row as any).organizationId,
                userId: (row as any).userId,
              },
            };

            callSession = restoredSession;
            this.activeCalls.set(restoredSession.id, restoredSession);
          }
        } catch (e) {
          logger.warn('[TwilioCallingService] Failed to restore call session from DB:', e);
        }

        if (!callSession) {
          logger.warn(`Webhook received for unknown call: ${callSid}`);
          return;
        }
      }

      // Update call status based on webhook
      switch (callStatus) {
        case 'ringing':
          if (callSession.status !== 'ringing') {
            callSession.status = 'ringing';
            this.emit('call:ringing', callSession);
            await this.upsertCallLog(callSession);
          }
          break;
        case 'in-progress':
          if (callSession.status !== 'in-progress') {
            callSession.status = 'in-progress';
            callSession.startTime = new Date();
            this.emit('call:answered', callSession);
            await this.upsertCallLog(callSession);
          }
          break;
        case 'completed':
          if (callSession.status !== 'completed') {
            callSession.status = 'completed';
            callSession.endTime = new Date();
            if (callSession.startTime && callSession.endTime) {
              callSession.duration = Math.floor((callSession.endTime.getTime() - callSession.startTime.getTime()) / 1000);
            }
            this.metrics.activeCalls = Math.max(0, this.metrics.activeCalls - 1);
            this.metrics.completedCalls++;
            this.emit('call:completed', callSession);
            await this.upsertCallLog(callSession);
          }
          break;
        case 'failed':
          if (callSession.status !== 'failed') {
            callSession.status = 'failed';
            callSession.endTime = new Date();
            this.metrics.activeCalls = Math.max(0, this.metrics.activeCalls - 1);
            this.metrics.failedCalls++;
            this.emit('call:failed', callSession);
            await this.upsertCallLog(callSession);
          }
          break;
      }

      if (recordingUrl && typeof recordingUrl === 'string') {
        callSession.recordingUrl = recordingUrl;
      }

      await this.upsertCallLog(callSession);

      logger.info(`Call status updated: ${callSid} -> ${callStatus}`);
    } catch (error) {
      logger.error('[TwilioCallingService] Webhook processing error:', error);
    }
  }

  // Private helper methods

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Add country code if missing
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }

    if (cleaned.length > 0) {
      return `+${cleaned}`;
    }

    return phone;
  }
}

export const twilioCallingService = new TwilioCallingService();
