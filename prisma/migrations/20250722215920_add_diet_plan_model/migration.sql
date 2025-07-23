/*
  Warnings:

  - The primary key for the `DietPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bmi` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `mealSchedule` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `DietPlan` table. All the data in the column will be lost.
  - The `id` column on the `DietPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `details` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `DietPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_pkey",
DROP COLUMN "bmi",
DROP COLUMN "calories",
DROP COLUMN "date",
DROP COLUMN "height",
DROP COLUMN "mealSchedule",
DROP COLUMN "notes",
DROP COLUMN "weight",
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DietPlan_pkey" PRIMARY KEY ("id");
