#!/bin/sh
set -e

ROOT_DIR=$(pwd)

source $ROOT_DIR/script/load-env.sh

if [ $NODE_ENV == 'local' ]; then
    nest start --watch
fi

if [ $NODE_ENV == 'dev' ]; then
    node dist/main
fi

if [ $NODE_ENV == 'prod' ]; then
    node dist/main
fi
