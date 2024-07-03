CREATE DATABASE /*!32312 IF NOT EXISTS*/ `foodlinkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `foodlinkdb`;

CREATE TABLE `Events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JoinedEventSignUp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PrivateUpdates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PublicUpdates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `email_subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_address` varchar(255) NOT NULL,
  `date_sent` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Some examples of draft queries

INSERT INTO `Events` (`title`, `location`, `date`, `description`) VALUES
('Adelaide Local Food Drive', 'Adelaide SA, 500', '2024-09-08', 'Join us for the Adelaide Food Drive, a community initiative to support local families in need. Our mission is to collect non-perishable food items and essentials to ensure that everyone has access to nutritious meals. The event will take place on Saturday, June 24th, from 9 AM to 3 PM at Victoria Square. We invite you to bring canned goods, rice, pasta, and other shelf-stable items to help fill our donation bins. All contributions will go directly to local food banks and shelters. Together, we can make a significant impact on hunger in our community. Come with your family, friends, or colleagues and enjoy a day of giving, with live music, food stalls, and activities for kids. Your generosity can make a world of difference. Let\'s come together and show the strength of Adelaide\'s community spirit. For more information, visit our website or contact us at info@foodlinkadelaide.org.'),
('Woman In Power', 'Brisbane Qld, 4000', '2024-09-13', 'Join Us at the Women of Influence Luncheon at Chermside Westfield! You\'re cordially invited to participate in the Women of Influence Luncheon QLD, aimed at furthering our mission to eradicate hunger in Queensland. This luncheon stands as Foodbank SA\'s premier fundraising occasion, with all proceeds dedicated to supporting our cause. Each ticket purchased will contribute to providing over 50 meals for families in need within our communities. Moreover, you can extend your support by participating in our silent auction, featuring a range of fantastic items, and by making donations for the chance to win exciting prizes. Save the date and mark your calendars! We eagerly anticipate your presence and contribution towards our shared goal of combating hunger in our region on the 13th of September at Chermside Westfield.');

INSERT INTO `JoinedEventSignUp` (`email`, `event_title`, `joined_at`) VALUES
('xpertmessi@gmail.com', 'Adelaide Local Food Drive', '2024-06-12 13:17:15'),
('pateltirth719@gmail.com', 'Woman In Power', '2024-06-12 13:17:34');

INSERT INTO `PrivateUpdates` (`content`, `created_at`) VALUES
('**Private Update for Managers and Admins**\n\nWelcome to Food Link! We\'re excited to have you on board. Your dedication and leadership will be instrumental in achieving our mission to support communities in need. Together, we\'ll make a significant impact. Thank you for joining us in this vital cause.\n\nBest regards,\nBob The Dawg', '2024-06-11 18:15:07');

INSERT INTO `PublicUpdates` (`content`, `created_at`) VALUES
('Welcome to Food Link! We\'re excited to have you join our volunteer community. Together, we\'ll make a difference by connecting surplus food to those in need. Thank you for your support and dedication to our mission!', '2024-06-11 05:39:52');

INSERT INTO `UserInfo` (`user_type`, `full_name`, `phone_number`, `email`, `password`) VALUES
('user', 'Jimil Patel', '0410897295', 'jimilpatel24@gmail.com', 'Tirth6969'),
('user', 'Tirth Patel', '0416887750', 'pateltirth719@gmail.com', 'Jimil6969');

INSERT INTO `email_subscriptions` (`email_address`, `date_sent`) VALUES
('jimilpatel24@gmail.com', '2024-06-06 06:30:39'),
('compassioncoop1@gmail.com', '2024-06-06 06:50:52');

SELECT * FROM `Events`;

SELECT * FROM `JoinedEventSignUp` WHERE `event_title` = 'Adelaide Local Food Drive';

SELECT * FROM `PublicUpdates`;

SELECT * FROM `UserInfo` WHERE `email` = 'jimilpatel24@gmail.com';

UPDATE `Events` SET `description` = 'New description' WHERE `id` = 4;

UPDATE `UserInfo` SET `full_name` = 'James King', `phone_number` = '0459786623' WHERE `id` = 4;

DELETE FROM `Events` WHERE `id` = 4;

DELETE FROM `JoinedEventSignUp` WHERE `id` = 1;
