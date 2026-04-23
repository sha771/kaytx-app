// Stub for Node.js 'path' module - safe for web environments

export function join(...paths: string[]): string {
  return paths.join('/').replace(/\/+/, '/');
}

export function resolve(...paths: string[]): string {
  if (paths.length === 0) return '/';
  return paths.join('/').replace(/\/+/, '/');
}

export function dirname(path: string): string {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/') || '/';
}

export function basename(path: string, ext?: string): string {
  const parts = path.split('/');
  let name = parts[parts.length - 1] || '';
  if (ext && name.endsWith(ext)) {
    name = name.slice(0, -ext.length);
  }
  return name;
}

export function extname(path: string): string {
  const parts = path.split('/');
  const name = parts[parts.length - 1] || '';
  const dotIndex = name.lastIndexOf('.');
  return dotIndex > 0 ? name.slice(dotIndex) : '';
}

export function normalize(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
}

export function isAbsolute(path: string): boolean {
  return path.startsWith('/');
}

export function relative(from: string, to: string): string {
  return to;
}

export function parse(path: string): { root: string; dir: string; base: string; ext: string; name: string } {
  const ext = extname(path);
  const base = basename(path);
  const name = base.slice(0, base.length - ext.length);
  return {
    root: '/',
    dir: dirname(path),
    base,
    ext,
    name,
  };
}

export function format(pathObject: { root?: string; dir?: string; base?: string; ext?: string; name?: string }): string {
  const dir = pathObject.dir || '';
  const base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  return dir ? `${dir}/${base}` : base;
}

export const sep = '/';
export const delimiter = ':';
export const posix = { sep: '/', delimiter: ':', join, resolve, dirname, basename, extname, normalize, isAbsolute, relative, parse, format };
export const win32 = { sep: '\\', delimiter: ';', join, resolve, dirname, basename, extname, normalize, isAbsolute, relative, parse, format };

export default {
  join,
  resolve,
  dirname,
  basename,
  extname,
  normalize,
  isAbsolute,
  relative,
  parse,
  format,
  sep,
  delimiter,
  posix,
  win32,
};
