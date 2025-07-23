#!/bin/sh
set -e

echo "🔧 Replacing NEXT_PUBLIC_ placeholders in static JS files..."

env | grep '^NEXT_PUBLIC_' | while IFS='=' read -r key value; do
  if [ -n "$value" ]; then
    if [ "$key" = "NEXT_PUBLIC_SUPABASE_URL" ]; then
      placeholder="http://placeholder.local"
    else
      placeholder="$key"
    fi

    echo "🔍 Searching for placeholder '$placeholder' to replace with value from $key"

    # Count matches using find + grep (compatible with Alpine)
    match_count=$(find .next/static .next/server -type f -name "*.js" -exec grep -F "$placeholder" {} + | wc -l)

    if [ "$match_count" -gt 0 ]; then
      echo "✅ Found $match_count match(es) — replacing '$placeholder' with '$value'"
      find .next/static .next/server -type f -name "*.js" -exec sed -i "s|$placeholder|$value|g" {} +
    else
      echo "⚠️  No matches found for '$placeholder' in static files — nothing replaced for $key"
    fi
  else
    echo "⏭ Skipping $key — no value set"
  fi
done

echo "🚀 Starting app with command: $@"
exec "$@"
