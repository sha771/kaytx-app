import amqp from 'amqplib';
import { EventEmitter } from 'events';

import { createLogger } from '../lib/production-logger';

// ============================================================================
// MOCK IMPLEMENTATIONS (Replace with actual service calls in Production)
// ============================================================================

const renderEmailTemplate = (template: string, data: any) => `<html>${template}</html>`;

const sendEmailViaProvider = async (options: any) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: Production email provider called through mock implementation in MessageQueueService');
  }
  return { messageId: 'mock-id' };
};

const storeInAppNotification = async (userId: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: Production in-app notification store called through mock implementation in MessageQueueService');
  }
  return { id: 'mock' };
};

const sendPushNotification = async (userId: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: Production push notification called through mock implementation in MessageQueueService');
  }
  return { sent: true };
};

const queueEmailNotification = async (userId: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: Production email queue called through mock implementation in MessageQueueService');
  }
  return { queued: true };
};

const sendSMSNotification = async (userId: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: Production SMS notification called through mock implementation in MessageQueueService');
  }
  return { sent: true };
};

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

/**
 * Production-ready Message Queue Service
 * Uses RabbitMQ for async job processing and event distribution
 */

interface JobMessage {
  id: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  retries: number;
  maxRetries: number;
  retryDelayMs?: number;
  deadLetterExchange?: string;
}

export class MessageQueueService extends EventEmitter {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 5000; // ms

  private readonly queues = {
    // Call Processing
    CALL_PROCESSING: 'call.processing',
    CALL_TRANSCRIPTION: 'call.transcription',
    CALL_ANALYTICS: 'call.analytics',

    // AI Agent Operations
    AI_CONVERSATION: 'ai.conversation',
    AI_INFERENCE: 'ai.inference',
    AI_TOOL_EXECUTION: 'ai.tool.execution',

    // User Notifications
    NOTIFICATIONS: 'notifications',
    EMAIL: 'email.send',
    SMS: 'sms.send',

    // Data Processing
    DATA_EXPORT: 'data.export',
    DATA_IMPORT: 'data.import',
    ANALYTICS_UPDATE: 'analytics.update',

    // Dead Letter
    DEAD_LETTER: 'dlx',
  };

  private readonly exchanges = {
    EVENTS: 'events',
    JOBS: 'jobs',
    DLX: 'dlx',
  };

  constructor(private brokerUrl: string = MessageQueueService.getBrokerUrl()) {
    super();
  }

  private static getBrokerUrl(): string {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProduction = nodeEnv === 'production';

    const envUrl = process.env.RABBITMQ_URL;
    if (envUrl) {
      return envUrl;
    }

    if (isProduction) {
      throw new Error('RABBITMQ_URL is required in production');
    }

    return 'amqp://guest:guest@localhost';
  }

  /**
   * Initialize message queue connection and declare all exchanges/queues
   */
  async initialize(): Promise<void> {
    try {
      const conn = await amqp.connect(this.brokerUrl);
      this.connection = conn as any;
      const chan = await (this.connection as any).createChannel();
      this.channel = chan as any;

      logger.info('✅ Connected to RabbitMQ');

      // Set prefetch to 1 for fair dispatch
      if (this.channel) {
        await this.channel.prefetch(1);
      }

      // Declare exchanges
      await this.declareExchanges();

      // Declare queues
      await this.declareQueues();

      // Handle connection events
      if (this.connection) {
        (this.connection as any).on('error', (err: Error) => this.handleConnectionError(err));
        (this.connection as any).on('close', () => this.handleConnectionClose());
      }

      this.reconnectAttempts = 0;
    } catch (error) {
      logger.error('❌ Failed to connect to RabbitMQ:', error);
      await this.reconnect();
    }
  }

  /**
   * Declare all message exchanges
   */
  private async declareExchanges(): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    // Topic exchange for event publishing
    await this.channel.assertExchange(this.exchanges.EVENTS, 'topic', { durable: true });

    // Direct exchange for direct job routing
    await this.channel.assertExchange(this.exchanges.JOBS, 'direct', { durable: true });

    // Dead letter exchange
    await this.channel.assertExchange(this.exchanges.DLX, 'direct', { durable: true });

