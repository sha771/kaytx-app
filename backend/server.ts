import { serve } from '@hono/node-server'
import app from './hono'
import { RealTimeService } from './services/realtime-service'
import { twilioCallingService } from './services/twilio-calling-service'
import { aiAgentService } from './services/ai-agent-service'
import { messageQueue } from './services/message-queue-service'
import { db as pgDb } from './db/connection'
import { callLogs } from './db/drizzle-schema'
import { desc, eq, sql } from 'drizzle-orm'
import { initializeOpenTelemetry } from './lib/opentelemetry'
import { alertingService } from './lib/alerting-service'
import { setupComprehensiveMonitoring } from './lib/monitoring-setup'
import { logger } from './lib/production-logger'

// Initialize comprehensive monitoring
setupComprehensiveMonitoring(app)

// Initialize OpenTelemetry for distributed tracing
const otelSDK = initializeOpenTelemetry()

// Initialize alerting service
logger.info('[Server] Alerting service initialized')
logger.info('[Server] Comprehensive monitoring setup complete')

const port = Number(process.env.PORT || '3001')
logger.info(`Server is running on port ${port}`)

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  otelSDK.shutdown()
    .then(() => logger.info('OpenTelemetry shut down'))
    .catch((err) => logger.error('Error shutting down OpenTelemetry', err))
    .finally(() => process.exit(0))
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  otelSDK.shutdown()
    .then(() => logger.info('OpenTelemetry shut down'))
    .catch((err) => logger.error('Error shutting down OpenTelemetry', err))
    .finally(() => process.exit(0))
})

const server = serve({
    fetch: app.fetch,
    port
})

const realtime = new RealTimeService(server as any)

const enableRabbitMQ = String(process.env.ENABLE_RABBITMQ_WORKERS || '').toLowerCase() === 'true'

if (enableRabbitMQ) {
    const startWorkers = async () => {
        try {
            await messageQueue.initialize()

            await messageQueue.consumeQueue(
                'call.transcription',
                async (job) => {
                    const organizationId = job.data?.organizationId
                    const callId = job.data?.callId
                    let callSid = job.data?.callSid

                    if (!organizationId || !callId) {
                        throw new Error('Missing organizationId/callId')
                    }

                    if (!callSid) {
                        const [row] = await pgDb
                            .select()
                            .from(callLogs)
                            .where(
                                sql`${callLogs.organizationId} = ${organizationId} and ${callLogs.metadata}->>'callId' = ${callId}`
                            )
                            .orderBy(desc(callLogs.createdAt))
                            .limit(1)

                        callSid = (row as any)?.metadata?.twilioSid
                    }

                    if (!callSid) {
                        throw new Error('Missing callSid')
                    }

                    const transcription = await twilioCallingService.getTranscription(String(callSid))
                    if (!transcription) {
                        throw new Error('Transcription not available')
                    }

                    const summary = transcription.length > 300 ? `${transcription.slice(0, 300)}...` : transcription

                    const [existing] = await pgDb
                        .select()
                        .from(callLogs)
                        .where(
                            sql`${callLogs.organizationId} = ${organizationId} and ${callLogs.metadata}->>'callId' = ${callId}`
                        )
                        .orderBy(desc(callLogs.createdAt))
                        .limit(1)

                    if (!existing?.id) {
                        throw new Error('Call log not found')
                    }

                    await pgDb
                        .update(callLogs)
                        .set({
                            transcription,
                            summary,
                        } as any)
                        .where(eq(callLogs.id, existing.id as any))
                },
                async (error, job) => {
                    logger.error('[MessageQueue] call.transcription failed permanently', error as Error)
                }
            )
        } catch (err) {
            logger.warn('[MessageQueue] Failed to initialize RabbitMQ workers (disabled)', err)
        }
    }

    startWorkers()
}

twilioCallingService.on('call:initiated', (call) => {
    realtime.broadcast({
        organizationId: call?.metadata?.organizationId,
        channel: 'phone-status',
        type: 'call_update',
        payload: { event: 'call:initiated', call },
    })
})

twilioCallingService.on('call:ended', (call) => {
    realtime.broadcast({
        organizationId: call?.metadata?.organizationId,
        channel: 'phone-status',
        type: 'call_update',
        payload: { event: 'call:ended', call },
    })
})

twilioCallingService.on('call:answered', (call) => {
    realtime.broadcast({
        organizationId: call?.metadata?.organizationId,
        channel: 'phone-status',
        type: 'call_update',
        payload: { event: 'call:answered', call },
    })
})

twilioCallingService.on('call:completed', (call) => {
    realtime.broadcast({
        organizationId: call?.metadata?.organizationId,
        channel: 'phone-status',
        type: 'call_update',
        payload: { event: 'call:completed', call },
    })

    if (enableRabbitMQ) {
        messageQueue.publishJob('call.transcription', {
            type: 'call.transcription',
            data: {
                organizationId: call?.metadata?.organizationId,
                callId: call?.id,
                callSid: call?.sid,
            },
            maxRetries: 12,
            retryDelayMs: 30_000,
        }).catch((err) => {
            logger.warn('[MessageQueue] Failed to publish call.transcription job', err)
        })
    }
})

twilioCallingService.on('call:failed', (call) => {
    realtime.broadcast({
        organizationId: call?.metadata?.organizationId,
        channel: 'phone-status',
        type: 'call_update',
        payload: { event: 'call:failed', call },
    })
})

twilioCallingService.on('call:transcription', (evt: any) => {
    realtime.broadcast({
        organizationId: evt?.organizationId,
        channel: 'phone-status',
        type: 'call_transcription',
        payload: evt,
    })
})

aiAgentService.on('message:processed', (evt: any) => {
    realtime.broadcast({
        organizationId: evt?.metadata?.organizationId,
        channel: 'ai-agent',
        type: 'agent_message',
        payload: evt,
    })
})
