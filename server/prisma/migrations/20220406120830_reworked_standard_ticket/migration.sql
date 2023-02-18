/*
  Warnings:

  - Added the required column `standard` to the `ticketType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_standardTicketTypeId_fkey";

-- AlterTable
ALTER TABLE "ticketType" ADD COLUMN     "standard" BOOLEAN NOT NULL;
