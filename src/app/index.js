#!/usr/bin/env node
import { openInBrowser } from './browser.js';
import { showHelpMessage } from './message.js';
import { flags } from './flags.js';

import { execSync } from 'child_process'

const values = flags();

if (values.help) {
  showHelpMessage();
  process.exit(0);
}

const isCommitLink = !!(values.commit || values['current-commit']);
const targetCommit = values['current-commit'] ? 'HEAD' : values.commit;
const shouldOpen = !!values.open;

try {
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
    openInBrowser(finalLink);
    console.log('Opened in browser!\n');
  }

} catch (error) {
  console.error("\nError: Please make sure you are in a Git repository, have a remote configured, or typed the correct commit hash.\n");
  process.exit(1);
}