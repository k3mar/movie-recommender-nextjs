# ========================
# Build stage
# ========================
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies and build
COPY . .
COPY .env.template .env.local
RUN npm run build

# ========================
# Runtime stage
# ========================
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built output only
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Add runtime env replacement script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the default Next.js port
EXPOSE 3000

# Use entrypoint to inject envs at runtime
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
