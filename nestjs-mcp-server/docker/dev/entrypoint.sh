#!/bin/sh

ROOT_DIR=$(pwd)

# Load environment variables from .env.dev file
echo "Loading environment variables from .env.dev..."
[ -f /app/script/load-env.sh ] && source /app/script/load-env.sh

# Initialize database schema
echo "Initializing database schema..."
if yarn run prisma:mig:dev; then
    echo "Generating Prisma client..."
    yarn run prisma:gen:dev
else
    echo "PostgreSQL server is available and database is created/exists!"
fi

# Start the application
echo "Starting the application..."
yarn run start:dev
