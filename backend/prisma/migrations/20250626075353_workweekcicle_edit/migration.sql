/*
  Warnings:

  - You are about to drop the column `dayOfWeel` on the `WorkWeekCicle` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `WorkWeekCicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkWeekCicle" DROP COLUMN "dayOfWeel",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;
