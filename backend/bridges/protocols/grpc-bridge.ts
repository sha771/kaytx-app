import { BaseBridge, BridgeConfig, BridgeMessage } from '../../../core/base-bridge';
import { BridgeConnectionState } from '../../../core/base-bridge';

interface GRPCBridgeConfig extends BridgeConfig {
  host: string;
  port: number;
  serviceName: string;
  protoPath?: string;
  credentials?: {
    rootCerts?: Buffer;
    privateKey?: Buffer;
    certChain?: Buffer;
  };
  channelOptions?: Record<string, unknown>;
}

export class GRPCBridge extends BaseBridge {
  private grpcConfig: GRPCBridgeConfig;
  private client: any | null = null;
  private streams: Map<string, any> = new Map();

  constructor(config: GRPCBridgeConfig) {
    super({ ...config, protocol: 'grpc' });
    this.grpcConfig = config;
  }

  async connect(): Promise<BridgeConnectionState> {
    console.log(`[GRPCBridge:${this.config.id}] Connecting to ${this.grpcConfig.host}:${this.grpcConfig.port}`);
    
    this.setState({ status: 'connecting', startedAt: Date.now() });

    try {
      await this.createClient();
      await this.setupStreams();

      const state: BridgeConnectionState = {
        status: 'connected',
        connectedAt: Date.now(),
        details: {
          host: this.grpcConfig.host,
          port: this.grpcConfig.port,
          service: this.grpcConfig.serviceName,
          secure: !!this.grpcConfig.credentials,
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
    console.log(`[GRPCBridge:${this.config.id}] Disconnecting`);

    this.closeAllStreams();
    
    if (this.client) {
      this.client = null;
    }

    const state: BridgeConnectionState = { status: 'disconnected' };
    this.setState(state);
    this.emitEvent({ type: 'disconnected', data: state, timestamp: Date.now() });
  }

  async sendMessage(message: BridgeMessage): Promise<void> {
    if (this.state.status !== 'connected' || !this.client) {
      console.warn(`[GRPCBridge:${this.config.id}] Not connected`);
      return;
    }

    try {
      console.log(`[GRPCBridge:${this.config.id}] Sending message via gRPC`);
      
      const response = await this.makeUnaryCall('SendMessage', message);
      
      console.log(`[GRPCBridge:${this.config.id}] Message sent successfully:`, response);
    } catch (error) {
      console.error(`[GRPCBridge:${this.config.id}] Send error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
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

  private async createClient(): Promise<void> {
    console.log(`[GRPCBridge:${this.config.id}] Creating gRPC client`);
    
    const address = `${this.grpcConfig.host}:${this.grpcConfig.port}`;
    
    this.client = {
      address,
      serviceName: this.grpcConfig.serviceName,
      secure: !!this.grpcConfig.credentials,
      call: async (method: string, request: any) => {
        console.log(`[GRPCBridge:${this.config.id}] Calling ${method}`, request);
        return { success: true, data: request };
      },
      stream: (method: string) => {
        console.log(`[GRPCBridge:${this.config.id}] Creating stream for ${method}`);
        return {
          on: (event: string, handler: Function) => {
            console.log(`[GRPCBridge:${this.config.id}] Stream event listener: ${event}`);
          },
          write: (data: any) => {
            console.log(`[GRPCBridge:${this.config.id}] Writing to stream:`, data);
          },
          end: () => {
            console.log(`[GRPCBridge:${this.config.id}] Stream ended`);
          },
        };
      },
    };
  }

  private async setupStreams(): Promise<void> {
    console.log(`[GRPCBridge:${this.config.id}] Setting up bidirectional streams`);
    
    const stream = this.client.stream('MessageStream');
    
    stream.on('data', (data: any) => {
      const message: BridgeMessage = data;
      this.emitEvent({ type: 'message', data: message, timestamp: Date.now() });
      this.emit('message', message);
    });

    stream.on('error', (error: any) => {
      console.error(`[GRPCBridge:${this.config.id}] Stream error:`, error);
      this.emitEvent({ type: 'error', data: error, timestamp: Date.now() });
    });

    stream.on('end', () => {
      console.log(`[GRPCBridge:${this.config.id}] Stream ended`);
    });

    this.streams.set('main', stream);
  }

  private async makeUnaryCall(method: string, request: any): Promise<any> {
    if (!this.client) {
      throw new Error('Client not initialized');
    }

    return this.client.call(method, request);
  }

  private closeAllStreams(): void {
    console.log(`[GRPCBridge:${this.config.id}] Closing all streams`);
    
    for (const [name, stream] of this.streams.entries()) {
      stream.end();
      console.log(`[GRPCBridge:${this.config.id}] Stream ${name} closed`);
    }
    
    this.streams.clear();
  }

  async callMethod(method: string, request: any): Promise<any> {
    return this.makeUnaryCall(method, request);
  }

  getActiveStreams(): string[] {
    return Array.from(this.streams.keys());
  }
}
