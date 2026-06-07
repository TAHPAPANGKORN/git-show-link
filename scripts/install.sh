#!/usr/bin/env bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==>${NC} Installing git-show-link..."

# 1. Prerequisite checks
if ! command -v node >/dev/null 2>&1; then
  echo -e "${RED}Error:${NC} Node.js is not installed. Please install Node.js first."
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo -e "${RED}Error:${NC} Git is not installed. Please install Git first."
  exit 1
fi

# 2. Paths
REPO_URL="https://github.com/TAHPAPANGKORN/git-show-link"
INSTALL_DIR="$HOME/.git-show-link"
TMP_DIR=$(mktemp -d)

# Cleanup tmp directory on exit
trap 'rm -rf "$TMP_DIR"' EXIT

# 3. Download and extract
echo -e "${BLUE}==>${NC} Downloading source from GitHub..."
if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$REPO_URL/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DIR"
elif command -v wget >/dev/null 2>&1; then
  wget -qO- "$REPO_URL/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DIR"
else
  echo -e "${BLUE}==>${NC} Falling back to git clone..."
  git clone --depth 1 "$REPO_URL.git" "$TMP_DIR/git-show-link-main"
fi

# Locate the extracted folder
EXTRACTED_DIR=$(find "$TMP_DIR" -maxdepth 1 -type d -name "git-show-link-*" | head -n 1)

if [ -z "$EXTRACTED_DIR" ]; then
  echo -e "${RED}Error:${NC} Extraction failed."
  exit 1
fi

# 4. Install files
echo -e "${BLUE}==>${NC} Installing files to $INSTALL_DIR..."
rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
cp -R "$EXTRACTED_DIR/"* "$INSTALL_DIR/"

# Make the binary executable
chmod +x "$INSTALL_DIR/bin/git-show-link.js"

# 5. Handle Symlink
# Check if we can write to /usr/local/bin
if [ -w "/usr/local/bin" ]; then
  TARGET_BIN_DIR="/usr/local/bin"
  USE_SUDO=false
elif [ -d "/usr/local/bin" ] && [ "$EUID" -ne 0 ] && command -v sudo >/dev/null 2>&1; then
  # Try checking if we can write to /usr/local/bin using sudo
  echo -e "${YELLOW}Notice:${NC} Checking write permission for /usr/local/bin. It may ask for sudo password."
  if sudo test -w "/usr/local/bin"; then
    TARGET_BIN_DIR="/usr/local/bin"
    USE_SUDO=true
  else
    TARGET_BIN_DIR="$HOME/.local/bin"
  fi
else
  TARGET_BIN_DIR="$HOME/.local/bin"
  USE_SUDO=false
fi

mkdir -p "$TARGET_BIN_DIR"

echo -e "${BLUE}==>${NC} Creating symlink in $TARGET_BIN_DIR/git-show-link..."
if [ "$USE_SUDO" = true ]; then
  sudo rm -f "$TARGET_BIN_DIR/git-show-link"
  sudo ln -sf "$INSTALL_DIR/bin/git-show-link.js" "$TARGET_BIN_DIR/git-show-link"
else
  rm -f "$TARGET_BIN_DIR/git-show-link"
  ln -sf "$INSTALL_DIR/bin/git-show-link.js" "$TARGET_BIN_DIR/git-show-link"
fi

echo -e "${GREEN}Success:${NC} git-show-link has been installed successfully!"

# 6. Check PATH
if ! echo "$PATH" | grep -q "$TARGET_BIN_DIR"; then
  echo -e "\n${YELLOW}Warning:${NC} $TARGET_BIN_DIR is not in your PATH."
  echo -e "To run 'git-show-link' directly, add it to your shell configuration (e.g., ~/.bashrc or ~/.zshrc):"
  echo -e "  export PATH=\"\$PATH:$TARGET_BIN_DIR\""
fi

echo -e "\nTry running: ${BLUE}git-show-link -h${NC} to get started!"
