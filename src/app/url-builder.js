/**
 * Parses a git remote URL (supporting both SSH and HTTPS formats) 
 * into a clean HTTPS base URL (e.g. without trailing .git).
 * @param {string} remoteUrl Raw git remote URL from config.
 * @returns {string} Clean HTTPS repository URL.
 */
export const parseRemoteUrl = (remoteUrl) => {
  let httpsUrl = remoteUrl.trim();
  if (httpsUrl.startsWith('git@')) {
    httpsUrl = httpsUrl.replace(':', '/').replace('git@', 'https://');
  }
  return httpsUrl.replace(/\.git$/, '');
};

/**
 * Builds the repository tree or commit link.
 * @param {object} options
 * @param {string} options.baseHttpsUrl Base HTTPS url of the repository.
 * @param {string} [options.commitHash] Optional commit hash to build commit link.
 * @param {string} [options.branchName] Optional branch name to build branch link.
 * @returns {string} The generated web URL.
 */

export const buildLink = ({ baseHttpsUrl, commitHash, branchName }) => {
  if (commitHash) {
    return `${baseHttpsUrl}/commit/${commitHash}`;
  }

  if (branchName) {
    if (baseHttpsUrl.includes('bitbucket.org')) {
      return `${baseHttpsUrl}/src/${branchName}`;
    }
    if (baseHttpsUrl.includes('gitlab.com')) {
      return `${baseHttpsUrl}/-/tree/${branchName}`;
    }
    // Default / GitHub
    return `${baseHttpsUrl}/tree/${branchName}`;
  }

  return baseHttpsUrl;
};
