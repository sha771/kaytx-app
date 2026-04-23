// Stub for Node.js 'fs' module - safe for web environments

export function readFileSync(): string {
  return '';
}

export function writeFileSync(): void {
  // No-op
}

export function existsSync(): boolean {
  return false;
}

export function mkdirSync(): void {
  // No-op
}

export function readdirSync(): string[] {
  return [];
}

export function statSync(): any {
  return {
    isFile: () => false,
    isDirectory: () => false,
    size: 0,
  };
}

export function accessSync(): void {
  throw new Error('File access not available in web environment');
}

export function unlinkSync(): void {
  // No-op
}

export function rmdirSync(): void {
  // No-op
}

export function renameSync(): void {
  // No-op
}

export function copyFileSync(): void {
  // No-op
}

export function appendFileSync(): void {
  // No-op
}

export function readSync(): number {
  return 0;
}

export function writeSync(): number {
  return 0;
}

export function openSync(): number {
  return 0;
}

export function closeSync(): void {
  // No-op
}

export function createReadStream(): any {
  return null;
}

export function createWriteStream(): any {
  return null;
}

export function promises(): any {
  return {
    readFile: async () => '',
    writeFile: async () => undefined,
    mkdir: async () => undefined,
    readdir: async () => [],
    stat: async () => ({
      isFile: () => false,
      isDirectory: () => false,
      size: 0,
    }),
    access: async () => {
      throw new Error('File access not available in web environment');
    },
    unlink: async () => undefined,
    rmdir: async () => undefined,
    rename: async () => undefined,
    copyFile: async () => undefined,
  };
}

export default {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  accessSync,
  unlinkSync,
  rmdirSync,
  renameSync,
  copyFileSync,
  appendFileSync,
  readSync,
  writeSync,
  openSync,
  closeSync,
  createReadStream,
  createWriteStream,
  promises,
};
