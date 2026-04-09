/**
 * Real-time Service
 * Handles WebSocket connections and real-time updates
 */

import { EventEmitter } from 'events';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RealtimeEvent {
  type: string;
  data: any;
  timestamp: number;
  userId?: string;
  organizationId?: string;
}

export interface ConnectionStatus {
  connected: boolean;
  reconnecting: boolean;
  lastConnected?: number;
  reconnectAttempts: number;
}

class RealtimeService extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private connectionStatus: ConnectionStatus = {
    connected: false,
    reconnecting: false,
    reconnectAttempts: 0,
  };
  private authToken: string | null = null;
  private organizationId: string | null = null;
  private reconnectDelay = 1000;
  private maxReconnectAttempts = 10;
  private heartbeatInterval = 30000; // 30 seconds

  constructor() {
    super();
    this.setupEventHandlers();
  }

  /**
   * Set authentication tokens
   */
  async setAuthTokens(authToken: string, organizationId: string) {
    this.authToken = authToken;
    this.organizationId = organizationId;
    
    // Store tokens
    await AsyncStorage.setItem('auth_token', authToken);
    await AsyncStorage.setItem('organization_id', organizationId);

    // Reconnect if already connected
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.disconnect();
      this.connect();
    }
  }

  /**
   * Load stored authentication tokens
   */
  async loadAuthTokens() {
    try {
      this.authToken = await AsyncStorage.getItem('auth_token');
      this.organizationId = await AsyncStorage.getItem('organization_id');
    } catch (error) {
      console.error('Failed to load auth tokens:', error);
    }
  }

  /**
   * Connect to WebSocket server
   */
  async connect() {
    if (this.ws) {
      return;
    }

    await this.loadAuthTokens();

    if (!this.authToken) {
      console.warn('No auth token available for WebSocket connection');
      return;
    }

    try {
      const wsUrl = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:3001';
      const url = `${wsUrl}/ws?token=${this.authToken}&org=${this.organizationId}`;

      this.ws = new WebSocket(url);
      this.setupWebSocketHandlers();
      
      console.log('WebSocket connecting...');
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleConnectionError(error);
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.connectionStatus = {
      connected: false,
      reconnecting: false,
      reconnectAttempts: 0,
    };

    this.emit('status', this.connectionStatus);
  }

  /**
   * Send message to WebSocket server
   */
  send(event: string, data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, cannot send message');
      return false;
    }

    try {
      const message: RealtimeEvent = {
        type: event,
        data,
        timestamp: Date.now(),
        userId: '', // Will be filled by server
        organizationId: this.organizationId || undefined,
      };

      this.ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('Failed to send WebSocket message:', error);
      return false;
    }
  }

  /**
   * Subscribe to specific events
   */
  subscribe(event: string, callback: (data: any) => void) {
    this.on(event, callback);
    
    // Send subscription message to server
    this.send('subscribe', { event });
  }

  /**
   * Unsubscribe from specific events
   */
  unsubscribe(event: string, callback?: (data: any) => void) {
    if (callback) {
      this.off(event, callback);
    } else {
      this.removeAllListeners(event);
    }
    
    // Send unsubscribe message to server
    this.send('unsubscribe', { event });
  }

  /**
   * Get current connection status
   */
  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  /**
   * Setup WebSocket event handlers
   */
  private setupWebSocketHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.connectionStatus.connected = true;
      this.connectionStatus.reconnecting = false;
      this.connectionStatus.reconnectAttempts = 0;
      this.connectionStatus.lastConnected = Date.now();
      this.reconnectDelay = 1000;

      // Start heartbeat
      this.startHeartbeat();

      // Send initial connection message
      this.send('connect', {
        platform: 'mobile',
        version: '1.0.0',
        timestamp: Date.now(),
      });

      this.emit('status', this.connectionStatus);
      this.emit('connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const message: RealtimeEvent = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      this.connectionStatus.connected = false;
      this.ws = null;

      // Clear heartbeat
      if (this.heartbeatTimer) {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = null;
      }

      this.emit('status', this.connectionStatus);
      this.emit('disconnected');

      // Attempt to reconnect if not a normal closure
      if (event.code !== 1000 && !this.connectionStatus.reconnecting) {
        this.attemptReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.handleConnectionError(error);
    };
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleMessage(message: RealtimeEvent) {
    // Handle system messages
    switch (message.type) {
      case 'pong':
        // Heartbeat response
        return;
      
      case 'error':
        console.error('WebSocket server error:', message.data);
        this.emit('error', message.data);
        return;
      
      case 'subscription_ack':
        console.log('Subscription acknowledged:', message.data);
        return;
    }

    // Emit to listeners
    this.emit(message.type, message.data);
    this.emit('message', message);
  }

  /**
   * Start heartbeat to keep connection alive
   */
  private startHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }

    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send('ping', { timestamp: Date.now() });
      }
    }, this.heartbeatInterval) as ReturnType<typeof setInterval>;
  }

  /**
   * Attempt to reconnect to WebSocket server
   */
  private attemptReconnect() {
    if (this.connectionStatus.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      this.connectionStatus.reconnecting = false;
      this.emit('status', this.connectionStatus);
      return;
    }

    this.connectionStatus.reconnecting = true;
    this.connectionStatus.reconnectAttempts++;

    console.log(`Attempting to reconnect (${this.connectionStatus.reconnectAttempts}/${this.maxReconnectAttempts}) in ${this.reconnectDelay}ms`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.reconnectDelay) as ReturnType<typeof setTimeout>;

    // Exponential backoff
    this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);

    this.emit('status', this.connectionStatus);
  }

  /**
   * Handle connection errors
   */
  private handleConnectionError(error: any) {
    console.error('WebSocket connection error:', error);
    this.emit('error', error);
  }

  /**
   * Setup general event handlers
   */
  private setupEventHandlers() {
    // Handle app state changes
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      window.addEventListener('online', () => {
        console.log('App online, attempting to reconnect');
        if (!this.connectionStatus.connected) {
          this.connect();
        }
      });

      window.addEventListener('offline', () => {
        console.log('App offline, disconnecting');
        this.disconnect();
      });
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.disconnect();
    this.removeAllListeners();
  }
}

// Create singleton instance
const realtimeService = new RealtimeService();

// Auto-connect on app start
realtimeService.loadAuthTokens().then(() => {
  if (realtimeService['authToken']) {
    realtimeService.connect();
  }
});

export default realtimeService;
