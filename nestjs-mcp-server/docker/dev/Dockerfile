FROM node:20-alpine

# Install deps
RUN apk add --no-cache bash
RUN apk add --no-cache openssl
RUN apk add --no-cache yarn

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN yarn cache clean
RUN yarn install --immutable
RUN yarn add @swc/core @swc/cli -D

# Copy the whole app
COPY . .

# Generate Prisma client
RUN yarn run prisma generate

# Set node env
ENV NODE_ENV=dev

# Build the application for production
RUN yarn run build:dev

# Copy entrypoint script
COPY ./docker/dev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port the app runs on
EXPOSE 3006

# Entrypoint script to run the application
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]