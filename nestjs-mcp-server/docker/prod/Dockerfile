FROM node:20-alpine

# Install deps
RUN apk add --no-cache bash
RUN apk add --no-cache openssl
RUN apk add --no-cache yarn

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY yarn.lock ./

# Install only production dependencies
RUN yarn cache clean
RUN yarn install --immutable
RUN yarn add @swc/core @swc/cli -D

# Copy the whole app
COPY . .
RUN chmod +x /script/load-env.sh
RUN chmod +x /script/start.sh
RUN chmod +x /script/prisma-generate.sh
RUN chmod +x /script/prisma-migration.sh

# Generate Prisma client
RUN yarn run prisma generate

# Set node env
ENV NODE_ENV=prod

# Build the application for production
RUN yarn run build:prod

# Copy entrypoint script
COPY ./docker/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Entrypoint script to run the application
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]