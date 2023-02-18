/*
  Warnings:

  - You are about to drop the column `starTtime` on the `event` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "starTtime",
ADD COLUMN     "startTime" TIMESTAMP(6) NOT NULL;
