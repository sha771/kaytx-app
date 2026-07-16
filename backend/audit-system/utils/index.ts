/**
 * Utility functions for the Audit System
 * Shared helpers for file I/O, formatting, diffing, and data transformations
 */

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';

/**
 * Read file content safely, returning null on error
 */
export function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Write file content with directory creation
 */
export function writeFileSafe(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Calculate SHA-256 hash of a string
 */
export function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Calculate SHA-256 hash of a file
 */
export function hashFile(filePath: string): string | null {
  const content = readFileSafe(filePath);
  return content ? hashContent(content) : null;
}

/**
 * Format byte size to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/**
 * Format duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

/**
 * Format date for report headers
 */
export function formatDate(date: Date): string {
  return date.toISOString().replace('T', ' ').split('.')[0] + ' UTC';
}

/**
 * Generate a simple text diff between two strings
 */
export function simpleDiff(original: string, modified: string): { added: number; removed: number; changed: number } {
  if (original === modified) return { added: 0, removed: 0, changed: 0 };

  const origLines = original.split('\n');
  const modLines = modified.split('\n');
  const origSet = new Set(origLines);
  const modSet = new Set(modLines);

  const removed = origLines.filter(l => !modSet.has(l)).length;
  const added = modLines.filter(l => !origSet.has(l)).length;
  const changed = Math.abs(origLines.length - modLines.length);

  return { added, removed, changed };
}

/**
 * Calculate Jaccard similarity between two sets of strings
 */
export function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Truncate string to max length with ellipsis
 */
export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen - 3) + '...' : str;
}

/**
 * Group items by a key function
 */
export function groupBy<T, K>(items: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

/**
 * Deduplicate an array by a key function
 */
export function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return items.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Rate limiter for API calls during scanning
 */
export class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private lastRefill: number;

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate; // tokens per millisecond
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    while (this.tokens <= 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      this.refill();
    }
    this.tokens--;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

/**
 * Progress tracker for long-running scans
 */
export class ProgressTracker {
  private current = 0;
  private total = 0;
  private startTime = Date.now();
  private callbacks: ((progress: { current: number; total: number; percent: number; eta: string }) => void)[] = [];

  constructor(total: number) {
    this.total = total;
  }

  onProgress(callback: (progress: { current: number; total: number; percent: number; eta: string }) => void): void {
    this.callbacks.push(callback);
  }

  increment(amount = 1): void {
    this.current = Math.min(this.current + amount, this.total);
    this.notify();
  }

  private notify(): void {
    const percent = this.total > 0 ? (this.current / this.total) * 100 : 0;
    const elapsed = Date.now() - this.startTime;
    const etaMs = this.current > 0 ? (elapsed / this.current) * (this.total - this.current) : 0;
    const eta = formatDuration(etaMs);

    const progress = { current: this.current, total: this.total, percent: Math.round(percent), eta };
    for (const cb of this.callbacks) {
      cb(progress);
    }
  }

  getProgress() {
    return {
      current: this.current,
      total: this.total,
      percent: this.total > 0 ? Math.round((this.current / this.total) * 100) : 0,
      elapsed: formatDuration(Date.now() - this.startTime),
    };
  }
}
