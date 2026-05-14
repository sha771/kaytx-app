/* Backend module declarations for dependencies without types */

declare module 'twilio' {
  function validateRequest(authToken: string, signature: string, url: string, body: Record<string, string>): boolean;
  const webhooks: {
    (options: { validate: boolean }): {
      handleRequest(body: Record<string, string>, signature: string, options: { url: string; token: string }): boolean;
    };
  };
}

declare module 'qrcode' {
  export function toDataURL(text: string): Promise<string>;
  export function toString(text: string, options?: any): Promise<string>;
}

declare module 'js-yaml' {
  function load(input: string): any;
  function dump(input: any): string;
}

declare module 'axios-retry' {
  export default function axiosRetry(axiosInstance: any, config?: any): void;
}

declare module 'ioredis' {
  export default class Redis {
    constructor(options?: any);
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ...args: any[]): Promise<string>;
    del(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    ttl(key: string): Promise<number>;
    exists(key: string): Promise<number>;
    incr(key: string): Promise<number>;
    decr(key: string): Promise<number>;
    hget(key: string, field: string): Promise<string | null>;
    hset(key: string, field: string, value: string): Promise<number>;
    hdel(key: string, field: string): Promise<number>;
    hgetall(key: string): Promise<Record<string, string>>;
    lpush(key: string, ...values: string[]): Promise<number>;
    rpush(key: string, ...values: string[]): Promise<number>;
    lpop(key: string): Promise<string | null>;
    rpop(key: string): Promise<string | null>;
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    llen(key: string): Promise<number>;
    sadd(key: string, ...members: string[]): Promise<number>;
    srem(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    sismember(key: string, member: string): Promise<number>;
    publish(channel: string, message: string): Promise<number>;
    subscribe(channel: string, callback?: (message: string) => void): Promise<void>;
    on(event: string, callback: Function): this;
    ping(): Promise<string>;
    quit(): Promise<string>;
    keys(pattern: string): Promise<string[]>;
    scanStream(options?: any): any;
    pipeline(): any;
    multi(): any;
    dbsize(): Promise<number>;
    info(section?: string): Promise<string>;
    setex(key: string, seconds: number, value: any): Promise<string>;
  }
}

/* Global type declarations used across backend */

type Filter<T, U> = T extends U ? T : never;

interface SSOAuditEvent {
  id: string;
  eventType: string;
  event: string;
  timestamp: Date;
  userId?: string;
  organizationId?: string;
  provider?: string;
  success: boolean;
  error?: string;
  severity: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/* Database globals - used across many backend files that import from db/connection */
declare const pgDb: any;
declare const sql: any;
declare const eq: any;
declare const or: any;
declare const organizations: any;
declare const consentRecords: any;
declare const aiAgentEvents: any;
declare const isNotNull: any;

/* Module declarations for packages without types */
declare module 'qrcode' {
  const qrcode: {
    toDataURL(data: string, options?: any): Promise<string>;
    toString(data: string, options?: any): Promise<string>;
  };
  export default qrcode;
}

declare module 'samlify' {
  export class ServiceProvider {
    constructor(config: any);
    getLoginURL(idp: IdentityProvider): string;
  }
  export class IdentityProvider {
    constructor(config: any);
  }
  export type SamlIdp = IdentityProvider;
  export type SamlSp = ServiceProvider;
}

/* Context type used in Hono routes */
declare class Context {
  json(data: any, status?: number): any;
  text(data: string, status?: number): any;
  header(name: string, value: string, options?: { append?: boolean }): any;
  get(key: string): any;
  set(key: string, value: any): void;
  req: { json(): Promise<any>; body: any; query: any; param(key: string): string; header(key: string): string; valid(): any; method: string; url: string; path: string; };
  env: any;
  status: any;
  redirect(url: string, status?: number): any;
  body(data?: any, status?: number): any;
  newResponse(data: any, status?: number, headers?: Record<string, string>): any;
}

/* Logger global */
declare const logger: {
  info(msg: string, ...args: any[]): void;
  warn(msg: string, ...args: any[]): void;
  error(msg: string, ...args: any[]): void;
  debug(msg: string, ...args: any[]): void;
};

/* Error recovery manager global */
declare const errorRecoveryManager: {
  handleError(error: Error, context?: any): Promise<any>;
  retry<T>(fn: () => Promise<T>, options?: any): Promise<T>;
  recordError(error: Error, context?: any): void;
};

/* Config global */
declare const config: {
  jwtSecret: string;
  jwtExpiry: string;
  databaseUrl: string;
  redisUrl: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioPhoneNumber: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  openaiApiKey: string;
  [key: string]: any;
};

/* Next function for middleware */
declare function Next(): Promise<void>;
