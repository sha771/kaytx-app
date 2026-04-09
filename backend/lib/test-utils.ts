/**
 * Test environment utilities
 */

// Check if we're in a test environment
export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || 
         process.env.JEST_WORKER_ID !== undefined ||
         process.env.CI === 'true' ||
         // @ts-ignore - Jest global
         typeof jest !== 'undefined';
};

/**
 * Create a safe interval that won't block test exit
 */
export const createSafeInterval = (
  callback: () => void,
  intervalMs: number
): ReturnType<typeof setInterval> | null => {
  if (isTestEnvironment()) {
    // In test environment, don't create intervals that could block exit
    return null;
  }
  
  const interval = setInterval(callback, intervalMs);
  // Prevent the interval from keeping the process alive
  if (interval && typeof interval.unref === 'function') {
    interval.unref();
  }
  return interval;
};

/**
 * Create a safe timeout that won't block test exit
 */
export const createSafeTimeout = (
  callback: () => void,
  timeoutMs: number
): ReturnType<typeof setTimeout> | null => {
  if (isTestEnvironment()) {
    // In test environment, don't create timeouts that could block exit
    return null;
  }
  
  const timeout = setTimeout(callback, timeoutMs);
  // Prevent the timeout from keeping the process alive
  if (timeout && typeof timeout.unref === 'function') {
    timeout.unref();
  }
  return timeout;
};
