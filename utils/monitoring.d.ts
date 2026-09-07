export declare enum MonitoringLevel {
    DEBUG = "debug",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}
export interface MonitoringEvent {
    id: string;
    timestamp: Date;
    level: MonitoringLevel;
    category: string;
    message: string;
    error?: Error;
    metadata?: Record<string, any>;
    stackTrace?: string;
    userId?: string;
    sessionId?: string;
}
export interface PerformanceMetric {
    name: string;
    value: number;
    unit: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}
declare class MonitoringService {
    private static instance;
    private events;
    private metrics;
    private readonly maxEvents;
    private readonly maxMetrics;
    private constructor();
    static getInstance(): MonitoringService;
    private setupGlobalErrorHandler;
    log(level: MonitoringLevel, category: string, message: string, metadata?: Record<string, any>): void;
    private logToConsole;
    debug(category: string, message: string, metadata?: Record<string, any>): void;
    info(category: string, message: string, metadata?: Record<string, any>): void;
    warning(category: string, message: string, metadata?: Record<string, any>): void;
    error(category: string, message: string, error?: Error, metadata?: Record<string, any>): void;
    critical(category: string, message: string, error?: Error, metadata?: Record<string, any>): void;
    captureError(error: Error, metadata?: Record<string, any>): void;
    trackPerformance(name: string, value: number, unit?: string, metadata?: Record<string, any>): void;
    startTimer(name: string): () => void;
    getEvents(Filter?: {
        level?: MonitoringLevel;
        category?: string;
        startDate?: Date;
        endDate?: Date;
    }): MonitoringEvent[];
    getMetrics(name?: string): PerformanceMetric[];
    getAverageMetric(name: string): number | null;
    getHealthStatus(): {
        status: 'healthy' | 'degraded' | 'critical';
        errors: number;
        warnings: number;
        criticalErrors: number;
        averageResponseTime: number | null;
    };
    clear(): void;
}
export declare const monitoring: MonitoringService;
export declare function measurePerformance<T>(name: string, fn: () => T | Promise<T>): T | Promise<T>;
export {};
//# sourceMappingURL=monitoring.d.ts.map