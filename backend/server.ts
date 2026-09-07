import { serve } from '@hono/node-server'
import { logger } from './lib/production-logger'

if (!process.env.OPENAI_API_KEY) {
  process.env.OPENAI_API_KEY = 'sk-mock'
}
if (!process.env.OTEL_ENABLE_TRACING) {
  process.env.OTEL_ENABLE_TRACING = 'false'
}

async function startServer() {
  try {
    // Lazy-load heavy modules to avoid startup hangs
    const [honoModule, rtModule, twilioModule, aiModule, mqModule, dbModule, schemaModule, ormModule, sbModule, teModule, aeModule, saModule, otelModule] = await Promise.all([
      import('./hono'),
      import('./services/realtime-service'),
      import('./services/twilio-calling-service'),
      import('./services/ai-agent-service'),
      import('./services/message-queue-service'),
      import('./db/connection'),
      import('./db/drizzle-schema'),
      import('drizzle-orm'),
      import('./services/skill-brain-service'),
      import('./lib/tool-executor'),
      import('./lib/agent-execution'),
      import('./services/skill-brain-a2a-integration'),
      import('./lib/opentelemetry'),
    ])

    const app = honoModule.default
    const RealTimeService = rtModule.RealTimeService
    const twilioCallingService = twilioModule.twilioCallingService
    const aiAgentService = aiModule.aiAgentService
    const messageQueue = mqModule.messageQueue
    const pgDb = dbModule.db
    const callLogs = schemaModule.callLogs
    const { desc, eq, sql } = ormModule
    const skillBrainService = sbModule.skillBrainService
    const toolExecutor = teModule.toolExecutor
    const agentExecutionEngine = aeModule.agentExecutionEngine
    const initializeSkillBrainA2A = saModule.initializeSkillBrainA2A
    const initializeOpenTelemetry = otelModule.initializeOpenTelemetry

    // Initialize OpenTelemetry (wrapped in try-catch)
    let otelSDK: any
    try {
      otelSDK = initializeOpenTelemetry()
      logger.info('[Server] OpenTelemetry initialized')
    } catch (err) {
      logger.warn('[Server] OpenTelemetry init failed (non-fatal)', err as Error)
    }

    // Initialize Skill Brain
    ;(async () => {
      try {
        await skillBrainService.initialize()
        logger.info('[SkillBrain] ✅ Skill Brain initialized')
      } catch (error) {
        logger.error('[SkillBrain] ❌ Failed to initialize', error as Error)
      }
      try {
        const skillBrainTools = initializeSkillBrainA2A(toolExecutor)
        agentExecutionEngine.registerExternalTools(skillBrainTools)
        logger.info(`[SkillBrainA2A] ✅ ${skillBrainTools.length} skill transfer tools registered`)
      } catch (error) {
        logger.error('[SkillBrainA2A] ❌ Failed to register A2A tools', error as Error)
      }
    })()

    const port = Number(process.env.PORT || '3001')

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully')
      if (otelSDK?.shutdown) {
        otelSDK.shutdown()
          .then(() => logger.info('OpenTelemetry shut down'))
          .catch((err: any) => logger.error('Error shutting down OpenTelemetry', err))
          .finally(() => process.exit(0))
      } else {
        process.exit(0)
      }
    })

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully')
      if (otelSDK?.shutdown) {
        otelSDK.shutdown()
          .then(() => logger.info('OpenTelemetry shut down'))
          .catch((err: any) => logger.error('Error shutting down OpenTelemetry', err))
          .finally(() => process.exit(0))
      } else {
        process.exit(0)
      }
    })

    const server = serve({
        fetch: app.fetch,
        port
    })

    logger.info(`Server is running on port ${port}`)

    const realtime = new RealTimeService(server as any)

    const enableRabbitMQ = String(process.env.ENABLE_RABBITMQ_WORKERS || '').toLowerCase() === 'true'

    if (enableRabbitMQ) {
      const startWorkers = async () => {
        try {
          await messageQueue.initialize()
          await messageQueue.consumeQueue(
            'call.transcription',
            async (job: any) => {
              const organizationId = job.data?.organizationId
              const callId = job.data?.callId
              let callSid = job.data?.callSid
              if (!organizationId || !callId) throw new Error('Missing organizationId/callId')
              if (!callSid) {
                const [row] = await pgDb.select().from(callLogs).where(
                  sql`${callLogs.organizationId} = ${organizationId} and ${callLogs.metadata}->>'callId' = ${callId}`
                ).orderBy(desc(callLogs.createdAt)).limit(1)
                callSid = (row as any)?.metadata?.twilioSid
              }
              if (!callSid) throw new Error('Missing callSid')
              const transcription = await twilioCallingService.getTranscription(String(callSid))
              if (!transcription) throw new Error('Transcription not available')
              const summary = transcription.length > 300 ? `${transcription.slice(0, 300)}...` : transcription
              const [existing] = await pgDb.select().from(callLogs).where(
                sql`${callLogs.organizationId} = ${organizationId} and ${callLogs.metadata}->>'callId' = ${callId}`
              ).orderBy(desc(callLogs.createdAt)).limit(1)
              if (!existing?.id) throw new Error('Call log not found')
              await pgDb.update(callLogs).set({ transcription, summary } as any).where(eq(callLogs.id, existing.id as any))
            },
            async (error: any, job: any) => {
              logger.error('[MessageQueue] call.transcription failed permanently', error)
            }
          )
        } catch (err) {
          logger.warn('[MessageQueue] Failed to initialize RabbitMQ workers (disabled)', err as Error)
        }
      }
      startWorkers()
    }

    twilioCallingService.on('call:initiated', (call: any) => {
      realtime.broadcast({ organizationId: call?.metadata?.organizationId, channel: 'phone-status', type: 'call_update', payload: { event: 'call:initiated', call } })
    })
    twilioCallingService.on('call:ended', (call: any) => {
      realtime.broadcast({ organizationId: call?.metadata?.organizationId, channel: 'phone-status', type: 'call_update', payload: { event: 'call:ended', call } })
    })
    twilioCallingService.on('call:answered', (call: any) => {
      realtime.broadcast({ organizationId: call?.metadata?.organizationId, channel: 'phone-status', type: 'call_update', payload: { event: 'call:answered', call } })
    })
    twilioCallingService.on('call:completed', (call: any) => {
      realtime.broadcast({ organizationId: call?.metadata?.organizationId, channel: 'phone-status', type: 'call_update', payload: { event: 'call:completed', call } })
      if (enableRabbitMQ) {
        messageQueue.publishJob('call.transcription', { type: 'call.transcription', data: { organizationId: call?.metadata?.organizationId, callId: call?.id, callSid: call?.sid }, maxRetries: 12, retryDelayMs: 30_000 }).catch((err: any) => {
          logger.warn('[MessageQueue] Failed to publish call.transcription job', err)
        })
      }
    })
    twilioCallingService.on('call:failed', (call: any) => {
      realtime.broadcast({ organizationId: call?.metadata?.organizationId, channel: 'phone-status', type: 'call_update', payload: { event: 'call:failed', call } })
    })
    twilioCallingService.on('call:transcription', (evt: any) => {
      realtime.broadcast({ organizationId: evt?.organizationId, channel: 'phone-status', type: 'call_transcription', payload: evt })
    })
    aiAgentService.on('message:processed', (evt: any) => {
      realtime.broadcast({ organizationId: evt?.metadata?.organizationId, channel: 'ai-agent', type: 'agent_message', payload: evt })
    })

  } catch (err) {
    logger.error('[Server] Fatal startup error', err as Error)
    process.exit(1)
  }
}

startServer()
