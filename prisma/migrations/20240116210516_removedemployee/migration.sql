-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_employeeId_fkey`;

-- AlterTable
ALTER TABLE `Project` MODIFY `employeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
