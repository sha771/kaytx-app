/**
 * Base Bridge Interface
 * Provides common bridge functionality
 */

import { EventEmitter } from 'events';

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

export type BridgeConnectionState =
  | { status: 'disconnected' }
  | { status: 'connecting'; startedAt: number }
  | { status: 'connected'; connectedAt: number; details?: Record<string, unknown> }
  | { status: 'error'; error: string };

export abstract class BaseBridge extends EventEmitter {
  protected config: BridgeConfig;
  protected state: BridgeConnectionState = { status: 'disconnected' };
  private eventListeners: Map<string, Array<(event: BridgeEvent) => void>> = new Map();

  constructor(config: BridgeConfig) {
    super();
    this.config = config;
  }

  protected setState(state: Partial<BridgeConnectionState>): void {
    this.state = { ...this.state, ...state };
    this.emit('stateChange', this.state);
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
    this.emit(event.type, event);
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

  abstract connect(): Promise<BridgeConnectionState>;
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
    super.removeAllListeners();
  }
}
