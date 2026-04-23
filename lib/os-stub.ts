// Stub for Node.js 'os' module - safe for web environments

export function platform(): string {
  return 'web';
}

export function type(): string {
  return 'browser';
}

export function release(): string {
  return '0.0.0';
}

export function cpus(): any[] {
  return [{ model: 'Web CPU', speed: 0, times: {} }];
}

export function totalmem(): number {
  return 0;
}

export function freemem(): number {
  return 0;
}

export function loadavg(): number[] {
  return [0, 0, 0];
}

export function hostname(): string {
  return 'localhost';
}

export function userInfo(): { username: string; uid: number; gid: number; shell: string; homedir: string } {
  return { username: 'web', uid: 0, gid: 0, shell: '', homedir: '/' };
}

export function uptime(): number {
  return 0;
}

export function networkInterfaces(): any {
  return {};
}

export function homedir(): string {
  return '/';
}

export function tmpdir(): string {
  return '/tmp';
}

export function endianness(): string {
  return 'LE';
}

export const EOL = '\n';

export default {
  platform,
  type,
  release,
  cpus,
  totalmem,
  freemem,
  loadavg,
  hostname,
  userInfo,
  uptime,
  networkInterfaces,
  homedir,
  tmpdir,
  endianness,
  EOL,
};
