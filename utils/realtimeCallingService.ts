import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/providers/AuthProvider';
import { encryptionAtRest } from '@/utils/encryptionAtRest';

export type CallStatus = 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended' | 'failed';
export type CallChannel = 'voice' | 'whatsapp' | 'sms';

export interface ActiveCall {
  id: string;
  phoneNumber: string;
  customerName: string;
  status: CallStatus;
  startTime?: Date;
  duration: number;
  channel: CallChannel;
  recordingEnabled: boolean;
  transcriptionEnabled: boolean;
}

export interface CallMetrics {
  totalCalls: number;
  activeCalls: number;
  completedCalls: number;
  failedCalls: number;
  avgDuration: number;
  successRate: number;
}

type ServerRealtimeEvent = {
  seq: number;
  timestamp: number;
  channel: string;
  type: string;
  payload: any;
};

type ServerFrame =
  | { type: 'hello'; connectionId: string; authenticated: boolean; organizationId?: string; subscribed?: string[] }
  | { type: 'event'; organizationId?: string; event: ServerRealtimeEvent }
  | { type: 'replay'; since: number; events: ServerRealtimeEvent[] }
  | { type: 'subscribed'; channels: string[] }
  | { type: 'pong'; ts: number }
  | { type: 'ack'; seq: number }
  | { type: 'delivered'; seq: number };

type ClientFrame =
  | { type: 'ping' }
  | { type: 'ack'; seq: number }
  | { type: 'subscribe'; channels: string[]; since?: number };

const REALTIME_SEQ_KEY_PREFIX = 'realtime_last_seq_v1';

function getWsUrl(path: string, token: string): string {
  const base = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  if (!base) throw new Error('No base url found, please set EXPO_PUBLIC_RORK_API_BASE_URL');

  const httpUrl = base.replace(/\/$/, '');
  const wsBase = httpUrl.startsWith('https://')
    ? `wss://${httpUrl.slice('https://'.length)}`
    : httpUrl.startsWith('http://')
      ? `ws://${httpUrl.slice('http://'.length)}`
      : httpUrl;

  const join = path.startsWith('/') ? path : `/${path}`;
  return `${wsBase}${join}?token=${encodeURIComponent(token)}`;
}

function safeParse(raw: any): any {
  try {
    return JSON.parse(String(raw));
  } catch {
    return null;
  }
}

function mapBackendStatus(status: string | undefined): CallStatus {
  switch (status) {
    case 'initiated':
      return 'dialing';
    case 'ringing':
      return 'ringing';
    case 'in-progress':
      return 'connected';
    case 'completed':
      return 'ended';
    case 'failed':
    case 'canceled':
      return 'failed';
    default:
      return 'idle';
  }
}

function toActiveCall(call: any): ActiveCall {
  return {
    id: String(call?.id || ''),
    phoneNumber: String(call?.phoneNumber || ''),
    customerName: String(call?.customerName || 'Customer'),
    status: mapBackendStatus(call?.status),
    ...(call?.startTime ? { startTime: new Date(call.startTime) } : {}),
    duration: Number(call?.duration || 0),
    channel: (call?.channel as CallChannel) || 'voice',
    recordingEnabled: Boolean(call?.recordingEnabled ?? true),
    transcriptionEnabled: Boolean(call?.transcriptionEnabled ?? true),
  };
}

class RealtimeCallingService {
  private activeCalls: Map<string, ActiveCall> = new Map();
  private callListeners: Set<(calls: ActiveCall[]) => void> = new Set();
  private metricsListeners: Set<(metrics: CallMetrics) => void> = new Set();
  private connectionListeners: Set<(connected: boolean) => void> = new Set();
  private eventListeners: Set<(frame: ServerFrame) => void> = new Set();
  private callHistory: ActiveCall[] = [];

