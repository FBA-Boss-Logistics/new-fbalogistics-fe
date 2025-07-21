#!/bin/bash

APP_NAME="testing-freightshark"
REPO_DIR="/home/hakim/testing-freightshark"
RELEASES_DIR="/var/www/releases-testing-freightshark"
DEPLOY_SYMLINK="/var/www/testing-freightshark"
TIMESTAMP=$(date +%s)
NEW_RELEASE="$RELEASES_DIR/$TIMESTAMP"

# go to project folder
cd "$REPO_DIR" || { echo "❌ Failed to go to project folder"; exit 1; }

# update code
git pull origin develop-shark-fe || { echo "❌ Failed to git pull"; exit 1; }

# Install dependencies dan build
npm install || { echo "❌ Failed to npm install"; exit 1; }
npm run build || { echo "❌ Failed to build"; exit 1; }


if [ ! -d "dist" ]; then
  echo "❌ Folder dist not found!"
  exit 1
fi

# create new release folder
mkdir -p "$NEW_RELEASE" || { echo "❌ Failed to create new release folder"; exit 1; }

# copy build to new release folder
cp -r dist/* "$NEW_RELEASE" || { echo "❌ Failed to copy build"; exit 1; }

# update symlink frontend to new release folder
ln -sfn "$NEW_RELEASE" "$DEPLOY_SYMLINK" || { echo "❌ Failed to update symlink"; exit 1; }

# delete old release folder, keep 3 latest release
ls -1dt "$RELEASES_DIR"/* | tail -n +4 | xargs rm -rf

echo "✅ Deploy success to $NEW_RELEASE"
