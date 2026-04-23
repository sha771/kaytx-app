/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

/**
 * Polyfill for React.use() which is required by expo-router v6+ but only available in React 19.
 * This implementation handles Context objects, which is the primary use case in expo-router.
 * If something else (like a Promise) is passed, it will throw a helpful error in development.
 */
if (typeof React.use !== 'function') {
  (React as any).use = function<T>(usable: any): T {
    // Check if it's a Context object (has Provider/Consumer or is an internal React context)
    if (usable && (usable.$$typeof === Symbol.for('react.context') || usable.Provider)) {
      return React.useContext(usable);
    }
    
    // For Promises, React 19 .use() suspends. We can't easily polyfill suspension without 
    // deep integration, but expo-router primarily uses it for context.
    if (usable && typeof usable.then === 'function') {
      throw new Error(
        '[KAYTX Polyfill] React.use() was called with a Promise. ' +
        'This polyfill only supports Context objects. Please upgrade to React 19 for full support.'
      );
    }

    throw new Error(
      '[KAYTX Polyfill] React.use() was called with an unsupported argument. ' +
      'Only Context objects are supported in this React 18 environment.'
    );
  };
  
  console.log('[KAYTX] React.use polyfill initialized');
}
