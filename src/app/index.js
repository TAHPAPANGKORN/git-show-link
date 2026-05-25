#!/usr/bin/env node
import { execSync } from 'child_process';
import { parseArgs } from 'node:util';

const config = {
  options: {
    commit: { type: 'string', short: 'c' },
    'current-commit': { type: 'boolean', short: 'C' },
    open: { type: 'boolean', short: 'o' },
    help: { type: 'boolean', short: 'h' }
  }
};

let values;
try {
  const parsed = parseArgs(config);
  values = parsed.values;
} catch (error) {
  console.error(`\nError: ${error.message}`);
  showHelpMessage();
  process.exit(1);
}

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

function showHelpMessage() {
  console.log(`
Usage: git-show-link [options]

Options:
  -c, --commit <hash>      Specify the commit hash (e.g. git show-link -c a1b2c3d)
  -C, --current-commit     Specify the current commit (HEAD)
  -o, --open               Open the link in the browser
  -h  --help               Show this help message
`);
}