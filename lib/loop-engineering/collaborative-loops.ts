/**
 * Real-Time Collaboration Features for Loop Engineering
 * Enables multiple users/agents to collaborate on loop design and execution
 */

import { LoopConfig, LoopExecution, LoopNode } from './types';

export interface CollaborationSession {
  id: string;
  loopId: string;
  participants: Participant[];
  status: 'active' | 'paused' | 'ended';
  createdAt: Date;
  lastActivity: Date;
}

export interface Participant {
  id: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer' | 'agent';
  permissions: Permission[];
  joinedAt: Date;
}

export interface Permission {
  action: 'edit' | 'execute' | 'stop' | 'modify' | 'view';
  granted: boolean;
}

export interface CollaborationEvent {
  id: string;
  sessionId: string;
  participantId: string;
  type: 'join' | 'leave' | 'edit' | 'execute' | 'comment' | 'cursor_move';
  data: any;
  timestamp: Date;
}

export interface Comment {
  id: string;
  sessionId: string;
  participantId: string;
  nodeId?: string;
  content: string;
  timestamp: Date;
  resolved: boolean;
}

export class CollaborativeLoopManager {
  private sessions: Map<string, CollaborationSession> = new Map();
  private events: Map<string, CollaborationEvent[]> = new Map();
  private comments: Map<string, Comment[]> = new Map();
  private cursors: Map<string, Map<string, { x: number; y: number }>> = new Map();

  /**
   * Create a new collaboration session
   */
  createSession(loopId: string, ownerId: string, ownerName: string): CollaborationSession {
    const sessionId = `session-${Date.now()}`;
    
    const session: CollaborationSession = {
      id: sessionId,
      loopId,
      participants: [
        {
          id: ownerId,
          name: ownerName,
          role: 'owner',
          permissions: [
            { action: 'edit', granted: true },
            { action: 'execute', granted: true },
            { action: 'stop', granted: true },
            { action: 'modify', granted: true },
            { action: 'view', granted: true },
          ],
          joinedAt: new Date(),
        },
      ],
      status: 'active',
      createdAt: new Date(),
      lastActivity: new Date(),
    };

    this.sessions.set(sessionId, session);
    this.events.set(sessionId, []);

    // Record join event
    this.recordEvent(sessionId, ownerId, 'join', { role: 'owner' });

    return session;
  }

  /**
   * Join an existing session
   */
  joinSession(sessionId: string, participantId: string, participantName: string, role: Participant['role']): CollaborationSession | null {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'active') {
      return null;
    }

    // Check if already in session
    if (session.participants.some(p => p.id === participantId)) {
      return session;
    }

    const permissions = this.getDefaultPermissions(role);
    
    session.participants.push({
      id: participantId,
      name: participantName,
      role,
      permissions,
      joinedAt: new Date(),
    });

    session.lastActivity = new Date();

    this.recordEvent(sessionId, participantId, 'join', { role });

