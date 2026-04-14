#!/usr/bin/env node
/**
 * Prints an ASCII QR for Expo Go when Metro is up but the CLI skipped the QR
 * (non-interactive / no TTY / CI). Run in a second terminal: npm run qr
 */
const http = require('node:http');
const { execSync } = require('node:child_process');
const qrcode = require('qrcode-terminal');

function getLanIp() {
  for (const iface of ['en0', 'en1', 'eth0']) {
    try {
      const ip = execSync(`ipconfig getifaddr ${iface}`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (ip) return ip;
    } catch {
      /* try next */
    }
  }
  return '127.0.0.1';
}

function metroRunning(port, cb) {
  const req = http.get(`http://127.0.0.1:${port}/status`, (res) => {
    let body = '';
    res.on('data', (c) => {
      body += c;
    });
    res.on('end', () => {
      cb(res.statusCode === 200 && body.includes('packager-status:running'));
    });
  });
  req.on('error', () => cb(false));
  req.setTimeout(3000, () => {
    req.destroy();
    cb(false);
  });
}

const port = Number(process.env.RCT_METRO_PORT || process.argv[2] || 8081, 10);

metroRunning(port, (ok) => {
  if (!ok) {
    console.error(`Metro does not look running on port ${port}. Start the app first (npm start).`);
    process.exit(1);
  }
  const host = process.env.EXPO_PACKAGER_HOSTNAME || getLanIp();
  const url = `exp://${host}:${port}`;
  console.log('Expo Go (LAN):', url);
  console.log('');
  qrcode.generate(url, { small: true }, (ascii) => {
    console.log(ascii);
  });
});
