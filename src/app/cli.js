import { createRequire } from 'module';
import { parseCliArgs } from './flags.js';
import { getHelpMessage } from './messages.js';
import { openInBrowser } from './browser.js';
import {
  getRemoteUrl,
  getCurrentBranch,
  getCommitHash,
  checkBranchExists,
} from './git.js';
import { parseRemoteUrl, buildLink } from './url-builder.js';

const require = createRequire(import.meta.url);
const { version } = require('../../package.json');

export const run = () => {
  let values;
  try {
    values = parseCliArgs();
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    console.log(getHelpMessage(version));
    process.exit(1);
  }

  if (values.version) {
    console.log(`git show-link version: ${version}`);
    process.exit(0);
  }

  if (values.help) {
    console.log(getHelpMessage(version));
    process.exit(0);
  }

  try {
    const remoteUrl = getRemoteUrl();
    const baseHttpsUrl = parseRemoteUrl(remoteUrl);

    const isCommitLink = !!(values.commit || values['current-commit']);
    const isBranchLink = !!(values.branch || values['current-branch']);

    let commitHash = null;
    let branchName = null;

    if (isCommitLink) {
      const targetCommit = values['current-commit'] ? 'HEAD' : values.commit;
      commitHash = getCommitHash(targetCommit);
    } else if (isBranchLink) {
      if (values['current-branch']) {
        branchName = getCurrentBranch();
      } else {
        branchName = values.branch;
      }

      if (!checkBranchExists(branchName)) {
        console.error(`\nError: The branch '${branchName}' does not exist locally or on any remote.\n`);
        process.exit(1);
      }
    }

    const finalLink = buildLink({ baseHttpsUrl, commitHash, branchName });

    console.log(`\nLink: \x1b[36m\x1b[4m${finalLink}\x1b[0m\n`);

    if (values.open) {
      openInBrowser(finalLink);
      console.log('Opened in browser!\n');
    }
  } catch (error) {
    console.error(`\nError: ${error.message}\n`);
    process.exit(1);
  }
};
