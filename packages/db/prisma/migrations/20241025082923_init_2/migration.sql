/*
  Warnings:

  - Made the column `phoneNumber` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "phoneNumber" SET NOT NULL;
