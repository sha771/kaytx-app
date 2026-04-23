import { EventEmitter } from 'events';
import { logAudit, AuditActions } from './audit';
import { logger } from './production-logger';

// Event types and interfaces
export interface BaseEvent {
  id: string;
  type: string;
  timestamp: number;
  data: any;
  metadata?: {
    userId?: string;
    organizationId?: string;
    correlationId?: string;
    source?: string;
    version?: string;
  };
}

export interface EventHandler<T = any> {
  (event: T): Promise<void> | void;
}

export interface EventSubscription {
  id: string;
  eventType: string;
  handler: EventHandler;
  once?: boolean;
  createdAt: number;
}

export interface EventMiddleware {
  (event: BaseEvent, next: () => Promise<void>): Promise<void>;
}

export interface EventBusConfig {
  maxListeners?: number;
  enableMetrics?: boolean;
  enablePersistence?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

// Event Bus Implementation
export class EventBus {
  private emitter: EventEmitter;
  private subscriptions: Map<string, EventSubscription[]> = new Map();
  private middleware: EventMiddleware[] = [];
  private config: EventBusConfig;
  private metrics: {
    eventsEmitted: number;
    eventsProcessed: number;
    errors: number;
    averageProcessingTime: number;
  };

  constructor(config: EventBusConfig = {}) {
    this.config = {
      maxListeners: 1000,
      enableMetrics: true,
      enablePersistence: false,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config,
    };

    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(this.config.maxListeners || 1000);
    
    this.metrics = {
      eventsEmitted: 0,
      eventsProcessed: 0,
      errors: 0,
      averageProcessingTime: 0,
    };

    // Handle uncaught exceptions
    this.emitter.on('error', (error) => {
      logger.error('[EventBus] Unhandled error', error instanceof Error ? error : undefined, { error });
      this.metrics.errors++;
    });
  }

  // Emit an event
  async emit<T extends BaseEvent>(event: T): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Validate event
      if (!event.id || !event.type) {
        throw new Error('Event must have id and type');
      }

      // Add timestamp if not present
      if (!event.timestamp) {
        event.timestamp = Date.now();
      }

      // Log event emission
      if (this.config.enableMetrics) {
        this.metrics.eventsEmitted++;
      }

      // Apply middleware
      await this.applyMiddleware(event);

      // Emit to listeners and wait for handlers to complete
      const handlerPromises: Promise<void>[] = [];
      const subscriptions = this.subscriptions.get(event.type) || [];
      
      for (const subscription of subscriptions) {
        const handlerPromise = this.executeHandler(subscription, event);
        handlerPromises.push(handlerPromise);
      }
      
      // Wait for all handlers to complete
      const results = await Promise.allSettled(handlerPromises);
      
      // Track errors from handlers
      for (const result of results) {
        if (result.status === 'rejected') {
          this.metrics.errors++;
          logger.error('[EventBus] Handler error', result.reason instanceof Error ? result.reason : undefined, { error: result.reason });
        }
      }
      
      // Emit to EventEmitter for any raw listeners
      this.emitter.emit(event.type, event);

      // Update metrics - now after handlers have completed
      if (this.config.enableMetrics) {
        const processingTime = Date.now() - startTime;
        // Increment count first, then calculate average
        this.metrics.eventsProcessed++;
        this.updateProcessingTime(processingTime);
      }

