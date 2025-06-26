/*
  Warnings:

  - The `dayOfWeek` column on the `WorkWeekCicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WorkWeekCicle" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" INTEGER[];
