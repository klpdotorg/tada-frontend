#!/bin/bash

WORK_DIR=/home/ubuntu/tada-frontend
cd $WORK_DIR
echo "Running npm install"
npm install || exit 1
echo "Copying config.json"
cp -v /home/ubuntu/config.json /home/ubuntu/tada-frontend/settings/config.json || exit 1
echo "Running npm run deploy"
npm run deploy || exit 1
echo "Deployment complete"
