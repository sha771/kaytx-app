/**
 * Signal Messaging Integration Service
 * Handles Signal messaging via the signal-cli or Signal HTTP relay bridge.
 *
 * NOTE: Signal does not have an official public API. This integration uses
 * signal-cli (https://github.com/AsamK/signal-cli) as a bridge, which must
 * be running alongside the backend. Configure SIGNAL_CLI_URL to point at it.
 */

export interface SignalMessage {
  source: string;
  sourceNumber: string;
  sourceName?: string;
  sourceDevice: number;
  timestamp: number;
  text?: string;
  attachments?: SignalAttachment[];
  groupInfo?: {
    groupId: string;
    groupName?: string;
    members: string[];
  };
  isReceipt: boolean;
}

export interface SignalAttachment {
  contentType: string;
  filename?: string;
  size: number;
  id: string;
  storedFilename?: string;
}

export interface SignalGroup {
  id: string;
  name: string;
  members: string[];
  isMember: boolean;
  isBlocked: boolean;
}

export interface SignalConfig {
  phoneNumber: string;
  cliUrl: string; // e.g., http://localhost:7583
  cliApiToken?: string; // optional auth token for signal-cli REST API
}

export class SignalIntegrationService {
  private config: SignalConfig | null = null;
  private isInitialized = false;

  async initialize(config: SignalConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;

    // Verify signal-cli bridge is reachable
    try {
      const res = await fetch(`${config.cliUrl}/v1/about`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) throw new Error(`signal-cli returned ${res.status}`);
      console.log(`Signal integration initialized for: ${config.phoneNumber}`);
    } catch (error) {
      console.error('Failed to initialize Signal integration:', error);
      throw new Error('Signal CLI bridge is not reachable. Ensure signal-cli is running.');
    }
  }

  /** Send a text message */
  async sendMessage(recipient: string, text: string, options?: { groupId?: string }): Promise<{ timestamp: number }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = { message: text };
    if (options?.groupId) {
      body.groupId = options.groupId;
    } else {
      body.number = recipient;
    }

    const res = await fetch(`${this.config!.cliUrl}/v2/send`, {
      method: 'POST',
      headers: { ...this.getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Signal send failed: ${data.error || res.status}`);
    return { timestamp: data.timestamp };
  }

  /** Send a message with attachments */
  async sendAttachment(recipient: string, base64Content: string, filename: string, contentType: string, options?: { caption?: string; groupId?: string }): Promise<{ timestamp: number }> {
    this.ensureInitialized();
    const attachment = { contentType, filename, content: base64Content };
    const body: Record<string, unknown> = {
      message: options?.caption || '',
      base64_attachments: [attachment],
    };
    if (options?.groupId) {
      body.groupId = options.groupId;
    } else {
      body.number = recipient;
    }

    const res = await fetch(`${this.config!.cliUrl}/v2/send`, {
      method: 'POST',
      headers: { ...this.getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Signal attachment send failed: ${data.error || res.status}`);
    return { timestamp: data.timestamp };
  }

  /** Receive messages (poll-based, since Signal webhook requires signal-cli native mode) */
  async receiveMessages(timeout = 30): Promise<SignalMessage[]> {
    this.ensureInitialized();
    try {
      const res = await fetch(`${this.config!.cliUrl}/v1/receive?timeout=${timeout}`, {
        headers: this.getHeaders(),
      });
      const data = await res.json();
      return (data || []).map(this.parseMessage.bind(this));
    } catch (error) {
      return [];
    }
  }

  /** List all groups the account is part of */
  async listGroups(): Promise<SignalGroup[]> {
    this.ensureInitialized();
    const res = await fetch(`${this.config!.cliUrl}/v1/groups`, {
      headers: this.getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Signal list groups failed: ${data.error || res.status}`);
    return data.map((g: Record<string, unknown>) => ({
      id: g.id as string,
      name: (g.name as string) || 'Unnamed Group',
      members: (g.members as string[]) || [],
      isMember: g.is_member as boolean,
      isBlocked: g.blocked as boolean,
    }));
  }

  /** Create a new group */
  async createGroup(name: string, members: string[]): Promise<{ groupId: string }> {
    this.ensureInitialized();
    const res = await fetch(`${this.config!.cliUrl}/v1/groups`, {
      method: 'POST',
      headers: { ...this.getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, members }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Signal group creation failed: ${data.error || res.status}`);
    return { groupId: data.id };
  }

  /** Get account identity (phone number, name) */
  async getIdentity(number: string): Promise<{ name?: string; fingerprint: string; trustLevel: string }> {
    this.ensureInitialized();
    const res = await fetch(`${this.config!.cliUrl}/v1/identities/${number}`, {
      headers: this.getHeaders(),
    });
    const data = await res.json();
    return {
      name: data.name,
      fingerprint: data.fingerprint,
      trustLevel: data.trust_level,
    };
  }

  /** Parse a raw message from signal-cli */
  private parseMessage(raw: Record<string, unknown>): SignalMessage {
    const envelope = raw.envelope as Record<string, unknown> | undefined;
    const source = envelope?.source as string || '';
    const dataMessage = envelope?.dataMessage as Record<string, unknown> | undefined;

    return {
      source,
      sourceNumber: source,
      sourceName: (envelope?.sourceName as string) || undefined,
      sourceDevice: (envelope?.sourceDevice as number) || 0,
      timestamp: (dataMessage?.timestamp as number) || Date.now(),
      text: dataMessage?.message as string,
      isReceipt: !!envelope?.receiptMessage,
      groupInfo: dataMessage?.groupInfo ? {
        groupId: (dataMessage.groupInfo as Record<string, unknown>).groupId as string,
        groupName: (dataMessage.groupInfo as Record<string, unknown>).name as string,
        members: ((dataMessage.groupInfo as Record<string, unknown>).members as string[]) || [],
      } : undefined,
    };
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.config?.cliApiToken) {
      headers['Authorization'] = `Bearer ${this.config.cliApiToken}`;
    }
    return headers;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('Signal integration not initialized');
    }
  }
}
