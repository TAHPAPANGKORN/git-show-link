import { execSync } from 'child_process';

/**
 * Gets the remote origin URL of the git repository.
 * @returns {string} The remote URL.
 * @throws {Error} If git config command fails.
 */
export const getRemoteUrl = () => {
  try {
    return execSync('git config --get remote.origin.url').toString().trim();
  } catch (error) {
    throw new Error('Please make sure you are in a Git repository and have a remote origin configured.');
  }
};

/**
 * Gets the active branch name.
 * @returns {string} The branch name.
 * @throws {Error} If git command fails.
 */
export const getCurrentBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    throw new Error('Please make sure you are in a Git repository to resolve the current branch.');
  }
};

/**
 * Resolves commit hash for a target.
 * @param {string} targetCommit Commit ref (e.g. HEAD, hash).
 * @returns {string} The commit hash.
 * @throws {Error} If target cannot be resolved.
 */

export const getCommitHash = (targetCommit) => {
  try {
    return execSync(`git rev-parse "${targetCommit}"`).toString().trim();
  } catch (error) {
    throw new Error(`Failed to resolve commit hash for '${targetCommit}'. Please make sure the commit exists.`);
  }
};

/**
 * Checks if a branch exists locally or on a remote-tracking branch.
 * @param {string} branchName The branch name to verify.
 * @returns {boolean} True if the branch exists, false otherwise.
 */

export const checkBranchExists = (branchName) => {
  if (branchName === 'HEAD') return true;
  try {
    execSync(`git rev-parse --verify "refs/heads/${branchName}"`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const refsOutput = execSync('git show-ref', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const refs = refsOutput.split('\n').map(line => line.split(' ')[1]).filter(Boolean);
      return refs.some(ref => {
        if (ref === `refs/remotes/${branchName}`) return true;
        if (ref.startsWith('refs/remotes/') && ref.endsWith(`/${branchName}`) && !ref.endsWith('/HEAD')) return true;
        return false;
      });
    } catch (err) {
      return false;
    }
  }
};
