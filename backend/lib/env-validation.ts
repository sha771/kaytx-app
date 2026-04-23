/**
 * Environment Variable Validation
 * Validates all required environment variables at application startup
 * Fails fast with clear error messages if any required variables are missing
 */

import { logger } from './production-logger';

interface EnvConfig {
  // Security (REQUIRED)
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ENCRYPTION_KEY: string;
  FIELD_ENCRYPTION_KEY?: string;
  
  // Database (REQUIRED)
  DATABASE_URL: string;
  
  // Server (REQUIRED)
  PORT: string;
  NODE_ENV: string;
  ALLOWED_ORIGINS: string;
  
  // Internal APIs (REQUIRED for production)
  INTERNAL_API_SECRET?: string;
  PLATFORM_WEBHOOK_SECRET?: string;
  
  // Optional Services
  RABBITMQ_URL?: string;
  REDIS_URL?: string;
  
  // AI APIs (OPTIONAL)
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ELEVEN_LABS_API_KEY?: string;
  GOOGLE_GEMINI_API_KEY?: string;
  GROQ_API_KEY?: string;
  COHERE_API_KEY?: string;
  MISTRAL_API_KEY?: string;
  PERPLEXITY_API_KEY?: string;
  AZURE_OPENAI_API_KEY?: string;
  AZURE_OPENAI_ENDPOINT?: string;
  AZURE_OPENAI_DEPLOYMENT_NAME?: string;
  
  // Twilio (OPTIONAL)
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
  
  // WhatsApp (OPTIONAL)
  WHATSAPP_API_URL?: string;
  WHATSAPP_BUSINESS_ACCOUNT_ID?: string;
  WHATSAPP_ACCESS_TOKEN?: string;
}

const REQUIRED_VARS = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'ENCRYPTION_KEY',
  'DATABASE_URL',
  'PORT',
  'NODE_ENV',
  'ALLOWED_ORIGINS',
] as const;

const REQUIRED_IN_PRODUCTION = [
  'INTERNAL_API_SECRET',
  'PLATFORM_WEBHOOK_SECRET',
  'FIELD_ENCRYPTION_KEY',
] as const;

const OPTIONAL_VARS = [
  'RABBITMQ_URL',
  'REDIS_URL',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'ELEVEN_LABS_API_KEY',
  'GOOGLE_GEMINI_API_KEY',
  'GROQ_API_KEY',
  'COHERE_API_KEY',
  'MISTRAL_API_KEY',
  'PERPLEXITY_API_KEY',
  'AZURE_OPENAI_API_KEY',
  'AZURE_OPENAI_ENDPOINT',
  'AZURE_OPENAI_DEPLOYMENT_NAME',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'WHATSAPP_API_URL',
  'WHATSAPP_BUSINESS_ACCOUNT_ID',
  'WHATSAPP_ACCESS_TOKEN',
] as const;

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Check required variables
  for (const varName of REQUIRED_VARS) {
    const value = process.env[varName];
    
    if (!value || value.trim() === '') {
      errors.push(`CRITICAL: ${varName} is required but not set`);
      continue;
    }
    
    // Validate specific formats
    if (varName === 'JWT_SECRET' || varName === 'JWT_REFRESH_SECRET') {
      if (value.length < 32) {
        errors.push(`CRITICAL: ${varName} must be at least 32 characters long (current: ${value.length})`);
      }
    }
    
    if (varName === 'ENCRYPTION_KEY') {
      if (value.length < 32) {
        errors.push(`CRITICAL: ${varName} must be at least 32 characters long (current: ${value.length})`);
      }
    }
    
    if (varName === 'DATABASE_URL') {
      if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
        errors.push(`CRITICAL: ${varName} must be a valid PostgreSQL connection string`);
      }
    }
    
    if (varName === 'PORT') {
      const port = parseInt(value, 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        errors.push(`CRITICAL: ${varName} must be a valid port number (1-65535)`);
      }
    }
    
    if (varName === 'NODE_ENV') {
      const validEnvs = ['development', 'staging', 'production', 'test'];
      if (!validEnvs.includes(value)) {
        errors.push(`CRITICAL: ${varName} must be one of: ${validEnvs.join(', ')}`);
      }
    }
  }
  
  // Check production-required variables
  if (isProduction) {
    for (const varName of REQUIRED_IN_PRODUCTION) {
      const value = process.env[varName];
      
      if (!value || value.trim() === '') {
        errors.push(`CRITICAL: ${varName} is required in production but not set`);
      }
    }
  }
  
  // Check optional variables and warn if missing
  for (const varName of OPTIONAL_VARS) {
    const value = process.env[varName];
    
    if (!value || value.trim() === '') {
      warnings.push(`OPTIONAL: ${varName} is not set (some features may be disabled)`);
    }
  }
  
  // Check for insecure defaults
  if (process.env.JWT_SECRET === 'your_jwt_secret_at_least_32_characters_long') {
    errors.push('CRITICAL: JWT_SECRET is set to the default example value. Change it immediately!');
  }
  
  if (process.env.JWT_REFRESH_SECRET === 'your_jwt_refresh_secret_at_least_32_characters_long') {
    errors.push('CRITICAL: JWT_REFRESH_SECRET is set to the default example value. Change it immediately!');
  }
  
  if (process.env.ENCRYPTION_KEY === 'your_strong_encryption_key_at_least_32_chars') {
    errors.push('CRITICAL: ENCRYPTION_KEY is set to the default example value. Change it immediately!');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateEnvironmentOrExit(): void {
  logger.info('🔍 Validating environment variables...');
  
  const result = validateEnvironment();
  
  // Print warnings
  if (result.warnings.length > 0) {
    logger.warn('\n⚠️  WARNINGS:');
    result.warnings.forEach(warning => logger.warn(`   ${warning}`));
  }
  
  // Print errors and exit if invalid
  if (!result.valid) {
    logger.error('\n❌ ENVIRONMENT VALIDATION FAILED:');
    result.errors.forEach(error => logger.error(`   ${error}`));
    logger.error('\n💡 TIP: Copy .env.example to .env and fill in the required values');
    logger.error('   Required variables are documented in .env.example\n');
    process.exit(1);
  }
  
  logger.info('✅ Environment validation passed\n');
}

export function getEnvConfig(): EnvConfig {
  return {
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY!,
    DATABASE_URL: process.env.DATABASE_URL!,
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV!,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
    INTERNAL_API_SECRET: process.env.INTERNAL_API_SECRET,
    PLATFORM_WEBHOOK_SECRET: process.env.PLATFORM_WEBHOOK_SECRET,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
    REDIS_URL: process.env.REDIS_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    ELEVEN_LABS_API_KEY: process.env.ELEVEN_LABS_API_KEY,
    GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_DEPLOYMENT_NAME: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL,
    WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
  };
}
