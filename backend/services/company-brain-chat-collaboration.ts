/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

/**
 * Company Brain Chat Collaboration Service
 * Real-time collaboration features for chat system
 * Includes typing indicators, read receipts, presence, and notifications
 */

export interface TypingIndicator {
  id: string;
  organizationId: string;
  conversationId: string;
  userId: string;
  isTyping: boolean;
  lastSeenAt: Date;
  createdAt: Date;
}

export interface ReadReceipt {
  id: string;
  organizationId: string;
  messageId: string;
  userId: string;
  readAt: Date;
  createdAt: Date;
}

export interface UserPresence {
  userId: string;
  organizationId: string;
  status: 'online' | 'away' | 'offline' | 'busy';
  lastSeenAt: Date;
  currentConversationId?: string;
  metadata: Record<string, any>;
}

export interface ChatNotification {
  id: string;
  organizationId: string;
  userId: string;
  type: 'message' | 'mention' | 'reply' | 'thread' | 'channel_invite' | 'system';
  title: string;
  body: string;
  conversationId?: string;
  messageId?: string;
  isRead: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
}

export class CompanyBrainChatCollaborationService {
  private typingIndicators: Map<string, TypingIndicator> = new Map();
  private readReceipts: Map<string, ReadReceipt> = new Map();
  private userPresences: Map<string, UserPresence> = new Map();
  private notifications: Map<string, ChatNotification> = new Map();

  /**
   * Set typing indicator
   */
  async setTypingIndicator(
    organizationId: string,
    conversationId: string,
    userId: string,
    isTyping: boolean
  ): Promise<void> {
    const key = `${conversationId}:${userId}`;
    const existing = this.typingIndicators.get(key);

    const indicator: TypingIndicator = existing || {
      id: crypto.randomUUID(),
      organizationId,
      conversationId,
      userId,
      isTyping,
      lastSeenAt: new Date(),
      createdAt: new Date(),
    };

    indicator.isTyping = isTyping;
    indicator.lastSeenAt = new Date();

    this.typingIndicators.set(key, indicator);
    await this.saveTypingIndicator(indicator);

    // Broadcast to conversation participants
    await this.broadcastTypingIndicator(conversationId, indicator);
  }

  /**
   * Get typing indicators for conversation
   */
  async getTypingIndicators(conversationId: string): Promise<TypingIndicator[]> {
    return Array.from(this.typingIndicators.values())
      .filter(t => t.conversationId === conversationId && t.isTyping);
  }

  /**
   * Clear typing indicator
   */
  async clearTypingIndicator(conversationId: string, userId: string): Promise<void> {
    const key = `${conversationId}:${userId}`;
    const indicator = this.typingIndicators.get(key);
    
    if (indicator) {
      indicator.isTyping = false;
      indicator.lastSeenAt = new Date();
      await this.saveTypingIndicator(indicator);
      await this.broadcastTypingIndicator(conversationId, indicator);
    }
  }

  /**
   * Mark message as read
   */
  async markMessageAsRead(
    organizationId: string,
    messageId: string,
    userId: string
  ): Promise<void> {
    const key = `${messageId}:${userId}`;
    const existing = this.readReceipts.get(key);

    if (existing) {
      return; // Already read
    }

    const receipt: ReadReceipt = {
      id: crypto.randomUUID(),
      organizationId,
      messageId,
      userId,
      readAt: new Date(),
      createdAt: new Date(),
    };

    this.readReceipts.set(key, receipt);
    await this.saveReadReceipt(receipt);

    // Broadcast to message sender
    await this.broadcastReadReceipt(messageId, receipt);
  }

  /**
   * Get read receipts for message
   */
  async getReadReceipts(messageId: string): Promise<ReadReceipt[]> {
    return Array.from(this.readReceipt.values()).filter(r => r.messageId === messageId);
  }

  /**
   * Get unread message count for user
   */
  async getUnreadCount(organizationId: string, userId: string, conversationId?: string): Promise<number> {
    // In production, query database for unread messages
    return 0;
  }

  /**
   * Set user presence
   */
  async setUserPresence(presence: Omit<UserPresence, 'lastSeenAt'>): Promise<UserPresence> {
    const existing = this.userPresences.get(presence.userId);

    const updatedPresence: UserPresence = {
      ...presence,
      lastSeenAt: new Date(),
    };

    this.userPresences.set(presence.userId, updatedPresence);
    await this.saveUserPresence(updatedPresence);

    // Broadcast presence update
    await this.broadcastPresenceUpdate(updatedPresence);

    return updatedPresence;
  }

  /**
   * Get user presence
   */
  async getUserPresence(userId: string): Promise<UserPresence | null> {
    return this.userPresences.get(userId) || null;
  }

  /**
   * Get online users for organization
   */
  async getOnlineUsers(organizationId: string): Promise<UserPresence[]> {
    return Array.from(this.userPresences.values())
      .filter(p => p.organizationId === organizationId && p.status === 'online');
  }

