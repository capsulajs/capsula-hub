#!/bin/bash
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

if ! [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    VERSION=$(npm version | grep @ | sed -re "s/\{ '.*': '(.*)',?/\1/g")
    BRANCH_NAME=$(echo $TRAVIS_PULL_REQUEST_BRANCH | sed "s/[/]/_/g")
    TIMESTAMP=$(date +"%s")
    echo $VERSION-$BRANCH_NAME-$TIMESTAMP
    echo "--------------------------------------------"
    echo "|       Deploying on npm registry          |"
    echo "--------------------------------------------"
    npm version $VERSION-$BRANCH_NAME-$TIMESTAMP
    [[ "$?" == 0 ]] && echo "npm version: Succeed" || (echo "npm version: Failed" && exit 1)
    npm publish --tag pull-request
    [[ "$?" == 0 ]] && echo "npm publish: Succeed" || (echo "npm publish: Failed" && exit 2)
fi
