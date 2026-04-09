import { ConversationManager, ConversationContext, ConversationMessage } from '../../../lib/conversation-manager';
import { db as pgDb } from '../../../db/connection';
import { aiConversations } from '../../../db/drizzle-schema';

// Mock dependencies
jest.mock('../../../db/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('ConversationManager', () => {
  let conversationManager: ConversationManager;
  let mockDb: jest.Mocked<typeof pgDb>;

  beforeEach(() => {
    jest.clearAllMocks();
    conversationManager = new ConversationManager();
    mockDb = pgDb as jest.Mocked<typeof pgDb>;
  });

  describe('manageConversation', () => {
    it('should create new conversation when none exists', async () => {
      // Arrange
      const sessionId = 'new-session';
      const agentId = 'agent-1';
      const newMessage = 'Hello, new conversation!';
      const context = {
        organizationId: 'org-1',
        userId: 'user-1',
        metadata: { source: 'web' },
      };

      // Mock database to return no existing conversation
      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      } as any);

      const mockInsert = mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue({}),
      } as any);

      // Act
      const result = await conversationManager.manageConversation(
        sessionId,
        agentId,
        newMessage,
        context
      );

      // Assert
      expect(result.sessionId).toBe(sessionId);
      expect(result.agentId).toBe(agentId);
      expect(result.history).toHaveLength(1);
      expect(result.history[0].content).toBe(newMessage);
      expect(result.history[0].role).toBe('user');
      expect(result.metadata.organizationId).toBe('org-1');
      expect(result.metadata.userId).toBe('user-1');

      expect(mockInsert).toHaveBeenCalled();
    });

    it('should load existing conversation from database', async () => {
      // Arrange
      const sessionId = 'existing-session';
      const agentId = 'agent-1';
      const newMessage = 'Continue conversation';
      const context = {
        organizationId: 'org-1',
        userId: 'user-1',
      };

      const existingConversation = {
        id: sessionId,
        agentId,
        messages: [
          { role: 'user', content: 'Previous message', timestamp: new Date() },
        ],
        metadata: { organizationId: 'org-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([existingConversation]),
          }),
        }),
      } as any);

      const mockUpdate = mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue({}),
        }),
      } as any);

      // Act
      const result = await conversationManager.manageConversation(
        sessionId,
        agentId,
        newMessage,
        context
      );

      // Assert
      expect(result.history).toHaveLength(2);
      expect(result.history[0].content).toBe('Previous message');
      expect(result.history[1].content).toBe(newMessage);
      expect(result.messageCount).toBe(2);

      expect(mockUpdate).toHaveBeenCalled();
    });

    it('should compress conversation when threshold is reached', async () => {
      // Arrange
      const sessionId = 'long-session';
      const agentId = 'agent-1';
      const newMessage = 'Final message';
      const context = {
        organizationId: 'org-1',
      };

      // Create a conversation with many messages
      const existingMessages: ConversationMessage[] = Array(60).fill(null).map((_, i) => ({
        id: `msg-${i}`,
        role: 'user' as const,
        content: `Message ${i}`,
        timestamp: new Date(),
      }));

      const existingConversation = {
        id: sessionId,
        agentId,
        messages: existingMessages,
        metadata: { organizationId: 'org-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([existingConversation]),
          }),
        }),
      } as any);

      const mockUpdate = mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue({}),
        }),
      } as any);

      // Act
      const result = await conversationManager.manageConversation(
        sessionId,
        agentId,
        newMessage,
        context,
        { maxMessages: 50, enableSummarization: true }
      );

      // Assert
      expect(result.history.length).toBeLessThan(61); // Should be compressed
      expect(result.summary).toBeDefined();
      expect(result.history[0].role).toBe('system'); // Summary message
    });

    it('should emit events during conversation management', async () => {
      // Arrange
      const sessionId = 'event-test';
      const agentId = 'agent-1';
      const newMessage = 'Test events';
      const context = { organizationId: 'org-1' };

      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      } as any);

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue({}),
      } as any);

      const conversationUpdatedSpy = jest.fn();
      conversationManager.on('conversation:updated', conversationUpdatedSpy);

      // Act
      await conversationManager.manageConversation(sessionId, agentId, newMessage, context);

      // Assert
      expect(conversationUpdatedSpy).toHaveBeenCalledWith({
        sessionId,
        conversation: expect.any(Object),
      });
    });
  });

  describe('addAssistantResponse', () => {
    it('should add assistant response to existing conversation', async () => {
      // Arrange
      const sessionId = 'existing-session';
      const response = 'I understand your request.';
      const metadata = { model: 'gpt-4' };

      const existingConversation: ConversationContext = {
        sessionId,
        agentId: 'agent-1',
        history: [
          { id: 'msg-1', role: 'user', content: 'Hello', timestamp: new Date() },
        ],
        metadata: { organizationId: 'org-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 10,
      };

      // Set conversation in memory
      const privateManager = conversationManager as any;
      privateManager.conversations.set(sessionId, existingConversation);

      const messageAddedSpy = jest.fn();
      conversationManager.on('message:added', messageAddedSpy);

      // Act
      const result = await conversationManager.addAssistantResponse(
        sessionId,
        response,
        metadata
      );

      // Assert
      expect(result.history).toHaveLength(2);
      expect(result.history[1].role).toBe('assistant');
      expect(result.history[1].content).toBe(response);
      expect(result.history[1].metadata).toEqual(metadata);
      expect(result.messageCount).toBe(2);

      expect(messageAddedSpy).toHaveBeenCalledWith({
        sessionId,
        message: expect.objectContaining({
          role: 'assistant',
          content: response,
        }),
      });
    });

    it('should throw error for non-existent conversation', async () => {
      // Arrange
      const sessionId = 'non-existent';
      const response = 'This should fail';

      // Act & Assert
      await expect(
        conversationManager.addAssistantResponse(sessionId, response)
      ).rejects.toThrow('Conversation not found: non-existent');
    });
  });

  describe('getConversation', () => {
    it('should return conversation from memory', async () => {
      // Arrange
      const sessionId = 'memory-session';
      const conversation: ConversationContext = {
        sessionId,
        agentId: 'agent-1',
        history: [],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
        tokenCount: 0,
      };

      const privateManager = conversationManager as any;
      privateManager.conversations.set(sessionId, conversation);

      // Act
      const result = await conversationManager.getConversation(sessionId);

      // Assert
      expect(result).toBe(conversation);
    });

    it('should load conversation from database if not in memory', async () => {
      // Arrange
      const sessionId = 'db-session';
      const dbConversation = {
        id: sessionId,
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'From DB', timestamp: new Date() }],
        metadata: { organizationId: 'org-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([dbConversation]),
          }),
        }),
      } as any);

      // Act
      const result = await conversationManager.getConversation(sessionId);

      // Assert
      expect(result).not.toBeNull();
      expect(result?.sessionId).toBe(sessionId);
      expect(result?.history).toHaveLength(1);
      expect(result?.history[0].content).toBe('From DB');
    });

    it('should return null for non-existent conversation', async () => {
      // Arrange
      const sessionId = 'non-existent';

      const mockSelect = mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      } as any);

      // Act
      const result = await conversationManager.getConversation(sessionId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('clearConversation', () => {
    it('should clear conversation from memory and database', async () => {
      // Arrange
      const sessionId = 'clear-session';
      const conversation: ConversationContext = {
        sessionId,
        agentId: 'agent-1',
        history: [],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
        tokenCount: 0,
      };

      const privateManager = conversationManager as any;
      privateManager.conversations.set(sessionId, conversation);

      const mockDelete = mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      } as any);

      const conversationClearedSpy = jest.fn();
      conversationManager.on('conversation:cleared', conversationClearedSpy);

      // Act
      await conversationManager.clearConversation(sessionId);

      // Assert
      expect(privateManager.conversations.has(sessionId)).toBe(false);
      expect(mockDelete).toHaveBeenCalled();
      expect(conversationClearedSpy).toHaveBeenCalledWith({ sessionId });
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      const sessionId = 'error-session';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const mockDelete = mockDb.delete.mockReturnValue({
        where: jest.fn().mockRejectedValue(new Error('DB Error')),
      } as any);

      // Act
      await conversationManager.clearConversation(sessionId);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to clear conversation'),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getConversationHistory', () => {
    it('should return paginated conversation history', async () => {
      // Arrange
      const sessionId = 'history-session';
      const messages: ConversationMessage[] = Array(10).fill(null).map((_, i) => ({
        id: `msg-${i}`,
        role: 'user' as const,
        content: `Message ${i}`,
        timestamp: new Date(),
      }));

      const conversation: ConversationContext = {
        sessionId,
        agentId: 'agent-1',
        history: messages,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 10,
        tokenCount: 100,
      };

      const privateManager = conversationManager as any;
      privateManager.conversations.set(sessionId, conversation);

      // Act
      const result = await conversationManager.getConversationHistory(sessionId, 5, 2);

      // Assert
      expect(result).toHaveLength(5);
      expect(result[0].content).toBe('Message 2');
      expect(result[4].content).toBe('Message 6');
    });

    it('should return empty history for non-existent conversation', async () => {
      // Arrange
      const sessionId = 'non-existent';

      // Act
      const result = await conversationManager.getConversationHistory(sessionId);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('searchConversations', () => {
    it('should search conversations by query text', async () => {
      // Arrange
      const query = 'important';
      const conversations: ConversationContext[] = [
        {
          sessionId: 'session-1',
          agentId: 'agent-1',
          history: [
            { id: 'msg-1', role: 'user', content: 'This is important', timestamp: new Date() },
          ],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 1,
          tokenCount: 20,
        },
        {
          sessionId: 'session-2',
          agentId: 'agent-2',
          history: [
            { id: 'msg-2', role: 'user', content: 'Regular message', timestamp: new Date() },
          ],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 1,
          tokenCount: 15,
        },
      ];

      const privateManager = conversationManager as any;
      conversations.forEach(conv => {
        privateManager.conversations.set(conv.sessionId, conv);
      });

      // Act
      const result = await conversationManager.searchConversations('org-1', query);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].sessionId).toBe('session-1');
    });

    it('should filter by agent ID when specified', async () => {
      // Arrange
      const conversations: ConversationContext[] = [
        {
          sessionId: 'session-1',
          agentId: 'agent-1',
          history: [{ id: 'msg-1', role: 'user', content: 'test', timestamp: new Date() }],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 1,
          tokenCount: 10,
        },
        {
          sessionId: 'session-2',
          agentId: 'agent-2',
          history: [{ id: 'msg-2', role: 'user', content: 'test', timestamp: new Date() }],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 1,
          tokenCount: 10,
        },
      ];

      const privateManager = conversationManager as any;
      conversations.forEach(conv => {
        privateManager.conversations.set(conv.sessionId, conv);
      });

      // Act
      const result = await conversationManager.searchConversations(
        'org-1',
        'test',
        { agentId: 'agent-1' }
      );

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].agentId).toBe('agent-1');
    });

    it('should limit results when specified', async () => {
      // Arrange
      const conversations: ConversationContext[] = Array(10).fill(null).map((_, i) => ({
        sessionId: `session-${i}`,
        agentId: 'agent-1',
        history: [{ id: `msg-${i}`, role: 'user', content: 'test query', timestamp: new Date() }],
        metadata: { organizationId: 'org-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 10,
      }));

      const privateManager = conversationManager as any;
      conversations.forEach(conv => {
        privateManager.conversations.set(conv.sessionId, conv);
      });

      // Act
      const result = await conversationManager.searchConversations('org-1', 'query', { limit: 5 });

      // Assert
      expect(result).toHaveLength(5);
    });
  });

  describe('getStats', () => {
    it('should return conversation statistics', () => {
      // Arrange
      const conversations: ConversationContext[] = [
        {
          sessionId: 'session-1',
          agentId: 'agent-1',
          history: [{ id: 'msg-1', role: 'user', content: 'Hello', timestamp: new Date() }],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 1,
          tokenCount: 10,
        },
        {
          sessionId: 'session-2',
          agentId: 'agent-2',
          history: [
            { id: 'msg-2', role: 'user', content: 'How are you?', timestamp: new Date() },
            { id: 'msg-3', role: 'assistant', content: 'I am well!', timestamp: new Date() },
          ],
          metadata: { organizationId: 'org-1' },
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 2,
          tokenCount: 25,
        },
      ];

      const privateManager = conversationManager as any;
      conversations.forEach(conv => {
        privateManager.conversations.set(conv.sessionId, conv);
      });

      // Act
      const stats = conversationManager.getStats();

      // Assert
      expect(stats.totalConversations).toBe(2);
      expect(stats.totalMessages).toBe(3);
      expect(stats.totalTokens).toBe(35);
      expect(stats.averageMessagesPerConversation).toBe(1.5);
    });

    it('should return zero stats when no conversations exist', () => {
      // Act
      const stats = conversationManager.getStats();

      // Assert
      expect(stats.totalConversations).toBe(0);
      expect(stats.totalMessages).toBe(0);
      expect(stats.totalTokens).toBe(0);
      expect(stats.averageMessagesPerConversation).toBe(0);
    });
  });
});
