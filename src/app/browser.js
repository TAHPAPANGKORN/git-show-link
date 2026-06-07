import { execSync } from 'child_process';

/**
 * Opens a URL in the user's default browser.
 * @param {string} url The URL to open.
 */
export const openInBrowser = (url) => {
  const os = process.platform;
  if (os === 'darwin') {
    execSync(`open "${url}"`);
  } else if (os === 'win32') {
    execSync(`start "" "${url}"`);
  } else {
    execSync(`xdg-open "${url}"`);
  }
};
