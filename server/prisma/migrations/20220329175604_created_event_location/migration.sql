/*
  Warnings:

  - You are about to drop the column `address` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `eventLocation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `eventLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `eventLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "eventLocation" DROP CONSTRAINT "eventLocation_eventId_fkey";

-- DropIndex
DROP INDEX "eventLocation_eventId_key";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "address",
DROP COLUMN "location",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "eventLocation" DROP COLUMN "eventId",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "eventLocation_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_locationId_key" ON "event"("locationId");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "eventLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
