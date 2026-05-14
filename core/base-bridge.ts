/**
 * Base Bridge Interface
 * Provides common bridge functionality
 */

export interface BridgeConfig {
  id: string;
  name: string;
  enabled: boolean;
  protocol?: string;
  [key: string]: any;
}

export interface BridgeMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  to?: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface BridgeEvent {
  type: string;
  data: any;
  timestamp: number;
}

export interface BridgeConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  connectedAt?: number;
  startedAt?: number;
  details?: Record<string, any>;
  error?: string;
}

export abstract class BaseBridge {
  protected config: BridgeConfig;
  protected state: BridgeConnectionState = { status: 'disconnected' };
  private eventListeners: Map<string, Array<(event: BridgeEvent) => void>> = new Map();

  constructor(config: BridgeConfig) {
    this.config = config;
  }

  protected setState(state: Partial<BridgeConnectionState>): void {
    this.state = { ...this.state, ...state };
  }

  protected emitEvent(event: BridgeEvent): void {
    const listeners = this.eventListeners.get(event.type) || [];
    for (const listener of listeners) {
      try { listener(event); } catch (e) { /* ignore listener errors */ }
    }
    const allListeners = this.eventListeners.get('*') || [];
    for (const listener of allListeners) {
      try { listener(event); } catch (e) { /* ignore listener errors */ }
    }
  }

  on(event: string, listener: (event: BridgeEvent) => void): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.push(listener);
    this.eventListeners.set(event, listeners);
  }

  getId(): string {
    return this.config.id;
  }

  getState(): BridgeConnectionState {
    return this.state;
  }

  getProtocol(): string {
    return this.config.protocol || 'unknown';
  }

  abstract connect(): Promise<any>;
  abstract disconnect(): Promise<void>;
  abstract sendMessage(message: BridgeMessage): Promise<void>;

  getName(): string {
    return this.config.name || this.config.id;
  }

  async healthCheck(): Promise<BridgeConnectionState> {
    return this.state;
  }

  removeAllListeners(): void {
    this.eventListeners.clear();
  }
}
