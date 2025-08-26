-- AlterTable
ALTER TABLE "public"."apikey" ADD COLUMN     "lastRefillAt" TIMESTAMP(3),
ADD COLUMN     "lastRequest" TIMESTAMP(3),
ADD COLUMN     "rateLimitEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rateLimitMax" INTEGER,
ADD COLUMN     "rateLimitTimeWindow" INTEGER,
ADD COLUMN     "refillAmount" INTEGER,
ADD COLUMN     "refillInterval" INTEGER,
ADD COLUMN     "remaining" INTEGER,
ADD COLUMN     "requestCount" INTEGER NOT NULL DEFAULT 0;
