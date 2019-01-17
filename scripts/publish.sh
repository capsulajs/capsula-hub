#!/bin/bash
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

if ! [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    VERSION=$(npm version | grep @ | sed -re "s/'.*': '(.*)',?/\1/g")
    BRANCH_NAME=$(echo $TRAVIS_PULL_REQUEST_BRANCH | sed "s/[/]/_/g")
    TIMESTAMP=$(date +"%s")
    echo "--------------------------------------------"
    echo "|       Deploying on npm registry          |"
    echo "--------------------------------------------"
    npm version $VERSION-$BRANCH_NAME-$TIMESTAMP
    echo "npm version: " && [[ "$?" == 0 ]] && echo "Succeed" || echo "Failed"
    npm publish --tag pull-request
    echo "npm publish: " && [[ "$?" == 0 ]] && echo "Succeed" || echo "Failed"
fi
