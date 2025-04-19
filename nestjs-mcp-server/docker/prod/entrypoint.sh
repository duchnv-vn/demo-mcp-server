#!/bin/sh

ROOT_DIR=$(pwd)

# Load environment variables from .env.prod file
echo "Loading environment variables from .env.prod..."
[ -f /app/script/load-env.sh ] && source /app/script/load-env.sh

# Explicitly set DATABASE_URL
export DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}"

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
