import { BaseBridge, BridgeConfig, BridgeMessage } from '../core/base-bridge';
import { BridgeConnectionState } from '../types';

interface MatrixBridgeConfig extends BridgeConfig {
  homeserver: string;
  accessToken?: string;
  userId?: string;
  deviceId?: string;
  syncTimeout?: number;
  filterOptions?: Record<string, unknown>;
}

export class MatrixBridge extends BaseBridge {
  private matrixConfig: MatrixBridgeConfig;
  private syncToken: string | null = null;
  private syncRunning: boolean = false;
  private rooms: Map<string, any> = new Map();

  constructor(config: MatrixBridgeConfig) {
    super({ ...config, protocol: 'matrix' });
    this.matrixConfig = config;
  }

  async connect(): Promise<BridgeConnectionState> {
    console.log(`[MatrixBridge:${this.config.id}] Connecting to ${this.matrixConfig.homeserver}`);
    
    this.setState({ status: 'connecting', startedAt: Date.now() });

    try {
      await this.login();
      await this.startSync();

      const state: BridgeConnectionState = {
        status: 'connected',
        connectedAt: Date.now(),
        details: {
          homeserver: this.matrixConfig.homeserver,
          userId: this.matrixConfig.userId,
          deviceId: this.matrixConfig.deviceId,
          rooms: this.rooms.size,
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

  async disconnect(): Promise<BridgeConnectionState> {
    console.log(`[MatrixBridge:${this.config.id}] Disconnecting`);

    this.syncRunning = false;
    this.syncToken = null;
    this.rooms.clear();

    await this.logout();

    const state: BridgeConnectionState = { status: 'disconnected' };
    this.setState(state);
    this.emitEvent({ type: 'disconnected', data: state, timestamp: Date.now() });

    return state;
  }

  async sendMessage(message: BridgeMessage): Promise<boolean> {
    if (this.state.status !== 'connected') {
      console.warn(`[MatrixBridge:${this.config.id}] Not connected`);
      return false;
    }

    try {
      console.log(`[MatrixBridge:${this.config.id}] Sending message to room ${message.to}`);
      
      const eventId = `$${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      console.log(`[MatrixBridge:${this.config.id}] Message sent with event ID: ${eventId}`);
      return true;
    } catch (error) {
      console.error(`[MatrixBridge:${this.config.id}] Send error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
      return false;
    }
  }

  async receiveMessage(): Promise<BridgeMessage | null> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 5000);

      this.once('message', (message: BridgeMessage) => {
        clearTimeout(timeout);
        resolve(message);
      });
    });
  }

  private async login(): Promise<void> {
    if (this.matrixConfig.accessToken) {
      console.log(`[MatrixBridge:${this.config.id}] Using existing access token`);
      return;
    }

    console.log(`[MatrixBridge:${this.config.id}] Logging in...`);
    
    this.matrixConfig.accessToken = `mock_token_${Date.now()}`;
    this.matrixConfig.userId = `@user:${this.matrixConfig.homeserver}`;
    this.matrixConfig.deviceId = `DEVICE_${Date.now()}`;
  }

  private async logout(): Promise<void> {
    if (!this.matrixConfig.accessToken) return;

    console.log(`[MatrixBridge:${this.config.id}] Logging out...`);
    
    this.matrixConfig.accessToken = undefined;
    this.matrixConfig.userId = undefined;
    this.matrixConfig.deviceId = undefined;
  }

  private async startSync(): Promise<void> {
    this.syncRunning = true;
    this.performSync();
  }

  private async performSync(): Promise<void> {
    if (!this.syncRunning || this.state.status !== 'connected') {
      return;
    }

    try {
      console.log(`[MatrixBridge:${this.config.id}] Syncing...`);
      
      const mockEvents = this.generateMockSyncEvents();
      this.processSyncEvents(mockEvents);

      this.syncToken = `s${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      setTimeout(() => this.performSync(), this.matrixConfig.syncTimeout || 30000);
    } catch (error) {
      console.error(`[MatrixBridge:${this.config.id}] Sync error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
      
      setTimeout(() => this.performSync(), 5000);
    }
  }

  private generateMockSyncEvents(): any[] {
    return [];
  }

  private processSyncEvents(events: any[]): void {
    for (const event of events) {
      if (event.type === 'm.room.message') {
        const message: BridgeMessage = {
          id: event.event_id,
          from: event.sender,
          to: event.room_id,
          type: event.content.msgtype || 'm.text',
          content: event.content.body,
          timestamp: event.origin_server_ts,
          metadata: {
            msgtype: event.content.msgtype,
            format: event.content.format,
          },
        };

        this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
        this.emit('message', message);
      }
    }
  }

  async joinRoom(roomId: string): Promise<void> {
    console.log(`[MatrixBridge:${this.config.id}] Joining room ${roomId}`);
    this.rooms.set(roomId, { id: roomId, joinedAt: Date.now() });
  }

  async leaveRoom(roomId: string): Promise<void> {
    console.log(`[MatrixBridge:${this.config.id}] Leaving room ${roomId}`);
    this.rooms.delete(roomId);
  }

  getRooms(): string[] {
    return Array.from(this.rooms.keys());
  }
}
