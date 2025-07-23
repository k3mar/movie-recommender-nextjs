#!/bin/sh
set -e

env | grep '^NEXT_PUBLIC_' | while IFS='=' read -r key value; do
  if [ -n "$value" ]; then
    echo " Replacing $key → $value"
    find .next/static -type f -name "*.js" -exec sed -i "s|$key|$value|g" {} +
  else
    echo "Skipping $key — no value set"
  fi
done

echo "Starting app with command: $@"
exec "$@"
