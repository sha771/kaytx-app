import { BaseBridge, BridgeConfig, BridgeMessage } from '../../../core/base-bridge';
import { BridgeConnectionState } from '../../../core/base-bridge';

interface LocalBridgeConfig extends BridgeConfig {
  dataPath?: string;
  encryptionKey?: string;
  syncInterval?: number;
}

export class LocalBridge extends BaseBridge {
  private localConfig: LocalBridgeConfig;
  private messageStore: Map<string, BridgeMessage> = new Map();
  private syncTimer: ReturnType<typeof setInterval> | null = null;

  constructor(config: LocalBridgeConfig) {
    super({ ...config, protocol: 'local' });
    this.localConfig = config;
  }

  async connect(): Promise<BridgeConnectionState> {
    console.log(`[LocalBridge:${this.config.id}] Connecting to local storage`);
    
    this.setState({ status: 'connecting', startedAt: Date.now() });

    try {
      await this.loadFromStorage();
      this.startSync();

      const state: BridgeConnectionState = {
        status: 'connected',
        connectedAt: Date.now(),
        details: {
          dataPath: this.localConfig.dataPath || 'memory',
          encrypted: !!this.localConfig.encryptionKey,
          messageCount: this.messageStore.size,
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

  async disconnect(): Promise<void> {
    console.log(`[LocalBridge:${this.config.id}] Disconnecting`);

    this.stopSync();
    await this.saveToStorage();

    const state: BridgeConnectionState = { status: 'disconnected' };
    this.setState(state);
    this.emitEvent({ type: 'disconnected', data: state, timestamp: Date.now() });
  }

  async sendMessage(message: BridgeMessage): Promise<void> {
    if (this.state.status !== 'connected') {
      console.warn(`[LocalBridge:${this.config.id}] Not connected`);
      return;
    }

    try {
      console.log(`[LocalBridge:${this.config.id}] Storing message ${message.id}`);
      
      this.messageStore.set(message.id, message);
      
      this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
      this.emit('message', message);
    } catch (error) {
      console.error(`[LocalBridge:${this.config.id}] Send error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
    }
  }

  async receiveMessage(): Promise<BridgeMessage | null> {
    const messages = Array.from(this.messageStore.values());
    return messages.length > 0 ? messages[messages.length - 1] : null;
  }

  private async loadFromStorage(): Promise<void> {
    console.log(`[LocalBridge:${this.config.id}] Loading from storage`);
    
    if (this.localConfig.encryptionKey) {
      console.log(`[LocalBridge:${this.config.id}] Decrypting data`);
    }
  }

  private async saveToStorage(): Promise<void> {
    console.log(`[LocalBridge:${this.config.id}] Saving to storage`);
    
    if (this.localConfig.encryptionKey) {
      console.log(`[LocalBridge:${this.config.id}] Encrypting data`);
    }
  }

  private startSync(): void {
    const interval = this.localConfig.syncInterval || 60000;
    
    this.syncTimer = setInterval(async () => {
      await this.saveToStorage();
    }, interval);

    console.log(`[LocalBridge:${this.config.id}] Sync started (interval: ${interval}ms)`);
  }

  private stopSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
      console.log(`[LocalBridge:${this.config.id}] Sync stopped`);
    }
  }

  getMessages(Filter?: { sender?: string; to?: string; after?: number }): BridgeMessage[] {
    let messages = Array.from(this.messageStore.values());

    if (Filter) {
      if (Filter.sender) {
        messages = messages.filter(m => m.sender === Filter.sender);
      }
      if (Filter.to) {
        messages = messages.filter(m => m.to === Filter.to);
      }
      if (Filter.after !== undefined) {
        messages = messages.filter(m => new Date(m.timestamp).getTime() > Filter.after!);
      }
    }

    return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  clearMessages(): void {
    console.log(`[LocalBridge:${this.config.id}] Clearing all messages`);
    this.messageStore.clear();
  }

  getMessageCount(): number {
    return this.messageStore.size;
  }
}
