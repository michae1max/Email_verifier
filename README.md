# MailVerify Local

A localhost-only email candidate evidence tool built with Next.js, TypeScript, Prisma, and SQLite.

## Run locally

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000.

## Validation commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

All submitted data is persisted only in local SQLite. SMTP checks are disabled by default and are not implemented as a bypass or harvesting mechanism. MX evidence indicates domain-level mail capability and never confirms an individual mailbox.
