/*
  Warnings:

  - You are about to drop the `HealthCheck` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_alcode_fkey";

-- DropTable
DROP TABLE "HealthCheck";
