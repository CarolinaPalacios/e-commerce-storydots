# Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpx prisma db push && pnpm build && pnpm prune --production

# Production
FROM node:20-alpine AS production
WORKDIR /usr/src/app


COPY  --from=build usr/src/app/dist ./dist
COPY  --from=build usr/src/app/node_modules ./node_modules

EXPOSE 3000/tcp
CMD [ "node", "dist/main.js" ]