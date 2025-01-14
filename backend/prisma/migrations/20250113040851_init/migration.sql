-- CreateTable
CREATE TABLE "Alien" (
    "id" SERIAL NOT NULL,
    "reqcode" VARCHAR(50) NOT NULL,
    "alcode" VARCHAR(50) NOT NULL,
    "altype" VARCHAR(20),
    "alprefix" VARCHAR(20),
    "alnameen" VARCHAR(100) NOT NULL,
    "alsnameen" VARCHAR(100) NOT NULL,
    "albdate" TIMESTAMP(3) NOT NULL,
    "algender" VARCHAR(10) NOT NULL,
    "alnation" VARCHAR(50) NOT NULL,
    "alposid" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" SERIAL NOT NULL,
    "alcode" VARCHAR(50) NOT NULL,
    "alchkhos" VARCHAR(100),
    "alchkstatus" VARCHAR(20) NOT NULL,
    "alchkdate" TIMESTAMP(3) NOT NULL,
    "alchkprovid" VARCHAR(50),
    "licenseno" VARCHAR(50),
    "chkname" VARCHAR(100),
    "chkposition" VARCHAR(100),
    "alchkdesc" TEXT,
    "alchkdoc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alien_alcode_key" ON "Alien"("alcode");

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_alcode_fkey" FOREIGN KEY ("alcode") REFERENCES "Alien"("alcode") ON DELETE RESTRICT ON UPDATE CASCADE;
