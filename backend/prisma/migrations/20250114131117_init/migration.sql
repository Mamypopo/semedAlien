-- CreateTable
CREATE TABLE "Employers" (
    "id" SERIAL NOT NULL,
    "empname" VARCHAR(100) NOT NULL,
    "wkaddress" VARCHAR(1000),
    "btname" VARCHAR(50),

    CONSTRAINT "Employers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForeignWorkers" (
    "id" SERIAL NOT NULL,
    "employer_id" INTEGER NOT NULL,
    "alcode" VARCHAR(13) NOT NULL,
    "altype" INTEGER,
    "alprefix" INTEGER,
    "alprefixen" VARCHAR(50),
    "alname_en" VARCHAR(100) NOT NULL,
    "alsname_en" VARCHAR(100),
    "alprefix_th" VARCHAR(50),
    "alname_th" VARCHAR(100),
    "alsname_th" VARCHAR(100),
    "albdate" DATE,
    "algender" INTEGER,
    "alnation" CHAR(1),
    "alposid" INTEGER,
    "blood_group" CHAR(3),
    "nickname" VARCHAR(50),
    "religion" VARCHAR(50),
    "phone_number" VARCHAR(15),
    "email" VARCHAR(100),
    "address" VARCHAR(500),
    "subdistrict" VARCHAR(100),
    "district" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(10),
    "remark" TEXT,

    CONSTRAINT "ForeignWorkers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthChecks" (
    "id" SERIAL NOT NULL,
    "alcode" TEXT NOT NULL,
    "alchkhos" VARCHAR(500),
    "alchkstatus" INTEGER,
    "alchkdate" DATE NOT NULL,
    "alchkprovid" CHAR(2),
    "licenseno" VARCHAR(50),
    "chkname" VARCHAR(100),
    "chkposition" VARCHAR(100),
    "alchkdesc" VARCHAR(500),
    "alchkdoc" VARCHAR(500),

    CONSTRAINT "HealthChecks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiRequests" (
    "id" SERIAL NOT NULL,
    "reqcode" TEXT NOT NULL,

    CONSTRAINT "ApiRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForeignWorkers_alcode_key" ON "ForeignWorkers"("alcode");

-- AddForeignKey
ALTER TABLE "ForeignWorkers" ADD CONSTRAINT "ForeignWorkers_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "Employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthChecks" ADD CONSTRAINT "HealthChecks_alcode_fkey" FOREIGN KEY ("alcode") REFERENCES "ForeignWorkers"("alcode") ON DELETE CASCADE ON UPDATE CASCADE;
