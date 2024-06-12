CREATE TABLE `tempuser` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`timelimit` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`NyuuGakunen` integer NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`ViewID` text NOT NULL,
	`NickName` text NOT NULL,
	`Password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_ViewID_unique` ON `user` (`ViewID`);