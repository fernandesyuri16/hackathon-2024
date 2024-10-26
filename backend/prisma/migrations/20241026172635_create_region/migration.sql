/*
  Warnings:

  - Added the required column `city` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Region` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;
