/*
  Warnings:

  - You are about to drop the column `price` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `purchase` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[standardTicketTypeId]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `standardTicketTypeId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketTypeId` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_eventId_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_purchaseId_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "price",
ADD COLUMN     "standardTicketTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "purchaseId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "ticketTypeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "purchase";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "purchaseTime" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketType" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "numTickets" INTEGER NOT NULL,

    CONSTRAINT "ticketType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_standardTicketTypeId_key" ON "event"("standardTicketTypeId");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_standardTicketTypeId_fkey" FOREIGN KEY ("standardTicketTypeId") REFERENCES "ticketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketType" ADD CONSTRAINT "ticketType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticketType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
