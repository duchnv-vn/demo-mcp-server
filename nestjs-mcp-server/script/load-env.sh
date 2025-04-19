#!/bin/sh
set -e

ROOT_DIR=$(pwd)

ENV_FILE_NAME=".env.$NODE_ENV"

set -a
[ -f $ROOT_DIR/$ENV_FILE_NAME ] && . $ROOT_DIR/$ENV_FILE_NAME
set +a

echo "Load environment variables from $ENV_FILE_NAME successfully."
