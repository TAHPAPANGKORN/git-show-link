# git-show-link 

Get clickable HTTPS commit links from SSH remotes

## Work with
![homebrew](https://img.shields.io/badge/homebrew-formula-orange?style=for-the-badge&logo=homebrew)
![npm](https://img.shields.io/badge/npm-11.8.0-CB3837?style=for-the-badge&logo=npm)
![pnpm](https://img.shields.io/badge/pnpm-10.14.0-F69220?style=for-the-badge&logo=pnpm)
![yarn](https://img.shields.io/badge/yarn-4.9.2-2C8EBB?style=for-the-badge&logo=yarn)
![bun](https://img.shields.io/badge/bun-1.2.21-black?style=for-the-badge&logo=bun)
![size](https://img.shields.io/badge/install_size-~5.3_kB-brightgreen?style=for-the-badge)




## Install Global (Recommended)

```bash
# npm
npm i -g git-show-link

# pnpm
pnpm add -g git-show-link

# bun
bun add -g git-show-link

# yarn
yarn global add git-show-link
```

## Alternative Installation
- ### Homebrew (MacOS)
    ```bash
    brew tap TAHPAPANGKORN/git-show-link https://github.com/TAHPAPANGKORN/git-show-link.git

    brew install git-show-link
    ```

- ### Manual Installation (Linux, MacOS)
    ```bash
    curl -fsSL https://raw.githubusercontent.com/TAHPAPANGKORN/git-show-link/main/scripts/install.sh | bash
    ```

- ### Uninstallation (Manual Install)
    ```bash
    curl -fsSL https://raw.githubusercontent.com/TAHPAPANGKORN/git-show-link/main/scripts/uninstall.sh | bash
    ```
    
## CLI

- **Help Command**
    ```bash
    git show-link -h
    ```

- **Get HTTPS commit link from SSH remotes**
    ```bash
    git show-link
    ```

- **Get link and open in browser**
    ```bash
    git show-link -o
    ```


- **Get Link With Currecnt Commit**
    ```bash
    git show-link -C
    ```

- **Get Link With Custom Commit**
    ```bash
    git show-link -c <commit_hash>
    ```

- **Get Link With Current Branch**
    ```bash
    git show-link -B
    ```

- **Get Link With Custom Branch**
    ```bash
    git show-link -b <branch_name>
    ```

- **Show Version**
    ```bash
    git show-link -v 
    ```

### License

[MIT](LICENSE) © [TAHPAPANGKORN](https://github.com/TAHPAPANGKORN)