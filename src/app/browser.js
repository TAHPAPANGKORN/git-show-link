import { execSync } from 'child_process';

export const openInBrowser = (url) => {
    const os = process.platform;
    if (os === 'darwin') {
        execSync(`open "${url}"`);
    } else if (os === 'win32') {
        execSync(`start "" "${url}"`);
    } else {
        execSync(`xdg-open "${url}"`);
    }
}
