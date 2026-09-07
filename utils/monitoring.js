"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitoring = exports.MonitoringLevel = void 0;
exports.measurePerformance = measurePerformance;
var MonitoringLevel;
(function (MonitoringLevel) {
    MonitoringLevel["DEBUG"] = "debug";
    MonitoringLevel["INFO"] = "info";
    MonitoringLevel["WARNING"] = "warning";
    MonitoringLevel["ERROR"] = "error";
    MonitoringLevel["CRITICAL"] = "critical";
})(MonitoringLevel || (exports.MonitoringLevel = MonitoringLevel = {}));
class MonitoringService {
    static instance;
    events = [];
    metrics = [];
    maxEvents = 1000;
    maxMetrics = 5000;
    constructor() {
        this.setupGlobalErrorHandler();
    }
    static getInstance() {
        if (!MonitoringService.instance) {
            MonitoringService.instance = new MonitoringService();
        }
        return MonitoringService.instance;
    }
    setupGlobalErrorHandler() {
        // Only setup React Native ErrorUtils in React Native environment
        // Skip in Node.js backend environment to avoid esbuild errors
        if (typeof globalThis.ErrorUtils !== 'undefined' && typeof globalThis.__dirname === 'undefined') {
            const errorUtils = globalThis.ErrorUtils;
            const originalHandler = errorUtils.getGlobalHandler();
            errorUtils.setGlobalHandler((error, isFatal) => {
                this.captureError(error, {
                    isFatal,
                    category: 'global_error',
                });
                if (originalHandler) {
                    originalHandler(error, isFatal);
                }
            });
        }
    }
    log(level, category, message, metadata) {
        const event = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            level,
            category,
            message,
            ...(metadata ? { metadata } : {}),
        };
        this.events.push(event);
        if (this.events.length > this.maxEvents) {
            this.events = this.events.slice(-this.maxEvents);
        }
        this.logToConsole(event);
    }
    logToConsole(event) {
        const prefix = `[${event.level.toUpperCase()}] [${event.category}]`;
        const message = `${prefix} ${event.message}`;
        switch (event.level) {
            case MonitoringLevel.DEBUG:
                console.debug(message, event.metadata);
                break;
            case MonitoringLevel.INFO:
                console.log(message, event.metadata);
                break;
            case MonitoringLevel.WARNING:
                console.warn(message, event.metadata);
                break;
            case MonitoringLevel.ERROR:
            case MonitoringLevel.CRITICAL:
                console.error(message, event.metadata, event.error);
                break;
        }
    }
    debug(category, message, metadata) {
        this.log(MonitoringLevel.DEBUG, category, message, metadata);
    }
    info(category, message, metadata) {
        this.log(MonitoringLevel.INFO, category, message, metadata);
    }
    warning(category, message, metadata) {
        this.log(MonitoringLevel.WARNING, category, message, metadata);
    }
    error(category, message, error, metadata) {
        this.log(MonitoringLevel.ERROR, category, message, {
            ...metadata,
            error: error?.message,
            stack: error?.stack,
        });
    }
    critical(category, message, error, metadata) {
        this.log(MonitoringLevel.CRITICAL, category, message, {
            ...metadata,
            error: error?.message,
            stack: error?.stack,
        });
    }
    captureError(error, metadata) {
        const event = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            level: MonitoringLevel.ERROR,
            category: metadata?.category || 'uncaught_error',
            message: error.message,
            error,
            ...(error.stack ? { stackTrace: error.stack } : {}),
            ...(metadata ? { metadata } : {}),
        };
        this.events.push(event);
        this.logToConsole(event);
    }
    trackPerformance(name, value, unit = 'ms', metadata) {
        const metric = {
            name,
            value,
            unit,
            timestamp: new Date(),
            ...(metadata ? { metadata } : {}),
        };
        this.metrics.push(metric);
        if (this.metrics.length > this.maxMetrics) {
            this.metrics = this.metrics.slice(-this.maxMetrics);
        }
        console.log(`[PERFORMANCE] ${name}: ${value}${unit}`, metadata);
    }
    startTimer(name) {
        const start = Date.now();
        return () => {
            const duration = Date.now() - start;
            this.trackPerformance(name, duration, 'ms');
        };
    }
    getEvents(Filter) {
        let filtered = this.events;
        if (Filter) {
            if (Filter.level) {
                filtered = filtered.filter(e => e.level === Filter.level);
            }
            if (Filter.category) {
                filtered = filtered.filter(e => e.category === Filter.category);
            }
            if (Filter.startDate) {
                filtered = filtered.filter(e => e.timestamp >= Filter.startDate);
            }
            if (Filter.endDate) {
                filtered = filtered.filter(e => e.timestamp <= Filter.endDate);
            }
        }
        return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    getMetrics(name) {
        if (name) {
            return this.metrics.filter(m => m.name === name);
        }
        return this.metrics;
    }
    getAverageMetric(name) {
        const metrics = this.getMetrics(name);
        if (metrics.length === 0)
            return null;
        const sum = metrics.reduce((acc, m) => acc + m.value, 0);
        return sum / metrics.length;
    }
    getHealthStatus() {
        const last30Min = new Date(Date.now() - 30 * 60 * 1000);
        const recentEvents = this.getEvents({ startDate: last30Min });
        const errors = recentEvents.filter(e => e.level === MonitoringLevel.ERROR).length;
        const warnings = recentEvents.filter(e => e.level === MonitoringLevel.WARNING).length;
        const criticalErrors = recentEvents.filter(e => e.level === MonitoringLevel.CRITICAL).length;
        const avgResponseTime = this.getAverageMetric('api_response_time');
        let status = 'healthy';
        if (criticalErrors > 0 || errors > 10) {
            status = 'critical';
        }
        else if (errors > 5 || warnings > 20) {
            status = 'degraded';
        }
        return {
            status,
            errors,
            warnings,
            criticalErrors,
            averageResponseTime: avgResponseTime,
        };
    }
    clear() {
        this.events = [];
        this.metrics = [];
    }
}
exports.monitoring = MonitoringService.getInstance();
function measurePerformance(name, fn) {
    const endTimer = exports.monitoring.startTimer(name);
    try {
        const result = fn();
        if (result instanceof Promise) {
            return result.finally(endTimer);
        }
        endTimer();
        return result;
    }
    catch (error) {
        endTimer();
        exports.monitoring.captureError(error, { operation: name });
        throw error;
    }
}
//# sourceMappingURL=monitoring.js.map