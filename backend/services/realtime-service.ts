import { WebSocketServer } from 'ws';
import { verifyToken } from '../lib/auth';
import { db as pgDb } from '../db/connection';
import { realtimeClientState, realtimeEvents, realtimePresence } from '../db/drizzle-schema';
import { and, eq, gt, inArray, isNull, or, asc } from 'drizzle-orm';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('RealTimeService');

type AnyServer = unknown;

type ConnectionIdentity = {
  connectionId: string;
  userId?: string;
  organizationId?: string;
  lastAckSeq?: number;
  rate?: {
    windowStartMs: number;
    count: number;
  };
};

type RealtimeEvent = {
  seq: number;
  timestamp: number;
  channel: string;
  type: string;
  payload: unknown;
};

type ClientMessage =
  | { type: 'ping' }
  | { type: 'ack'; seq: number }
  | { type: 'subscribe'; channels: string[]; since?: number }
  | { type: 'message'; channel: string; payload: unknown };

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getTokenFromRequestUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url, 'http://localhost');
    const token = parsed.searchParams.get('token');
    return token || undefined;
  } catch {
    return undefined;
  }
}

function getBearerTokenFromHeaders(headers: Record<string, unknown> | undefined): string | undefined {
  const raw = headers?.['authorization'];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed.toLowerCase().startsWith('bearer ')) return undefined;
  return trimmed.slice('bearer '.length).trim() || undefined;
}

export class RealTimeService extends EventEmitter {
  private wss: WebSocketServer;
  private clients: Map<unknown, ConnectionIdentity> = new Map();
  private subscriptions: Map<unknown, Set<string>> = new Map();
  private pending: Map<unknown, Map<number, { event: RealtimeEvent; organizationId?: string; attempts: number; lastSentAt: number }>> = new Map();
  private readonly bufferSize: number;
  private readonly inboundMessageLimitPerSecond: number;
  private readonly resendIntervalMs: number;
  private readonly resendAfterMs: number;
  private readonly maxResendAttempts: number;
  private retryInterval?: NodeJS.Timeout;

  constructor(server: AnyServer, options?: { bufferSize?: number }) {
    super();
    this.bufferSize = options?.bufferSize ?? 500;
    this.inboundMessageLimitPerSecond = 10;
    this.resendIntervalMs = 2000;
    this.resendAfterMs = 3000;
    this.maxResendAttempts = 5;

    this.wss = new WebSocketServer({ server: server as any });
    this.wss.on('connection', (ws: any, req: any) => {
      this.handleConnection(ws, req?.url, req?.headers as Record<string, unknown>);
    });

    this.retryInterval = setInterval(() => {
      void this.retryPendingSends();
    }, this.resendIntervalMs);
  }

