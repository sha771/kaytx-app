/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

/**
 * WebSocket Service for Company Brain
 * Provides real-time knowledge updates and notifications
 */

export enum WebSocketEventType {
  KNOWLEDGE_CREATED = 'knowledge:created',
  KNOWLEDGE_UPDATED = 'knowledge:updated',
  KNOWLEDGE_DELETED = 'knowledge:deleted',
  KNOWLEDGE_VERIFIED = 'knowledge:verified',
  SEARCH_PERFORMED = 'search:performed',
  USER_JOINED = 'user:joined',
  USER_LEFT = 'user:left',
  NOTIFICATION = 'notification',
  ANALYTICS_UPDATE = 'analytics:update',
  RISK_ALERT = 'risk:alert',
}

export interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
  timestamp: string;
  userId?: string;
}

export interface WebSocketClient {
  id: string;
  userId: string;
  rooms: string[];
  connectedAt: Date;
}

export class CompanyBrainWebSocketService {
  private io: Server | null = null;
  private clients: Map<string, WebSocketClient> = new Map();
  private isInitialized = false;

  /**
   * Initialize WebSocket server
   */
  initialize(httpServer: HTTPServer): void {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
      },
      path: '/ws/company-brain',
    });

    this.setupEventHandlers();
    this.isInitialized = true;

    console.log('Company Brain WebSocket service initialized');
  }

  /**
   * Set up event handlers
   */
  private setupEventHandlers(): void {
    if (!this.io) return;

    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle client joining
      socket.on('join', (data: { userId: string; rooms?: string[] }) => {
        this.handleJoin(socket, data);
      });

      // Handle client leaving
      socket.on('leave', (data: { rooms?: string[] }) => {
        this.handleLeave(socket, data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });

      // Handle search queries
      socket.on('search', (data: { query: string; filters?: any }) => {
        this.handleSearch(socket, data);
      });

      // Handle knowledge updates
      socket.on('knowledge:update', (data: { nodeId: string; updates: any }) => {
        this.handleKnowledgeUpdate(socket, data);
      });

      // Handle verification requests
      socket.on('knowledge:verify', (data: { nodeId: string; verified: boolean }) => {
        this.handleKnowledgeVerification(socket, data);
      });
    });
  }

  /**
   * Handle client joining
   */
  private handleJoin(socket: any, data: { userId: string; rooms?: string[] }): void {
    const client: WebSocketClient = {
      id: socket.id,
      userId: data.userId,
      rooms: data.rooms || ['general'],
      connectedAt: new Date(),
    };

    this.clients.set(socket.id, client);

    // Join rooms
    for (const room of client.rooms) {
      socket.join(room);
    }

    // Send welcome message
    socket.emit('connected', {
      clientId: socket.id,
      timestamp: new Date().toISOString(),
    });

    // Broadcast user joined event
    this.broadcastToRoom('general', {
      type: WebSocketEventType.USER_JOINED,
      data: { userId: data.userId },
      timestamp: new Date().toISOString(),
    });

    console.log(`User ${data.userId} joined with socket ${socket.id}`);
  }

  /**
   * Handle client leaving
   */
  private handleLeave(socket: any, data: { rooms?: string[] }): void {
    const client = this.clients.get(socket.id);
    if (!client) return;

    const roomsToLeave = data.rooms || client.rooms;

    for (const room of roomsToLeave) {
      socket.leave(room);
    }

    console.log(`Client ${socket.id} left rooms: ${roomsToLeave.join(', ')}`);
  }

  /**
   * Handle disconnection
   */
  private handleDisconnect(socket: any): void {
    const client = this.clients.get(socket.id);
    if (!client) return;

    // Broadcast user left event
    this.broadcastToRoom('general', {
      type: WebSocketEventType.USER_LEFT,
      data: { userId: client.userId },
      timestamp: new Date().toISOString(),
    });

    this.clients.delete(socket.id);
    console.log(`Client disconnected: ${socket.id}`);
  }

  /**
   * Handle search queries
   */
  private handleSearch(socket: any, data: { query: string; filters?: any }): void {
    // Broadcast search event to analytics room
    this.broadcastToRoom('analytics', {
      type: WebSocketEventType.SEARCH_PERFORMED,
      data: {
        userId: this.clients.get(socket.id)?.userId,
        query: data.query,
        filters: data.filters,
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Handle knowledge updates
   */
  private handleKnowledgeUpdate(socket: any, data: { nodeId: string; updates: any }): void {
    const client = this.clients.get(socket.id);
    if (!client) return;

    // Broadcast knowledge update to all clients
    this.broadcast({
      type: WebSocketEventType.KNOWLEDGE_UPDATED,
      data: {
        nodeId: data.nodeId,
        updates: data.updates,
        updatedBy: client.userId,
      },
      timestamp: new Date().toISOString(),
      userId: client.userId,
    });
  }

  /**
   * Handle knowledge verification
   */
  private handleKnowledgeVerification(socket: any, data: { nodeId: string; verified: boolean }): void {
    const client = this.clients.get(socket.id);
    if (!client) return;

    // Broadcast verification event
    this.broadcast({
      type: WebSocketEventType.KNOWLEDGE_VERIFIED,
      data: {
        nodeId: data.nodeId,
        verified: data.verified,
        verifiedBy: client.userId,
      },
      timestamp: new Date().toISOString(),
      userId: client.userId,
    });
  }

  /**
   * Broadcast message to all connected clients
   */
  broadcast(message: WebSocketMessage): void {
    if (!this.io) return;
    this.io.emit('message', message);
  }

  /**
   * Broadcast message to a specific room
   */
  broadcastToRoom(room: string, message: WebSocketMessage): void {
    if (!this.io) return;
    this.io.to(room).emit('message', message);
  }

  /**
   * Broadcast message to a specific user
   */
  broadcastToUser(userId: string, message: WebSocketMessage): void {
    if (!this.io) return;

    for (const [socketId, client] of this.clients.entries()) {
      if (client.userId === userId) {
        this.io.to(socketId).emit('message', message);
        break;
      }
    }
  }

  /**
   * Notify about new knowledge
   */
  notifyKnowledgeCreated(knowledge: any): void {
    this.broadcast({
      type: WebSocketEventType.KNOWLEDGE_CREATED,
      data: knowledge,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Notify about knowledge deletion
   */
  notifyKnowledgeDeleted(nodeId: string): void {
    this.broadcast({
      type: WebSocketEventType.KNOWLEDGE_DELETED,
      data: { nodeId },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send notification to user
   */
  sendNotification(userId: string, notification: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }): void {
    this.broadcastToUser(userId, {
      type: WebSocketEventType.NOTIFICATION,
      data: notification,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Broadcast analytics update
   */
  broadcastAnalyticsUpdate(analytics: any): void {
    this.broadcastToRoom('analytics', {
      type: WebSocketEventType.ANALYTICS_UPDATE,
      data: analytics,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Broadcast risk alert
   */
  broadcastRiskAlert(risk: any): void {
    this.broadcast({
      type: WebSocketEventType.RISK_ALERT,
      data: risk,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get connected clients count
   */
  getConnectedClientsCount(): number {
    return this.clients.size;
  }

  /**
   * Get clients in a room
   */
  getClientsInRoom(room: string): WebSocketClient[] {
    const clients: WebSocketClient[] = [];
    for (const client of this.clients.values()) {
      if (client.rooms.includes(room)) {
        clients.push(client);
      }
    }
    return clients;
  }

  /**
   * Get client info
   */
  getClient(socketId: string): WebSocketClient | undefined {
    return this.clients.get(socketId);
  }

  /**
   * Disconnect all clients
   */
  disconnectAll(): void {
    if (!this.io) return;
    this.io.disconnectSockets();
    this.clients.clear();
    console.log('All clients disconnected');
  }

  /**
   * Shutdown WebSocket service
   */
  shutdown(): void {
    this.disconnectAll();
    if (this.io) {
      this.io.close();
      this.io = null;
    }
    this.isInitialized = false;
    console.log('Company Brain WebSocket service shutdown');
  }

  /**
   * Get service status
   */
  getStatus(): {
    initialized: boolean;
    connectedClients: number;
    rooms: string[];
  } {
    const rooms = new Set<string>();
    for (const client of this.clients.values()) {
      for (const room of client.rooms) {
        rooms.add(room);
      }
    }

    return {
      initialized: this.isInitialized,
      connectedClients: this.clients.size,
      rooms: Array.from(rooms),
    };
  }
}

// Export singleton instance
export const companyBrainWebSocketService = new CompanyBrainWebSocketService();
