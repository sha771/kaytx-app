import { EventEmitter } from 'events';
import { BaseBridge } from '../core/base-bridge';
import { WebSocketBridge } from '../protocols/websocket-bridge';
import { MatrixBridge } from '../protocols/matrix-bridge';
import { FirebaseBridge } from '../protocols/firebase-bridge';
import { LocalBridge } from '../protocols/local-bridge';
import { GRPCBridge } from '../protocols/grpc-bridge';
import { BridgeConnectionState, BridgeMetrics, BridgeHealth, Protocol } from '../types';

export class BridgeManager extends EventEmitter {
  private bridges: Map<string, BaseBridge> = new Map();
  private metrics: Map<string, BridgeMetrics> = new Map();
  private healthCheckInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    super();
    this.startHealthChecks();
  }

  createBridge(protocol: Protocol, config: any): BaseBridge {
    let bridge: BaseBridge;

    switch (protocol) {
      case 'websocket':
        bridge = new WebSocketBridge(config);
        break;
      case 'matrix':
        bridge = new MatrixBridge(config);
        break;
      case 'firebase':
        bridge = new FirebaseBridge(config);
        break;
      case 'local':
        bridge = new LocalBridge(config);
        break;
      case 'grpc':
        bridge = new GRPCBridge(config);
        break;
      default:
        throw new Error(`Unsupported protocol: ${protocol}`);
    }

    this.registerBridge(bridge);
    return bridge;
  }

  registerBridge(bridge: BaseBridge): void {
    const id = bridge.getId();
    
    if (this.bridges.has(id)) {
      throw new Error(`Bridge ${id} already registered`);
    }

    this.bridges.set(id, bridge);
    this.initializeMetrics(id);

    bridge.on('stateChange', (state: BridgeConnectionState) => {
      this.emit('bridgeStateChange', { bridgeId: id, state });
    });

    bridge.on('event', (event: any) => {
      this.updateMetrics(id, event);
      this.emit('bridgeEvent', { bridgeId: id, event });
    });

    console.log(`[BridgeManager] Bridge ${id} registered (${bridge.getProtocol()})`);
  }

  unregisterBridge(bridgeId: string): void {
    const bridge = this.bridges.get(bridgeId);
    
    if (!bridge) {
      throw new Error(`Bridge ${bridgeId} not found`);
    }

    bridge.removeAllListeners();
    this.bridges.delete(bridgeId);
    this.metrics.delete(bridgeId);

    console.log(`[BridgeManager] Bridge ${bridgeId} unregistered`);
  }

  getBridge(bridgeId: string): BaseBridge | undefined {
    return this.bridges.get(bridgeId);
  }

  getAllBridges(): BaseBridge[] {
    return Array.from(this.bridges.values());
  }

  getBridgesByProtocol(protocol: Protocol): BaseBridge[] {
    return this.getAllBridges().filter(b => b.getProtocol() === protocol);
  }

  async connectBridge(bridgeId: string): Promise<BridgeConnectionState> {
    const bridge = this.getBridge(bridgeId);
    
    if (!bridge) {
      throw new Error(`Bridge ${bridgeId} not found`);
    }

    return bridge.connect();
  }

  async disconnectBridge(bridgeId: string): Promise<BridgeConnectionState> {
    const bridge = this.getBridge(bridgeId);
    
    if (!bridge) {
      throw new Error(`Bridge ${bridgeId} not found`);
    }

    return bridge.disconnect();
  }

  async connectAll(): Promise<Map<string, BridgeConnectionState>> {
    const results = new Map<string, BridgeConnectionState>();

    for (const [id, bridge] of this.bridges.entries()) {
      try {
        const state = await bridge.connect();
        results.set(id, state);
      } catch (error) {
        results.set(id, {
          status: 'error',
          error: error instanceof Error ? error.message : 'Connection failed',
        });
      }
    }

    return results;
  }

  async disconnectAll(): Promise<Map<string, BridgeConnectionState>> {
    const results = new Map<string, BridgeConnectionState>();

    for (const [id, bridge] of this.bridges.entries()) {
      try {
        const state = await bridge.disconnect();
        results.set(id, state);
      } catch (error) {
        results.set(id, {
          status: 'error',
          error: error instanceof Error ? error.message : 'Disconnection failed',
        });
      }
    }

    return results;
  }

  getBridgeState(bridgeId: string): BridgeConnectionState {
    const bridge = this.getBridge(bridgeId);
    
    if (!bridge) {
      return { status: 'error', error: 'Bridge not found' };
    }

    return bridge.getState();
  }

  getAllStates(): Map<string, BridgeConnectionState> {
    const states = new Map<string, BridgeConnectionState>();

    for (const [id, bridge] of this.bridges.entries()) {
      states.set(id, bridge.getState());
    }

    return states;
  }

  getMetrics(bridgeId: string): BridgeMetrics | undefined {
    return this.metrics.get(bridgeId);
  }

  getAllMetrics(): Map<string, BridgeMetrics> {
    return new Map(this.metrics);
  }

  private initializeMetrics(bridgeId: string): void {
    this.metrics.set(bridgeId, {
      messagesReceived: 0,
      messagesSent: 0,
      errors: 0,
      uptime: 0,
      lastActivity: Date.now(),
      averageLatency: 0,
    });
  }

  private updateMetrics(bridgeId: string, event: any): void {
    const metrics = this.metrics.get(bridgeId);
    
    if (!metrics) return;

    switch (event.type) {
      case 'message':
        metrics.messagesReceived++;
        metrics.lastActivity = Date.now();
        break;
      case 'error':
        metrics.errors++;
        break;
    }

    this.metrics.set(bridgeId, metrics);
  }

  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, 60000);
  }

  private async performHealthChecks(): Promise<void> {
    const healthResults: BridgeHealth[] = [];

    for (const [id, bridge] of this.bridges.entries()) {
      try {
        const result = await bridge.healthCheck();
        healthResults.push({
          bridgeId: id,
          ...result,
          lastCheck: Date.now(),
        });
      } catch (error) {
        healthResults.push({
          bridgeId: id,
          healthy: false,
          error: error instanceof Error ? error.message : 'Health check failed',
          lastCheck: Date.now(),
        });
      }
    }

    this.emit('healthCheck', healthResults);
  }

  async getHealthStatus(): Promise<BridgeHealth[]> {
    const healthResults: BridgeHealth[] = [];

    for (const [id, bridge] of this.bridges.entries()) {
      const result = await bridge.healthCheck();
      healthResults.push({
        bridgeId: id,
        ...result,
        lastCheck: Date.now(),
      });
    }

    return healthResults;
  }

  destroy(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }

    for (const bridge of this.bridges.values()) {
      bridge.removeAllListeners();
    }

    this.bridges.clear();
    this.metrics.clear();
    this.removeAllListeners();

    console.log('[BridgeManager] Destroyed');
  }
}

export const bridgeManager = new BridgeManager();
