# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Layer caching: Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including dev) cleanly
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the TypeScript code into the dist/ folder
RUN pnpm build

# Clean up the kitchen: Remove all devDependencies so only prod deps remain
RUN pnpm prune --prod

# ── Stage 2: Runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV VERSION=0.1.0

# Copy only the compiled code and production dependencies from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to the secure, non-root 'node' user built into Alpine
USER node

# Tell Docker what port this container will listen on
EXPOSE 3000

# Docker Healthcheck (using wget because Alpine doesn't have curl)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the app!
CMD ["node", "dist/index.js"]