  private ws: WebSocket | null = null;
  private wsConnected = false;
  private reconnectTimer: any = null;
  private reconnectAttempt = 0;
  private lastSeq = 0;
  private token: string | null = null;
  private scopeKey: string = 'public';
  private persistTimer: any = null;
  private pendingDeliveries: ((seq: number) => void)[] = [];

  private phoneNumbers = [
    '+1 (555) 100-2000',
    '+1 (800) 555-9999',
    '+44 20 7946 0958',
    '+61 2 8005 4321',
    '+91 22 4567 8900',
    '+1 (888) 234-5678',
    '+1 (877) 888-9000',
    '+44 20 3155 1234',
    '+61 3 9012 3456',
    '+49 30 5557 8901',
  ];
  private defaultPhoneNumber = this.phoneNumbers[0] ?? '';
  
  constructor() {
    console.log('[RealtimeCallingService] initialized with phone numbers', this.phoneNumbers);
  }

  connect(token: string, organizationId?: string) {
    if (!token) return;

    const nextScope = organizationId || 'public';
    const scopeChanged = this.scopeKey !== nextScope;

    if (this.token === token && !scopeChanged && this.ws && this.wsConnected) return;

    this.token = token;

    if (scopeChanged) {
      this.scopeKey = nextScope;
      void this.loadLastSeq().then(() => {
        if (this.token !== token) return;
        this.openSocket();
      });
      return;
    }

    this.openSocket();
  }

