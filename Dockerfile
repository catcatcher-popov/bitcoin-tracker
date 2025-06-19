# --- Stage 1: build ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Устанавливаем зависимости
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: runtime ---
FROM node:18-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
# Устанавливаем только продакшен-зависимости
RUN npm install --production
COPY --from=builder /app/.output .
COPY --from=builder /app/node_modules/.prisma ./.prisma
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh
EXPOSE 3000
CMD ["/app/wait-for-db.sh", "npm", "run", "start"]