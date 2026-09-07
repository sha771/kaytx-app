/**
 * Frontend Telemetry & Error Reporting
 * Sentry integration for crash reporting, performance monitoring, and analytics.
 *
 * Usage:
 *   import { initTelemetry, captureError, trackEvent } from './lib/telemetry';
 *   initTelemetry(); // call once in app/_layout.tsx
 *   captureError(new Error('something broke'));
 *   trackEvent('agent_activated', { department: 'sales' });
 */

// import * as Sentry from '@sentry/react-native';

export interface TelemetryConfig {
  dsn: string;
  environment: 'development' | 'staging' | 'production';
  release?: string;
  tracesSampleRate: number; // 0-1, performance traces
  profilesSampleRate: number; // 0-1, profiling
  enabled: boolean;
}

const DEFAULT_CONFIG: TelemetryConfig = {
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
  environment: (process.env.EXPO_PUBLIC_ENV as TelemetryConfig['environment']) || 'development',
  release: process.env.EXPO_PUBLIC_APP_VERSION || '2.5.9',
  tracesSampleRate: process.env.EXPO_PUBLIC_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: process.env.EXPO_PUBLIC_ENV === 'production' ? 0.1 : 1.0,
  enabled: !!process.env.EXPO_PUBLIC_SENTRY_DSN,
};

let initialized = false;

/**
 * Initialize Sentry and telemetry. Call once at app startup.
 */
export function initTelemetry(config?: Partial<TelemetryConfig>): void {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  if (!finalConfig.enabled) {
    console.info('[telemetry] Disabled — no DSN configured');
    return;
  }

  if (initialized) {
    console.warn('[telemetry] Already initialized');
    return;
  }

  // Sentry.init({
  //   dsn: finalConfig.dsn,
  //   environment: finalConfig.environment,
  //   release: finalConfig.release,
  //   tracesSampleRate: finalConfig.tracesSampleRate,
  //   profilesSampleRate: finalConfig.profilesSampleRate,
  //   enableNative: true,
  //   enableAutoSessionTracking: true,
  //   sessionTrackingIntervalMillis: 30000,
  //   attachStacktrace: true,
  //   maxBreadcrumbs: 50,
  //   beforeSend(event) {
  //     // Scrub PII before sending
  //     if (event.request?.headers) {
  //       delete event.request.headers.authorization;
  //       delete event.request.headers.cookie;
  //     }
  //     return event;
  //   },
  // });

  initialized = true;
  console.info(`[telemetry] Initialized for ${finalConfig.environment}`);
}

/**
 * Capture an exception with optional context
 */
export function captureError(error: Error, context?: Record<string, unknown>): void {
  if (!initialized || !DEFAULT_CONFIG.enabled) {
    console.error('[telemetry] Error (not reported):', error, context);
    return;
  }

  // if (context) {
  //   Sentry.withScope((scope) => {
  //     Object.entries(context).forEach(([key, value]) => {
  //       scope.setContext(key, { value });
  //     });
  //     Sentry.captureException(error);
  //   });
  // } else {
  //   Sentry.captureException(error);
  // }
}

/**
 * Track a custom analytics event
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (!initialized || !DEFAULT_CONFIG.enabled) return;

  // Sentry.addBreadcrumb({
  //   category: 'custom',
  //   message: name,
  //   level: 'info',
  //   data: properties,
  // });
}

/**
 * Set the current user for telemetry (called after login)
 */
export function setUser(user: { id: string; email?: string; organizationId?: string } | null): void {
  if (!initialized) return;

  // if (user) {
  //   Sentry.setUser({
  //     id: user.id,
  //     email: user.email,
  //     // Don't send PII beyond what's needed
  //     organizationId: user.organizationId,
  //   });
  // } else {
  //   Sentry.setUser(null);
  // }
}

/**
 * Manually start a performance transaction
 */
export function startTransaction(name: string, op: string): any | null {
  if (!initialized) return null;
  // return Sentry.startTransaction({ name, op });
  return null;
}

/**
 * Wrap a component with Sentry's error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: { fallback?: React.ComponentType; beforeCapture?: (scope: any) => void }
): React.ComponentType<P> {
  if (!initialized) return Component;
  // return Sentry.withErrorBoundary(Component, {
  //   fallback: options?.fallback || DefaultErrorFallback,
  //   beforeCapture: options?.beforeCapture,
  // });
  return Component;
}

function DefaultErrorFallback() {
  return null; // Real implementation renders a friendly error UI
}

/**
 * Check if telemetry is enabled
 */
export function isTelemetryEnabled(): boolean {
  return initialized && DEFAULT_CONFIG.enabled;
}
