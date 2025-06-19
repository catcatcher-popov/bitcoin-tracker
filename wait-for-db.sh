#!/usr/bin/env sh
set -e
host="db"; port=5432
echo "Ожидаем Postgres на $host:$port..."
while ! nc -z $host $port; do
  echo "  ещё не готов..."
  sleep 1
done
echo "Postgres готов!"
exec "$@"
