import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import QRCode from 'qrcode';

interface WhatsAppConnection {
  sessionId: string;
  phoneNumber: string;
  qrCode: string;
  linkingCode: string;
  expiresAt: Date;
  status: 'pending' | 'verified' | 'failed';
  encryptionKey: string;
}

interface WhatsAppWebhookPayload {
  sessionId: string;
  verified: boolean;
  phoneNumber: string;
  businessAccountId: string;
  accessToken: string;
  expiresIn?: number;
}

export class WhatsAppService {
  private apiClient: AxiosInstance;
  private whatsappApiUrl: string;
  private businessAccountId: string;
  private accessToken: string;
  private sessions: Map<string, WhatsAppConnection> = new Map();
  private webhookUrl: string;

  constructor() {
    this.whatsappApiUrl = process.env.WHATSAPP_API_URL || 'https://graph.instagram.com/v18.0';
    this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.webhookUrl = process.env.WHATSAPP_WEBHOOK_URL || 'https://api.rork.app/webhooks/whatsapp';

    this.apiClient = axios.create({
      baseURL: this.whatsappApiUrl,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  /**
   * Generate QR code for WhatsApp login
   * In real implementation, this would use WhatsApp Cloud API or Twilio
   */
  async generateQRCode(userId: string, phoneNumber: string): Promise<WhatsAppConnection> {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const linkingCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const encryptionKey = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
      // Generate QR code data with session info
      const qrData = JSON.stringify({
        sessionId,
        linkingCode,
        userId,
        phoneNumber,
        timestamp: Date.now(),
        expiresAt: expiresAt.getTime(),
      });

      // Generate QR code image
      const qrCode = await QRCode.toDataURL(qrData);

      const connection: WhatsAppConnection = {
        sessionId,
        phoneNumber,
        qrCode,
        linkingCode,
        expiresAt,
        status: 'pending',
        encryptionKey,
      };

      // Store session for verification
      this.sessions.set(sessionId, connection);

      // Auto-cleanup after expiration
      setTimeout(() => {
        this.sessions.delete(sessionId);
      }, 5 * 60 * 1000);

      console.log(`[WhatsAppService] QR code generated for session ${sessionId}`);

      return connection;
    } catch (error) {
      console.error('[WhatsAppService] Failed to generate QR code:', error);
      throw new Error('Failed to generate WhatsApp QR code');
    }
  }

  /**
   * Verify QR code scan - real implementation would use webhooks
   */
  async verifyQRScan(sessionId: string, scannedData: any): Promise<boolean> {
    const session = this.sessions.get(sessionId);

    if (!session) {
      console.error(`[WhatsAppService] Session not found: ${sessionId}`);
      return false;
    }

    if (session.expiresAt < new Date()) {
      console.error(`[WhatsAppService] Session expired: ${sessionId}`);
      this.sessions.delete(sessionId);
      return false;
    }

    try {
      // Verify scanned data matches session
      const expectedCode = scannedData?.linkingCode || '';
      if (expectedCode === session.linkingCode) {
        session.status = 'verified';
        console.log(`[WhatsAppService] QR code verified for session ${sessionId}`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('[WhatsAppService] Failed to verify QR scan:', error);
      return false;
    }
  }

  /**
   * Get WhatsApp verified phone numbers for business account
   */
  async getVerifiedPhoneNumbers(): Promise<string[]> {
    try {
      const response = await this.apiClient.get(
        `/${this.businessAccountId}/phone_numbers`
      );

      return response.data.data?.map((phone: any) => phone.display_phone_number) || [];
    } catch (error) {
      console.error('[WhatsAppService] Failed to get verified phone numbers:', error);
      return [];
    }
  }

  /**
   * Send test message via WhatsApp to verify connection
   */
  async sendTestMessage(phoneNumber: string, message: string = 'Test connection successful!'): Promise<boolean> {
    try {
      const response = await this.apiClient.post(
        `/${this.businessAccountId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: phoneNumber.replace(/[^0-9]/g, ''),
          type: 'text',
          text: { body: message },
        }
      );

      console.log(`[WhatsAppService] Test message sent to ${phoneNumber}`);
      return !!response.data.messages?.[0]?.id;
    } catch (error) {
      console.error('[WhatsAppService] Failed to send test message:', error);
      return false;
    }
  }

  /**
   * Handle incoming webhook from WhatsApp
   */
  handleWebhook(payload: WhatsAppWebhookPayload): void {
    try {
      const session = this.sessions.get(payload.sessionId);

      if (!session) {
        console.warn(`[WhatsAppService] Webhook received for unknown session: ${payload.sessionId}`);
        return;
      }

      if (payload.verified) {
        session.status = 'verified';
        session.phoneNumber = payload.phoneNumber;
        console.log(`[WhatsAppService] Connection verified via webhook for ${payload.phoneNumber}`);
      } else {
        session.status = 'failed';
        console.log(`[WhatsAppService] Connection verification failed for session ${payload.sessionId}`);
      }
    } catch (error) {
      console.error('[WhatsAppService] Webhook processing error:', error);
    }
  }

  /**
   * Get session status
   */
  getSessionStatus(sessionId: string): WhatsAppConnection | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * Disconnect WhatsApp account
   */
  async disconnect(phoneNumber: string): Promise<boolean> {
    try {
      // In real implementation, this would revoke the connection from WhatsApp
      const sessionsToDelete = Array.from(this.sessions.entries())
        .filter(([, session]) => session.phoneNumber === phoneNumber)
        .map(([sessionId]) => sessionId);

      sessionsToDelete.forEach(sessionId => this.sessions.delete(sessionId));

      console.log(`[WhatsAppService] Disconnected WhatsApp account ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('[WhatsAppService] Failed to disconnect:', error);
      return false;
    }
  }

  /**
   * Get message history for a conversation
   */
  async getMessageHistory(phoneNumber: string, limit: number = 50): Promise<any[]> {
    try {
      // This would be implemented with actual WhatsApp API
      console.log(`[WhatsAppService] Fetching message history for ${phoneNumber}`);
      return [];
    } catch (error) {
      console.error('[WhatsAppService] Failed to get message history:', error);
      return [];
    }
  }
}

export const whatsappService = new WhatsAppService();
