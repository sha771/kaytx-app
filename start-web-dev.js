#!/usr/bin/env node
/* global __dirname */
/**
 * Expo Web Dev Starter Script
 * Workaround for expo CLI missing error on Windows
 */

const path = require('path');
const { spawn } = require('child_process');

// Set environment variables
process.env.EXPO_ROUTER_APP_ROOT = 'app';
process.env.EXPO_NO_DOCTOR = '1';
process.env.EXPO_NO_DEPENDENCY_VALIDATION = '1';
process.env.EXPO_WEB_PORT = '19007';

// Try to require expo directly
try {
  const expoPath = path.join(__dirname, 'node_modules', 'expo', 'build', 'src', 'cli.js');
  // Try using expo programmatically
  console.log('🚀 Starting Kaytx Web Development Server...');
  console.log('📱 Web server will start on port 19007');
  console.log('');
  
  // Use require to load expo
  require(expoPath);
} catch (err) {
  console.error('❌ Failed to start expo:', err.message);
  console.log('\nTrying alternative method...');
  
  // Fallback: try to spawn expo via npx
  const npxProcess = spawn('npx', ['expo', 'start', '--web'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
  
  npxProcess.on('error', (err) => {
    console.error('Failed to start expo:', err);
    process.exit(1);
  });
}
