import { parseArgs } from 'node:util';
import { showHelpMessage } from './message.js';

export const flags = () => {
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

    return values;
}