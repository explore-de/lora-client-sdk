#!/bin/bash

# JS must be installed locally `brew install jq`
# Extract the version number from package.json
VERSION=$(jq -r .version package.json)

# Require a tag description argument
if [ $# -lt 1 ]; then
  echo "Usage: $0 \"Tag description\""
  exit 1
fi

TAG_DESCRIPTION="$*"

# Check if the VERSION is not empty
if [ -z "$VERSION" ]; then
  echo "Version not found in package.json"
  exit 1
fi


git add .
git commit -m "Release version $VERSION"
git tag -a "v$VERSION" -m "$TAG_DESCRIPTION"

git push --follow-tags
