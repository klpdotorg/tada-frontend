#!/bin/bash

WORK_DIR=/home/ubuntu/tada-frontend
mkdir -p $WORK_DIR
chown -vc ubuntu:www-data $WORK_DIR || exit 1
