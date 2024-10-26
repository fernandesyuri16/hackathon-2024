/*
  Warnings:

  - You are about to drop the column `numeroFamiliares` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `possuiConvenio` on the `User` table. All the data in the column will be lost.
  - Added the required column `familySize` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasInsurance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `numeroFamiliares`,
    DROP COLUMN `possuiConvenio`,
    ADD COLUMN `familySize` BOOLEAN NOT NULL,
    ADD COLUMN `hasInsurance` INTEGER NOT NULL;
