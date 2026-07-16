import { fileURLToPath } from 'url';
import { dirname } from 'path';

globalThis.__filename = function(meta) {
  return fileURLToPath(meta.url);
};

globalThis.__dirname = function(meta) {
  return dirname(fileURLToPath(meta.url));
};
