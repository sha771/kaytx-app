/**
 * Performance Utilities Tests
 */

import { describe, it, expect } from '@jest/globals';
import { debounce, throttle, memoizeLRU } from '../../app/lib/lazy';

describe('Performance Utilities', () => {
  describe('debounce', () => {
    it('should delay function execution', (done) => {
      let called = false;
      const fn = debounce(() => {
        called = true;
      }, 50);

      fn();
      expect(called).toBe(false);

      setTimeout(() => {
        expect(called).toBe(true);
        done();
      }, 100);
    });

    it('should only call the last invocation', (done) => {
      let callCount = 0;
      const fn = debounce(() => {
        callCount++;
      }, 50);

      fn();
      fn();
      fn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
  });

  describe('throttle', () => {
    it('should limit function calls', () => {
      let callCount = 0;
      const fn = throttle(() => {
        callCount++;
      }, 50);

      fn();
      fn();
      fn();

      expect(callCount).toBe(1);
    });

    it('should allow next call after the limit', (done) => {
      let callCount = 0;
      const fn = throttle(() => {
        callCount++;
      }, 50);

      fn();
      setTimeout(() => {
        fn();
        expect(callCount).toBe(2);
        done();
      }, 60);
    });
  });

  describe('memoizeLRU', () => {
    it('should cache results', () => {
      let computeCount = 0;
      const fn = memoizeLRU((n: number) => {
        computeCount++;
        return n * 2;
      });

      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(computeCount).toBe(1); // computed once, returned from cache
    });

    it('should evict oldest entry when over maxSize', () => {
      let computeCount = 0;
      const fn = memoizeLRU(
        (n: number) => {
          computeCount++;
          return n * 2;
        },
        2
      );

      fn(1); // cache: [1]
      fn(2); // cache: [1, 2]
      fn(3); // cache: [2, 3] — 1 evicted
      expect(computeCount).toBe(3);

      fn(1); // should recompute (was evicted)
      expect(computeCount).toBe(4);
    });
  });
});
