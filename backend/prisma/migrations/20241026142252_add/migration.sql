/*
  Warnings:

  - You are about to alter the column `hasInsurance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `familySize` INTEGER NOT NULL,
    MODIFY `hasInsurance` BOOLEAN NOT NULL;
