const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 120000 }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function install(name, version) {
  const tgz = name.replace('/', '-') + '.tgz';
  const url = `https://registry.npmjs.org/${name}/-/${name.includes('/') ? name.replace('/', '%2f') : name}-${version}.tgz`;
  process.stdout.write(`Downloading ${name}@${version}... `);
  await download(url, tgz);
  console.log('OK');
  const targetDir = `node_modules/${name}`;
  const parent = targetDir.substring(0, targetDir.lastIndexOf('/'));
  if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
  execSync(`tar -xzf "${tgz}" -C node_modules`, { shell: 'powershell.exe', stdio: 'pipe' });
  if (fs.existsSync('node_modules/package')) {
    if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
    fs.renameSync('node_modules/package', targetDir);
  }
  fs.unlinkSync(tgz);
}

const packages = [
  ['expo-secure-store', '57.0.1'],
  ['expo-location', '57.0.5'],
  ['expo-image-picker', '57.0.5'],
  ['expo-haptics', '57.0.1'],
  ['expo-splash-screen', '57.0.4'],
  ['expo-status-bar', '57.0.1'],
  ['expo-system-ui', '57.0.1'],
  ['expo-web-browser', '57.0.1'],
  ['expo-linking', '57.0.3'],
  ['expo-crypto', '57.0.1'],
  ['expo-blur', '57.0.2'],
  ['expo-linear-gradient', '57.0.1'],
  ['expo-asset', '57.0.6'],
  ['expo-constants', '57.0.6'],
  ['expo-font', '57.0.1'],
  ['expo-file-system', '57.0.1'],
];

(async () => {
  for (const [name, ver] of packages) {
    if (fs.existsSync(`node_modules/${name}/package.json`)) {
      console.log(`${name}@${ver} already installed`);
      continue;
    }
    try {
      await install(name, ver);
    } catch (e) {
      console.error(`Failed to install ${name}: ${e.message}`);
    }
  }
  console.log('All done');
})();
