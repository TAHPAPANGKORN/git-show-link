#!/usr/bin/env node
import { execSync } from 'child_process';

try {
  const args = process.argv.slice(2);
  
  let targetCommit = null;
  let isCommitLink = false;
  let shouldOpen = false;

  if (args.includes('-C') || args.includes('--commit')) {
    targetCommit = 'HEAD';
    isCommitLink = true;
  } else if (args.includes('-c')) {
    const cIndex = args.indexOf('-c');
    targetCommit = args[cIndex + 1]; 
    
    if (!targetCommit || targetCommit.startsWith('-')) {
      console.error("\nError: Please specify the commit hash after -c (e.g. git show-link -c a1b2c3d)\n");
      process.exit(1);
    }
    isCommitLink = true;
  }

  if (args.includes('-o') || args.includes('--open')){
    shouldOpen = true;
  }

  const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
  
  let httpsUrl = remoteUrl;
  if (remoteUrl.startsWith('git@')) {
    httpsUrl = remoteUrl.replace(':', '/').replace('git@', 'https://');
  }
  httpsUrl = httpsUrl.replace(/\.git$/, '');

  let finalLink = httpsUrl; 

  if (isCommitLink) {
    const hash = execSync(`git rev-parse ${targetCommit}`).toString().trim();
    finalLink = `${httpsUrl}/commit/${hash}`;
  }

  console.log(`\nLink: \x1b[36m\x1b[4m${finalLink}\x1b[0m\n`);

if (shouldOpen) {
    const os = process.platform;
    if (os === 'darwin') {
      execSync(`open "${finalLink}"`);
    } else if (os === 'win32') {
      execSync(`start "" "${finalLink}"`);
    } else {
      execSync(`xdg-open "${finalLink}"`);
    }
    console.log('Opened in browser!\n');
  }

} catch (error) {
  console.error("\nError: Please make sure you are in a Git repository, have a remote configured, or typed the correct commit hash.\n");
  process.exit(1);
}