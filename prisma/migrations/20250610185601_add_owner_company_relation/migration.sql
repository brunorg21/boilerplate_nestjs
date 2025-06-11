/*
  Warnings:

  - Added the required column `ownerId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `cpf` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN `ownerId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `cpf` VARCHAR(18) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` VARCHAR(200) NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('Master', 'Admin', 'User', 'CompanyOwner') NOT NULL DEFAULT 'User';

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
