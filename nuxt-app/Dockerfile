# ┌── Stage 1: Builder ─────────────────────────────────────────────────────────
FROM node:18-bullseye-slim AS builder
WORKDIR /app

# 1) Системные зависимости для нативных аддонов (oxc-parser, sharp и др.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

# 2) Копируем package-манифесты и устанавливаем точные версии
COPY package.json package-lock.json ./
RUN npm install

# 3) Перестраиваем oxc-parser из исходников, чтобы появились .node-биндинги
RUN npm rebuild --build-from-source=oxc-parser

# 4) Копируем весь исходный код и генерируем Prisma Client
COPY . .
RUN npx prisma generate

# 5) Собираем Nuxt (никаких проблем с oxc-parser теперь не будет)
RUN npm run build

# └── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM node:18-bullseye-slim
WORKDIR /app

# 6) Устанавливаем клиент для Postgres
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      postgresql-client ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 7) Копируем всё из билдера: код, node_modules, .output, prisma и т.д.
COPY --from=builder /app /app

# 8) Скрипт ожидания БД
RUN chmod +x ./wait-for-db.sh

EXPOSE 3000
# 9) Стартуем: ждём БД, публикуем схему и стартуем прод-сервер
CMD ./wait-for-db.sh && \
    npx prisma db push --accept-data-loss && \
    npm run start