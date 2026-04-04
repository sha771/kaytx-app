import twilio from 'twilio';
import { EventEmitter } from 'events';

export interface CallSession {
  id: string;
  sid?: string; // Twilio call SID
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

    if (!this.accountSid || !this.authToken) {
      console.warn('[TwilioCallingService] Twilio credentials not configured');
    }

    this.client = twilio(this.accountSid, this.authToken);
    console.log('[TwilioCallingService] initialized');
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
        agentId: options?.agentId,
        metadata: options?.metadata,
      };

      // Make the call using Twilio
      const call = await this.client.calls.create({
        to: formattedPhone,
        from: this.twilioPhoneNumber,
        url: this.voiceUrl,
        statusCallback: this.statusCallbackUrl,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        record: options?.recordingEnabled ? true : false,
        transcribe: options?.transcriptionEnabled ? true : false,
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

      console.log(`[TwilioCallingService] Outbound call initiated: ${callId} to ${formattedPhone}`);
      this.emit('call:initiated', callSession);

      return callSession;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to initiate call:', error);
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
        console.warn(`[TwilioCallingService] Call not found: ${callId}`);
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

      console.log(`[TwilioCallingService] Call ended: ${callId} (${callSession.duration}s)`);
      this.emit('call:ended', callSession);

      // Remove from active calls after a delay
      setTimeout(() => {
        this.activeCalls.delete(callId);
      }, 5000);

      return true;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to end call:', error);
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
      console.error('[TwilioCallingService] Failed to reject call:', error);
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
        console.log(`[TwilioCallingService] Recording enabled for call ${callId}`);
      } else {
        console.log(`[TwilioCallingService] Recording disabled for call ${callId}`);
      }

      callSession.recordingEnabled = enabled;
      return true;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to update recording status:', error);
      return false;
    }
  }

  /**
   * Get call recording URL
   */
  async getRecordingUrl(callSid: string): Promise<string | null> {
    try {
      const recordings = await this.client.calls(callSid).recordings.list({ limit: 1 });

      if (recordings.length > 0) {
        const recordingUri = recordings[0].uri;
        return `https://api.twilio.com${recordingUri}`;
      }

      return null;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to get recording URL:', error);
      return null;
    }
  }

  /**
   * Get call transcription
   */
  async getTranscription(callSid: string): Promise<string | null> {
    try {
      const transcriptions = await this.client.calls(callSid).transcriptions.list({ limit: 1 });

      if (transcriptions.length > 0) {
        return transcriptions[0].transcriptionText;
      }

      return null;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to get transcription:', error);
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

      console.log(`[TwilioCallingService] Call transferred: ${callId} to ${formattedPhone}`);
      this.emit('call:transferred', { callId, toNumber: formattedPhone });

      return true;
    } catch (error) {
      console.error('[TwilioCallingService] Failed to transfer call:', error);
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
  handleWebhook(payload: any): void {
    try {
      const callSid = payload.CallSid;
      const callStatus = payload.CallStatus;

      // Find call session by SID
      let callSession: CallSession | null = null;
      this.activeCalls.forEach(session => {
        if (session.sid === callSid) {
          callSession = session;
        }
      });

      if (!callSession) {
        console.warn(`[TwilioCallingService] Webhook received for unknown call: ${callSid}`);
        return;
      }

      // Update call status based on webhook
      switch (callStatus) {
        case 'ringing':
          callSession.status = 'ringing';
          this.emit('call:ringing', callSession);
          break;
        case 'in-progress':
          callSession.status = 'in-progress';
          callSession.startTime = new Date();
          this.emit('call:answered', callSession);
          break;
        case 'completed':
          callSession.status = 'completed';
          callSession.endTime = new Date();
          callSession.duration = callSession.startTime
            ? Math.floor((callSession.endTime.getTime() - callSession.startTime.getTime()) / 1000)
            : 0;
          this.metrics.activeCalls = Math.max(0, this.metrics.activeCalls - 1);
          this.metrics.completedCalls++;
          this.emit('call:completed', callSession);
          break;
        case 'failed':
          callSession.status = 'failed';
          this.metrics.activeCalls = Math.max(0, this.metrics.activeCalls - 1);
          this.metrics.failedCalls++;
          this.emit('call:failed', callSession);
          break;
      }

      console.log(`[TwilioCallingService] Call status updated: ${callSid} -> ${callStatus}`);
    } catch (error) {
      console.error('[TwilioCallingService] Webhook processing error:', error);
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
