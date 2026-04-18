# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Vite bakes env vars into the bundle at build time — declare them as ARGs
ARG VITE_TMDB_API_BASE_URL
ARG VITE_TMDB_IMAGE_BASE_URL
ARG VITE_TMDB_API_KEY
ARG VITE_SV_API_BASE_URL
ARG VITE_CLIENT_URL

RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
