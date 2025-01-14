/*
  Warnings:

  - Added the required column `createdOn` to the `ApiRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `ForeignWorkers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `HealthChecks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiRequests" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedBy" TEXT,
ADD COLUMN     "updatedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ForeignWorkers" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedBy" TEXT,
ADD COLUMN     "updatedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "HealthChecks" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedBy" TEXT,
ADD COLUMN     "updatedOn" TIMESTAMP(3);
