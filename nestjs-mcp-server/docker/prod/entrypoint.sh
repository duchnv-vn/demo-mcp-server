#!/bin/sh

ROOT_DIR=$(pwd)

# Load environment variables from .env.prod file
echo "Loading environment variables from .env.prod..."
source $ROOT_DIR/script/load-env.sh

# Initialize database schema
echo "Initializing database schema..."
if yarn run prisma:mig:prod; then
    echo "Generating Prisma client..."
    yarn run prisma:gen:prod
else
    echo "PostgreSQL server is available and database is created/exists!"
fi

# Start the application
echo "Starting the application..."
yarn run start:prod
