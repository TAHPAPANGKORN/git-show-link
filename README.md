# git-show-link

Get clickable HTTPS commit links from SSH remotes

## Work with
![npm](https://img.shields.io/badge/npm-11.8.0-CB3837?style=for-the-badge&logo=npm)
![pnpm](https://img.shields.io/badge/pnpm-10.14.0-F69220?style=for-the-badge&logo=pnpm)
![yarn](https://img.shields.io/badge/yarn-4.9.2-2C8EBB?style=for-the-badge&logo=yarn)
![bun](https://img.shields.io/badge/bun-1.2.21-black?style=for-the-badge&logo=bun)
![size](https://img.shields.io/badge/install_size-~5.3_kB-brightgreen?style=for-the-badge)




## Install Global

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

## CLI

```bash
# Help
git show-link -h
```

```bash
# Get HTTPS commit link from SSH remotes
git show-link
```

```bash
# Get Link With Currecnt Commit
git show-link -C
```

```bash
# Get Link With Custom Commit
git show-link -C <commit_hash>
```

### License

[MIT](LICENSE) © [TAHPAPANGKORN](https://github.com/TAHPAPANGKORN)