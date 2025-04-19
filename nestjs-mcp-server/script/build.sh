#!/bin/sh
set -e

ROOT_DIR=$(pwd)

source $ROOT_DIR/script/load-env.sh

if [ $NODE_ENV == 'local' ]; then
    nest build
fi

if [ $NODE_ENV == 'dev' ]; then
    nest build
fi

if [ $NODE_ENV == 'prod' ]; then
    nest build
fi