  /**
   * Update user status
   */
  async updateUserStatus(userId: string, status: UserPresence['status']): Promise<void> {
    const presence = this.userPresences.get(userId);
    if (presence) {
      presence.status = status;
      presence.lastSeenAt = new Date();
      await this.saveUserPresence(presence);
      await this.broadcastPresenceUpdate(presence);
    }
  }

  /**
   * Create notification
   */
  async createNotification(notification: Omit<ChatNotification, 'id' | 'isRead' | 'createdAt'>): Promise<ChatNotification> {
    const newNotification: ChatNotification = {
      ...notification,
      id: crypto.randomUUID(),
      isRead: false,
      createdAt: new Date(),
    };

    this.notifications.set(newNotification.id, newNotification);
    await this.saveNotification(newNotification);

    // Send notification to user
    await this.sendNotificationToUser(newNotification);

    return newNotification;
  }

  /**
   * Get notifications for user
   */
  async getUserNotifications(organizationId: string, userId: string, unreadOnly?: boolean): Promise<ChatNotification[]> {
    const notifications = Array.from(this.notifications.values())
      .filter(n => n.organizationId === organizationId && n.userId === userId);

    if (unreadOnly) {
      return notifications.filter(n => !n.isRead);
    }

    return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.get(notificationId);
    if (notification) {
      notification.isRead = true;
      await this.saveNotification(notification);
    }
  }

  /**
   * Mark all notifications as read for user
   */
  async markAllNotificationsAsRead(organizationId: string, userId: string): Promise<void> {
    const userNotifications = Array.from(this.notifications.values())
      .filter(n => n.organizationId === organizationId && n.userId === userId && !n.isRead);

    for (const notification of userNotifications) {
      notification.isRead = true;
      await this.saveNotification(notification);
    }
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications.delete(notificationId);
    // In production, delete from database
  }

  /**
   * Broadcast typing indicator to conversation participants
   */
  private async broadcastTypingIndicator(conversationId: string, indicator: TypingIndicator): Promise<void> {
    // In production, use WebSocket or real-time messaging to broadcast
    console.log(`Broadcasting typing indicator for conversation ${conversationId}:`, indicator.userId, indicator.isTyping);
  }

  /**
   * Broadcast read receipt to message sender
   */
  private async broadcastReadReceipt(messageId: string, receipt: ReadReceipt): Promise<void> {
    // In production, use WebSocket or real-time messaging to broadcast
    console.log(`Broadcasting read receipt for message ${messageId}:`, receipt.userId);
  }

  /**
   * Broadcast presence update
   */
  private async broadcastPresenceUpdate(presence: UserPresence): Promise<void> {
    // In production, use WebSocket or real-time messaging to broadcast
    console.log(`Broadcasting presence update for user ${presence.userId}:`, presence.status);
  }

  /**
   * Send notification to user
   */
  private async sendNotificationToUser(notification: ChatNotification): Promise<void> {
    // In production, use push notifications, email, or in-app notifications
    console.log(`Sending notification to user ${notification.userId}:`, notification.title);
  }

  /**
   * Save typing indicator to database
   */
  private async saveTypingIndicator(indicator: TypingIndicator): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving typing indicator:', indicator.id);
  }

  /**
   * Save read receipt to database
   */
  private async saveReadReceipt(receipt: ReadReceipt): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving read receipt:', receipt.id);
  }

  /**
   * Save user presence to database
   */
  private async saveUserPresence(presence: UserPresence): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving user presence:', presence.userId);
  }

  /**
   * Save notification to database
   */
  private async saveNotification(notification: ChatNotification): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving notification:', notification.id);
  }

  /**
   * Clean up old typing indicators (older than 30 seconds)
   */
  async cleanupOldTypingIndicators(): Promise<void> {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30000);

    for (const [key, indicator] of this.typingIndicators.entries()) {
      if (indicator.lastSeenAt < thirtySecondsAgo) {
        indicator.isTyping = false;
        await this.saveTypingIndicator(indicator);
        await this.broadcastTypingIndicator(indicator.conversationId, indicator);
      }
    }
  }

  /**
   * Get collaboration statistics
   */
  async getCollaborationStatistics(organizationId: string): Promise<{
    onlineUsers: number;
    totalNotifications: number;
    unreadNotifications: number;
    activeTypingIndicators: number;
  }> {
    const onlineUsers = Array.from(this.userPresences.values())
      .filter(p => p.organizationId === organizationId && p.status === 'online').length;

    const notifications = Array.from(this.notifications.values())
      .filter(n => n.organizationId === organizationId);

    const unreadNotifications = notifications.filter(n => !n.isRead).length;

    const activeTypingIndicators = Array.from(this.typingIndicators.values())
      .filter(t => t.organizationId === organizationId && t.isTyping).length;

    return {
      onlineUsers,
      totalNotifications: notifications.length,
      unreadNotifications,
      activeTypingIndicators,
    };
  }
}

// Export singleton instance
export const companyBrainChatCollaborationService = new CompanyBrainChatCollaborationService();