    return session;
  }

  /**
   * Leave a session
   */
  leaveSession(sessionId: string, participantId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.participants = session.participants.filter(p => p.id !== participantId);
    session.lastActivity = new Date();

    this.recordEvent(sessionId, participantId, 'leave', {});

    // If no participants left, end session
    if (session.participants.length === 0) {
      session.status = 'ended';
    }

    return true;
  }

  /**
   * Edit loop node
   */
  editNode(sessionId: string, participantId: string, nodeId: string, changes: Partial<LoopNode>): boolean {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'active') return false;

    const participant = session.participants.find(p => p.id === participantId);
    if (!participant || !this.hasPermission(participant, 'edit')) return false;

    this.recordEvent(sessionId, participantId, 'edit', { nodeId, changes });
    session.lastActivity = new Date();

    return true;
  }

  /**
   * Execute loop
   */
  executeLoop(sessionId: string, participantId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'active') return false;

    const participant = session.participants.find(p => p.id === participantId);
    if (!participant || !this.hasPermission(participant, 'execute')) return false;

    this.recordEvent(sessionId, participantId, 'execute', {});
    session.lastActivity = new Date();

    return true;
  }

  /**
   * Stop loop execution
   */
  stopLoop(sessionId: string, participantId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const participant = session.participants.find(p => p.id === participantId);
    if (!participant || !this.hasPermission(participant, 'stop')) return false;

    this.recordEvent(sessionId, participantId, 'stop', {});
    session.lastActivity = new Date();

    return true;
  }

  /**
   * Add comment
   */
  addComment(sessionId: string, participantId: string, nodeId: string | undefined, content: string): Comment {
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      sessionId,
      participantId,
      nodeId,
      content,
      timestamp: new Date(),
      resolved: false,
    };

    const sessionComments = this.comments.get(sessionId) || [];
    sessionComments.push(comment);
    this.comments.set(sessionId, sessionComments);

    this.recordEvent(sessionId, participantId, 'comment', { nodeId, content });

    return comment;
  }

  /**
   * Resolve comment
   */
  resolveComment(sessionId: string, commentId: string, participantId: string): boolean {
    const sessionComments = this.comments.get(sessionId);
    if (!sessionComments) return false;

    const comment = sessionComments.find(c => c.id === commentId);
    if (!comment) return false;

    comment.resolved = true;
    return true;
  }

  /**
   * Update cursor position
   */
  updateCursor(sessionId: string, participantId: string, x: number, y: number): void {
    const sessionCursors = this.cursors.get(sessionId) || new Map();
    sessionCursors.set(participantId, { x, y });
    this.cursors.set(sessionId, sessionCursors);

    this.recordEvent(sessionId, participantId, 'cursor_move', { x, y });
  }

  /**
   * Get session info
   */
  getSession(sessionId: string): CollaborationSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get session events
   */
  getEvents(sessionId: string, since?: Date): CollaborationEvent[] {
    const events = this.events.get(sessionId) || [];
    if (since) {
      return events.filter(e => e.timestamp >= since);
    }
    return events;
  }

  /**
   * Get session comments
   */
  getComments(sessionId: string, includeResolved: boolean = false): Comment[] {
    const comments = this.comments.get(sessionId) || [];
    if (!includeResolved) {
      return comments.filter(c => !c.resolved);
    }
    return comments;
  }

  /**
   * Get cursor positions
   */
  getCursors(sessionId: string): Map<string, { x: number; y: number }> {
    return this.cursors.get(sessionId) || new Map();
  }

  /**
   * Get active sessions for a loop
   */
  getActiveSessions(loopId: string): CollaborationSession[] {
    return Array.from(this.sessions.values()).filter(
      s => s.loopId === loopId && s.status === 'active'
    );
  }

  /**
   * End session
   */
  endSession(sessionId: string, participantId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const participant = session.participants.find(p => p.id === participantId);
    if (!participant || participant.role !== 'owner') return false;

    session.status = 'ended';
    session.lastActivity = new Date();

    this.recordEvent(sessionId, participantId, 'leave', { reason: 'session_ended' });

    return true;
  }

  /**
   * Get default permissions for role
   */
  private getDefaultPermissions(role: Participant['role']): Permission[] {
    switch (role) {
      case 'owner':
        return [
          { action: 'edit', granted: true },
          { action: 'execute', granted: true },
          { action: 'stop', granted: true },
          { action: 'modify', granted: true },
          { action: 'view', granted: true },
        ];
      case 'editor':
        return [
          { action: 'edit', granted: true },
          { action: 'execute', granted: true },
          { action: 'stop', granted: false },
          { action: 'modify', granted: true },
          { action: 'view', granted: true },
        ];
      case 'viewer':
        return [
          { action: 'edit', granted: false },
          { action: 'execute', granted: false },
          { action: 'stop', granted: false },
          { action: 'modify', granted: false },
          { action: 'view', granted: true },
        ];
      case 'agent':
        return [
          { action: 'edit', granted: false },
          { action: 'execute', granted: true },
          { action: 'stop', granted: false },
          { action: 'modify', granted: false },
          { action: 'view', granted: true },
        ];
      default:
        return [];
    }
  }

  /**
   * Check if participant has permission
   */
  private hasPermission(participant: Participant, action: string): boolean {
    return participant.permissions.some(p => p.action === action && p.granted);
  }

  /**
   * Record collaboration event
   */
  private recordEvent(sessionId: string, participantId: string, type: CollaborationEvent['type'], data: any): void {
    const events = this.events.get(sessionId) || [];
    events.push({
      id: `event-${Date.now()}`,
      sessionId,
      participantId,
      type,
      data,
      timestamp: new Date(),
    });
    this.events.set(sessionId, events);
  }

  /**
   * Get session statistics
   */
  getSessionStats(sessionId: string): {
    participantCount: number;
    eventCount: number;
    commentCount: number;
    activeTime: number;
  } | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const events = this.events.get(sessionId) || [];
    const comments = this.comments.get(sessionId) || [];

    return {
      participantCount: session.participants.length,
      eventCount: events.length,
      commentCount: comments.length,
      activeTime: Date.now() - session.createdAt.getTime(),
    };
  }

  /**
   * Clean up inactive sessions
   */
  cleanupInactiveSessions(maxInactiveTime: number = 3600000): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      const inactiveTime = now - session.lastActivity.getTime();
      if (inactiveTime > maxInactiveTime && session.status === 'active') {
        session.status = 'ended';
        cleaned++;
      }
    }

    return cleaned;
  }
}

/**
 * Real-time sync for collaborative editing
 */
export class LoopSyncManager {
  private collaborativeManager: CollaborativeLoopManager;
  private subscribers: Map<string, Set<(event: CollaborationEvent) => void>> = new Map();

  constructor(collaborativeManager: CollaborativeLoopManager) {
    this.collaborativeManager = collaborativeManager;
  }

  /**
   * Subscribe to session events
   */
  subscribe(sessionId: string, callback: (event: CollaborationEvent) => void): () => void {
    if (!this.subscribers.has(sessionId)) {
      this.subscribers.set(sessionId, new Set());
    }
    this.subscribers.get(sessionId)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.get(sessionId)?.delete(callback);
    };
  }

  /**
   * Publish event to subscribers
   */
  publish(sessionId: string, event: CollaborationEvent): void {
    const subscribers = this.subscribers.get(sessionId);
    if (subscribers) {
      subscribers.forEach(callback => callback(event));
    }
  }

  /**
   * Sync loop state across participants
   */
  syncLoopState(sessionId: string, loopState: Partial<LoopConfig>): void {
    const session = this.collaborativeManager.getSession(sessionId);
    if (!session) return;

    // Publish sync event to all participants
    session.participants.forEach(participant => {
      this.publish(sessionId, {
        id: `sync-${Date.now()}`,
        sessionId,
        participantId: participant.id,
        type: 'edit',
        data: { loopState },
        timestamp: new Date(),
      });
    });
  }

  /**
   * Broadcast cursor positions
   */
  broadcastCursors(sessionId: string): void {
    const cursors = this.collaborativeManager.getCursors(sessionId);
    
    this.publish(sessionId, {
      id: `cursor-broadcast-${Date.now()}`,
      sessionId,
      participantId: 'system',
      type: 'cursor_move',
      data: { cursors: Object.fromEntries(cursors) },
      timestamp: new Date(),
    });
  }
}
