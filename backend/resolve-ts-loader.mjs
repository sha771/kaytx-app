import { statSync } from 'fs';
import { resolve as pathResolve, dirname, extname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { cwd } from 'process';

const tsExtensions = ['.ts', '.tsx', '.mts', '.cts'];
const baseExtensions = ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.json'];
const projectRoot = cwd();

export function resolve(specifier, context, nextResolve) {
  const parentURL = context.parentURL;
  
  if (specifier.startsWith('@/')) {
    const resolvedPath = pathResolve(projectRoot, specifier.slice(2));
    for (const ext of tsExtensions) {
      try {
        const fullPath = resolvedPath + ext;
        statSync(fullPath);
        return { shortCircuit: true, url: pathToFileURL(fullPath).href };
      } catch { }
    }
    try {
      const indexPath = pathResolve(resolvedPath, 'index.ts');
      statSync(indexPath);
      return { shortCircuit: true, url: pathToFileURL(indexPath).href };
    } catch { }
    return nextResolve(specifier, context);
  }

  if (parentURL && specifier.startsWith('.')) {
    const parentDir = dirname(fileURLToPath(parentURL));
    
    for (const ext of tsExtensions) {
      try {
        const fullPath = pathResolve(parentDir, specifier + ext);
        statSync(fullPath);
        return { shortCircuit: true, url: pathToFileURL(fullPath).href };
      } catch { }
    }

    const basePath = pathResolve(parentDir, specifier);
    const ext = extname(basePath);
    if (!ext) {
      for (const tryExt of baseExtensions) {
        try {
          const fullPath = basePath + tryExt;
          statSync(fullPath);
          return { shortCircuit: true, url: pathToFileURL(fullPath).href };
        } catch { }
      }
      try {
        const indexPath = pathResolve(basePath, 'index.ts');
        statSync(indexPath);
        return { shortCircuit: true, url: pathToFileURL(indexPath).href };
      } catch { }
    }
  }

  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  return nextLoad(url, context).then(result => {
    if (url.endsWith('.ts') || url.endsWith('.tsx')) {
      let code = result.source.toString();
      const filePath = fileURLToPath(url);
      const fDirname = dirname(filePath).replace(/\\/g, '/');
      const fFilename = filePath.replace(/\\/g, '/');
      
      code = code.replace(/(?<!\.)\b__filename\b/g, JSON.stringify(fFilename));
      code = code.replace(/(?<!\.)\b__dirname\b/g, JSON.stringify(fDirname));
      
      return { ...result, source: code };
    }
    return result;
  });
}
