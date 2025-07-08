set -e

host="${DB_HOST:-db}"
port="${DB_PORT:-5432}"
user="${POSTGRES_USER}"
db="${POSTGRES_DB}"

echo "Ожидаем Postgres на $host:$port..."
until pg_isready -h "$host" -p "$port" -U "$user" -d "$db" >/dev/null 2>&1; do
  echo "  ещё не готов..."
  sleep 1
done

echo "Postgres запущен, продолжаем."
exec "$@"
