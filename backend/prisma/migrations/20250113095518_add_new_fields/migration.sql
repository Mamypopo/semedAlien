/*
  Warnings:

  - Added the required column `alnameth` to the `Alien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alsnameth` to the `Alien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alien" ADD COLUMN     "address" TEXT,
ADD COLUMN     "alnameth" VARCHAR(100) NOT NULL,
ADD COLUMN     "alsnameth" VARCHAR(100) NOT NULL,
ADD COLUMN     "bloodtype" VARCHAR(5),
ADD COLUMN     "district" VARCHAR(100),
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "nickname" VARCHAR(50),
ADD COLUMN     "note" TEXT,
ADD COLUMN     "phone1" VARCHAR(20),
ADD COLUMN     "phone2" VARCHAR(20),
ADD COLUMN     "postalcode" VARCHAR(10),
ADD COLUMN     "province" VARCHAR(100),
ADD COLUMN     "religion" VARCHAR(50),
ADD COLUMN     "subdistrict" VARCHAR(100);
