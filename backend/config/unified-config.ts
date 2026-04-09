/**
 * ✅ UNIFIED CONFIGURATION SYSTEM
 * Consolidated configuration management for the kaytx/kaytx platform
 * 
 * This system consolidates:
 * - Environment variable management
 * - Database configuration
 * - API service configuration
 * - Security settings
 * - Monitoring and logging
 * - Feature flags
 */

import { z } from 'zod';
import crypto from 'crypto';

// Configuration schema with validation
const UnifiedConfigSchema = z.object({
  // Application Core
  app: z.object({
    name: z.string().default('kaytx/kaytx Platform'),
    version: z.string().default('1.0.0'),
    environment: z.enum(['development', 'staging', 'production']),
    debug: z.boolean().default(false),
    port: z.number().default(3001),
    domain: z.string().default('localhost:3000'),
  }),

  // Database Configuration
  database: z.object({
    url: z.string().url(),
    maxConnections: z.number().default(100),
    minConnections: z.number().default(10),
    idleTimeout: z.number().default(30000),
    connectionTimeout: z.number().default(5000),
    enableSSL: z.boolean().default(true),
    retryAttempts: z.number().default(3),
    retryDelay: z.number().default(1000),
  }),

  // Cache Configuration
  cache: z.object({
    redis: z.object({
      url: z.string().url(),
      password: z.string().optional(),
      db: z.number().default(0),
      ttl: z.number().default(3600),
    }),
    enableCaching: z.boolean().default(true),
  }),

  // Message Queue
  messageQueue: z.object({
    rabbitmq: z.object({
      url: z.string().url(),
      reconnectDelay: z.number().default(5000),
      prefetch: z.number().default(10),
      exchanges: z.array(z.string()).default(['events', 'tasks']),
    }),
    enableMessageQueue: z.boolean().default(true),
  }),

  // Security Configuration
  security: z.object({
    jwt: z.object({
      secret: z.string(),
      expiration: z.string().default('24h'),
      refreshExpiration: z.string().default('7d'),
    }),
    encryption: z.object({
      key: z.string(),
      algorithm: z.string().default('aes-256-cbc'),
      iterations: z.number().default(100000),
    }),
    csrf: z.object({
      enable: z.boolean().default(true),
      secret: z.string().optional(),
    }),
    rateLimit: z.object({
      enable: z.boolean().default(true),
      windowMs: z.number().default(900000), // 15 minutes
      maxRequests: z.number().default(100),
    }),
    cors: z.object({
      enable: z.boolean().default(true),
      origins: z.array(z.string()).default(['http://localhost:3000']),
      credentials: z.boolean().default(true),
    }),
  }),

  // AI Services Configuration
  ai: z.object({
    openai: z.object({
      apiKey: z.string(),
      baseUrl: z.string().url().default('https://api.openai.com/v1'),
      model: z.string().default('gpt-4-turbo'),
      maxTokens: z.number().default(2000),
      temperature: z.number().default(0.7),
    }),
    anthropic: z.object({
      apiKey: z.string(),
      model: z.string().default('claude-3-sonnet-20240229'),
      maxTokens: z.number().default(2000),
    }),
    elevenlabs: z.object({
      apiKey: z.string(),
      voiceId: z.string().default('default'),
    }),
    gemini: z.object({
      apiKey: z.string(),
      model: z.string().default('gemini-pro'),
      maxTokens: z.number().default(2000),
    }).optional(),
    groq: z.object({
      apiKey: z.string(),
      model: z.string().default('mixtral-8x7b-32768'),
      maxTokens: z.number().default(2000),
    }).optional(),
    cohere: z.object({
      apiKey: z.string(),
      model: z.string().default('command-r-plus'),
      maxTokens: z.number().default(2000),
    }).optional(),
    mistral: z.object({
      apiKey: z.string(),
      model: z.string().default('mistral-large-latest'),
      maxTokens: z.number().default(2000),
    }).optional(),
    perplexity: z.object({
      apiKey: z.string(),
      model: z.string().default('sonar-medium-chat'),
      maxTokens: z.number().default(2000),
    }).optional(),
    azureOpenAI: z.object({
      apiKey: z.string(),
      endpoint: z.string().url(),
      deploymentName: z.string(),
      maxTokens: z.number().default(2000),
    }).optional(),
    enableAI: z.boolean().default(true),
  }),

  // Communication Services
  communication: z.object({
    whatsapp: z.object({
      apiUrl: z.string().url(),
      businessAccountId: z.string(),
      accessToken: z.string(),
      webhookUrl: z.string().url(),
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    twilio: z.object({
      accountSid: z.string(),
      authToken: z.string(),
      phoneNumber: z.string(),
      voiceWebhookUrl: z.string().url(),
      statusCallbackUrl: z.string().url(),
    }),
  }),

  // OAuth Providers
  oauth: z.object({
    instagram: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    facebook: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    linkedin: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    twitter: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    telegram: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    signal: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    slack: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
  }),

  // Monitoring and Observability
  monitoring: z.object({
    prometheus: z.object({
      enable: z.boolean().default(true),
      port: z.number().default(9090),
      path: z.string().default('/metrics'),
    }),
    tracing: z.object({
      enable: z.boolean().default(true),
      jaegerEndpoint: z.string().url().optional(),
      serviceName: z.string().default('kaytx-platform'),
    }),
    logging: z.object({
      enable: z.boolean().default(true),
      level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
      format: z.enum(['json', 'text']).default('json'),
      exportEndpoint: z.string().url().optional(),
      exportApiKey: z.string().optional(),
    }),
    healthChecks: z.object({
      enable: z.boolean().default(true),
      path: z.string().default('/health'),
      detailedPath: z.string().default('/health/detailed'),
    }),
  }),

  // Feature Flags
  features: z.object({
    enableAI: z.boolean().default(true),
    enableMessageQueue: z.boolean().default(true),
    enableCaching: z.boolean().default(true),
    enableAuditLogging: z.boolean().default(true),
    enableHealthChecks: z.boolean().default(true),
    enableMetrics: z.boolean().default(true),
    enableTracing: z.boolean().default(true),
    enableWebhooks: z.boolean().default(true),
    enableOAuth: z.boolean().default(true),
    enableCommunication: z.boolean().default(true),
  }),

  // Performance Limits
  limits: z.object({
    maxRequestSize: z.number().default(10485760), // 10MB
    maxFileSize: z.number().default(52428800), // 50MB
    maxConnections: z.number().default(100),
    requestTimeout: z.number().default(30000), // 30 seconds
    uploadTimeout: z.number().default(300000), // 5 minutes
    rateLimitWindow: z.number().default(900000), // 15 minutes
    rateLimitMax: z.number().default(100),
  }),

  // Alerting Configuration
  alerting: z.object({
    enable: z.boolean().default(true),
    webhookUrl: z.string().url().optional(),
    slackWebhookUrl: z.string().url().optional(),
    emailEnabled: z.boolean().default(false),
    smtpHost: z.string().optional(),
    smtpPort: z.number().optional(),
    smtpUser: z.string().optional(),
    smtpPass: z.string().optional(),
    pagerDutyRoutingKey: z.string().optional(),
  }),
});

export type UnifiedConfig = z.infer<typeof UnifiedConfigSchema>;

/**
 * Load and validate configuration from environment variables
 */
export function loadUnifiedConfig(): UnifiedConfig {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production';
  const isProduction = nodeEnv === 'production';

  const getEnvOrGenerate = (key: string, length: number = 32): string => {
    const value = process.env[key];
    if (value) {
      return value;
    }
    if (isProduction) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    const generated = crypto.randomBytes(length).toString('hex');
    console.warn(`[Config] ${key} not set; using generated value for non-production environment`);
    return generated;
  };

  const requireEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  };

  const getEnvOrOptional = (key: string): string | undefined => {
    return process.env[key] || undefined;
  };

  // Check for partial OAuth configurations
  const oauthProviders = ['instagram', 'facebook', 'linkedin', 'twitter', 'telegram', 'signal', 'slack'];
  for (const provider of oauthProviders) {
    const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];
    const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`];
    const redirectUri = process.env[`${provider.toUpperCase()}_REDIRECT_URI`];
    
    if ((clientId || clientSecret || redirectUri) && !(clientId && clientSecret && redirectUri)) {
      throw new Error(`Incomplete ${provider} OAuth configuration. All three variables required: ${provider.toUpperCase()}_CLIENT_ID, ${provider.toUpperCase()}_CLIENT_SECRET, ${provider.toUpperCase()}_REDIRECT_URI`);
    }
  }

  const config: any = {
    app: {
      name: process.env.APP_NAME || 'kaytx/kaytx Platform',
      version: process.env.APP_VERSION || '1.0.0',
      environment: nodeEnv,
      debug: process.env.DEBUG === 'true',
      port: parseInt(process.env.PORT || '3001'),
      domain: process.env.APP_DOMAIN || 'localhost:3000',
    },

    database: {
      url: isProduction ? requireEnv('DATABASE_URL') : (process.env.DATABASE_URL || 'postgresql://localhost/kaytx_db'),
      maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '100'),
      minConnections: parseInt(process.env.DB_MIN_CONNECTIONS || '10'),
      idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
      connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000'),
      enableSSL: process.env.DB_ENABLE_SSL !== 'false',
      retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3'),
      retryDelay: parseInt(process.env.DB_RETRY_DELAY || '1000'),
    },

    cache: {
      redis: {
        url: isProduction ? requireEnv('REDIS_URL') : (process.env.REDIS_URL || 'redis://localhost:6379'),
        password: getEnvOrOptional('REDIS_PASSWORD'),
        db: parseInt(process.env.REDIS_DB || '0'),
        ttl: parseInt(process.env.REDIS_TTL || '3600'),
      },
      enableCaching: process.env.ENABLE_CACHING !== 'false',
    },

    messageQueue: {
      rabbitmq: {
        url: isProduction ? requireEnv('RABBITMQ_URL') : (process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'),
        reconnectDelay: parseInt(process.env.RABBITMQ_RECONNECT_DELAY || '5000'),
        prefetch: parseInt(process.env.RABBITMQ_PREFETCH || '10'),
        exchanges: (process.env.RABBITMQ_EXCHANGES || 'events,tasks').split(','),
      },
      enableMessageQueue: process.env.ENABLE_MESSAGE_QUEUE !== 'false',
    },

    security: {
      jwt: {
        secret: getEnvOrGenerate('JWT_SECRET'),
        expiration: process.env.JWT_EXPIRATION || '24h',
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
      },
      encryption: {
        key: getEnvOrGenerate('ENCRYPTION_KEY'),
        algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-cbc',
        iterations: parseInt(process.env.ENCRYPTION_ITERATIONS || '100000'),
      },
      csrf: {
        enable: process.env.ENABLE_CSRF !== 'false',
        secret: getEnvOrOptional('CSRF_SECRET'),
      },
      rateLimit: {
        enable: process.env.ENABLE_RATE_LIMIT !== 'false',
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      },
      cors: {
        enable: process.env.ENABLE_CORS !== 'false',
        origins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
        credentials: process.env.CORS_CREDENTIALS !== 'false',
      },
    },

    ai: {
      openai: process.env.OPENAI_API_KEY ? {
        apiKey: process.env.OPENAI_API_KEY,
        baseUrl: process.env.AI_API_BASE_URL || 'https://api.openai.com/v1',
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      } : undefined,
      anthropic: process.env.ANTHROPIC_API_KEY ? {
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '2000'),
      } : undefined,
      elevenlabs: process.env.ELEVEN_LABS_API_KEY ? {
        apiKey: process.env.ELEVEN_LABS_API_KEY,
        voiceId: process.env.ELEVEN_LABS_VOICE_ID || 'default',
      } : undefined,
      gemini: process.env.GOOGLE_GEMINI_API_KEY ? {
        apiKey: process.env.GOOGLE_GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || 'gemini-pro',
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '2000'),
      } : undefined,
      groq: process.env.GROQ_API_KEY ? {
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
        maxTokens: parseInt(process.env.GROQ_MAX_TOKENS || '2000'),
      } : undefined,
      cohere: process.env.COHERE_API_KEY ? {
        apiKey: process.env.COHERE_API_KEY,
        model: process.env.COHERE_MODEL || 'command-r-plus',
        maxTokens: parseInt(process.env.COHERE_MAX_TOKENS || '2000'),
      } : undefined,
      mistral: process.env.MISTRAL_API_KEY ? {
        apiKey: process.env.MISTRAL_API_KEY,
        model: process.env.MISTRAL_MODEL || 'mistral-large-latest',
        maxTokens: parseInt(process.env.MISTRAL_MAX_TOKENS || '2000'),
      } : undefined,
      perplexity: process.env.PERPLEXITY_API_KEY ? {
        apiKey: process.env.PERPLEXITY_API_KEY,
        model: process.env.PERPLEXITY_MODEL || 'sonar-medium-chat',
        maxTokens: parseInt(process.env.PERPLEXITY_MAX_TOKENS || '2000'),
      } : undefined,
      azureOpenAI: process.env.AZURE_OPENAI_API_KEY ? {
        apiKey: process.env.AZURE_OPENAI_API_KEY,
        endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
        deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || '',
        maxTokens: parseInt(process.env.AZURE_OPENAI_MAX_TOKENS || '2000'),
      } : undefined,
      enableAI: process.env.ENABLE_AI !== 'false',
    },

    communication: {
      whatsapp: process.env.WHATSAPP_ACCESS_TOKEN ? {
        apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.instagram.com/v18.0',
        businessAccountId: requireEnv('WHATSAPP_BUSINESS_ACCOUNT_ID'),
        accessToken: requireEnv('WHATSAPP_ACCESS_TOKEN'),
        webhookUrl: requireEnv('WHATSAPP_WEBHOOK_URL'),
        clientId: requireEnv('WHATSAPP_CLIENT_ID'),
        clientSecret: requireEnv('WHATSAPP_CLIENT_SECRET'),
        redirectUri: requireEnv('WHATSAPP_REDIRECT_URI'),
      } : undefined,
      twilio: process.env.TWILIO_AUTH_TOKEN ? {
        accountSid: requireEnv('TWILIO_ACCOUNT_SID'),
        authToken: requireEnv('TWILIO_AUTH_TOKEN'),
        phoneNumber: requireEnv('TWILIO_PHONE_NUMBER'),
        voiceWebhookUrl: requireEnv('TWILIO_VOICE_WEBHOOK_URL'),
        statusCallbackUrl: requireEnv('TWILIO_STATUS_CALLBACK_URL'),
      } : undefined,
    },

    oauth: {
      instagram: process.env.INSTAGRAM_CLIENT_ID ? {
        clientId: requireEnv('INSTAGRAM_CLIENT_ID'),
        clientSecret: requireEnv('INSTAGRAM_CLIENT_SECRET'),
        redirectUri: requireEnv('INSTAGRAM_REDIRECT_URI'),
      } : undefined,
      facebook: process.env.FACEBOOK_CLIENT_ID ? {
        clientId: requireEnv('FACEBOOK_CLIENT_ID'),
        clientSecret: requireEnv('FACEBOOK_CLIENT_SECRET'),
        redirectUri: requireEnv('FACEBOOK_REDIRECT_URI'),
      } : undefined,
      linkedin: process.env.LINKEDIN_CLIENT_ID ? {
        clientId: requireEnv('LINKEDIN_CLIENT_ID'),
        clientSecret: requireEnv('LINKEDIN_CLIENT_SECRET'),
        redirectUri: requireEnv('LINKEDIN_REDIRECT_URI'),
      } : undefined,
      twitter: process.env.TWITTER_CLIENT_ID ? {
        clientId: requireEnv('TWITTER_CLIENT_ID'),
        clientSecret: requireEnv('TWITTER_CLIENT_SECRET'),
        redirectUri: requireEnv('TWITTER_REDIRECT_URI'),
      } : undefined,
      telegram: process.env.TELEGRAM_CLIENT_ID ? {
        clientId: requireEnv('TELEGRAM_CLIENT_ID'),
        clientSecret: requireEnv('TELEGRAM_CLIENT_SECRET'),
        redirectUri: requireEnv('TELEGRAM_REDIRECT_URI'),
      } : undefined,
      signal: process.env.SIGNAL_CLIENT_ID ? {
        clientId: requireEnv('SIGNAL_CLIENT_ID'),
        clientSecret: requireEnv('SIGNAL_CLIENT_SECRET'),
        redirectUri: requireEnv('SIGNAL_REDIRECT_URI'),
      } : undefined,
      slack: process.env.SLACK_CLIENT_ID ? {
        clientId: requireEnv('SLACK_CLIENT_ID'),
        clientSecret: requireEnv('SLACK_CLIENT_SECRET'),
        redirectUri: requireEnv('SLACK_REDIRECT_URI'),
      } : undefined,
    },

    monitoring: {
      prometheus: {
        enable: process.env.ENABLE_PROMETHEUS !== 'false',
        port: parseInt(process.env.PROMETHEUS_PORT || '9090'),
        path: process.env.PROMETHEUS_PATH || '/metrics',
      },
      tracing: {
        enable: process.env.ENABLE_TRACING !== 'false',
        jaegerEndpoint: getEnvOrOptional('JAEGER_ENDPOINT'),
        serviceName: process.env.OTEL_SERVICE_NAME || 'kaytx-platform',
      },
      logging: {
        enable: process.env.ENABLE_LOGGING !== 'false',
        level: (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
        format: (process.env.LOG_FORMAT || 'json') as 'json' | 'text',
        exportEndpoint: getEnvOrOptional('LOG_EXPORT_ENDPOINT'),
        exportApiKey: getEnvOrOptional('LOG_EXPORT_API_KEY'),
      },
      healthChecks: {
        enable: process.env.ENABLE_HEALTH_CHECKS !== 'false',
        path: process.env.HEALTH_CHECK_PATH || '/health',
        detailedPath: process.env.HEALTH_CHECK_DETAILED_PATH || '/health/detailed',
      },
    },

    features: {
      enableAI: process.env.ENABLE_AI !== 'false',
      enableMessageQueue: process.env.ENABLE_MESSAGE_QUEUE !== 'false',
      enableCaching: process.env.ENABLE_CACHING !== 'false',
      enableAuditLogging: process.env.ENABLE_AUDIT_LOGGING !== 'false',
      enableHealthChecks: process.env.ENABLE_HEALTH_CHECKS !== 'false',
      enableMetrics: process.env.ENABLE_PROMETHEUS !== 'false',
      enableTracing: process.env.ENABLE_TRACING !== 'false',
      enableWebhooks: process.env.ENABLE_WEBHOOKS !== 'false',
      enableOAuth: process.env.ENABLE_OAUTH !== 'false',
      enableCommunication: process.env.ENABLE_COMMUNICATION !== 'false',
    },

    limits: {
      maxRequestSize: parseInt(process.env.MAX_REQUEST_SIZE || '10485760'),
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'),
      maxConnections: parseInt(process.env.MAX_CONNECTIONS || '100'),
      requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '30000'),
      uploadTimeout: parseInt(process.env.UPLOAD_TIMEOUT || '300000'),
      rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
      rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    },

    alerting: {
      enable: process.env.ENABLE_ALERTING !== 'false',
      webhookUrl: getEnvOrOptional('ALERT_WEBHOOK_URL'),
      slackWebhookUrl: getEnvOrOptional('SLACK_WEBHOOK_URL'),
      emailEnabled: process.env.EMAIL_ENABLED === 'true',
      smtpHost: getEnvOrOptional('SMTP_HOST'),
      smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      smtpUser: getEnvOrOptional('SMTP_USER'),
      smtpPass: getEnvOrOptional('SMTP_PASS'),
      pagerDutyRoutingKey: getEnvOrOptional('PAGERDUTY_ROUTING_KEY'),
    },
  };

  // Validate configuration
  try {
    return UnifiedConfigSchema.parse(config);
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw new Error('Invalid configuration: ' + (error as Error).message);
  }
}

// Export singleton config instance
export const unifiedConfig = loadUnifiedConfig();

// Export convenience getters
export const getAppConfig = () => unifiedConfig.app;
export const getDatabaseConfig = () => unifiedConfig.database;
export const getSecurityConfig = () => unifiedConfig.security;
export const getAIConfig = () => unifiedConfig.ai;
export const getMonitoringConfig = () => unifiedConfig.monitoring;
export const getFeaturesConfig = () => unifiedConfig.features;
export const getLimitsConfig = () => unifiedConfig.limits;

// Export environment check helpers
export const isDevelopment = () => unifiedConfig.app.environment === 'development';
export const isStaging = () => unifiedConfig.app.environment === 'staging';
export const isProduction = () => unifiedConfig.app.environment === 'production';
export const isDebug = () => unifiedConfig.app.debug;