      // Persist event if enabled
      if (this.config.enablePersistence) {
        await this.persistEvent(event);
      }

    } catch (error) {
      this.metrics.errors++;
      logger.error('[EventBus] Error emitting event', error instanceof Error ? error : undefined, { error });
      throw error;
    }
  }

  // Subscribe to events
  subscribe<T = BaseEvent>(
    eventType: string,
    handler: EventHandler<T>,
    options: { once?: boolean } = {}
  ): string {
    const subscription: EventSubscription = {
      id: this.generateId(),
      eventType,
      handler,
      once: options.once,
      createdAt: Date.now(),
    };

    // Store subscription
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, []);
    }
    this.subscriptions.get(eventType)!.push(subscription);

    // Register with EventEmitter
    if (options.once) {
      this.emitter.once(eventType, (event: T) => {
        this.executeHandler(subscription, event).catch((error) => {
          logger.error('[EventBus] Unhandled error in once handler', error instanceof Error ? error : undefined, { error });
        });
        this.removeSubscription(subscription.id);
      });
    } else {
      this.emitter.on(eventType, (event: T) => {
        this.executeHandler(subscription, event).catch((error) => {
          logger.error('[EventBus] Unhandled error in handler', error instanceof Error ? error : undefined, { error });
        });
      });
    }

    return subscription.id;
  }

  // Unsubscribe from events
  unsubscribe(subscriptionId: string): boolean {
    for (const [eventType, subscriptions] of this.subscriptions.entries()) {
      const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
      if (index !== -1) {
        const subscription = subscriptions[index];
        subscriptions.splice(index, 1);
        
        // Remove from EventEmitter
        this.emitter.removeListener(eventType, subscription.handler);
        
        // Clean up empty subscription arrays
        if (subscriptions.length === 0) {
          this.subscriptions.delete(eventType);
        }
        
        return true;
      }
    }
    return false;
  }

  // Subscribe to multiple event types
  subscribeToMany<T = BaseEvent>(
    eventTypes: string[],
    handler: EventHandler<T>,
    options: { once?: boolean } = {}
  ): string[] {
    return eventTypes.map(eventType => this.subscribe(eventType, handler, options));
  }

  // Add middleware
  use(middleware: EventMiddleware): void {
    this.middleware.push(middleware);
  }

  // Get metrics
  getMetrics() {
    return {
      ...this.metrics,
      activeSubscriptions: Array.from(this.subscriptions.values())
        .reduce((total, subs) => total + subs.length, 0),
      eventTypes: Array.from(this.subscriptions.keys()),
    };
  }

  // Clear all subscriptions
  clear(): void {
    this.subscriptions.clear();
    this.emitter.removeAllListeners();
  }

  // Get subscriptions for an event type
  getSubscriptions(eventType: string): EventSubscription[] {
    return this.subscriptions.get(eventType) || [];
  }

  // Retry failed event processing
  private async executeHandler(subscription: EventSubscription, event: any): Promise<void> {
    const retryAttempts = this.config.retryAttempts || 3;
    const retryDelay = this.config.retryDelay || 1000;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        await subscription.handler(event);
        return;
      } catch (error) {
        logger.error(
          '[EventBus] Handler error',
          error instanceof Error ? error : undefined,
          { error, attempt, maxAttempts: retryAttempts }
        );

        if (attempt === retryAttempts) {
          this.metrics.errors++;
          
          // Log failed event processing (non-blocking)
          try {
            await logAudit({
              action: AuditActions.SYSTEM_ERROR,
              resource: 'event_bus',
              metadata: {
                eventType: event.type,
                subscriptionId: subscription.id,
                error: error instanceof Error ? error.message : 'Unknown error',
                attempts: retryAttempts,
              },
              status: 'failure',
            });
          } catch (auditError) {
            // Audit logging failure shouldn't prevent error propagation
            logger.error('[EventBus] Failed to log audit', auditError instanceof Error ? auditError : undefined, { error: auditError });
          }
          
          throw error;
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  }

  // Apply middleware to events
  private async applyMiddleware(event: BaseEvent): Promise<void> {
    let index = 0;

    const next = async (): Promise<void> => {
      if (index < this.middleware.length) {
        const middleware = this.middleware[index++];
        await middleware(event, next);
      }
    };

    await next();
  }

  // Update processing time metrics
  private updateProcessingTime(processingTime: number): void {
    const count = this.metrics.eventsProcessed;
    if (count <= 1) {
      // First event: just use the processing time directly
      this.metrics.averageProcessingTime = processingTime;
    } else {
      // Subsequent events: calculate running average
      const current = this.metrics.averageProcessingTime || 0;
      this.metrics.averageProcessingTime = (current * (count - 1) + processingTime) / count;
    }
  }

  private async persistEvent(event: BaseEvent): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      try {
        const db = getDb();
        if (!db) throw new Error('Database connection unavailable');
        
        await db.insert(aiAgentEvents).values({
          id: crypto.randomUUID(),
          agentId: (event.metadata as any)?.agentId || 'system',
          organizationId: event.metadata?.organizationId || 'system',
          type: event.type,
          data: event.data,
          createdAt: new Date(event.timestamp)
        } as any);
      } catch (error) {
        logger.error('[EventBus] Failed to persist event in production', error instanceof Error ? error : undefined, { eventId: event.id });
        throw error; // Fail-fast in production
      }
    } else {
      // Development mock persistence
      logger.debug('[EventBus] Persisting event (mock)', { type: event.type, id: event.id });
    }
  }

  // Remove subscription
  private removeSubscription(subscriptionId: string): void {
    for (const [eventType, subscriptions] of this.subscriptions.entries()) {
      const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
      if (index !== -1) {
        subscriptions.splice(index, 1);
        if (subscriptions.length === 0) {
          this.subscriptions.delete(eventType);
        }
        break;
      }
    }
  }

  // Reset metrics
  resetMetrics(): void {
    this.metrics = {
      eventsEmitted: 0,
      eventsProcessed: 0,
      errors: 0,
      averageProcessingTime: 0,
    };
  }

  // Generate unique ID
  private generateId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Global event bus instance
