#!/bin/bash
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

if ! [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    VERSION=$(npm version | grep @ | sed -re "s/'.*': '(.*)',?/\1/g")
    BRANCH_NAME=$(echo $TRAVIS_PULL_REQUEST_BRANCH | sed "s/[/]/_/g")
    TIMESTAMP=$(date +"%s")
    npm version $VERSION-$BRANCH_NAME-$TIMESTAMP
    npm publish --tag pull-request
fi