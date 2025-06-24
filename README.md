# Bitcoin Tracker

Приложение для отслеживания и визуализации цен на Bitcoin с интерактивным графиком.

---

## Технологии

- **Nuxt 3 (Vue 3 + TypeScript)**
- **Prisma** + **PostgreSQL**
- **Chart.js** (через vue-chartjs)
- **Docker Compose**
- **ESLint** + **Prettier** (стиль кода)

---

## Быстрый старт

### 🚀 С Docker

1. Склонировать репозиторий и перейти в папку:
   ```bash
   git clone https://github.com/natalieeatscats/bitcoin-tracker.git
   cd bitcoin-tracker


2. Запустить контейнеры:

   ```bash
   docker-compose up --build -d
   ```
3. Перейти в браузере на [http://localhost:3000](http://localhost:3000).

### 🛠 Локально (без Docker)

1. Установить зависимости:

   ```bash
   npm install
   ```
2. Применить миграции:

   ```bash
   npx prisma migrate dev
   ```
3. Запустить dev-сервер:

   ```bash
   npm run dev
   ```
4. Открыть [http://localhost:3000](http://localhost:3000).

---

## Использование

* **Период**: кнопки «День», «Неделя», «Месяц», «Год» и «Указать...» (выбор custom-диапазона).
* **График**: отображает цену BTC за выбранный интервал.
* **Обновление**: сначала берутся данные из локальной БД, затем по флагу `refresh` докачиваются с биржи и перерисовываются.

---

## Структура проекта

```
/components      — Vue-компоненты UI  
/composables     — логика fetch + state  
/constants       — константы  
/utils           — утилиты (parsePeriod, selectInterval, formatDate)  
/pages           — страницы (файловая маршрутизация)  
/prisma          — схема и миграции БД  
/server  
  /api           — HTTP-handler’ы (Nuxt Nitro)  
  /domain        — сущности + use-cases  
  /repositories  — CRUD-репозитории    
  /services      — интеграция с Binance API  
```

---

## Принципы кода

* **SOLID**: каждый модуль – одна ответственность.
* **DRY**: общие константы и утилиты вынесены единожды.
* **Типизация**: строгий `strict` TypeScript по всему стеку.
* **Расширяемость**: при необходимости код можно без проблем расширить, добавив, например, отслеживание других криптовалют или информацию по торгам.
* **Конфигурация**: `.env` для всех внешних параметров, без «магических» строк в коде.

---
