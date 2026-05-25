export const showHelpMessage = () => {
        console.log(`
    Usage: git-show-link [options]

    Options:
    -c, --commit <hash>      Specify the commit hash (e.g. git show-link -c a1b2c3d)
    -C, --current-commit     Specify the current commit (HEAD)
    -o, --open               Open the link in the browser
    -h, --help               Show this help message
    `);
} 