    logger.info('✅ Exchanges declared');
  }

  /**
   * Declare all durable queues with DLX configuration
   */
  private async declareQueues(): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    const queueConfigs: Record<string, any> = {
      [this.queues.CALL_PROCESSING]: { durable: true, arguments: { 'x-max-priority': 10 } },
      [this.queues.CALL_TRANSCRIPTION]: { durable: true, arguments: { 'x-message-ttl': 3600000 } }, // 1 hour TTL
      [this.queues.CALL_ANALYTICS]: { durable: true },
      [this.queues.AI_CONVERSATION]: { durable: true, arguments: { 'x-max-priority': 10 } },
      [this.queues.AI_INFERENCE]: { durable: true },
      [this.queues.AI_TOOL_EXECUTION]: { durable: true, arguments: { 'x-max-priority': 5 } },
      [this.queues.NOTIFICATIONS]: { durable: true },
      [this.queues.EMAIL]: { durable: true, arguments: { 'x-message-ttl': 86400000 } }, // 24 hour TTL
      [this.queues.SMS]: { durable: true, arguments: { 'x-message-ttl': 3600000 } }, // 1 hour TTL
      [this.queues.DATA_EXPORT]: { durable: true },
      [this.queues.DATA_IMPORT]: { durable: true },
      [this.queues.ANALYTICS_UPDATE]: { durable: true },
      [this.queues.DEAD_LETTER]: { durable: true },
    };

    // Add DLX to all queues
    for (const [queueName, config] of Object.entries(queueConfigs)) {
      if (queueName !== this.queues.DEAD_LETTER) {
        config.arguments = config.arguments || {};
        config.arguments['x-dead-letter-exchange'] = this.exchanges.DLX;
      }
      await this.channel.assertQueue(queueName, config);
    }

    // Bind queues to exchanges
    await this.channel.bindQueue(this.queues.DEAD_LETTER, this.exchanges.DLX, this.queues.DEAD_LETTER);

    logger.info('✅ Queues declared and bound');
  }

  /**
   * Publish a job to the queue with retry logic
   */
  async publishJob(queueName: string, job: any, options: { priority?: number; delay?: number } = {}): Promise<string> {
    if (!this.channel) throw new Error('Channel not initialized');

    const existingRetries = typeof job?.retries === 'number' ? job.retries : 0;
    const existingMaxRetries = typeof job?.maxRetries === 'number' ? job.maxRetries : (job?.maxRetries ? Number(job.maxRetries) : 3);
    const existingId = typeof job?.id === 'string' ? job.id : undefined;
    const existingTimestamp = job?.timestamp ? new Date(job.timestamp) : new Date();
    const existingRetryDelayMs = typeof job?.retryDelayMs === 'number' ? job.retryDelayMs : (job?.retryDelayMs ? Number(job.retryDelayMs) : undefined);

    const jobMessage: JobMessage = {
      id: existingId || `job-${Date.now()}-${Math.random()}`,
      type: job.type || 'default',
      data: job.data || {},
      timestamp: existingTimestamp,
      retries: existingRetries,
      maxRetries: Number.isFinite(existingMaxRetries) ? existingMaxRetries : 3,
      retryDelayMs: Number.isFinite(existingRetryDelayMs as any) ? (existingRetryDelayMs as any) : undefined,
    };

    const messageBuffer = Buffer.from(JSON.stringify(jobMessage));

    const publishOptions: any = {
      persistent: true,
      contentType: 'application/json',
      timestamp: Date.now(),
      messageId: jobMessage.id,
    };

    if (options.priority) {
      publishOptions.priority = options.priority;
    }

    if (options.delay) {
      publishOptions.expiration = options.delay;
    }

    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, messageBuffer, publishOptions);

    logger.info(`📤 Job published to ${queueName}:`, jobMessage.id);
    return jobMessage.id;
  }

  /**
   * Consume jobs from queue with automatic acknowledgment handling
   */
  async consumeQueue(
    queueName: string,
    handler: (job: JobMessage) => Promise<void>,
    errorHandler?: (error: Error, job: JobMessage) => Promise<void>
  ): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    await this.channel.assertQueue(queueName, { durable: true });

    this.channel.consume(queueName, async (msg: amqp.ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const job = JSON.parse(msg.content.toString()) as JobMessage;

        logger.info(`📥 Processing job from ${queueName}:`, job.id);

        // Execute handler
        await handler(job);

        // Acknowledge successful processing
        this.channel?.ack(msg);
        logger.info(`✅ Job completed:`, job.id);
      } catch (error) {
        const job = JSON.parse(msg.content.toString());
        logger.error(`❌ Job failed:`, job.id, error);

        // Retry logic
        if (job.retries < job.maxRetries) {
          job.retries++;
          logger.info(`🔄 Retrying job (${job.retries}/${job.maxRetries}):`, job.id);

          const baseDelay = typeof job.retryDelayMs === 'number' ? job.retryDelayMs : 2000;
          const maxDelay = 15 * 60 * 1000;
          const delayMs = Math.min(Math.round(baseDelay * Math.pow(2, Math.max(0, job.retries - 1))), maxDelay);

          // Ack immediately so long delays don't block the consumer.
          this.channel?.ack(msg);

          setTimeout(() => {
            this.publishJob(queueName, job).catch((publishErr) => {
              logger.error(`❌ Failed to requeue job:`, job.id, publishErr);
            });
          }, delayMs);
        } else {
          // Send to dead letter queue
          logger.error(`☠️  Sending job to DLQ after max retries:`, job.id);

          if (errorHandler) {
            try {
              await errorHandler(error as Error, job);
            } catch (dlqError) {
              logger.error('Error in error handler:', dlqError);
            }
          }

          this.channel?.ack(msg);
        }
      }
    });

    logger.info(`👂 Consuming from queue: ${queueName}`);
  }

  /**
   * Publish event to topic exchange
   */
  async publishEvent(topic: string, event: any): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    const eventData = {
      event: topic,
      data: event,
      timestamp: new Date().toISOString(),
    };

    this.channel.publish(this.exchanges.EVENTS, topic, Buffer.from(JSON.stringify(eventData)), {
      persistent: true,
      contentType: 'application/json',
    });

    logger.info(`📢 Event published to topic ${topic}`);
  }

  /**
   * Subscribe to events on topic
   */
  async subscribeToEvent(
    topic: string,
    handler: (event: any) => Promise<void>
  ): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    // Create temporary queue for this subscription
    const queueName = `event.${topic}.${Date.now()}`;
    await this.channel.assertQueue(queueName, { exclusive: true, autoDelete: true });
    await this.channel.bindQueue(queueName, this.exchanges.EVENTS, topic);

    this.channel.consume(queueName, async (msg: amqp.ConsumeMessage | null) => {
      if (msg) {
        const event = JSON.parse(msg.content.toString());
        try {
          await handler(event.data);
          this.channel?.ack(msg);
        } catch (error) {
          logger.error('Error processing event:', error);
          this.channel?.nack(msg, false, true);
        }
      }
    });

    logger.info(`📡 Subscribed to event topic: ${topic}`);
  }

  /**
   * Get queue statistics
   */
  async getQueueStats(queueName: string): Promise<any> {
    if (!this.channel) throw new Error('Channel not initialized');

    const queueInfo = await this.channel.checkQueue(queueName);
    return {
      queue: queueName,
      messageCount: queueInfo.messageCount,
      consumerCount: queueInfo.consumerCount,
    };
  }

  /**
   * Purge queue (use with caution)
   */
  async purgeQueue(queueName: string): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    await this.channel.purgeQueue(queueName);
    logger.info(`🧹 Queue purged: ${queueName}`);
  }

  /**
   * Close connection
   */
  async close(): Promise<void> {
    try {
      if (this.channel) {
        await (this.channel as any).close();
      }
      if (this.connection) {
        await (this.connection as any).close();
      }
      logger.info('✅ RabbitMQ connection closed');
    } catch (error) {
      logger.error('Error closing connection:', error);
    }
  }

  /**
   * Handle connection error
   */
  private handleConnectionError(error: Error): void {
    logger.error('❌ RabbitMQ connection error:', error);
    this.reconnect();
  }

  /**
   * Handle connection close
   */
  private handleConnectionClose(): void {
    logger.warn('⚠️  RabbitMQ connection closed');
    this.reconnect();
  }

  /**
   * Attempt to reconnect
   */
  private async reconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('❌ Max reconnection attempts reached');
      process.exit(1);
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts;

    logger.info(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      this.initialize().catch((err) => logger.error('Reconnect failed', err));
    }, delay);
  }
}

// Export singleton instance
export const messageQueue = new MessageQueueService();
