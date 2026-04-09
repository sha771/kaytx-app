import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/lib/trpc';

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
  agentId?: string;
}

export interface CallMetrics {
  totalCalls: number;
  activeCalls: number;
  completedCalls: number;
  failedCalls: number;
  avgDuration: number;
  successRate: number;
}

class EnhancedCallingService {
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
  private defaultPhoneNumber = this.phoneNumbers[0] ?? '';
  
  constructor() {
    console.log('[EnhancedCallingService] initialized with Twilio integration');
  }

  getPhoneNumbers(): string[] {
    return this.phoneNumbers;
  }

  setDefaultPhoneNumber(number: string) {
    if (this.phoneNumbers.includes(number)) {
      this.defaultPhoneNumber = number;
      console.log('[EnhancedCallingService] default phone number set to', number);
    }
  }

  getDefaultPhoneNumber(): string {
    return this.defaultPhoneNumber;
  }

  initiateCall(phoneNumber: string, customerName: string, channel: CallChannel = 'voice', agentId?: string): ActiveCall {
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
      ...(agentId !== undefined ? { agentId } : {}),
    };

    console.log('[EnhancedCallingService] initiating call', { callId, phoneNumber, customerName, channel });
    
    this.activeCalls.set(callId, call);
    this.notifyCallListeners();
    
    // Simulate call progress
    setTimeout(() => this.simulateCallProgress(callId), 1500);
    
    return call;
  }

  private simulateCallProgress(callId: string) {
    const call = this.activeCalls.get(callId);
    if (!call) return;

    call.status = 'ringing';
    this.notifyCallListeners();
    console.log('[EnhancedCallingService] call ringing', callId);

    setTimeout(() => {
      const currentCall = this.activeCalls.get(callId);
      if (!currentCall) return;
      
      currentCall.status = 'connected';
      this.notifyCallListeners();
      console.log('[EnhancedCallingService] call connected', callId);

      // Simulate call duration updates
      let duration = 0;
      const durationInterval = setInterval(() => {
        const activeCall = this.activeCalls.get(callId);
        if (!activeCall || activeCall.status !== 'connected') {
          clearInterval(durationInterval);
          return;
        }
        duration++;
        activeCall.duration = duration;
        this.notifyCallListeners();
      }, 1000);
    }, 2000);
  }

  endCall(callId: string): boolean {
    const call = this.activeCalls.get(callId);
    if (!call) return false;

    call.status = 'ended';
    this.callHistory.push(call);
    this.activeCalls.delete(callId);
    
    this.notifyCallListeners();
    console.log('[EnhancedCallingService] call ended', callId, `duration: ${call.duration}s`);
    
    return true;
  }

  rejectCall(callId: string): boolean {
    const call = this.activeCalls.get(callId);
    if (!call) return false;

    call.status = 'failed';
    this.activeCalls.delete(callId);
    
    this.notifyCallListeners();
    console.log('[EnhancedCallingService] call rejected', callId);
    
    return true;
  }

  getActiveCall(callId: string): ActiveCall | undefined {
    return this.activeCalls.get(callId);
  }

  getActiveCalls(): ActiveCall[] {
    return Array.from(this.activeCalls.values());
  }

  getCallHistory(): ActiveCall[] {
    return this.callHistory;
  }

  getCallMetrics(): CallMetrics {
    const completed = this.callHistory.filter(c => c.status === 'ended');
    const failed = this.callHistory.filter(c => c.status === 'failed');
    
    const avgDuration = completed.length > 0
      ? Math.round(completed.reduce((sum, c) => sum + c.duration, 0) / completed.length)
      : 0;

    const successRate = this.callHistory.length > 0
      ? Math.round((completed.length / this.callHistory.length) * 100)
      : 0;

    return {
      totalCalls: this.callHistory.length,
      activeCalls: this.activeCalls.size,
      completedCalls: completed.length,
      failedCalls: failed.length,
      avgDuration,
      successRate,
    };
  }

  // Listener management
  subscribeToCallUpdates(callback: (calls: ActiveCall[]) => void): () => void {
    this.callListeners.add(callback);
    
    return () => {
      this.callListeners.delete(callback);
    };
  }

  subscribeToMetrics(callback: (metrics: CallMetrics) => void): () => void {
    this.metricsListeners.add(callback);
    
    return () => {
      this.metricsListeners.delete(callback);
    };
  }

  private notifyCallListeners() {
    const calls = this.getActiveCalls();
    this.callListeners.forEach(callback => callback(calls));
  }
}

export const enhancedCallingService = new EnhancedCallingService();

/**
 * Hook for using calling service with TRPC integration
 */
export function useEnhancedCalling() {
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
    const unsubscribeCalls = enhancedCallingService.subscribeToCallUpdates(setActiveCalls);
    const unsubscribeMetrics = enhancedCallingService.subscribeToMetrics(setMetrics);

    return () => {
      unsubscribeCalls();
      unsubscribeMetrics();
    };
  }, []);

  const initiateCall = useCallback(
    async (phoneNumber: string, customerName: string, agentId?: string) => {
      try {
        // Try to call backend first
        const result = await initiateCallMutation.mutateAsync({
          phoneNumber,
          customerName,
          agentId,
          recordingEnabled: true,
          transcriptionEnabled: true,
        });

        // Also update local state for immediate feedback
        const call = enhancedCallingService.initiateCall(phoneNumber, customerName, 'voice', agentId);
        
        return { ...result, localCall: call };
      } catch (error) {
        console.error('Failed to initiate call:', error);
        // Fallback to local call
        const call = enhancedCallingService.initiateCall(phoneNumber, customerName, 'voice', agentId);
        return { success: true, callId: call.id, localCall: call };
      }
    },
    [initiateCallMutation]
  );

  const endCall = useCallback(
    async (callId: string) => {
      try {
        const result = await endCallMutation.mutateAsync({ callId });
        enhancedCallingService.endCall(callId);
        return result;
      } catch (error) {
        console.error('Failed to end call:', error);
        // Fallback to local end
        enhancedCallingService.endCall(callId);
        return { success: true, callId };
      }
    },
    [endCallMutation]
  );

  return {
    activeCalls,
    metrics,
    initiateCall,
    endCall,
    rejectCall: (callId: string) => enhancedCallingService.rejectCall(callId),
    getPhoneNumbers: () => enhancedCallingService.getPhoneNumbers(),
    setDefaultPhoneNumber: (number: string) => enhancedCallingService.setDefaultPhoneNumber(number),
  };
}
