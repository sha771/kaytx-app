import { useState, useEffect, useCallback } from 'react';

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

class RealtimeCallingService {
  private activeCalls: Map<string, ActiveCall> = new Map();
  private callListeners: Set<(calls: ActiveCall[]) => void> = new Set();
  private metricsListeners: Set<(metrics: CallMetrics) => void> = new Set();
  private callHistory: ActiveCall[] = [];
  
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
  private defaultPhoneNumber = this.phoneNumbers[0];
  
  constructor() {
    console.log('[RealtimeCallingService] initialized with phone numbers', this.phoneNumbers);
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

    console.log('[RealtimeCallingService] initiating call', { callId, phoneNumber, customerName, channel });
    
    this.activeCalls.set(callId, call);
    this.notifyCallListeners();
    
    setTimeout(() => this.simulateCallProgress(callId), 1500);
    
    return callId;
  }

  private simulateCallProgress(callId: string) {
    const call = this.activeCalls.get(callId);
    if (!call) return;

    call.status = 'ringing';
    this.notifyCallListeners();
    console.log('[RealtimeCallingService] call ringing', callId);

    setTimeout(() => {
      const currentCall = this.activeCalls.get(callId);
      if (!currentCall) return;
      
      currentCall.status = 'connected';
      currentCall.startTime = new Date();
      this.notifyCallListeners();
      console.log('[RealtimeCallingService] call connected', callId);
      
      this.startDurationTracking(callId);
    }, 2000);
  }

  private startDurationTracking(callId: string) {
    const interval = setInterval(() => {
      const call = this.activeCalls.get(callId);
      if (!call || call.status === 'ended' || call.status === 'failed') {
        clearInterval(interval);
        return;
      }
      
      if (call.startTime) {
        call.duration = Math.floor((Date.now() - call.startTime.getTime()) / 1000);
        this.notifyCallListeners();
      }
    }, 1000);
  }

  endCall(callId: string) {
    const call = this.activeCalls.get(callId);
    if (!call) return;

    console.log('[RealtimeCallingService] ending call', callId);
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
    return this.initiateCall(number, customerName, channel);
  }

  getDefaultPhoneNumber(): string {
    return this.defaultPhoneNumber;
  }
}

export const realtimeCallingService = new RealtimeCallingService();

export function useRealtimeCalls() {
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>([]);
  const [metrics, setMetrics] = useState<CallMetrics>({
    totalCalls: 0,
    activeCalls: 0,
    completedCalls: 0,
    failedCalls: 0,
    avgDuration: 0,
    successRate: 0,
  });

  useEffect(() => {
    const unsubscribeCalls = realtimeCallingService.subscribeToActiveCalls(setActiveCalls);
    const unsubscribeMetrics = realtimeCallingService.subscribeToMetrics(setMetrics);

    return () => {
      unsubscribeCalls();
      unsubscribeMetrics();
    };
  }, []);

  const initiateCall = useCallback((phoneNumber: string, customerName: string, channel: CallChannel = 'voice') => {
    return realtimeCallingService.initiateCall(phoneNumber, customerName, channel);
  }, []);

  const endCall = useCallback((callId: string) => {
    realtimeCallingService.endCall(callId);
  }, []);

  const callToDefault = useCallback((customerName: string = 'Customer', channel: CallChannel = 'voice') => {
    return realtimeCallingService.callToPhoneNumber(
      realtimeCallingService.getDefaultPhoneNumber(),
      customerName,
      channel
    );
  }, []);

  return {
    activeCalls,
    metrics,
    initiateCall,
    endCall,
    callToDefault,
    defaultPhoneNumber: realtimeCallingService.getDefaultPhoneNumber(),
  };
}
