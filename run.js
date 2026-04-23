#!/usr/bin/env node

/**
 * Project Runner Script
 * Helps easily run different parts of the Kaydex Full App project
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n');
  log(`╔${'═'.repeat(title.length + 2)}╗`, 'blue');
  log(`║ ${title} ║`, 'blue');
  log(`╚${'═'.repeat(title.length + 2)}╝`, 'blue');
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    process.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    process.on('error', reject);
  });
}

async function checkDependencies() {
  logSection('Checking Dependencies');
  
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    log('❌ node_modules not found. Installing dependencies...', 'yellow');
    try {
      await runCommand('npm', ['install', '--legacy-peer-deps']);
      log('✅ Dependencies installed successfully', 'green');
    } catch (error) {
      log(`❌ Failed to install dependencies: ${error.message}`, 'red');
      throw error;
    }
  } else {
    log('✅ Dependencies already installed', 'green');
  }
}

async function runBackend() {
  logSection('Starting Backend Server');
  try {
    await checkDependencies();
    log('Starting mock backend server...\n', 'blue');
    await runCommand('npm', ['run', 'backend']);
  } catch (error) {
    log(`Error running backend: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function runWebServer() {
  logSection('Starting Web Development Server');
  try {
    await checkDependencies();
    log('Starting Expo web development server...\n', 'blue');
    log('The app will be available at:', 'yellow');
    log('  • Web: http://localhost:19007', 'yellow');
    log('  • Metro: http://localhost:8082\n', 'yellow');
    await runCommand('npm', ['run', 'start-web:local']);
  } catch (error) {
    log(`Error running web server: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function runTypeCheck() {
  logSection('TypeScript Type Checking');
  try {
    await checkDependencies();
    log('Running TypeScript compiler...\n', 'blue');
    await runCommand('npm', ['run', 'typecheck']);
    log('\n✅ No TypeScript errors found!', 'green');
  } catch (error) {
    log(`TypeScript errors detected: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function runTests() {
  logSection('Running Tests');
  try {
    await checkDependencies();
    log('Running test suite...\n', 'blue');
    await runCommand('npm', ['run', 'test:all']);
  } catch (error) {
    log(`Tests failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

function showHelp() {
  logSection('Kaydex Full App - Project Runner');
  console.log(`
Usage: node run.js [command]

Commands:
  backend       Start the backend mock server
  web           Start the web development server
  typecheck     Run TypeScript type checking
  test          Run the test suite
  help          Show this help message

Examples:
  node run.js backend
  node run.js web
  node run.js typecheck

Environment:
  PORT         Backend server port (default: 3000)
  NODE_ENV     Environment (default: development)
`);
}

// Parse command line arguments
const command = process.argv[2] || 'help';

switch (command) {
  case 'backend':
    runBackend();
    break;
  case 'web':
    runWebServer();
    break;
  case 'typecheck':
    runTypeCheck();
    break;
  case 'test':
    runTests();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    log(`Unknown command: ${command}`, 'red');
    showHelp();
    process.exit(1);
}
