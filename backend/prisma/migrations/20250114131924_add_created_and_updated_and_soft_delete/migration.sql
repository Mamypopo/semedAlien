/*
  Warnings:

  - The `createdBy` column on the `ApiRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedBy` column on the `ApiRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdBy` column on the `ForeignWorkers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedBy` column on the `ForeignWorkers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdBy` column on the `HealthChecks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedBy` column on the `HealthChecks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApiRequests" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER,
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "ForeignWorkers" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER,
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "HealthChecks" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER,
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedBy" INTEGER;

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "ForeignWorkers" ADD CONSTRAINT "ForeignWorkers_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForeignWorkers" ADD CONSTRAINT "ForeignWorkers_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthChecks" ADD CONSTRAINT "HealthChecks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthChecks" ADD CONSTRAINT "HealthChecks_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiRequests" ADD CONSTRAINT "ApiRequests_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiRequests" ADD CONSTRAINT "ApiRequests_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
