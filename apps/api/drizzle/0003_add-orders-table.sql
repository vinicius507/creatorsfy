CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`product` text NOT NULL,
	`createdAt` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`storeName` text(80) NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` text,
	`updatedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "storeName", "email", "password", "createdAt", "updatedAt") SELECT "id", "storeName", "email", "password", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);