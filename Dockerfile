# Build stage
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build args
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL
ENV NUXT_PUBLIC_API_BASE_URL=$API_BASE_URL

RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build-stage /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
