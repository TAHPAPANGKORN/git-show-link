#!/usr/bin/env bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==>${NC} Uninstalling git-show-link..."

INSTALL_DIR="$HOME/.git-show-link"

# Remove source files
if [ -d "$INSTALL_DIR" ]; then
  echo -e "${BLUE}==>${NC} Removing $INSTALL_DIR..."
  rm -rf "$INSTALL_DIR"
fi

# Remove symlinks
removed_link=false

for BIN_DIR in "/usr/local/bin" "$HOME/.local/bin"; do
  LINK_PATH="$BIN_DIR/git-show-link"
  if [ -L "$LINK_PATH" ] || [ -f "$LINK_PATH" ]; then
    echo -e "${BLUE}==>${NC} Removing symlink $LINK_PATH..."
    if [ -w "$BIN_DIR" ]; then
      rm -f "$LINK_PATH"
      removed_link=true
    elif command -v sudo >/dev/null 2>&1; then
      sudo rm -f "$LINK_PATH"
      removed_link=true
    else
      echo -e "${RED}Warning:${NC} Could not remove $LINK_PATH due to permissions. Please remove it manually."
    fi
  fi
done

if [ "$removed_link" = true ] || [ -d "$INSTALL_DIR" ]; then
  echo -e "${GREEN}Success:${NC} git-show-link has been uninstalled successfully."
else
  echo -e "${YELLOW}Notice:${NC} git-show-link was not found on your system."
fi
