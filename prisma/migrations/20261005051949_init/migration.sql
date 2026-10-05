-- CreateTable
CREATE TABLE "VerificationJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rawInput" TEXT NOT NULL,
    "inputType" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "nickname" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "smtpEnabled" BOOLEAN NOT NULL DEFAULT false,
    "totalInput" INTEGER NOT NULL DEFAULT 0,
    "totalUnique" INTEGER NOT NULL DEFAULT 0,
    "processedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationCandidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "originalInput" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "localPart" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "evidenceStrength" TEXT,
    "rankingScore" REAL,
    "syntaxValid" BOOLEAN NOT NULL DEFAULT false,
    "mxFound" BOOLEAN NOT NULL DEFAULT false,
    "smtpAttempted" BOOLEAN NOT NULL DEFAULT false,
    "smtpAccepted" BOOLEAN,
    "smtpRejected" BOOLEAN,
    "smtpResponseCode" INTEGER,
    "smtpResponseCategory" TEXT,
    "catchAll" BOOLEAN,
    "disposable" BOOLEAN NOT NULL DEFAULT false,
    "roleAddress" BOOLEAN NOT NULL DEFAULT false,
    "patternType" TEXT,
    "patternScore" REAL,
    "reason" TEXT,
    "checkedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VerificationCandidate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "VerificationJob" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DomainCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "domain" TEXT NOT NULL,
    "mxStatus" TEXT NOT NULL,
    "mxRecordsJson" TEXT,
    "catchAll" BOOLEAN,
    "circuitState" TEXT,
    "cooldownUntil" DATETIME,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "VerificationCandidate_jobId_idx" ON "VerificationCandidate"("jobId");

-- CreateIndex
CREATE INDEX "VerificationCandidate_domain_idx" ON "VerificationCandidate"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "DomainCache_domain_key" ON "DomainCache"("domain");
