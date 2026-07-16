import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
const seen = new Set();
function walk(dir) {
  for (const e of readdirSync(dir, {withFileTypes: true})) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (!e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== '__tests__') walk(full);
    } else if (e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.tsx'))) {
      const content = readFileSync(full, 'utf8');
      for (const m of content.matchAll(/(?:from|require)\s*\(?\s*['"]([^'"]+)['"]/g)) {
        const pkg = m[1];
        if (pkg.startsWith('.') || pkg.startsWith('@/') || pkg.startsWith('node:')) continue;
        const name = pkg.startsWith('@') ? pkg.split('/').slice(0,2).join('/') : pkg.split('/')[0];
        seen.add(name);
      }
    }
  }
}
walk('backend');
// Check which are installed
const installed = new Set(readdirSync('node_modules').filter(x => !x.startsWith('.')));
// Also check inside @scoped dirs
for (const scope of readdirSync('node_modules').filter(x => x.startsWith('@'))) {
  for (const pkg of readdirSync(join('node_modules', scope)).filter(x => !x.startsWith('.'))) {
    installed.add('@' + scope + '/' + pkg);
  }
}
for (const pkg of Array.from(seen).sort()) {
  if (!installed.has(pkg)) {
    try {
      require.resolve(pkg);
    } catch {
      console.log(pkg);
    }
  }
}
