# NNEP-monorepo

> **Enterprise Fullstack Monorepo with Next.js 16 + NestJS 11 Fastify + Chrome Extension MV3 + PostgreSQL 17**

## Architecture Overview

```text
NNEP-monorepo/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ api/          # NestJS 11 + Fastify + Prisma 7 + PostgreSQL 17 + Redis + MinIO + Swagger
â”‚   â”œâ”€â”€ client/       # User Portal (Next.js 16 + React 19 + Chakra UI v3 + TanStack Query)
â”‚   â”œâ”€â”€ admin/        # Admin Portal (Next.js 16 + React 19 + Chakra UI v3)
â”‚   â””â”€â”€ extension/    # Chrome Extension MV3 (TypeScript + Vite + Obfuscation + Token Bridge)
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ contracts/    # Single source of truth for DTOs & Zod schemas across Web, API, Extension
â”‚   â”œâ”€â”€ eslint-config/# Shared ESLint rules
â”‚   â””â”€â”€ typescript-config/
â””â”€â”€ infrastructure/   # Docker Compose for PostgreSQL 17, Redis, MinIO
```

## Quick Start

```bash
# 1. Start Infrastructure
pnpm infra:up

# 2. Install dependencies & Generate Prisma
pnpm install
pnpm db:generate

# 3. Start development servers
pnpm dev
```
