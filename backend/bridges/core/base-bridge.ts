import { EventEmitter } from 'events';
import { TLSConfig, BridgeConnectionState, Protocol } from '../types';

export interface BridgeConfig {
  id: string;
  name: string;
  protocol: Protocol;
  tls?: TLSConfig;
  endpoint?: string;
  credentials?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

export interface BridgeMessage {
  id: string;
  timestamp: number;
  from: string;
  to: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface BridgeEvent {
  type: 'message' | 'status' | 'error' | 'connected' | 'disconnected';
  data: unknown;
  timestamp: number;
}

export abstract class BaseBridge extends EventEmitter {
  protected config: BridgeConfig;
  protected state: BridgeConnectionState;
  protected reconnectAttempts: number = 0;
  protected maxReconnectAttempts: number = 5;
  protected reconnectDelay: number = 1000;

  constructor(config: BridgeConfig) {
    super();
    this.config = config;
    this.state = { status: 'disconnected' };
  }

  abstract connect(): Promise<BridgeConnectionState>;
  abstract disconnect(): Promise<BridgeConnectionState>;
  abstract sendMessage(message: BridgeMessage): Promise<boolean>;
  abstract receiveMessage(): Promise<BridgeMessage | null>;

  getState(): BridgeConnectionState {
    return this.state;
  }

  getId(): string {
    return this.config.id;
  }

  getName(): string {
    return this.config.name;
  }

  getProtocol(): Protocol {
    return this.config.protocol;
  }

  protected setState(state: BridgeConnectionState): void {
    this.state = state;
    this.emit('stateChange', state);
  }

  protected async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setState({ status: 'error', error: 'Max reconnection attempts reached' });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`[Bridge:${this.config.id}] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    try {
      await this.connect();
      this.reconnectAttempts = 0;
    } catch (error) {
      console.error(`[Bridge:${this.config.id}] Reconnection failed:`, error);
      await this.handleReconnect();
    }
  }

  protected emitEvent(event: BridgeEvent): void {
    this.emit('event', event);
  }

  async healthCheck(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
    const start = Date.now();
    try {
      const testMessage: BridgeMessage = {
        id: `health-${Date.now()}`,
        timestamp: Date.now(),
        from: 'system',
        to: 'system',
        content: 'ping',
      };
      
      await this.sendMessage(testMessage);
      const latency = Date.now() - start;
      
      return { healthy: true, latency };
    } catch (error) {
      return { 
        healthy: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
