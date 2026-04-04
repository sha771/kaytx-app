import { BridgeDriver, BridgeConnectionState, TLSConfig } from "./types";

class InMemoryBridgeRegistry {
  private drivers: Map<string, BridgeDriver> = new Map();
  private states: Map<string, BridgeConnectionState> = new Map();

  register(driver: BridgeDriver) {
    this.drivers.set(driver.id, driver);
    this.states.set(driver.id, { status: "disconnected" });
  }

  list() {
    return Array.from(this.drivers.values());
  }

  get(id: string) {
    return this.drivers.get(id);
  }

  getState(id: string) {
    return this.states.get(id) ?? { status: "disconnected" as const };
  }

  setState(id: string, state: BridgeConnectionState) {
    this.states.set(id, state);
  }
}

export const bridgeRegistry = new InMemoryBridgeRegistry();

// Minimal mock drivers
const defaultTLS: TLSConfig = {
  enabled: true,
  minVersion: "TLSv1.3",
  cipherSuites: ["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256"],
  verifyPeer: true,
};

function makeDriver(
  id: string,
  name: string,
  protocol: BridgeDriver["protocol"],
): BridgeDriver {
  let state: BridgeConnectionState = { status: "disconnected" };
  return {
    id,
    name,
    protocol,
    tls: defaultTLS,
    async connect(input: Record<string, unknown>) {
      console.log(`[Bridge:${id}] connecting`, input);
      state = { status: "connecting", startedAt: Date.now() };
      await new Promise((r) => setTimeout(r, 200));
      state = { status: "connected", connectedAt: Date.now(), details: { input } };
      return state;
    },
    async disconnect() {
      console.log(`[Bridge:${id}] disconnect`);
      state = { status: "disconnected" };
      return state;
    },
    async status() {
      return state;
    },
    async sendTest(payload?: Record<string, unknown>) {
      return { ok: true, echo: payload };
    },
  };
}

bridgeRegistry.register(makeDriver("websocket", "WebSocket Bridge", "websocket"));
bridgeRegistry.register(makeDriver("firebase", "Firebase Bridge", "firebase"));
bridgeRegistry.register(makeDriver("matrix", "Matrix Bridge", "matrix"));
bridgeRegistry.register(makeDriver("local", "Local Bridge", "local"));
