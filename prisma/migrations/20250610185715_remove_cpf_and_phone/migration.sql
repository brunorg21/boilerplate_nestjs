/*
  Warnings:

  - You are about to drop the column `cpf` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `companies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `companies_cpf_key` ON `companies`;

-- DropIndex
DROP INDEX `companies_phone_key` ON `companies`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `cpf`,
    DROP COLUMN `phone`;
