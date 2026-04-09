/**
 * Common Types for the Platform
 */

export enum BridgeConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

export type { BridgeConfig, BridgeMessage } from './core/base-bridge';
