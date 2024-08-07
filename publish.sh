#!/bin/bash

# JS must be installed locally `brew install jq`
# Extract the version number from package.json
VERSION=$(jq -r .version package.json)

# Check if the VERSION is not empty
if [ -z "$VERSION" ]; then
  echo "Version not found in package.json"
  exit 1
fi


git add .
git commit -m "Release version $VERSION"
git tag -a "v$VERSION" -m "Release version $VERSION"

#git push origin "v$VERSION"
