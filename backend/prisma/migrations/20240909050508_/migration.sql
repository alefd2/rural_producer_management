-- CreateEnum
CREATE TYPE "PlantedCrops" AS ENUM ('Soja', 'Milho', 'Algodao', 'Cafe', 'CanaDeAcucar');

-- CreateTable
CREATE TABLE "RuralProducers" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmNAme" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "areaInHectares" DOUBLE PRECISION NOT NULL,
    "arableAreaInHectares" DOUBLE PRECISION NOT NULL,
    "vegetationAreaInHectares" DOUBLE PRECISION NOT NULL,
    "plantedCrops" "PlantedCrops" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT,

    CONSTRAINT "RuralProducers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RuralProducers" ADD CONSTRAINT "RuralProducers_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
