/*
  Warnings:

  - You are about to drop the column `coordinates` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "coordinates";

-- CreateTable
CREATE TABLE "eventLocation" (
    "eventId" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "eventLocation_eventId_key" ON "eventLocation"("eventId");

-- AddForeignKey
ALTER TABLE "eventLocation" ADD CONSTRAINT "eventLocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
