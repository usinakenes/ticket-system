/*
  Warnings:

  - You are about to drop the column `standardTicketTypeId` on the `event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "event_standardTicketTypeId_key";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "standardTicketTypeId";

-- AlterTable
ALTER TABLE "ticketType" ALTER COLUMN "standard" SET DEFAULT false;
