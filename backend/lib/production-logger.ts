/**
 * Production Logger Utility
 * Replaces console.log statements with structured logging for production
 * Supports multiple log levels and destinations
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service?: string;
  context?: Record<string, unknown>;
  error?: Error;
}

export type LogHandler = (entry: LogEntry) => void;

export class ProductionLogger {
  private static instance: ProductionLogger;
  private handlers: LogHandler[] = [];
  private minLevel: LogLevel = LogLevel.INFO;
  private serviceName: string = 'kaytx';

  private constructor() {
    // Add default console handler (will be filtered by level)
    this.addHandler((entry) => {
      const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
      const service = entry.service ? `[${entry.service}]` : '';
      const context = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
      
      switch (entry.level) {
        case LogLevel.DEBUG:
          console.debug(`${prefix}${service} ${entry.message}${context}`);
          break;
        case LogLevel.INFO:
          console.info(`${prefix}${service} ${entry.message}${context}`);
          break;
        case LogLevel.WARN:
          console.warn(`${prefix}${service} ${entry.message}${context}`);
          break;
        case LogLevel.ERROR:
          console.error(`${prefix}${service} ${entry.message}${context}`, entry.error || '');
          break;
      }
    });

    // In production, add remote logging handler here
    if (process.env.NODE_ENV === 'production') {
      const logExportEndpoint = process.env.LOG_EXPORT_ENDPOINT;
      const logExportApiKey = process.env.LOG_EXPORT_API_KEY;

      if (logExportEndpoint && logExportApiKey) {
        this.addHandler((entry) => {
          const axios = require('axios');
          axios.post(logExportEndpoint, entry, {
            headers: { 'X-API-Key': logExportApiKey }
          }).catch((err: any) => console.error('Remote logging failed:', err.message));
        });
      }
    }
  }

  static getInstance(): ProductionLogger {
    if (!ProductionLogger.instance) {
      ProductionLogger.instance = new ProductionLogger();
    }
    return ProductionLogger.instance;
  }

  static debug(message: string, context?: Record<string, unknown>): void {
    ProductionLogger.getInstance().debug(message, context);
  }

  static info(message: string, context?: Record<string, unknown>): void {
    ProductionLogger.getInstance().info(message, context);
  }

  static warn(message: string, context?: Record<string, unknown>): void {
    ProductionLogger.getInstance().warn(message, context);
  }

  static error(message: string, error?: Error, context?: Record<string, unknown>): void {
    ProductionLogger.getInstance().error(message, error, context);
  }

  setServiceName(name: string): void {
    this.serviceName = name;
  }

  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  addHandler(handler: LogHandler): void {
    this.handlers.push(handler);
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatMessage(message: string, service?: string): string {
    return service ? `${message} [${service}]` : message;
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message: this.formatMessage(message),
      service: this.serviceName,
      context,
      error,
    };
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      const entry = this.createEntry(LogLevel.DEBUG, message, context);
      this.handlers.forEach(h => h(entry));
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const entry = this.createEntry(LogLevel.INFO, message, context);
      this.handlers.forEach(h => h(entry));
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.WARN)) {
      const entry = this.createEntry(LogLevel.WARN, message, context);
      this.handlers.forEach(h => h(entry));
    }
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const entry = this.createEntry(LogLevel.ERROR, message, context, error);
      this.handlers.forEach(h => h(entry));
    }
  }

  // Convenience method for service-specific logging
  service(serviceName: string): ProductionLogger {
    const logger = ProductionLogger.getInstance();
    const originalService = this.serviceName;
    this.serviceName = serviceName;
    
    // Return a proxy that resets the service name
    const serviceLogger = {
      debug: (message: string, context?: Record<string, unknown>) => {
        logger.debug(message, { ...context, service: serviceName });
      },
      info: (message: string, context?: Record<string, unknown>) => {
        logger.info(message, { ...context, service: serviceName });
      },
      warn: (message: string, context?: Record<string, unknown>) => {
        logger.warn(message, { ...context, service: serviceName });
      },
      error: (message: string, error?: Error, context?: Record<string, unknown>) => {
        logger.error(message, error, { ...context, service: serviceName });
      },
    };
    
    return serviceLogger as unknown as ProductionLogger;
  }
}

// Export singleton instance
export const logger = ProductionLogger.getInstance();

// Export class for creating service-specific loggers
export function createLogger(serviceName: string): ProductionLogger {
  const logger = ProductionLogger.getInstance();
  logger.setServiceName(serviceName);
  return logger;
}

// Helper to safely replace console.log in existing code
export function replaceConsoleLog(
  serviceName: string,
  level: LogLevel = LogLevel.INFO
): void {
  const logger = createLogger(serviceName);
  console.log = (message: string, ...args: unknown[]) => {
    if (args.length > 0) {
      logger.info(message, { args });
    } else {
      logger.info(message);
    }
  };
  console.debug = (message: string, ...args: unknown[]) => {
    if (args.length > 0) {
      logger.debug(message, { args });
    } else {
      logger.debug(message);
    }
  };
  console.info = (message: string, ...args: unknown[]) => {
    if (args.length > 0) {
      logger.info(message, { args });
    } else {
      logger.info(message);
    }
  };
  console.warn = (message: string, ...args: unknown[]) => {
    if (args.length > 0) {
      logger.warn(message, { args });
    } else {
      logger.warn(message);
    }
  };
  console.error = (message: string, ...args: unknown[]) => {
    if (args.length > 0) {
      logger.error(message, args[0] as Error, { args: args.slice(1) });
    } else {
      logger.error(message);
    }
  };
}