  destroy(): void {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
    }
    this.wss.close();
    this.clients.clear();
    this.subscriptions.clear();
    this.pending.clear();
    logger.info('RealTimeService cleaned up');
  }

  broadcast(params: { organizationId?: string; channel: string; type: string; payload: unknown }): void {
    void this.persistAndBroadcast(params);
  }

  private async retryPendingSends(): Promise<void> {
    const now = Date.now();

    for (const [ws, pendingBySeq] of this.pending.entries()) {
      const socket = ws as any;
      if (!socket || socket.readyState !== 1) {
        this.pending.delete(ws);
        continue;
      }

      const identity = this.clients.get(ws);
      if (!identity) {
        this.pending.delete(ws);
        continue;
      }

      for (const [seq, item] of pendingBySeq.entries()) {
        if ((identity.lastAckSeq || 0) >= seq) {
          pendingBySeq.delete(seq);
          continue;
        }

        if (now - item.lastSentAt < this.resendAfterMs) continue;

        if (item.attempts >= this.maxResendAttempts) {
          try {
            socket.send(JSON.stringify({ type: 'delivery_failed', seq }));
          } catch { /* ignore */ }
          try {
            socket.close();
          } catch { /* ignore */ }
          pendingBySeq.delete(seq);
          continue;
        }

        const subs = this.subscriptions.get(ws);
        if (!subs || !subs.has(item.event.channel)) {
          pendingBySeq.delete(seq);
          continue;
        }

        if (item.organizationId && identity.organizationId !== item.organizationId) {
          pendingBySeq.delete(seq);
          continue;
        }

        try {
          socket.send(JSON.stringify({ type: 'event', organizationId: item.organizationId, event: item.event }));
          pendingBySeq.set(seq, { ...item, attempts: item.attempts + 1, lastSentAt: now });
        } catch { /* ignore */ }
      }

      if (pendingBySeq.size === 0) {
        this.pending.delete(ws);
      }
    }
  }

  private trackPending(ws: any, identity: ConnectionIdentity, item: { organizationId?: string; event: RealtimeEvent }): void {
    if (item.event.seq <= 0) return;
    const lastAck = identity.lastAckSeq || 0;
    if (lastAck >= item.event.seq) return;

    const bySeq = this.pending.get(ws) ?? new Map();
    if (!bySeq.has(item.event.seq)) {
      bySeq.set(item.event.seq, {
        organizationId: item.organizationId,
        event: item.event,
        attempts: 1,
        lastSentAt: Date.now(),
      });
      this.pending.set(ws, bySeq);
    }
  }

  private clearAcked(ws: any, identity: ConnectionIdentity): void {
    const bySeq = this.pending.get(ws);
    if (!bySeq) return;
    const lastAck = identity.lastAckSeq || 0;

    for (const seq of bySeq.keys()) {
      if (seq <= lastAck) {
        bySeq.delete(seq);
      }
    }

    if (bySeq.size === 0) {
      this.pending.delete(ws);
    } else {
      this.pending.set(ws, bySeq);
    }
  }

  private async replaySince(ws: any, identity: ConnectionIdentity, subs: Set<string>, since: number): Promise<void> {
    try {
      const channels = Array.from(subs.values());
      if (!channels.length) return;

      const whereOrg = identity.organizationId
        ? or(eq(realtimeEvents.organizationId, identity.organizationId as any), isNull(realtimeEvents.organizationId))
        : isNull(realtimeEvents.organizationId);

      const rows = await pgDb
        .select({
          seq: realtimeEvents.seq,
          timestamp: realtimeEvents.timestamp,
          channel: realtimeEvents.channel,
          type: realtimeEvents.type,
          payload: realtimeEvents.payload,
          organizationId: realtimeEvents.organizationId,
        })
        .from(realtimeEvents)
        .where(and(whereOrg, gt(realtimeEvents.seq, since), inArray(realtimeEvents.channel, channels as any)))
        .orderBy(asc(realtimeEvents.seq))
        .limit(this.bufferSize);

      const replay: RealtimeEvent[] = rows.map((r: any) => ({
        seq: Number(r.seq),
        timestamp: Number(r.timestamp),
        channel: String(r.channel),
        type: String(r.type),
        payload: r.payload,
      }));

      if (!replay.length) return;

      ws.send(JSON.stringify({ type: 'replay', since, events: replay }));
      for (const evt of replay) {
        this.trackPending(ws, identity, {
          ...(identity.organizationId ? { organizationId: identity.organizationId } : {}),
          event: evt,
        });
      }
    } catch { /* best effort */ }
  }

  async persistAndBroadcast(params: { organizationId?: string; channel: string; type: string; payload: unknown }): Promise<void> {
    const eventTimestamp = Date.now();

    let persistedSeq: number;
    try {
      const [row] = await pgDb
        .insert(realtimeEvents)
        .values({
          organizationId: (params.organizationId as any) ?? null,
          channel: params.channel,
          type: params.type,
          payload: (params.payload as any) ?? {},
          timestamp: eventTimestamp,
        } as any)
        .returning({ seq: realtimeEvents.seq });

      persistedSeq = Number((row as any)?.seq);
      if (!Number.isFinite(persistedSeq) || persistedSeq <= 0) {
        return;
      }
    } catch (error: unknown) {
      logger.error('Failed to persist realtime event', error instanceof Error ? error : new Error(String(error)));
      return;
    }

    const event: RealtimeEvent = {
      seq: persistedSeq,
      timestamp: eventTimestamp,
      channel: params.channel,
      type: params.type,
      payload: params.payload,
    };

    const frame = JSON.stringify({ type: 'event', organizationId: params.organizationId, event });

    for (const [clientWs, identity] of this.clients.entries()) {
      const socket = clientWs as any;
      if (socket.readyState !== 1) continue;
      const subs = this.subscriptions.get(clientWs);
      if (!subs || !subs.has(params.channel)) continue;
      if (params.organizationId && identity.organizationId !== params.organizationId) continue;

      try {
        socket.send(frame);
        this.trackPending(clientWs, identity, {
          ...(params.organizationId ? { organizationId: params.organizationId } : {}),
          event,
        });
      } catch (error: unknown) { /* ignore */ }
    }
  }

  private handleConnection(ws: any, url?: string, headers?: Record<string, unknown>): void {
    const token = getTokenFromRequestUrl(url) || getBearerTokenFromHeaders(headers);
    const payload = token ? verifyToken(token) : null;

    const identity: ConnectionIdentity = {
      connectionId: `ws_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      ...(payload?.userId ? { userId: payload.userId } : {}),
      ...(payload?.organizationId ? { organizationId: payload.organizationId } : {}),
      lastAckSeq: 0,
      rate: {
        windowStartMs: Date.now(),
        count: 0,
      },
    };

    this.clients.set(ws, identity);
    void this.onAuthenticatedConnection(ws, identity);

    const subs = new Set<string>();
    subs.add('public');
    if (identity.organizationId) {
      subs.add('org');
    }
    if (url?.includes('/ws/phone-status')) {
      subs.add('phone-status');
    }
    this.subscriptions.set(ws, subs);

    ws.send(
      JSON.stringify({
        type: 'hello',
        connectionId: identity.connectionId,
        authenticated: Boolean(identity.userId),
        organizationId: identity.organizationId,
        subscribed: Array.from(subs.values()),
      })
    );

    ws.on('message', (raw: any) => {
      const msg = safeJsonParse(raw.toString());
      if (!msg || typeof (msg as any).type !== 'string') return;
      void this.handleClientMessage(ws, identity, msg as ClientMessage);
    });

    ws.on('close', () => {
      this.clients.delete(ws);
      this.subscriptions.delete(ws);
      this.pending.delete(ws);
      void this.onDisconnected(identity);
    });

    ws.on('error', () => {
      this.clients.delete(ws);
      this.subscriptions.delete(ws);
      this.pending.delete(ws);
      void this.onDisconnected(identity);
    });
  }

  private async onAuthenticatedConnection(ws: any, identity: ConnectionIdentity): Promise<void> {
    if (!identity.userId || !identity.organizationId) return;

    try {
      const rows = await pgDb
        .select({ lastAckSeq: realtimeClientState.lastAckSeq })
        .from(realtimeClientState)
        .where(
          and(
            eq(realtimeClientState.organizationId, identity.organizationId as any),
            eq(realtimeClientState.userId, identity.userId as any)
          )
        )
        .limit(1);

      const last = Number((rows as any)?.[0]?.lastAckSeq ?? 0);
      identity.lastAckSeq = Number.isFinite(last) ? last : 0;
    } catch {
      identity.lastAckSeq = identity.lastAckSeq ?? 0;
    }

    const now = new Date();
    try {
      await pgDb
        .insert(realtimePresence)
        .values({
          organizationId: identity.organizationId as any,
          userId: identity.userId as any,
          isOnline: true,
          lastSeenAt: now,
          updatedAt: now,
        } as any)
        .onConflictDoUpdate({
          target: [realtimePresence.organizationId, realtimePresence.userId],
          set: {
            isOnline: true,
            lastSeenAt: now,
            updatedAt: now,
          } as any,
        });
    } catch { /* best effort */ }

    this.broadcast({
      organizationId: identity.organizationId,
      channel: 'presence',
      type: 'presence.update',
      payload: { userId: identity.userId, isOnline: true, ts: Date.now() },
    });

    const subs = this.subscriptions.get(ws);
    if (subs) {
      await this.replaySince(ws, identity, subs, identity.lastAckSeq ?? 0);
    }
  }

  private async onDisconnected(identity: ConnectionIdentity): Promise<void> {
    if (!identity.userId || !identity.organizationId) return;
    const now = new Date();

    try {
      await pgDb
        .insert(realtimePresence)
        .values({
          organizationId: identity.organizationId as any,
          userId: identity.userId as any,
          isOnline: false,
          lastSeenAt: now,
          updatedAt: now,
        } as any)
        .onConflictDoUpdate({
          target: [realtimePresence.organizationId, realtimePresence.userId],
          set: {
            isOnline: false,
            lastSeenAt: now,
            updatedAt: now,
          } as any,
        });
    } catch { /* best effort */ }

    this.broadcast({
      organizationId: identity.organizationId,
      channel: 'presence',
      type: 'presence.update',
      payload: { userId: identity.userId, isOnline: false, ts: Date.now() },
    });
  }

  private async handleClientMessage(ws: any, identity: ConnectionIdentity, msg: ClientMessage): Promise<void> {
    switch (msg.type) {
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong', ts: Date.now() }));
        break;
      case 'ack':
        identity.lastAckSeq = Math.max(identity.lastAckSeq || 0, msg.seq);
        this.clients.set(ws, identity);
        ws.send(JSON.stringify({ type: 'ack', seq: msg.seq }));
        this.clearAcked(ws, identity);

        if (identity.userId && identity.organizationId) {
          const now = new Date();
          try {
            await pgDb
              .insert(realtimeClientState)
              .values({
                organizationId: identity.organizationId as any,
                userId: identity.userId as any,
                lastAckSeq: identity.lastAckSeq || 0,
                updatedAt: now,
              } as any)
              .onConflictDoUpdate({
                target: [realtimeClientState.organizationId, realtimeClientState.userId],
                set: {
                  lastAckSeq: identity.lastAckSeq || 0,
                  updatedAt: now,
                } as any,
              });
          } catch { /* best effort */ }
        }
        break;
      case 'subscribe':
        const subs = this.subscriptions.get(ws) ?? new Set<string>();
        for (const ch of msg.channels) {
          if (typeof ch === 'string' && ch.length > 0) subs.add(ch);
        }
        this.subscriptions.set(ws, subs);

        const since =
          typeof msg.since === 'number'
            ? msg.since
            : identity.userId && identity.organizationId
              ? (identity.lastAckSeq ?? 0)
              : undefined;

        if (since !== undefined) {
          await this.replaySince(ws, identity, subs, since);
        }

        ws.send(JSON.stringify({ type: 'subscribed', channels: Array.from(subs.values()) }));
        break;
      case 'message':
        if (this.isRateLimited(identity)) {
          ws.send(JSON.stringify({ type: 'rate_limited', retryAfterMs: 1000 }));
          return;
        }

        const eventTimestamp = Date.now();
        let seq = 0;

        try {
          const [row] = await pgDb
            .insert(realtimeEvents)
            .values({
              organizationId: (identity.organizationId as any) ?? null,
              channel: msg.channel,
              type: 'message',
              payload: {
                from: identity.userId || identity.connectionId,
                body: msg.payload,
              } as any,
              timestamp: eventTimestamp,
            } as any)
            .returning({ seq: realtimeEvents.seq });

          seq = Number((row as any)?.seq);
          if (!Number.isFinite(seq) || seq <= 0) {
            ws.send(JSON.stringify({ type: 'error', code: 'persist_failed' }));
            return;
          }
        } catch {
          ws.send(JSON.stringify({ type: 'error', code: 'persist_failed' }));
          return;
        }

        const event: RealtimeEvent = {
          seq,
          timestamp: eventTimestamp,
          channel: msg.channel,
          type: 'message',
          payload: {
            from: identity.userId || identity.connectionId,
            body: msg.payload,
          },
        };

        const frame = JSON.stringify({ type: 'event', organizationId: identity.organizationId, event });
        for (const [clientWs, otherIdentity] of this.clients.entries()) {
          const socket = clientWs as any;
          if (socket.readyState !== 1) continue;
          const otherSubs = this.subscriptions.get(clientWs);
          if (!otherSubs || !otherSubs.has(msg.channel)) continue;
          if (identity.organizationId && otherIdentity.organizationId !== identity.organizationId) continue;
          try {
            socket.send(frame);
            this.trackPending(clientWs, otherIdentity, {
              ...(identity.organizationId ? { organizationId: identity.organizationId } : {}),
              event,
            });
          } catch { /* ignore */ }
        }

        ws.send(JSON.stringify({ type: 'delivered', seq }));
        break;
    }
  }

  private isRateLimited(identity: ConnectionIdentity): boolean {
    const now = Date.now();
    if (!identity.rate) {
      identity.rate = { windowStartMs: now, count: 0 };
    }

    const elapsed = now - identity.rate.windowStartMs;
    if (elapsed >= 1000) {
      identity.rate.windowStartMs = now;
      identity.rate.count = 0;
    }

    identity.rate.count += 1;
    return identity.rate.count > this.inboundMessageLimitPerSecond;
  }
}

export default RealTimeService;
