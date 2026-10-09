# MailVerify Local

A localhost-only email candidate evidence tool built with Next.js, TypeScript, Prisma, and SQLite.

## Run from VS Code

Open the project folder in VS Code, then open **Terminal → New Terminal** and run:

```bash
npm install
npm run setup
npm run dev:clean
```

Open http://localhost:3000.

`npm run setup` is important: it creates the Prisma `.env` file from `.env.local` or `.env.example`, generates Prisma Client, and applies the SQLite migration. This prevents the common “unable to start verification” error caused by Prisma not seeing `.env.local`.

For the most stable experience after code changes, use:

```bash
npm run start:stable
```

The browser retries transient Next.js error pages, and the API now reports actionable database/setup errors instead of hiding them behind a generic message.

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
