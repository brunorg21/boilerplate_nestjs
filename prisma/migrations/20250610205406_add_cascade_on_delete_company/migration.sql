-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
