import { useState, useEffect, useCallback, useRef } from 'react';
import { CounselingSession } from './useAgentCounseling';

interface RealTimeCounselingOptions {
  agentId: string;
  onSessionUpdate?: (session: CounselingSession) => void;
  onNewSession?: (session: CounselingSession) => void;
  onSessionComplete?: (session: CounselingSession) => void;
  onError?: (error: Error) => void;
}

interface RealTimeCounselingState {
  isConnected: boolean;
  lastEvent: CounselingSession | null;
  error: Error | null;
}

/**
 * Hook for real-time counseling session updates via SSE
 * Provides live updates when counseling sessions change
 */
export function useRealTimeCounseling(options: RealTimeCounselingOptions) {
  const [state, setState] = useState<RealTimeCounselingState>({
    isConnected: false,
    lastEvent: null,
    error: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const url = `/api/counseling/stream?agentId=${encodeURIComponent(options.agentId)}`;
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('[RealTimeCounseling] Connected');
        setState(prev => ({ ...prev, isConnected: true, error: null }));
        reconnectAttempts.current = 0;
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'session_update':
              setState(prev => ({ ...prev, lastEvent: data.session }));
              options.onSessionUpdate?.(data.session);
              break;
            case 'new_session':
              setState(prev => ({ ...prev, lastEvent: data.session }));
              options.onNewSession?.(data.session);
              break;
            case 'session_complete':
              setState(prev => ({ ...prev, lastEvent: data.session }));
              options.onSessionComplete?.(data.session);
              break;
            case 'ping':
              // Keep-alive ping
              break;
            default:
              console.log('[RealTimeCounseling] Unknown event type:', data.type);
          }
        } catch (err) {
          console.error('[RealTimeCounseling] Failed to parse event:', err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('[RealTimeCounseling] Connection error:', error);
        setState(prev => ({ ...prev, isConnected: false, error: new Error('Connection lost') }));
        
        eventSource.close();
        options.onError?.(new Error('Real-time connection lost'));

        // Attempt reconnection
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts.current++;
          console.log(`[RealTimeCounseling] Reconnecting... Attempt ${reconnectAttempts.current}`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY * reconnectAttempts.current);
        }
      };
    } catch (err) {
      console.error('[RealTimeCounseling] Failed to connect:', err);
      setState(prev => ({ ...prev, error: err as Error }));
      options.onError?.(err as Error);
    }
  }, [options.agentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setState(prev => ({ ...prev, isConnected: false }));
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
  };
}

export default useRealTimeCounseling;
