import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './trpc';
import AsyncStorage from '@react-native-async-storage/async-storage';

// React hook for API calls with loading states
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';

// Create tRPC client with proper error handling and authentication
export const apiClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'}/api/trpc`,
      headers: () => {
        const token = getAuthToken();
        return {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        };
      },
    }),
  ],
});

// Token management utilities (React Native safe - uses AsyncStorage)
let _cachedToken: string | null = null;

function getAuthToken(): string | null {
  // Return cached token synchronously; async load happens in setAuthToken
  return _cachedToken;
}

export async function loadAuthToken(): Promise<void> {
  try {
    _cachedToken = await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.warn('Failed to load auth token:', error);
  }
}

export function setAuthToken(token: string): void {
  _cachedToken = token;
  AsyncStorage.setItem('authToken', token).catch((error) => {
    console.error('Failed to set auth token:', error);
  });
}

export function clearAuthToken(): void {
  _cachedToken = null;
  AsyncStorage.removeItem('authToken').catch((error) => {
    console.error('Failed to clear auth token:', error);
  });
}

// Load token on module initialization
loadAuthToken().catch(() => {});

// API call wrapper with error handling
export async function apiCall<T>(
  apiFunction: () => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    retry?: number;
  }
): Promise<{ data: T | null; error: Error | null }> {
  const { onSuccess, onError, retry = 1 } = options || {};
  let attempts = 0;

  while (attempts <= retry) {
    try {
      const data = await apiFunction();
      onSuccess?.(data);
      return { data, error: null };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      
      if (attempts === retry) {
        onError?.(err);
        return { data: null, error: err };
      }
      
      attempts++;
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
    }
  }

  return { data: null, error: new Error('Max retry attempts exceeded') };
}

export function useApiCall<T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>,
  params: P = [] as P,
  options?: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    retry?: number;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { immediate = true, onSuccess, onError, retry = 1 } = options || {};

  const execute = useCallback(async (...executeParams: P) => {
    setLoading(true);
    setError(null);
    
    const result = await apiCall(
      () => apiFunction(...executeParams),
      { onSuccess, onError, retry }
    );
    
    setData(result.data);
    setError(result.error);
    setLoading(false);
    
    return result;
  }, [apiFunction, onSuccess, onError, retry]);

   
  useEffect(() => {
    if (immediate && params.length > 0) {
      execute(...params);
    }
  }, [immediate, execute, ...params]);

  return { data, loading, error, execute };
}

// Real-time WebSocket connection for live updates
export class RealtimeClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private subscriptions = new Map<string, Set<(data: any) => void>>();

  constructor(private url: string) {}

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`${this.url}?token=${token}`);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };
        
        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.handleReconnect();
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: { type: string; channel: string; data: any }) {
    const { channel, data } = message;
    const callbacks = this.subscriptions.get(channel);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        const token = getAuthToken();
        if (token) {
          this.connect(token).catch(console.error);
        }
      }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
    }
  }

  subscribe(channel: string, callback: (data: any) => void) {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
    }
    this.subscriptions.get(channel)!.add(callback);
    
    // Send subscription message
    this.send({ type: 'subscribe', channel });
  }

  unsubscribe(channel: string, callback?: (data: any) => void) {
    const callbacks = this.subscriptions.get(channel);
    if (callbacks) {
      if (callback) {
        callbacks.delete(callback);
      } else {
        callbacks.clear();
      }
      
      if (callbacks.size === 0) {
        this.subscriptions.delete(channel);
        this.send({ type: 'unsubscribe', channel });
      }
    }
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
  }
}

// Global realtime client instance
export const realtimeClient = new RealtimeClient(
  process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:3000/ws'
);

// React hook for real-time updates
export function useRealtimeSubscription<T>(
  channel: string,
  callback: (data: T) => void
) {
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      realtimeClient.connect(token).catch(console.error);
      realtimeClient.subscribe(channel, callback);
    }

    return () => {
      realtimeClient.unsubscribe(channel, callback);
    };
  }, [channel, callback]);
}

// Error types for better error handling
export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Utility to check if online (React Native safe - assumes online by default)
export function useOnlineStatus() {
  // In React Native, navigator.onLine and window events are not available.
  // Use a simple state that defaults to true. To improve, integrate
  // @react-native-community/netinfo if needed.
  const [isOnline] = useState(true);
  return isOnline;
}

// Retry utility with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}
