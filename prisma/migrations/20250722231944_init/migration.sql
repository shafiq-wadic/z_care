/*
  Warnings:

  - You are about to drop the column `mealDayId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the `MealDay` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `MealItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dietDayId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealTypeId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Made the column `time` on table `Meal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_mealDayId_fkey";

-- DropForeignKey
ALTER TABLE "MealDay" DROP CONSTRAINT "MealDay_dietPlanId_fkey";

-- DropForeignKey
ALTER TABLE "MealItem" DROP CONSTRAINT "MealItem_mealId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "mealDayId",
DROP COLUMN "mealType",
ADD COLUMN     "dietDayId" INTEGER NOT NULL,
ADD COLUMN     "mealTypeId" INTEGER NOT NULL,
ALTER COLUMN "time" SET NOT NULL;

-- AlterTable
ALTER TABLE "MealItem" DROP COLUMN "mealId";

-- DropTable
DROP TABLE "MealDay";

-- CreateTable
CREATE TABLE "DietDay" (
    "id" SERIAL NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "dietPlanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealItemOnMeal" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "overrideQuantity" TEXT,
    "overrideCalories" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealItemOnMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MealType_name_key" ON "MealType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MealItem_name_key" ON "MealItem"("name");

-- AddForeignKey
ALTER TABLE "DietDay" ADD CONSTRAINT "DietDay_dietPlanId_fkey" FOREIGN KEY ("dietPlanId") REFERENCES "DietPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "MealType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietDayId_fkey" FOREIGN KEY ("dietDayId") REFERENCES "DietDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealItemOnMeal" ADD CONSTRAINT "MealItemOnMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealItemOnMeal" ADD CONSTRAINT "MealItemOnMeal_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
