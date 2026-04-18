# Stage 1: install deps and bundle
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src ./src
RUN npm run build

# Stage 2: lean runtime — only the bundle + native addon node_modules
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy the bundle
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only the externals that can't be bundled (bcrypt native addon, mongoose)
RUN npm ci --omit=dev

EXPOSE 8081
CMD ["node", "dist/index.js"]
