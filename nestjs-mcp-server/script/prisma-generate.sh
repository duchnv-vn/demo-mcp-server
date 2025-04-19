#!/bin/sh
set -e

ROOT_DIR=$(pwd)

source $ROOT_DIR/script/load-env.sh

yarn run prisma generate