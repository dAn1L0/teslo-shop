/*
  Warnings:

  - You are about to drop the column `tansactionId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tansactionId",
ADD COLUMN     "transactionId" TEXT;
