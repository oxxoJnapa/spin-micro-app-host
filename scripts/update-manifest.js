const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'version-manager', 'manifest.json');
const packageJson = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packageJson)) {
  console.error('package.json file not found');
  process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest file not found');
  process.exit(1);
}

const manifest = require(manifestPath);
const pkgJson = require(packageJson);

const host = manifest.host;
const containers = manifest.containers;

if (host.versions.includes(pkgJson.version)) {
  console.error('Version already exists in manifest');
  process.exit(1);
}

const currentVersion = host.last;

host.versions = [...host.versions, pkgJson.version];
host.last = pkgJson.version;

containers[pkgJson.version] = containers[currentVersion] ?? {};

fs.writeFileSync(manifestPath, JSON.stringify({ host, containers }, null, 2));
