import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { eventBus, EventBus, EventMiddleware } from '../event-bus';

describe('EventBus', () => {
  let testEventBus: EventBus;
  
  beforeEach(() => {
    testEventBus = new EventBus();
  });

  afterEach(() => {
    testEventBus.clear();
  });

  describe('Basic Event Emission and Subscription', () => {
    it('should emit and receive events', async () => {
      const mockHandler = jest.fn();
      
      testEventBus.subscribe('test-event', mockHandler);
      await testEventBus.emit({
        id: 'test-1',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'test-event',
          data: { message: 'hello' },
          timestamp: expect.any(Number),
          id: 'test-1',
        })
      );
    });

    it('should support multiple subscribers', async () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      testEventBus.subscribe('test-event', handler1);
      testEventBus.subscribe('test-event', handler2);
      await testEventBus.emit({
        id: 'test-2',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });

    it('should support different event types', async () => {
      const userHandler = jest.fn();
      const orderHandler = jest.fn();
      
      testEventBus.subscribe('user.created', userHandler);
      testEventBus.subscribe('order.created', orderHandler);
      
      await testEventBus.emit({
        id: 'test-3',
        type: 'user.created',
        timestamp: Date.now(),
        data: { userId: '123' }
      });
      await testEventBus.emit({
        id: 'test-4',
        type: 'order.created',
        timestamp: Date.now(),
        data: { orderId: '456' }
      });
      
      expect(userHandler).toHaveBeenCalledTimes(1);
      expect(orderHandler).toHaveBeenCalledTimes(1);
      expect(userHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'user.created',
          data: { userId: '123' },
        })
      );
    });
  });

  describe('Subscription Management', () => {
    it('should allow unsubscribing from events', async () => {
      const handler = jest.fn();
      
      const subscriptionId = testEventBus.subscribe('test-event', handler);
      testEventBus.unsubscribe(subscriptionId);
      
      await testEventBus.emit({
        id: 'test-5',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(handler).not.toHaveBeenCalled();
    });

    it('should support once subscriptions', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test-event', handler, { once: true });
      await testEventBus.emit({
        id: 'test-6',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      await testEventBus.emit({
        id: 'test-7',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'world' }
      });
      
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should clear all subscriptions', async () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      testEventBus.subscribe('event1', handler1);
      testEventBus.subscribe('event2', handler2);
      testEventBus.clear();
      
      await testEventBus.emit({
        id: 'test-8',
        type: 'event1',
        timestamp: Date.now(),
        data: {}
      });
      await testEventBus.emit({
        id: 'test-9',
        type: 'event2',
        timestamp: Date.now(),
        data: {}
      });
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  describe('Middleware Support', () => {
    it('should execute middleware before handlers', async () => {
      const middleware = jest.fn(async (event: any, next: any) => {
        event.data.processed = true;
        await next();
      });
      
      const handler = jest.fn<void, [any]>();
      
      testEventBus.use(middleware as unknown as EventMiddleware);
      testEventBus.subscribe('test-event', handler);
      await testEventBus.emit({
        id: 'test-10',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(middleware).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { message: 'hello', processed: true },
        })
      );
    });

    it('should support multiple middleware', async () => {
      const middleware1 = jest.fn(async (event: any, next: any) => {
        event.data.step1 = true;
        await next();
      });
      
      const middleware2 = jest.fn(async (event: any, next: any) => {
        event.data.step2 = true;
        await next();
      });
      
      const handler = jest.fn<void, [any]>();
      
      testEventBus.use(middleware1 as unknown as EventMiddleware);
      testEventBus.use(middleware2 as unknown as EventMiddleware);
      testEventBus.subscribe('test-event', handler);
      await testEventBus.emit({
        id: 'test-11',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { message: 'hello', step1: true, step2: true },
        })
      );
    });

    it('should allow middleware to stop event propagation', async () => {
      const middleware = jest.fn(async (event: any, next: any) => {
        if (event.data.stop) {
          return; // Don't call next()
        }
        await next();
      });
      
      const handler = jest.fn<void, [any]>();
      
      testEventBus.use(middleware as unknown as EventMiddleware);
      testEventBus.subscribe('test-event', handler);
      
      await testEventBus.emit({
        id: 'test-12',
        type: 'test-event',
        timestamp: Date.now(),
        data: { stop: false }
      });
      await testEventBus.emit({
        id: 'test-13',
        type: 'test-event',
        timestamp: Date.now(),
        data: { stop: true }
      });
      
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle handler errors gracefully', async () => {
      const errorHandler = jest.fn(() => {
        throw new Error('Handler error');
      });
      
      const successHandler = jest.fn();
      
      testEventBus.subscribe('test-event', errorHandler);
      testEventBus.subscribe('test-event', successHandler);
      
      // Should not throw even with handler error
      await expect(testEventBus.emit({
        id: 'test-14',
        type: 'test-event',
        timestamp: Date.now(),
        data: {}
      })).resolves.toBeUndefined();
      
      expect(errorHandler).toHaveBeenCalled();
      expect(successHandler).toHaveBeenCalled();
    });

    it('should handle middleware errors', async () => {
      const middleware = jest.fn(async () => {
        throw new Error('Middleware error');
      });
      
      const handler = jest.fn<void, [any]>();
      
      testEventBus.use(middleware as unknown as EventMiddleware);
      testEventBus.subscribe('test-event', handler);
      
      await expect(testEventBus.emit({
        id: 'test-15',
        type: 'test-event',
        timestamp: Date.now(),
        data: {}
      })).rejects.toThrow('Middleware error');
      expect(middleware).toHaveBeenCalled();
      // Handler should not be called if middleware fails
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Metrics and Monitoring', () => {
    it('should track event metrics', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test-event', handler);
      await testEventBus.emit({
        id: 'test-16',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.eventsEmitted).toBe(1);
      expect(metrics.eventsProcessed).toBe(1);
      expect(metrics.errors).toBe(0);
    });

    it('should track errors', async () => {
      const errorHandler = jest.fn(() => {
        throw new Error('Handler error');
      });
      
      testEventBus.subscribe('test-event', errorHandler);
      await testEventBus.emit({
        id: 'test-17',
        type: 'test-event',
        timestamp: Date.now(),
        data: {}
      });
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.eventsEmitted).toBe(1);
      expect(metrics.eventsProcessed).toBe(1);
      expect(metrics.errors).toBe(1);
    });

    it('should track active subscriptions', () => {
      testEventBus.subscribe('event1', jest.fn());
      testEventBus.subscribe('event1', jest.fn());
      testEventBus.subscribe('event2', jest.fn());
      
      const metrics = testEventBus.getMetrics();
      expect(metrics.activeSubscriptions).toBe(3);
    });
  });

  describe('Async Operations', () => {
    it('should handle async handlers', async () => {
      const asyncHandler = jest.fn(async (event) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        // Async handlers should return void or Promise<void>
        return;
      });
      
      testEventBus.subscribe('test-event', asyncHandler);
      await testEventBus.emit({
        id: 'test-18',
        type: 'test-event',
        timestamp: Date.now(),
        data: { message: 'hello' }
      });
      
      expect(asyncHandler).toHaveBeenCalled();
    });

    it('should handle async middleware', async () => {
      const asyncMiddleware = jest.fn(async (event: any, next: any) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        event.data.asyncProcessed = true;
        await next();
      });
      
      const handler = jest.fn<void, [any]>();
      
      testEventBus.use(asyncMiddleware as unknown as EventMiddleware);
      testEventBus.subscribe('test-event', handler);
      await testEventBus.emit({
        id: 'test-19',
        type: 'test-event',
        timestamp: Date.now(),
        data: {}
      });
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { asyncProcessed: true },
        })
      );
    });
  });

  describe('Global EventBus Instance', () => {
    it('should provide global eventBus instance', () => {
      expect(eventBus).toBeInstanceOf(EventBus);
    });

    it('should work with global instance', async () => {
      const handler = jest.fn();
      
      eventBus.subscribe('global-test', handler);
      await eventBus.emit({
        id: 'test-20',
        type: 'global-test',
        timestamp: Date.now(),
        data: { global: true }
      });
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'global-test',
          data: { global: true },
        })
      );
      
      // Cleanup
      eventBus.clear();
    });
  });

  describe('Event Validation', () => {
    it('should validate event structure', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test-event', handler);
      
      // Should throw for invalid event (missing id)
      await expect(testEventBus.emit({
        type: 'test-event',
        data: {}
      } as any)).rejects.toThrow('Event must have id and type');
      
      // Should throw for invalid event (missing type)
      await expect(testEventBus.emit({
        id: 'test-21',
        data: {}
      } as any)).rejects.toThrow('Event must have id and type');
      
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle null/undefined data', async () => {
      const handler = jest.fn();
      
      testEventBus.subscribe('test-event', handler);
      await testEventBus.emit({
        id: 'test-22',
        type: 'test-event',
        timestamp: Date.now(),
        data: null
      });
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'test-event',
          data: null,
        })
      );
    });
  });

  describe('Performance', () => {
    it('should handle high volume events efficiently', async () => {
      const handler = jest.fn();
      const eventCount = 100;
      
      testEventBus.subscribe('performance-test', handler);
      
      const startTime = Date.now();
      
      const promises = Array(eventCount).fill(null).map((_, index) =>
        testEventBus.emit({
          id: `perf-${index}`,
          type: 'performance-test',
          timestamp: Date.now(),
          data: { index }
        })
      );
      
      await Promise.all(promises);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(handler).toHaveBeenCalledTimes(eventCount);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});
