import { BaseBridge, BridgeConfig, BridgeMessage } from '../core/base-bridge';
import { BridgeConnectionState } from '../types';
// import { Platform } from 'react-native';
const Platform = { OS: typeof document !== 'undefined' ? 'web' : 'node' };

interface WebSocketBridgeConfig extends BridgeConfig {
  endpoint: string;
  protocols?: string[];
  headers?: Record<string, string>;
  pingInterval?: number;
  pongTimeout?: number;
}

export class WebSocketBridge extends BaseBridge {
  private ws: any | null = null;
  private pingTimer: any = null;
  private pongTimer: any = null;
  private messageQueue: BridgeMessage[] = [];
  private wsConfig: WebSocketBridgeConfig;

  constructor(config: WebSocketBridgeConfig) {
    super(config);
    this.wsConfig = config;
  }

  async connect(): Promise<BridgeConnectionState> {
    console.log(`[WebSocketBridge:${this.config.id}] Connecting to ${this.wsConfig.endpoint}`);

    this.setState({ status: 'connecting', startedAt: Date.now() });

    try {
      const protocol = this.config.tls?.enabled ? 'wss://' : 'ws://';
      const endpoint = this.wsConfig.endpoint.startsWith('ws')
        ? this.wsConfig.endpoint
        : `${protocol}${this.wsConfig.endpoint}`;

      if (Platform.OS === 'web') {
        if (typeof WebSocket !== 'undefined') {
          this.ws = new WebSocket(endpoint, this.wsConfig.protocols);
          this.setupWebEventHandlers();
        } else {
          console.warn(`[WebSocketBridge:${this.config.id}] WebSocket not available, using mock`);
          this.ws = this.createMockWebSocket(endpoint);
          this.setupEventHandlers();
        }
      } else {
        this.ws = this.createMockWebSocket(endpoint);
        this.setupEventHandlers();
      }

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000);

        const onOpen = () => {
          clearTimeout(timeout);
          resolve();
        };

        const onError = (error: any) => {
          clearTimeout(timeout);
          reject(error);
        };

        if (Platform.OS === 'web' && this.ws && typeof this.ws.addEventListener === 'function') {
          this.ws.addEventListener('open', onOpen, { once: true });
          this.ws.addEventListener('error', onError, { once: true });
        } else {
          setTimeout(onOpen, 1000);
        }
      });

      this.startPingPong();

      const state: BridgeConnectionState = {
        status: 'connected',
        connectedAt: Date.now(),
        details: {
          endpoint: endpoint,
          protocol: this.wsConfig.protocols?.[0] || 'default',
          tls: this.config.tls?.enabled,
        },
      };

      this.setState(state);
      this.emitEvent({ type: 'connected', data: state, timestamp: Date.now() });

      return state;
    } catch (error) {
      const errorState: BridgeConnectionState = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Connection failed',
      };
      this.setState(errorState);
      throw error;
    }
  }

  private createMockWebSocket(endpoint: string) {
    return {
      readyState: 1,
      url: endpoint,
      protocol: this.wsConfig.protocols?.[0] || '',
      send: (data: string) => {
        console.log(`[WebSocketBridge:${this.config.id}] Sending:`, data);
        return Promise.resolve();
      },
      close: () => {
        console.log(`[WebSocketBridge:${this.config.id}] Closing connection`);
        this.ws = null;
      },
      addEventListener: (event: string, handler: Function) => {
        console.log(`[WebSocketBridge:${this.config.id}] Event listener added: ${event}`);
      },
    };
  }

  private setupWebEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const message: BridgeMessage = JSON.parse(event.data);
        this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
        this.emit('message', message);
      } catch (error) {
        console.error(`[WebSocketBridge:${this.config.id}] Parse error:`, error);
      }
    };

    this.ws.onerror = (error: Event) => {
      console.error(`[WebSocketBridge:${this.config.id}] WebSocket error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
      this.setState({ status: 'error', error: 'WebSocket error' });
    };

    this.ws.onclose = () => {
      console.log(`[WebSocketBridge:${this.config.id}] Connection closed`);
      this.setState({ status: 'disconnected' });
      this.handleReconnect();
    };
  }

  async disconnect(): Promise<BridgeConnectionState> {
    console.log(`[WebSocketBridge:${this.config.id}] Disconnecting`);

    this.stopPingPong();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    const state: BridgeConnectionState = { status: 'disconnected' };
    this.setState(state);
    this.emitEvent({ type: 'disconnected', data: state, timestamp: Date.now() });

    return state;
  }

  async sendMessage(message: BridgeMessage): Promise<boolean> {
    if (!this.ws || this.state.status !== 'connected') {
      console.warn(`[WebSocketBridge:${this.config.id}] Not connected, queueing message`);
      this.messageQueue.push(message);
      return false;
    }

    try {
      const payload = JSON.stringify(message);
      await this.ws.send(payload);
      console.log(`[WebSocketBridge:${this.config.id}] Message sent:`, message.id);
      return true;
    } catch (error) {
      console.error(`[WebSocketBridge:${this.config.id}] Send error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
      return false;
    }
  }

  async receiveMessage(): Promise<BridgeMessage | null> {
    return new Promise((resolve) => {
      if (!this.ws) {
        resolve(null);
        return;
      }

      const timeout = setTimeout(() => resolve(null), 5000);

      this.once('message', (message: BridgeMessage) => {
        clearTimeout(timeout);
        resolve(message);
      });
    });
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.addEventListener('message', (event: any) => {
      try {
        const message: BridgeMessage = JSON.parse(event.data);
        this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
        this.emit('message', message);
      } catch (error) {
        console.error(`[WebSocketBridge:${this.config.id}] Parse error:`, error);
      }
    });

    this.ws.addEventListener('error', (error: any) => {
      console.error(`[WebSocketBridge:${this.config.id}] WebSocket error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
      this.setState({ status: 'error', error: 'WebSocket error' });
    });

    this.ws.addEventListener('close', () => {
      console.log(`[WebSocketBridge:${this.config.id}] Connection closed`);
      this.setState({ status: 'disconnected' });
      this.handleReconnect();
    });
  }

  private startPingPong(): void {
    const pingInterval = this.wsConfig.pingInterval || 30000;
    const pongTimeout = this.wsConfig.pongTimeout || 5000;

    this.pingTimer = setInterval(() => {
      if (this.ws && this.state.status === 'connected') {
        this.ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));

        this.pongTimer = setTimeout(() => {
          console.warn(`[WebSocketBridge:${this.config.id}] Pong timeout`);
          this.disconnect();
        }, pongTimeout);
      }
    }, pingInterval);
  }

  private stopPingPong(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    if (this.pongTimer) {
      clearTimeout(this.pongTimer);
      this.pongTimer = null;
    }
  }
}
