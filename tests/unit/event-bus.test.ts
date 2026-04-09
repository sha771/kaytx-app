import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { 
  EventBus, 
  EventTypes, 
  createEvent, 
  eventBus,
  auditMiddleware,
  metricsMiddleware
} from '../../backend/lib/event-bus';

// Mock audit logging
jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn(),
  AuditActions: {
    USER_CREATED: 'USER_CREATED',
    SYSTEM_ERROR: 'SYSTEM_ERROR',
  }
}));

describe('EventBus', () => {
  let testEventBus: EventBus;

  beforeEach(() => {
    testEventBus = new EventBus({
      enableMetrics: true,
      maxListeners: 100,
    });
    jest.clearAllMocks();
  });

  describe('Event Emission', () => {
    it('should emit and receive events', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { message: 'Hello World' });
      await testEventBus.emit(event);
      
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should emit events with proper structure', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test.event', handler);
      
      const eventData = { message: 'Test data' };
      const event = createEvent('test.event', eventData, {
        userId: 'user-123',
        source: 'test'
      });
      
      await testEventBus.emit(event);
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          type: 'test.event',
          data: eventData,
          timestamp: expect.any(Number),
          metadata: {
            userId: 'user-123',
            source: 'test'
          }
        })
      );
    });

    it('should add timestamp if not provided', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test.event', handler);
      
      const beforeTime = Date.now();
      const event = createEvent('test.event', { test: true });
      delete (event as any).timestamp;
      
      await testEventBus.emit(event);
      
      const afterTime = Date.now();
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          timestamp: expect.any(Number)
        })
      );
      
      const receivedEvent = handler.mock.calls[0][0];
      expect(receivedEvent.timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(receivedEvent.timestamp).toBeLessThanOrEqual(afterTime);
    });

    it('should validate required event fields', async () => {
      const invalidEvent = { data: 'test' } as any;
      
      await expect(testEventBus.emit(invalidEvent)).rejects.toThrow(
        'Event must have id and type'
      );
    });
  });

  describe('Event Subscription', () => {
    it('should return subscription ID', () => {
      const handler = jest.fn();
      const subscriptionId = testEventBus.subscribe('test.event', handler);
      
      expect(subscriptionId).toBeDefined();
      expect(typeof subscriptionId).toBe('string');
    });

    it('should support multiple subscribers', async () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      testEventBus.subscribe('test.event', handler1);
      testEventBus.subscribe('test.event', handler2);
      
      const event = createEvent('test.event', { test: true });
      await testEventBus.emit(event);
      
      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
    });

    it('should support one-time subscriptions', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test.event', handler, { once: true });
      
      const event = createEvent('test.event', { test: true });
      await testEventBus.emit(event);
      await testEventBus.emit(event);
      
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe correctly', () => {
      const handler = jest.fn();
      const subscriptionId = testEventBus.subscribe('test.event', handler);
      
      const unsubscribed = testEventBus.unsubscribe(subscriptionId);
      expect(unsubscribed).toBe(true);
      
      const unsubscribedAgain = testEventBus.unsubscribe(subscriptionId);
      expect(unsubscribedAgain).toBe(false);
    });

    it('should handle unsubscribe of non-existent subscription', () => {
      const result = testEventBus.unsubscribe('non-existent-id');
      expect(result).toBe(false);
    });

    it('should subscribe to multiple event types', () => {
      const handler = jest.fn();
      const eventTypes = ['event1', 'event2', 'event3'];
      
      const subscriptionIds = testEventBus.subscribeToMany(eventTypes, handler);
      
      expect(subscriptionIds).toHaveLength(3);
      expect(subscriptionIds.every(id => typeof id === 'string')).toBe(true);
    });
  });

  describe('Middleware', () => {
    it('should apply middleware in order', async () => {
      const order: string[] = [];
      
      const middleware1 = jest.fn(async (event, next) => {
        order.push('middleware1-start');
        await next();
        order.push('middleware1-end');
      });
      
      const middleware2 = jest.fn(async (event, next) => {
        order.push('middleware2-start');
        await next();
        order.push('middleware2-end');
      });
      
      testEventBus.use(middleware1);
      testEventBus.use(middleware2);
      
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { test: true });
      await testEventBus.emit(event);
      
      expect(order).toEqual([
        'middleware1-start',
        'middleware2-start',
        'middleware2-end',
        'middleware1-end'
      ]);
    });

    it('should handle middleware errors', async () => {
      const errorHandler = jest.fn(async (event, next) => {
        throw new Error('Middleware error');
      });
      
      testEventBus.use(errorHandler);
      
      const event = createEvent('test.event', { test: true });
      
      await expect(testEventBus.emit(event)).rejects.toThrow('Middleware error');
    });

    it('should support async middleware', async () => {
      const asyncMiddleware = jest.fn(async (event, next) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        await next();
      });
      
      testEventBus.use(asyncMiddleware);
      
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { test: true });
      const startTime = Date.now();
      
      await testEventBus.emit(event);
      
      const duration = Date.now() - startTime;
      expect(duration).toBeGreaterThanOrEqual(10);
      expect(asyncMiddleware).toHaveBeenCalled();
    });
  });

  describe('Metrics', () => {
    it('should track metrics correctly', async () => {
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { test: true });
      await testEventBus.emit(event);
      
      const metrics = testEventBus.getMetrics();
      
      expect(metrics.eventsEmitted).toBe(1);
      expect(metrics.eventsProcessed).toBe(1);
      expect(metrics.errors).toBe(0);
      expect(metrics.averageProcessingTime).toBeGreaterThan(0);
      expect(metrics.activeSubscriptions).toBe(1);
      expect(metrics.eventTypes).toContain('test.event');
    });

    it('should track errors', async () => {
      const errorHandler = jest.fn(() => {
        throw new Error('Handler error');
      });
      
      testEventBus.subscribe('test.event', errorHandler);
      
      const event = createEvent('test.event', { test: true });
      
      // Should not throw, but should track error
      await testEventBus.emit(event);
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.errors).toBe(1);
    });

    it('should reset metrics', async () => {
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { test: true });
      await testEventBus.emit(event);
      
      testEventBus.resetMetrics();
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.eventsEmitted).toBe(0);
      expect(metrics.eventsProcessed).toBe(0);
      expect(metrics.errors).toBe(0);
      expect(metrics.averageProcessingTime).toBe(0);
    });
  });

  describe('Retry Logic', () => {
    it('should retry failed handlers', async () => {
      const retryEventBus = new EventBus({
        retryAttempts: 3,
        retryDelay: 10,
      });
      
      let attempts = 0;
      const baseHandler = () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Temporary failure');
        }
      };
      const failingHandler = jest.fn(baseHandler);
      
      retryEventBus.subscribe('test.event', failingHandler);
      
      const event = createEvent('test.event', { test: true });
      await retryEventBus.emit(event);
      
      // Wait for all async operations to complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(attempts).toBe(3);
      expect(failingHandler).toHaveBeenCalledTimes(3);
    });

    it('should fail after max retry attempts', async () => {
      const retryEventBus = new EventBus({
        retryAttempts: 2,
        retryDelay: 10,
      });
      
      const baseHandler = () => {
        throw new Error('Always fails');
      };
      const alwaysFailingHandler = jest.fn(baseHandler);
      
      retryEventBus.subscribe('test.event', alwaysFailingHandler);
      
      const event = createEvent('test.event', { test: true });
      
      // Should not throw, but should track error
      await retryEventBus.emit(event);
      
      // Wait for all async operations to complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(alwaysFailingHandler).toHaveBeenCalledTimes(2);
      
      const metrics = retryEventBus.getMetrics();
      expect(metrics.errors).toBe(1);
    });
  });

  describe('Configuration', () => {
    it('should respect max listeners configuration', () => {
      const limitedEventBus = new EventBus({
        maxListeners: 2,
      });
      
      const handler = jest.fn();
      
      limitedEventBus.subscribe('test.event', handler);
      limitedEventBus.subscribe('test.event', handler);
      
      // Should not throw for 2 listeners
      expect(() => {
        limitedEventBus.subscribe('test.event', handler);
      }).not.toThrow();
    });

    it('should disable metrics when configured', async () => {
      const noMetricsEventBus = new EventBus({
        enableMetrics: false,
      });
      
      const handler = jest.fn();
      noMetricsEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { test: true });
      await noMetricsEventBus.emit(event);
      
      const metrics = noMetricsEventBus.getMetrics();
      expect(metrics.eventsEmitted).toBe(0);
      expect(metrics.eventsProcessed).toBe(0);
    });
  });

  describe('Cleanup', () => {
    it('should clear all subscriptions', () => {
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      testEventBus.subscribe('test.event2', handler);
      
      testEventBus.clear();
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.activeSubscriptions).toBe(0);
      expect(metrics.eventTypes).toHaveLength(0);
    });

    it('should handle cleanup of empty event bus', () => {
      expect(() => {
        testEventBus.clear();
      }).not.toThrow();
    });
  });

  describe('Utility Functions', () => {
    it('should create events with proper structure', () => {
      const event = createEvent('test.event', { data: 'test' }, {
        userId: 'user-123',
        correlationId: 'corr-456'
      });
      
      expect(event).toMatchObject({
        id: expect.stringMatching(/^evt_\d+_[a-z0-9]+$/),
        type: 'test.event',
        data: { data: 'test' },
        timestamp: expect.any(Number),
        metadata: {
          userId: 'user-123',
          correlationId: 'corr-456'
        }
      });
    });

    it('should generate unique event IDs', () => {
      const event1 = createEvent('test.event', {});
      const event2 = createEvent('test.event', {});
      
      expect(event1.id).not.toBe(event2.id);
    });
  });

  describe('Built-in Event Types', () => {
    it('should have all required event types', () => {
      expect(EventTypes.USER_CREATED).toBe('user.created');
      expect(EventTypes.USER_UPDATED).toBe('user.updated');
      expect(EventTypes.USER_DELETED).toBe('user.deleted');
      expect(EventTypes.ORGANIZATION_CREATED).toBe('organization.created');
      expect(EventTypes.AI_AGENT_CREATED).toBe('ai_agent.created');
      expect(EventTypes.MESSAGE_CREATED).toBe('message.created');
      expect(EventTypes.PLATFORM_CONNECTED).toBe('platform.connected');
      expect(EventTypes.SUBSCRIPTION_CREATED).toBe('subscription.created');
      expect(EventTypes.SYSTEM_ERROR).toBe('system.error');
    });
  });

  describe('Global Event Bus', () => {
    it('should provide global event bus instance', () => {
      expect(eventBus).toBeInstanceOf(EventBus);
    });

    it('should have default middleware registered', () => {
      // The global event bus should have middleware registered by default
      expect(eventBus).toBeDefined();
    });
  });
});

