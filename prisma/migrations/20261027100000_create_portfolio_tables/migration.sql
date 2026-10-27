CREATE TABLE IF NOT EXISTS `profile` (
  `id` INTEGER NOT NULL DEFAULT 1,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `role` VARCHAR(191) NOT NULL,
  `location` VARCHAR(191) NOT NULL,
  `aboutHeadline` VARCHAR(191) NOT NULL,
  `bio` TEXT NOT NULL,
  `aboutDetails` TEXT NOT NULL,
  `avatarUrl` VARCHAR(191) NULL,
  `resumeUrl` VARCHAR(191) NULL,
  `socialLinks` JSON NULL,
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `tech` TEXT NOT NULL,
  `url` VARCHAR(191) NOT NULL DEFAULT '',
  `githubUrl` VARCHAR(191) NOT NULL DEFAULT '',
  `status` VARCHAR(191) NOT NULL DEFAULT 'In Progress',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `skills` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `level` INTEGER NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(191) NOT NULL,
  `to` VARCHAR(191) NOT NULL DEFAULT '/contact',
  `icon` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `experience` (
  `id` VARCHAR(64) NOT NULL,
  `company` VARCHAR(191) NOT NULL,
  `position` VARCHAR(191) NOT NULL,
  `period` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `education` (
  `id` INTEGER NOT NULL,
  `institution` VARCHAR(191) NOT NULL,
  `degree` VARCHAR(191) NOT NULL,
  `field` VARCHAR(191) NOT NULL,
  `period` VARCHAR(191) NOT NULL,
  `isCurrent` BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INTEGER NOT NULL DEFAULT 1,
  `siteName` VARCHAR(191) NULL,
  `contactEmail` VARCHAR(191) NULL,
  `footerText` TEXT NULL,
  `theme` VARCHAR(191) NULL,
  `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
  `messageNotifications` BOOLEAN NOT NULL DEFAULT true,
  `publicProfile` BOOLEAN NOT NULL DEFAULT true,
  `maintenanceMode` BOOLEAN NOT NULL DEFAULT false,
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
