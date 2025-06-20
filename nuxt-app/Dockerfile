# Stage 1: build & generate
FROM node:18-bullseye-slim AS builder
WORKDIR /app

# 1) Копируем манифесты и устанавливаем все зависимости
COPY package.json package-lock.json ./
RUN npm ci

# 2) Копируем весь код (включая prisma/ и wait-for-db.sh)
COPY . .

# 3) Генерируем Prisma Client и собираем Nuxt
RUN npx prisma generate
RUN npm run build

# Stage 2: runtime
FROM node:18-bullseye-slim
WORKDIR /app

# 4) Устанавливаем psql/pg_isready для скрипта ожидания
RUN apt-get update && \
    apt-get install -y --no-install-recommends postgresql-client ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 5) Копируем из билдера все артефакты (node_modules, .output, prisma, скрипты)
COPY --from=builder /app /app

# 6) Делаем скрипт ожидания БД исполняемым
RUN chmod +x ./wait-for-db.sh

# 7) Открываем порт для Nuxt
EXPOSE 3000

# 8) Запуск: ждём БД → заливаем схему → запускаем Nuxt через npm run start
CMD ./wait-for-db.sh && \
    npx prisma db push --accept-data-loss && \
    npm run start
