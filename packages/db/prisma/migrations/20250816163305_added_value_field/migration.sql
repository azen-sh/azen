/*
  Warnings:

  - You are about to drop the column `token` on the `Verification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,value]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Verification_identifier_token_key";

-- DropIndex
DROP INDEX "public"."Verification_token_key";

-- AlterTable
ALTER TABLE "public"."Verification" DROP COLUMN "token",
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Verification_value_key" ON "public"."Verification"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_identifier_value_key" ON "public"."Verification"("identifier", "value");
