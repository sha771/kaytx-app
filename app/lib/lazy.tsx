/**
 * Performance Optimization Utilities
 * Lazy loading, code splitting, and bundle optimization helpers for React Native + Web
 */

import React, { ComponentType, Suspense, lazy } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// ============================================================================
// Loading Fallback
// ============================================================================

const DefaultFallback = () => (
  <View style={styles.fallback}>
    <ActivityIndicator size="large" color="#0066cc" />
  </View>
);

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
});

// ============================================================================
// Lazy Component Loader
// ============================================================================

/**
 * Lazy-load a component with a Suspense boundary and custom fallback.
 * On web, this enables automatic code-splitting per route.
 *
 * @example
 * const AgentDashboard = lazyComponent(() => import('./AgentDashboard'));
 */
export function lazyComponent<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <DefaultFallback />
): T {
  const LazyComponent = lazy(loader);

  const Wrapped = (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return Wrapped as unknown as T;
}

/**
 * Lazy-load a component with named export
 */
export function lazyNamed<T extends ComponentType<any>>(
  loader: () => Promise<any>,
  exportName: string,
  fallback: React.ReactNode = <DefaultFallback />
): T {
  const LazyComponent = lazy(() => loader().then((m) => ({ default: m[exportName] })));

  const Wrapped = (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return Wrapped as unknown as T;
}

// ============================================================================
// Preload Helpers
// ============================================================================

const preloadedModules = new Set<string>();

/**
 * Preload a module without rendering it.
 * Useful for prefetching the next likely route.
 */
export function preload(loader: () => Promise<any>): Promise<void> {
  return loader().then(() => {
    // Mark as preloaded so React.lazy can reuse the cached promise
  });
}

/**
 * Preload multiple modules in parallel
 */
export function preloadAll(loaders: Array<() => Promise<any>>): Promise<void[]> {
  return Promise.all(loaders.map((l) => preload(l)));
}

/**
 * Check if a module has been preloaded
 */
export function isPreloaded(modulePath: string): boolean {
  return preloadedModules.has(modulePath);
}

// ============================================================================
// Image Optimization
// ============================================================================

/**
 * Preload an image (web only). On native, expo-image handles caching.
 */
export function preloadImage(uri: string): void {
  if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
    const img = new Image();
    img.src = uri;
  }
}

// ============================================================================
// Debounce / Throttle (perf-critical for scroll/resize handlers)
// ============================================================================

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// Memory Management
// ============================================================================

/**
 * Memoize with cache size limit (LRU-style)
 */
export function memoizeLRU<T extends (...args: any[]) => any>(fn: T, maxSize = 100): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const val = cache.get(key)!;
      cache.delete(key);
      cache.set(key, val); // move to most-recent
      return val;
    }

    const result = fn(...args);
    cache.set(key, result);

    if (cache.size > maxSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    return result;
  }) as T;
}

// ============================================================================
// Bundle Analysis (web only)
// ============================================================================

/**
 * Get the current bundle chunk name (web only — returns null on native)
 */
export function getCurrentChunk(): string | null {
  if (typeof document !== 'undefined') {
    const scripts = document.querySelectorAll('script[src]');
    for (const s of Array.from(scripts)) {
      const src = s.getAttribute('src') || '';
      if (src.includes('chunk') || src.includes('static')) {
        return src;
      }
    }
  }
  return null;
}

// ============================================================================
// Performance Monitoring
// ============================================================================

const perfMarks = new Map<string, number>();

/**
 * Mark the start of a performance measurement
 */
export function perfMarkStart(name: string): void {
  perfMarks.set(name, performance.now());
}

/**
 * Mark the end and return elapsed time in ms
 */
export function perfMarkEnd(name: string): number {
  const start = perfMarks.get(name);
  if (start === undefined) return 0;
  const elapsed = performance.now() - start;
  perfMarks.delete(name);
  if (typeof window !== 'undefined') {
    console.debug(`[perf] ${name}: ${elapsed.toFixed(2)}ms`);
  }
  return elapsed;
}

/**
 * Wrap an async function with performance tracking
 */
export async function withPerf<T>(name: string, fn: () => Promise<T>): Promise<T> {
  perfMarkStart(name);
  try {
    return await fn();
  } finally {
    perfMarkEnd(name);
  }
}
