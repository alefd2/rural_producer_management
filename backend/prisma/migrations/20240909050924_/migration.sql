/*
  Warnings:

  - The `plantedCrops` column on the `RuralProducers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RuralProducers" DROP COLUMN "plantedCrops",
ADD COLUMN     "plantedCrops" TEXT[];

-- DropEnum
DROP TYPE "PlantedCrops";