  disconnect() {
    this.token = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
      this.persistTimer = null;
    }
    this.pendingDeliveries = [];
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        // ignore
      }
    }
    this.ws = null;
    this.setConnected(false);
  }

  async sendMessage(channel: string, payload: unknown): Promise<number> {
    if (!this.ws || this.ws.readyState !== 1) {
      throw new Error('WebSocket is not connected');
    }

    const message: any = { type: 'message', channel, payload };
    const promise = new Promise<number>((resolve) => {
      this.pendingDeliveries.push(resolve);
    });

    this.ws.send(JSON.stringify(message));
    return promise;
  }

  private getSeqStorageKey(): string {
    return `${REALTIME_SEQ_KEY_PREFIX}:${this.scopeKey}:phone-status`;
  }

  private schedulePersistSeq() {
    if (this.persistTimer) return;
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null;
      void encryptionAtRest.secureStore(this.getSeqStorageKey(), String(this.lastSeq));
    }, 750);
  }

  private async loadLastSeq() {
    try {
      const raw = await encryptionAtRest.secureRetrieve(this.getSeqStorageKey());
      const parsed = raw ? Number(raw) : 0;
      this.lastSeq = Number.isFinite(parsed) ? parsed : 0;
    } catch {
      this.lastSeq = 0;
    }
  }

  subscribeToConnection(listener: (connected: boolean) => void) {
    this.connectionListeners.add(listener);
    listener(this.wsConnected);
    return () => this.connectionListeners.delete(listener);
  }

  subscribeToEvents(listener: (frame: ServerFrame) => void) {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  upsertLocalCall(call: ActiveCall) {
    if (!call?.id) return;
    this.activeCalls.set(call.id, call);
    this.notifyCallListeners();
  }

  initiateCall(phoneNumber: string, customerName: string, channel: CallChannel = 'voice'): string {
    const callId = `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const call: ActiveCall = {
      id: callId,
      phoneNumber,
      customerName,
      status: 'dialing',
      startTime: new Date(),
      duration: 0,
      channel,
      recordingEnabled: true,
      transcriptionEnabled: true,
    };

    this.upsertLocalCall(call);
    return callId;
  }

  private openSocket() {
    if (!this.token) return;

    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        // ignore
      }
      this.ws = null;
    }

    const url = getWsUrl('/ws/phone-status', this.token);
    const ws = new WebSocket(url);
    this.ws = ws;

    ws.onopen = () => {
      this.reconnectAttempt = 0;
      this.setConnected(true);
      const frame: ClientFrame = {
        type: 'subscribe',
        channels: ['phone-status'],
        since: this.lastSeq || 0,
      };
      ws.send(JSON.stringify(frame));
    };

    ws.onmessage = (evt: any) => {
      const msg = safeParse(evt?.data);
      if (!msg || typeof msg.type !== 'string') return;
      this.handleServerFrame(msg as ServerFrame);
    };

    ws.onerror = () => {
      this.setConnected(false);
    };

    ws.onclose = () => {
      this.setConnected(false);
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect() {
    if (!this.token) return;
    if (this.reconnectTimer) return;

    const attempt = Math.min(this.reconnectAttempt + 1, 10);
    this.reconnectAttempt = attempt;
    const delay = Math.min(1000 * Math.pow(2, Math.max(0, attempt - 1)), 30000);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.openSocket();
    }, delay);
  }

  private setConnected(connected: boolean) {
    this.wsConnected = connected;
    this.connectionListeners.forEach((l) => l(connected));
  }

  private handleServerFrame(frame: ServerFrame) {
    this.eventListeners.forEach((l) => l(frame));

    if (frame.type === 'event') {
      this.lastSeq = Math.max(this.lastSeq, frame.event.seq);
      this.schedulePersistSeq();
      this.sendAck(frame.event.seq);
      this.applyRealtimeEvent(frame.event);
      return;
    }

    if (frame.type === 'replay') {
      for (const ev of frame.events || []) {
        this.lastSeq = Math.max(this.lastSeq, ev.seq);
        this.schedulePersistSeq();
        this.sendAck(ev.seq);
        this.applyRealtimeEvent(ev);
      }
      return;
    }

    if (frame.type === 'delivered') {
      const resolve = this.pendingDeliveries.shift();
      if (resolve) resolve(frame.seq);
      return;
    }
  }

  private sendAck(seq: number) {
    if (!this.ws || this.ws.readyState !== 1) return;
    const ack: ClientFrame = { type: 'ack', seq };
    this.ws.send(JSON.stringify(ack));
  }

  private applyRealtimeEvent(ev: ServerRealtimeEvent) {
    if (ev.channel !== 'phone-status') return;
    if (ev.type !== 'call_update') return;
    const call = ev.payload?.call;
    const eventName = ev.payload?.event;
    if (!call) return;

    const mapped = toActiveCall(call);
    if (!mapped.id) return;

    if (eventName === 'call:completed' || eventName === 'call:ended' || eventName === 'call:failed') {
      this.callHistory.push({ ...mapped });
      this.activeCalls.delete(mapped.id);
      this.notifyCallListeners();
      this.notifyMetricsListeners();
      return;
    }

    this.activeCalls.set(mapped.id, mapped);
    this.notifyCallListeners();
    this.notifyMetricsListeners();
  }

  getPhoneNumbers(): string[] {
    return this.phoneNumbers;
  }

  setDefaultPhoneNumber(number: string) {
    if (this.phoneNumbers.includes(number)) {
      this.defaultPhoneNumber = number;
      console.log('[RealtimeCallingService] default phone number set to', number);
    }
  }

  endLocalCall(callId: string) {
    const call = this.activeCalls.get(callId);
    if (!call) return;

    call.status = 'ended';
    this.callHistory.push({ ...call });
    this.activeCalls.delete(callId);
    this.notifyCallListeners();
    this.notifyMetricsListeners();
  }

  getActiveCall(callId: string): ActiveCall | undefined {
    return this.activeCalls.get(callId);
  }

  getActiveCalls(): ActiveCall[] {
    return Array.from(this.activeCalls.values());
  }

  getCallMetrics(): CallMetrics {
    const total = this.callHistory.length + this.activeCalls.size;
    const active = this.activeCalls.size;
    const completed = this.callHistory.filter(c => c.status === 'ended').length;
    const failed = this.callHistory.filter(c => c.status === 'failed').length;
    
    const avgDuration = this.callHistory.length > 0
      ? this.callHistory.reduce((sum, call) => sum + call.duration, 0) / this.callHistory.length
      : 0;
    
    const successRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      totalCalls: total,
      activeCalls: active,
      completedCalls: completed,
      failedCalls: failed,
      avgDuration: Math.floor(avgDuration),
      successRate: Math.floor(successRate),
    };
  }

  subscribeToActiveCalls(listener: (calls: ActiveCall[]) => void) {
    this.callListeners.add(listener);
    listener(this.getActiveCalls());
    
    return () => {
      this.callListeners.delete(listener);
    };
  }

  subscribeToMetrics(listener: (metrics: CallMetrics) => void) {
    this.metricsListeners.add(listener);
    listener(this.getCallMetrics());
    
    return () => {
      this.metricsListeners.delete(listener);
    };
  }

  private notifyCallListeners() {
    const calls = this.getActiveCalls();
    this.callListeners.forEach(listener => listener(calls));
  }

  private notifyMetricsListeners() {
    const metrics = this.getCallMetrics();
    this.metricsListeners.forEach(listener => listener(metrics));
  }

  callToPhoneNumber(number: string = this.defaultPhoneNumber, customerName: string = 'Customer', channel: CallChannel = 'voice') {
    console.log('[RealtimeCallingService] calling to', number);
    return { number, customerName, channel };
  }

  getDefaultPhoneNumber(): string {
    return this.defaultPhoneNumber;
  }
}

export const realtimeCallingService = new RealtimeCallingService();

export function useRealtimeCalls() {
  const { token, user } = useAuth();
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>([]);
  const [metrics, setMetrics] = useState<CallMetrics>({
    totalCalls: 0,
    activeCalls: 0,
    completedCalls: 0,
    failedCalls: 0,
    avgDuration: 0,
    successRate: 0,
  });

  const initiateCallMutation = trpc.calling.initiateCall.useMutation();
  const endCallMutation = trpc.calling.endCall.useMutation();

  useEffect(() => {
    const unsubscribeCalls = realtimeCallingService.subscribeToActiveCalls(setActiveCalls);
    const unsubscribeMetrics = realtimeCallingService.subscribeToMetrics(setMetrics);

    return () => {
      unsubscribeCalls();
      unsubscribeMetrics();
    };
  }, []);

  useEffect(() => {
    if (token) {
      realtimeCallingService.connect(token, user?.organizationId);
      return;
    }

    realtimeCallingService.disconnect();
  }, [token, user?.organizationId]);

  const initiateCall = useCallback(
    async (phoneNumber: string, customerName: string, channel: CallChannel = 'voice') => {
      const result = await initiateCallMutation.mutateAsync({
        phoneNumber,
        customerName,
        recordingEnabled: true,
        transcriptionEnabled: true,
      });

      const call: ActiveCall = {
        id: result.callId,
        phoneNumber: result.phoneNumber,
        customerName,
        status: 'ringing',
        startTime: result.startTime ? new Date(result.startTime as any) : new Date(),
        duration: 0,
        channel,
        recordingEnabled: true,
        transcriptionEnabled: true,
      };

      realtimeCallingService.upsertLocalCall(call);
      return result.callId;
    },
    [initiateCallMutation]
  );

  const endCall = useCallback(
    async (callId: string) => {
      await endCallMutation.mutateAsync({ callId });
      realtimeCallingService.endLocalCall(callId);
    },
    [endCallMutation]
  );

  const callToDefault = useCallback(
    (customerName: string = 'Customer', channel: CallChannel = 'voice') => {
      const { number } = realtimeCallingService.callToPhoneNumber(
        realtimeCallingService.getDefaultPhoneNumber(),
        customerName,
        channel
      );
      return initiateCall(number, customerName, channel);
    },
    [initiateCall]
  );

  return {
    activeCalls,
    metrics,
    initiateCall,
    endCall,
    callToDefault,
    defaultPhoneNumber: realtimeCallingService.getDefaultPhoneNumber(),
  };
}
