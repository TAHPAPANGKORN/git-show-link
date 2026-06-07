import { parseArgs } from 'node:util';

/**
 * Parses options from process.argv.
 * @returns {object} The parsed key-value pair of options.
 * @throws {Error} If argument parsing fails.
 */
export const parseCliArgs = () => {
  const config = {
    options: {
      commit: { type: 'string', short: 'c' },
      'current-commit': { type: 'boolean', short: 'C' },
      branch: { type: 'string', short: 'b' },
      'current-branch': { type: 'boolean', short: 'B' },
      open: { type: 'boolean', short: 'o' },
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v'}
    }
  };

  const parsed = parseArgs(config);
  return parsed.values;
};