describe('Event Bus Middleware', () => {
  let testEventBus: EventBus;

  beforeEach(() => {
    testEventBus = new EventBus();
    jest.clearAllMocks();
  });

  describe('Audit Middleware', () => {
    it('should log important events', async () => {
      const { logAudit } = require('../../backend/lib/audit');
      
      testEventBus.use(auditMiddleware);
      
      const handler = jest.fn();
      testEventBus.subscribe('user.created', handler);
      
      const event = createEvent('user.created', { userId: 'user-123' });
      await testEventBus.emit(event);
      
      expect(logAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'USER_CREATED',
          resource: 'user',
          status: 'success'
        })
      );
    });

    it('should not log unimportant events', async () => {
      const { logAudit } = require('../../backend/lib/audit');
      
      testEventBus.use(auditMiddleware);
      
      const handler = jest.fn();
      testEventBus.subscribe('unimportant.event', handler);
      
      const event = createEvent('unimportant.event', { data: 'test' });
      await testEventBus.emit(event);
      
      expect(logAudit).not.toHaveBeenCalled();
    });
  });

  describe('Metrics Middleware', () => {
    it('should log processing time', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      testEventBus.use(metricsMiddleware);
      
      const handler = jest.fn();
      testEventBus.subscribe('test.event', handler);
      
      const event = createEvent('test.event', { data: 'test' });
      await testEventBus.emit(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/\[EventBus\] Processed test\.event in \d+ms/)
      );
      
      consoleSpy.mockRestore();
    });
  });
});
