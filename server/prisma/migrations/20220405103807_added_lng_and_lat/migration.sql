-- AlterTable
ALTER TABLE "eventLocation" 
RENAME COLUMN "x" TO "lat";

ALTER TABLE "eventLocation" 
RENAME COLUMN "y" TO "lng";
