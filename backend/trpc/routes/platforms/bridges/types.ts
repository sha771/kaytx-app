import { z } from "zod";

export const TLSConfigSchema = z.object({
  enabled: z.boolean().default(true),
  minVersion: z.enum(["TLSv1.2", "TLSv1.3"]).default("TLSv1.3"),
  cipherSuites: z.array(z.string()).default([
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
  ]),
  verifyPeer: z.boolean().default(true),
  sni: z.string().optional(),
});

export type TLSConfig = z.infer<typeof TLSConfigSchema>;

export const ProtocolSchema = z.enum([
  "websocket",
  "matrix",
  "firebase",
  "local",
  "grpc",
  "rest",
  "graphql",
]);

export type Protocol = z.infer<typeof ProtocolSchema>;

export const BridgeCapabilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  protocols: z.array(ProtocolSchema),
  supportsTLS: z.boolean().default(true),
  regionSupport: z.array(
    z.enum([
      "NA",
      "EU",
      "AS",
      "MENA",
      "LATAM",
      "AF",
    ]),
  ),
  connectionMethods: z.array(
    z.enum(["qr", "oauth", "credentials", "api_key", "phone", "webhook"]),
  ),
});

export type BridgeCapability = z.infer<typeof BridgeCapabilitySchema>;

export type BridgeConnectionState =
  | { status: "disconnected" }
  | { status: "connecting"; startedAt: number }
  | { status: "connected"; connectedAt: number; details?: Record<string, unknown> }
  | { status: "error"; error: string };

export interface BridgeDriver {
  id: string;
  name: string;
  protocol: Protocol;
  tls?: TLSConfig;
  connect(input: Record<string, unknown>): Promise<BridgeConnectionState>;
  disconnect(): Promise<BridgeConnectionState>;
  status(): Promise<BridgeConnectionState>;
  sendTest?(payload?: Record<string, unknown>): Promise<{ ok: boolean; echo?: unknown }>;
}
