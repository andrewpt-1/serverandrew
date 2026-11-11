-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('FROTEND', 'BACKEND', 'DESING', 'UNDFINED');

-- CreateTable
CREATE TABLE "Projets" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "des" TEXT NOT NULL,
    "tag" "Tags" NOT NULL DEFAULT 'UNDFINED',

    CONSTRAINT "Projets_pkey" PRIMARY KEY ("id")
);
