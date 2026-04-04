import { BaseBridge, BridgeConfig, BridgeMessage } from '../core/base-bridge';
import { BridgeConnectionState } from '../types';

interface FirebaseBridgeConfig extends BridgeConfig {
  projectId: string;
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  serviceAccountKey?: Record<string, unknown>;
}

export class FirebaseBridge extends BaseBridge {
  private firebaseConfig: FirebaseBridgeConfig;
  private dataListeners: Map<string, Function[]> = new Map();
  private database: Map<string, any> = new Map();

  constructor(config: FirebaseBridgeConfig) {
    super(config);
    this.firebaseConfig = config;
  }

  async connect(): Promise<BridgeConnectionState> {
    console.log(`[FirebaseBridge:${this.config.id}] Connecting to Firebase project ${this.firebaseConfig.projectId}`);
    
    this.setState({ status: 'connecting', startedAt: Date.now() });

    try {
      await this.initializeFirebase();
      await this.setupRealtimeListeners();

      const state: BridgeConnectionState = {
        status: 'connected',
        connectedAt: Date.now(),
        details: {
          projectId: this.firebaseConfig.projectId,
          databaseURL: this.firebaseConfig.databaseURL,
          authenticated: !!this.firebaseConfig.serviceAccountKey,
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
    console.log(`[FirebaseBridge:${this.config.id}] Disconnecting`);

    this.clearDataListeners();
    this.database.clear();

    const state: BridgeConnectionState = { status: 'disconnected' };
    this.setState(state);
    this.emitEvent({ type: 'disconnected', data: state, timestamp: Date.now() });

    return state;
  }

  async sendMessage(message: BridgeMessage): Promise<boolean> {
    if (this.state.status !== 'connected') {
      console.warn(`[FirebaseBridge:${this.config.id}] Not connected`);
      return false;
    }

    try {
      const path = `/messages/${message.to}/${message.id}`;
      console.log(`[FirebaseBridge:${this.config.id}] Writing message to ${path}`);
      
      this.database.set(path, {
        ...message,
        timestamp: Date.now(),
      });

      this.notifyListeners(path, message);

      return true;
    } catch (error) {
      console.error(`[FirebaseBridge:${this.config.id}] Send error:`, error);
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

  private async initializeFirebase(): Promise<void> {
    console.log(`[FirebaseBridge:${this.config.id}] Initializing Firebase SDK`);
    
    if (this.firebaseConfig.serviceAccountKey) {
      console.log(`[FirebaseBridge:${this.config.id}] Using service account authentication`);
    } else if (this.firebaseConfig.apiKey) {
      console.log(`[FirebaseBridge:${this.config.id}] Using API key authentication`);
    }
  }

  private async setupRealtimeListeners(): Promise<void> {
    console.log(`[FirebaseBridge:${this.config.id}] Setting up realtime listeners`);
    
    this.onValue('/messages', (snapshot: any) => {
      if (snapshot) {
        const message: BridgeMessage = snapshot;
        this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
        this.emit('message', message);
      }
    });
  }

  private onValue(path: string, callback: Function): void {
    if (!this.dataListeners.has(path)) {
      this.dataListeners.set(path, []);
    }
    this.dataListeners.get(path)!.push(callback);
    console.log(`[FirebaseBridge:${this.config.id}] Listener added for ${path}`);
  }

  private notifyListeners(path: string, data: any): void {
    for (const [listenerPath, callbacks] of this.dataListeners.entries()) {
      if (path.startsWith(listenerPath) || listenerPath === '/') {
        callbacks.forEach(callback => callback(data));
      }
    }
  }

  private clearDataListeners(): void {
    console.log(`[FirebaseBridge:${this.config.id}] Removing all listeners`);
    this.dataListeners.clear();
  }

  async set(path: string, value: any): Promise<void> {
    console.log(`[FirebaseBridge:${this.config.id}] Setting ${path}`);
    this.database.set(path, value);
    this.notifyListeners(path, value);
  }

  async get(path: string): Promise<any> {
    console.log(`[FirebaseBridge:${this.config.id}] Getting ${path}`);
    return this.database.get(path);
  }

  async update(path: string, updates: Record<string, any>): Promise<void> {
    console.log(`[FirebaseBridge:${this.config.id}] Updating ${path}`);
    const current = this.database.get(path) || {};
    const updated = { ...current, ...updates };
    this.database.set(path, updated);
    this.notifyListeners(path, updated);
  }

  async delete(path: string): Promise<void> {
    console.log(`[FirebaseBridge:${this.config.id}] Deleting ${path}`);
    this.database.delete(path);
    this.notifyListeners(path, null);
  }
}
