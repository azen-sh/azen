/*
  Warnings:

  - You are about to drop the column `revoked` on the `ApiKey` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."ApiKey_key_key";

-- AlterTable
ALTER TABLE "public"."ApiKey" DROP COLUMN "revoked",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "permissions" TEXT,
ADD COLUMN     "prefix" TEXT,
ADD COLUMN     "start" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