export const eventBus = new EventBus({
  enableMetrics: true,
  maxListeners: 1000,
});

// Common event types
export const EventTypes = {
  // User events
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  
  // Organization events
  ORGANIZATION_CREATED: 'organization.created',
  ORGANIZATION_UPDATED: 'organization.updated',
  ORGANIZATION_DELETED: 'organization.deleted',
  
  // AI Agent events
  AI_AGENT_CREATED: 'ai_agent.created',
  AI_AGENT_UPDATED: 'ai_agent.updated',
  AI_AGENT_DELETED: 'ai_agent.deleted',
  AI_AGENT_EXECUTED: 'ai_agent.executed',
  
  // Message events
  MESSAGE_CREATED: 'message.created',
  MESSAGE_UPDATED: 'message.updated',
  MESSAGE_DELETED: 'message.deleted',
  
  // Platform events
  PLATFORM_CONNECTED: 'platform.connected',
  PLATFORM_DISCONNECTED: 'platform.disconnected',
  PLATFORM_SYNCED: 'platform.synced',
  
  // Billing events
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  PAYMENT_PROCESSED: 'payment.processed',
  
  // System events
  SYSTEM_BACKUP: 'system.backup',
  SYSTEM_ERROR: 'system.error',
  SYSTEM_MAINTENANCE: 'system.maintenance',
} as const;

// Event creator helpers
export function createEvent<T = any>(
  type: string,
  data: T,
  metadata?: BaseEvent['metadata']
): BaseEvent & { data: T } {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp: Date.now(),
    data,
    metadata,
  };
}

// Middleware for common functionality
export const auditMiddleware: EventMiddleware = async (event, next) => {
  // Log important events to audit trail
  const importantEvents = [
    EventTypes.USER_CREATED,
    EventTypes.USER_DELETED,
    EventTypes.ORGANIZATION_CREATED,
    EventTypes.AI_AGENT_CREATED,
    EventTypes.PAYMENT_PROCESSED,
  ];

  if (importantEvents.includes(event.type as any)) {
    logAudit({
      userId: event.metadata?.userId,
      organizationId: event.metadata?.organizationId,
      action: event.type.replace('.', '_').toUpperCase() as any,
      resource: event.type.split('.')[0],
      resourceId: event.data?.id,
      metadata: {
        eventId: event.id,
        correlationId: event.metadata?.correlationId,
      },
      status: 'success',
    });
  }

  await next();
};

export const metricsMiddleware: EventMiddleware = async (event, next) => {
  const startTime = Date.now();
  await next();
  const duration = Date.now() - startTime;
  
  // Log processing metrics
  logger.debug(`[EventBus] Processed event`, { type: event.type, durationMs: duration });
};

export const errorHandlingMiddleware: EventMiddleware = async (event, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(`[EventBus] Error processing event`, error instanceof Error ? error : undefined, { type: event.type, error });
    
    // Emit error event
    await eventBus.emit(createEvent(
      EventTypes.SYSTEM_ERROR,
      {
        originalEvent: event,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        source: 'event_bus',
        correlationId: event.metadata?.correlationId,
      }
    ));
    
    throw error;
  }
};

// Register default middleware
eventBus.use(auditMiddleware);
eventBus.use(errorHandlingMiddleware);
eventBus.use(metricsMiddleware);
