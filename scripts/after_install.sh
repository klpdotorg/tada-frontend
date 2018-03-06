#!/bin/bash

WORK_DIR=/home/ubuntu/tada-frontend
cd $WORK_DIR
npm install || exit 1
cp -v /home/ubuntu/config.json /home/ubuntu/tada-frontend/settings/config.json || exit 1
npm run deploy || exit 1
