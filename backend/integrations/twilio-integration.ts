/**
 * Twilio Integration Service
 * Handles SMS, voice calls, and WhatsApp via Twilio API
 */

import twilio, { Twilio } from 'twilio';

export interface TwilioSMS {
  sid: string;
  from: string;
  to: string;
  body: string;
  status: string;
  direction: string;
  dateSent: string;
}

export interface TwilioCall {
  sid: string;
  from: string;
  to: string;
  status: string;
  direction: string;
  duration: number | null;
  startTime: string;
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  voiceWebhookUrl?: string;
  statusCallbackUrl?: string;
  appName?: string;
}

export class TwilioIntegrationService {
  private client: Twilio | null = null;
  private config: TwilioConfig | null = null;
  private isInitialized = false;

  async initialize(config: TwilioConfig): Promise<void> {
    this.config = config;
    this.client = twilio(config.accountSid, config.authToken, {
      lazyLoading: true,
    });
    this.isInitialized = true;

    // Verify connection
    try {
      const account = await this.client.api.accounts(config.accountSid).fetch();
      console.log(`Twilio integration initialized for account: ${account.friendlyName}`);
    } catch (error) {
      console.error('Failed to initialize Twilio integration:', error);
      throw new Error('Twilio authentication failed');
    }
  }

  /** Send an SMS message */
  async sendSMS(to: string, body: string, options?: { from?: string; mediaUrl?: string[] }): Promise<{ sid: string; status: string }> {
    this.ensureInitialized();
    const message = await this.client!.messages.create({
      body,
      from: options?.from || this.config!.phoneNumber,
      to,
      mediaUrl: options?.mediaUrl,
    });
    return { sid: message.sid, status: message.status };
  }

  /** Send a bulk SMS to multiple recipients */
  async sendBulkSMS(recipients: string[], body: string, options?: { from?: string }): Promise<Array<{ to: string; sid: string; status: string; error?: string }>> {
    const results = await Promise.allSettled(
      recipients.map(to => this.sendSMS(to, body, options))
    );
    return recipients.map((to, i) => {
      const result = results[i];
      if (result.status === 'fulfilled') return { to, ...result.value };
      return { to, sid: '', status: 'failed', error: result.reason?.message };
    });
  }

  /** Initiate an outbound voice call */
  async makeCall(to: string, options?: { twiml?: string; from?: string; url?: string }): Promise<{ callSid: string; status: string }> {
    this.ensureInitialized();
    const call = await this.client!.calls.create({
      to,
      from: options?.from || this.config!.phoneNumber,
      url: options?.url || this.config!.voiceWebhookUrl || '',
      twiml: options?.twiml as any,
    });
    return { callSid: call.sid, status: call.status };
  }

  /** Look up a phone number */
  async lookupPhoneNumber(phoneNumber: string): Promise<{
    countryCode: string;
    carrier: { name: string; type: string };
    lineNumber: string;
  } | null> {
    this.ensureInitialized();
    try {
      const result = await this.client!.lookups.v2.phoneNumbers(phoneNumber).fetch({
        fields: ['carrier', 'line_type_intelligence'],
      });
      return {
        countryCode: result.countryCode || '',
        carrier: {
          name: (result as any).carrier?.name || 'Unknown',
          type: (result as any).carrier?.type || 'Unknown',
        },
        lineNumber: (result as any).lineTypeIntelligence?.type || 'unknown',
      };
    } catch {
      return null;
    }
  }

  /** Generate TwiML for a simple text-to-speech response */
  generateTwiML(message: string, options?: { voice?: 'alice' | 'man' | 'woman'; language?: string; gather?: boolean }): string {
    const voiceAttr = options?.voice ? ` voice="${options.voice}"` : '';
    const langAttr = options?.language ? ` language="${options.language}"` : '';
    let twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say${voiceAttr}${langAttr}>${message}</Say>`;

    if (options?.gather) {
      twiml += `<Gather numDigits="1" action="/api/twilio/gather" method="POST"><Say${voiceAttr}>Press 1 to repeat, 2 to end.</Say></Gather>`;
    }
    twiml += '</Response>';
    return twiml;
  }

  /** Fetch message details by SID */
  async getMessage(sid: string): Promise<TwilioSMS | null> {
    this.ensureInitialized();
    try {
      const message = await this.client!.messages(sid).fetch();
      return {
        sid: message.sid,
        from: message.from,
        to: message.to,
        body: message.body,
        status: message.status,
        direction: message.direction,
        dateSent: message.dateSent?.toISOString() || '',
      };
    } catch {
      return null;
    }
  }

  /** Validate a Twilio webhook signature */
  validateWebhookSignature(url: string, params: Record<string, string>, signature: string): boolean {
    if (!this.config) return false;
    return twilio.validateRequest(signature, url, params, this.config.authToken);
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.client || !this.config) {
      throw new Error('Twilio integration not initialized');
    }
  }
}
