/*
  Warnings:

  - You are about to drop the column `memberId` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_companyId_fkey`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `memberId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `companyId`;
