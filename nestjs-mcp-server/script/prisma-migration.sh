#!/bin/sh
set -e

ROOT_DIR=$(pwd)

source $ROOT_DIR/script/load-env.sh

if [ $NODE_ENV == 'local' ]; then
    yarn run prisma migrate dev
fi

if [ $NODE_ENV == 'prod' ]; then
    yarn run prisma migrate deploy
fi
