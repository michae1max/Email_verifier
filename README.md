# MailVerify Local

A localhost-only email candidate evidence tool built with Next.js, TypeScript, Prisma, and SQLite.

## Run locally

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev --name init
npm run dev:clean
```

Open http://localhost:3000.

For the most stable experience after code changes, use the production server:

```bash
npm run start:stable
```

The previous “local server returned an error page” message happened when Next.js development mode was recompiling or when a stale `.next` cache was left behind after switching between `next dev` and `next build`. The browser now retries transient 500/502/503/504 and HTML responses, all API routes return JSON errors, and `npm run dev:clean` removes the stale cache before starting.

## SMTP mailbox checks

SMTP checks are **disabled by default**. To enable the educational mailbox-level probe, set all of these in `.env.local`:

```dotenv
ENABLE_SMTP_CHECKS=true
SMTP_HELO_HOSTNAME=your-owned-hostname.example
SMTP_MAIL_FROM=verification@your-owned-domain.example
```

The verifier only uses `EHLO`, `MAIL FROM`, `RCPT TO`, `RSET`, and `QUIT`. It never sends `DATA`, message content, attachments, or email. Checks run sequentially with one random catch-all probe per domain and classify temporary, greylisting, policy, timeout, and blocking responses as unknown/inconclusive rather than invalid.

Without SMTP configuration, results correctly say: “MX records found but mailbox not tested.”

## Validation commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

All submitted data is persisted only in local SQLite. No analytics, tracking, or third-party verification APIs are used. SMTP acceptance is evidence, not certainty; a catch-all server cannot confirm an individual mailbox.
