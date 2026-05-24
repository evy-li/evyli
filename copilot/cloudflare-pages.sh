#!/usr/bin/env bash
# Cloudflare Pages build script for evy.li
# Copies all site files to _site/, excluding the copilot/ directory.
# Set this as the build command in Cloudflare Pages dashboard.

set -euo pipefail

mkdir -p _site

# Copy all files and dotfiles (except . and ..) into _site/
for item in * .[^.]* ..?*; do
    [ -e "$item" ] || continue
    [ "$item" = "_site" ] && continue
    cp -r "$item" _site/
done

# Remove copilot/ from the build output
rm -rf _site/copilot

echo "✅ Site built in _site/ (copilot/ excluded)"
ls -la _site/
