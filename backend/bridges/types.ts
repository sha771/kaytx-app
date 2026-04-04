import { z } from 'zod';

export const TLSConfigSchema = z.object({
  enabled: z.boolean().default(true),
  minVersion: z.enum(['TLSv1.2', 'TLSv1.3']).default('TLSv1.3'),
  cipherSuites: z.array(z.string()).default([
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
  ]),
  verifyPeer: z.boolean().default(true),
  sni: z.string().optional(),
  certPath: z.string().optional(),
  keyPath: z.string().optional(),
  caPath: z.string().optional(),
});

export type TLSConfig = z.infer<typeof TLSConfigSchema>;

export const ProtocolSchema = z.enum([
  'websocket',
  'matrix',
  'firebase',
  'local',
  'grpc',
  'rest',
  'graphql',
  'mqtt',
  'amqp',
  'redis',
]);

export type Protocol = z.infer<typeof ProtocolSchema>;

export type BridgeConnectionState =
  | { status: 'disconnected' }
  | { status: 'connecting'; startedAt: number }
  | { status: 'connected'; connectedAt: number; details?: Record<string, unknown> }
  | { status: 'error'; error: string };

export interface BridgeCapability {
  id: string;
  name: string;
  protocols: Protocol[];
  supportsTLS: boolean;
  supportsE2E: boolean;
  regionSupport: string[];
  connectionMethods: string[];
  features: string[];
}

export interface BridgeMetrics {
  messagesReceived: number;
  messagesSent: number;
  errors: number;
  uptime: number;
  lastActivity: number;
  averageLatency: number;
}

export interface BridgeHealth {
  bridgeId: string;
  healthy: boolean;
  latency?: number;
  error?: string;
  lastCheck: number;
}
