FROM node:18-bullseye-slim AS builder
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

RUN npm rebuild --build-from-source=oxc-parser

COPY . .
RUN npx prisma generate

RUN npm run build

FROM node:18-bullseye-slim
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      postgresql-client ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

RUN chmod +x ./wait-for-db.sh

EXPOSE 3000
CMD ./wait-for-db.sh && \
    npx prisma db push --accept-data-loss && \
    npm run start