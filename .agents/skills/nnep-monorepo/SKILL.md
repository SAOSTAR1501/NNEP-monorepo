---
name: nnep-monorepo
description: Universal Enterprise Monorepo Architecture Skill for SaaS with Browser Extension Automation. NNEP = Next.js 16 (App Router + Chakra UI v3) + NestJS 11 (Fastify + Swagger) + Chrome Extension MV3 (Vite + TypeScript + Obfuscation) + PostgreSQL 17 (Prisma 7 + Redis + MinIO).
---

# NNEP Monorepo Architecture & Scaffolding Skill

This skill defines the universal enterprise architectural standard for fullstack SaaS platforms that pair web portals with browser extensions for social media automation, DOM bridging, and desktop CRM workflows.

**NNEP Formula**:
- **N**: Next.js 16 (App Router + React 19 + Chakra UI v3 / Untitled UI Tokens + TanStack Query)
- **N**: NestJS 11 (Fastify Adapter for high-throughput REST API + OpenAPI Swagger + Argon2 JWT auth)
- **E**: Chrome Extension Manifest V3 (MV3 Vite multi-bundle, Background Service Worker lifecycle, Keep-Alive, Content Script main-world bridging, JavaScript Obfuscation)
- **P**: PostgreSQL 17 (Prisma 7 + pg driver adapter) + Redis 7 caching + MinIO S3 object storage

---

## 1. Directory & Topology Standard

```text
nnep-monorepo/
├── apps/
│   ├── api/                   # NestJS 11 + Fastify + Prisma 7 + PostgreSQL 17 (Port 3000)
│   ├── client/                # Next.js 16 App Router (User Portal, Port 3001)
│   ├── admin/                 # Next.js 16 App Router (Admin Portal, Port 3002)
│   └── extension/             # Chrome Extension MV3 (TypeScript + Vite + Obfuscator)
├── packages/
│   ├── contracts/             # Shared Zod schemas, DTOs & TypeScript types (Single source of truth)
│   ├── eslint-config/         # Shared ESLint configuration
│   └── typescript-config/     # Shared tsconfig bases
├── infrastructure/            # Docker compose (Postgres 17, Redis, MinIO)
└── docs/                      # SRS documents & Architecture Decision Records (ADRs)
```

---

## 2. Core Architectural Pillars

### A. Shared Type Contracts (`@nnep/contracts`)
Never redefine API request/response payloads in individual apps. All interfaces, enums, and validation schemas live in `packages/contracts`:
- Validate with **Zod** (`z.infer<typeof Schema>`).
- Exported as TypeScript definitions consumed by **API (Controllers)**, **Web Client (React Query)**, **Admin**, and **Chrome Extension (Bridge/Background)**.

### B. High-Performance API with Fastify Engine
- Bootstrap NestJS with `FastifyAdapter` instead of Express for microsecond response times and minimal memory footprint under concurrent extension polling.
- Swagger OpenAPI generated dynamically at `/docs`.
- Authentication via JWT access token (15m) + rotating Argon2 hashed refresh token stored in HTTP-only cookies or secure headers.

### C. Chrome Extension Manifest V3 (MV3) Standards
1. **Service Worker Non-persistence**: Never rely on in-memory global state in background scripts. MV3 workers terminate after 30 seconds of inactivity. Always persist state in `chrome.storage.local` or synchronize with backend via Redis/Postgres.
2. **Keep-Alive Mechanics**: Use `chrome.alarms` (e.g. 1-minute heartbeat) or active port connections during batch automation tasks.
3. **Bridge & Main World Scripting**: Use Content Scripts with `world: "MAIN"` for deep DOM extraction or page runtime inspection, coupled with bridge scripts running in `ISOLATED` world for secure messaging.
4. **Production Build Pipeline**: Use Vite multi-config (`vite.background.config.ts`, `vite.bridge.config.ts`), terser minification, and JavaScript obfuscation for IP protection before packaging `.zip`.

### D. Frontend UI Standards (Untitled UI + Chakra UI v3)
- Strictly adhere to `DESIGN.md`: Never use unstyled HTML tags (`<button>`, `<input>`) directly. Always wrap in `@/shared/ui` primitives (`VSButton`, `VSInput`, `VSDataTable`, `VSModal`).
- Consistent color tokens:
  - **Brand Navy**: `#001e8c`
  - **Electric Cyan**: `#00aae7`
  - **Tint Background**: `#eef7ff`
  - **Warm Attention**: `#f89714`
- Zero developer/database jargon on customer-facing screens.

---

## 3. Extension-to-Web Handshake Protocol

When launching actions from the Web Portal into the Chrome Extension:
1. **Launch URL Fragment**: Web app triggers extension via URL fragments (e.g., `#nnep_launch=<TOKEN>`) or `window.postMessage` to prevent token leakage in server logs.
2. **Session Pairing**: Extension verifies token against `/api/auth/extension/pair` and binds `profile_id` + `extension_id` to the user's session in PostgreSQL.
3. **Job Queue Execution**: Long-running social tasks (e.g., bulk messaging, tag scanning) are dispatched via FIFO queue and acknowledged back to API with status updates.

---

## 4. Scaffolding & Verification Workflow

When adding features or scaffolding new modules in an NNEP monorepo:
1. **Define Schema & Contract**: Add Prisma model in `apps/api/prisma/schema.prisma` -> run `pnpm db:generate`. Add Zod contract in `packages/contracts/src/` -> run `pnpm --filter @nnep/contracts build`.
2. **Implement API Endpoint**: Build NestJS controller/service with Swagger `@ApiProperty()` tags.
3. **Implement Frontend Screen**: Use `useQuery` / `useMutation` from `@tanstack/react-query` consuming `@nnep/contracts`.
4. **Implement Extension Handler**: Add message listener in `apps/extension/src/background/` or content bridge.
5. **Quality Gate**: Run `pnpm lint`, `pnpm typecheck`, `pnpm build` across the monorepo via Turborepo before committing.
