/**
 * Base Bridge Interface
 * Provides common bridge functionality
 */

export interface BridgeConfig {
  id: string;
  name: string;
  enabled: boolean;
}

export interface BridgeMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
}

export abstract class BaseBridge {
  protected config: BridgeConfig;

  constructor(config: BridgeConfig) {
    this.config = config;
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract sendMessage(message: BridgeMessage): Promise<void>;
}
