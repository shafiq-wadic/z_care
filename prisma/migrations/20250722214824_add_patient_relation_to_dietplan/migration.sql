/*
  Warnings:

  - The primary key for the `DietPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `carbs` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `dietPlanId` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `bmi` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealSchedule` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Made the column `calories` on table `DietPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_dietPlanId_fkey";

-- AlterTable
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_pkey",
DROP COLUMN "carbs",
DROP COLUMN "description",
DROP COLUMN "fat",
DROP COLUMN "protein",
DROP COLUMN "title",
ADD COLUMN     "bmi" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mealSchedule" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "calories" SET NOT NULL,
ADD CONSTRAINT "DietPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DietPlan_id_seq";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "dietPlanId";

-- AddForeignKey
ALTER TABLE "DietPlan" ADD CONSTRAINT "DietPlan_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
