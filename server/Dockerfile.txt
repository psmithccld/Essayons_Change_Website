# Simple server image
FROM node:20-alpine AS builder
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm install
COPY server/src ./src
RUN npm run build --prefix server

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY package.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/index.js"]