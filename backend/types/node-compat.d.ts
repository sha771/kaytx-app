declare module 'events' {
  class EventEmitter {
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
  }

  export { EventEmitter };
}

declare module 'crypto' {
  const crypto: {
    randomUUID(): string;
    randomBytes(size: number): { toString(encoding: string): string };
    createHash(algorithm: string): { update(data: any): any; digest(encoding?: string): any };
    createHmac(algorithm: string, key: any): { update(data: any): any; digest(encoding?: string): any };
    timingSafeEqual(a: any, b: any): boolean;
  };

  export const createHash: typeof crypto.createHash;
  export const createHmac: typeof crypto.createHmac;

  export default crypto;
}

declare function require(moduleName: string): any;

declare const __filename: string;

declare const __dirname: string;

declare const Buffer: {
  from(data: any, encoding?: string): any;
};

declare function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any;
declare function clearTimeout(timeoutId: any): void;
declare function setInterval(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any;
declare function clearInterval(intervalId: any): void;

declare const process: {
  env: Record<string, string | undefined>;
};
