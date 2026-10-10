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

`npm run setup` creates the Prisma `.env` file from `.env.local` or `.env.example`, generates Prisma Client, and applies the SQLite migration.

## SMTP mailbox checks

SMTP mailbox verification is enabled only when all of these are configured in `.env.local`:

```dotenv
ENABLE_SMTP_CHECKS=true
SMTP_HELO_HOSTNAME=your-owned-hostname.example
SMTP_MAIL_FROM=verification@your-owned-domain.example
```

For each candidate, the local engine resolves MX, connects to the preferred MX host, sends `EHLO`, `MAIL FROM`, `RCPT TO`, then sends `RSET` and `QUIT`. It never sends `DATA`, message content, attachments, or an actual email.

After an accepted candidate, it performs one random `random-<uuid>@domain` catch-all probe per domain:

- Candidate accepted + random rejected → `Likely Deliverable`
- Candidate accepted + random accepted → `Catch-All`
- Temporary, greylisting, policy block, timeout, or ambiguous response → `Unknown`
- Explicit `550 user unknown` style response → `Rejected`

When SMTP is disabled, the final status is not “Mail Enabled Domain”. The UI shows:

> Mailbox verification disabled

MX availability remains visible in the MX column as supporting domain evidence only.

## Validation commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

All submitted data is persisted only in local SQLite. No analytics, tracking, or third-party verification APIs are used.
