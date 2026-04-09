import { logger } from './production-logger';

interface IPBlockEntry {
  ip: string;
  reason: string;
  blockedAt: number;
  expiresAt?: number;
}

const blockedIPs = new Map<string, IPBlockEntry>();
const whitelistedIPs = new Set<string>();

export function blockIP(ip: string, reason: string, durationMs?: number): void {
  const entry: IPBlockEntry = {
    ip,
    reason,
    blockedAt: Date.now(),
    ...(durationMs ? { expiresAt: Date.now() + durationMs } : {}),
  };
  
  blockedIPs.set(ip, entry);
  logger.info(`[IP Filter] Blocked IP ${ip}`, { reason });
}

export function unblockIP(ip: string): void {
  blockedIPs.delete(ip);
  logger.info(`[IP Filter] Unblocked IP ${ip}`);
}

export function isIPBlocked(ip: string): { blocked: boolean; reason?: string } {
  if (whitelistedIPs.has(ip)) {
    return { blocked: false };
  }
  
  const entry = blockedIPs.get(ip);
  
  if (!entry) {
    return { blocked: false };
  }
  
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    blockedIPs.delete(ip);
    return { blocked: false };
  }
  
  return { blocked: true, reason: entry.reason };
}

export function whitelistIP(ip: string): void {
  whitelistedIPs.add(ip);
  blockedIPs.delete(ip);
  logger.info(`[IP Filter] Whitelisted IP ${ip}`);
}

export function removeFromWhitelist(ip: string): void {
  whitelistedIPs.delete(ip);
  logger.info(`[IP Filter] Removed IP ${ip} from whitelist`);
}

export function isIPWhitelisted(ip: string): boolean {
  return whitelistedIPs.has(ip);
}

export function getBlockedIPs(): IPBlockEntry[] {
  return Array.from(blockedIPs.values());
}

export function getWhitelistedIPs(): string[] {
  return Array.from(whitelistedIPs);
}

export function isIPInRange(ip: string, range: string): boolean {
  if (!range.includes('/')) {
    return ip === range;
  }
  
  const parts = range.split('/');
  const rangeIP = parts[0];
  const prefixLength = parts[1];
  if (typeof rangeIP !== 'string' || typeof prefixLength !== 'string') return false;
  const ipParts = ip.split('.').map(Number);
  const rangeParts = rangeIP.split('.').map(Number);
  const prefix = parseInt(prefixLength, 10);
  if (!Number.isFinite(prefix)) {
    return false;
  }
  
  const ipBinary = ipParts.reduce((acc, part) => acc * 256 + part, 0);
  const rangeBinary = rangeParts.reduce((acc, part) => acc * 256 + part, 0);
  
  const mask = -1 << (32 - prefix);
  
  return (ipBinary & mask) === (rangeBinary & mask);
}

export function cleanupExpiredBlocks(): void {
  const now = Date.now();
  for (const [ip, entry] of blockedIPs.entries()) {
    if (entry.expiresAt && entry.expiresAt < now) {
      blockedIPs.delete(ip);
    }
  }
}

setInterval(cleanupExpiredBlocks, 60000);
