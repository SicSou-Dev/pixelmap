#!/usr/bin/env node

/**
 * Pixel Wars Development Server Manager
 *
 * This script helps with development tasks
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname);
const BACKEND = path.join(ROOT, 'backend');
const FRONTEND = path.join(ROOT, 'frontend');

console.log('🎨 Pixel Wars - Development Tools\n');

const command = process.argv[2];

function runCommand(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    switch (command) {
      case 'dev':
        console.log('Starting development servers...\n');
        console.log('📡 Backend: http://localhost:5000');
        console.log('🌐 Frontend: http://localhost:3000\n');
        
        Promise.all([
          runCommand('npm', ['run', 'dev'], BACKEND),
          new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
            runCommand('npm', ['run', 'dev'], FRONTEND)
          ),
        ]).catch(err => {
          console.error('Error:', err.message);
          process.exit(1);
        });
        break;

      case 'build':
        console.log('Building project...\n');
        await runCommand('npm', ['run', 'build'], ROOT);
        console.log('\n✅ Build complete!');
        break;

      case 'install':
        console.log('Installing dependencies...\n');
        await runCommand('npm', ['install'], ROOT);
        await runCommand('npm', ['install'], BACKEND);
        await runCommand('npm', ['install'], FRONTEND);
        console.log('\n✅ Dependencies installed!');
        break;

      default:
        console.log('Usage: node scripts/dev.js [command]\n');
        console.log('Commands:');
        console.log('  dev      - Start development servers');
        console.log('  build    - Build for production');
        console.log('  install  - Install all dependencies');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
