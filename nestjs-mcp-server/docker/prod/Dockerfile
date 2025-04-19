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
RUN npm cache clean --force
RUN npm ci --legacy-peer-deps
RUN npm i -D @swc/core @swc/cli --legacy-peer-deps

# Copy the whole app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Set node env
ENV NODE_ENV=prod

# Build the application for production
RUN npm run build:prod

# Copy entrypoint script
COPY ./docker/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Entrypoint script to run the application
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]