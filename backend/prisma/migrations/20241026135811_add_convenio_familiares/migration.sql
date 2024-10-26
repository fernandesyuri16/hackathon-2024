/*
  Warnings:

  - Added the required column `numeroFamiliares` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possuiConvenio` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `numeroFamiliares` INTEGER NOT NULL,
    ADD COLUMN `possuiConvenio` BOOLEAN NOT NULL;
