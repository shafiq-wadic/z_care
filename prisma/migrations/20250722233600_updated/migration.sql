/*
  Warnings:

  - Added the required column `time` to the `MealType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealType" ADD COLUMN     "time" TEXT NOT NULL;
