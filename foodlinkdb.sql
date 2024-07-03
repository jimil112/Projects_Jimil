-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: foodlinkdb
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `foodlinkdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `foodlinkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `foodlinkdb`;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (4,'Adelaide Local Food Drive','Adelaide SA, 500','2024-09-08','Join us for the Adelaide Food Drive, a community initiative to support local families in need. Our mission is to collect non-perishable food items and essentials to ensure that everyone has access to nutritious meals. The event will take place on Saturday, June 24th, from 9 AM to 3 PM at Victoria Square. We invite you to bring canned goods, rice, pasta, and other shelf-stable items to help fill our donation bins. All contributions will go directly to local food banks and shelters. Together, we can make a significant impact on hunger in our community. Come with your family, friends, or colleagues and enjoy a day of giving, with live music, food stalls, and activities for kids. Your generosity can make a world of difference. Let\'s come together and show the strength of Adelaide\'s community spirit. For more information, visit our website or contact us at info@foodlinkadelaide.org.'),(5,'Woman In Power ','Brisbane Qld, 4000','2024-09-13','Join Us at the Women of Influence Luncheon at Chermside Westfield!\n\nYou\'re cordially invited to participate in the Women of Influence Luncheon QLD, aimed at furthering our mission to eradicate hunger in Queensland.\n\nThis luncheon stands as Foodbank SA\'s premier fundraising occasion, with all proceeds dedicated to supporting our cause. Each ticket purchased will contribute to providing over 50 meals for families in need within our communities. Moreover, you can extend your support by participating in our silent auction, featuring a range of fantastic items, and by making donations for the chance to win exciting prizes.\n\nSave the date and mark your calendars! We eagerly anticipate your presence and contribution towards our shared goal of combating hunger in our region on the 13th of September at Chermside Westfield.'),(6,'Packathon at Tarneit Primary School!','Melbourne Vic, 3000','2024-10-10','You\'re cordially invited to participate in the Packathon! A Packathon is a food packing event where participants produce thousands of nutritious meals that will be distributed through Feed the Hunger partners to children and families in need.\n\nDuring a two-hour shift, teams of volunteers assemble four ingredients: a carbohydrate (rice or pasta), a protein (soy or dehydrated pinto beans), dehydrated vegetables, and vitamin powder. These ingredients, which together provide complete nutrition, are packaged in six-serving meal packets that are then weighed, sealed, and boxed. Packathons take place in a friendly, high-energy environment, and we welcome participants ages 5 to 105!\n\nSave the date and mark your calendars! We eagerly anticipate your presence and contribution towards our shared goal of combating hunger in our region on the 20th of October at Tarneit Primary School.'),(7,'Halloween Food Drive','Sydney NSW, 2000','2024-10-30','Are you passionate about making a difference in your community? Here\'s your chance to get involved and make a positive impact! The University of Sydney is hosting a halloween themed food drive, and we need your support. This event aims to provide kids who will not be able to participate in halloween with chocolates and candies By participating, you\'ll be directly contributing to ensuring that children in our community can feel included in the festival.\n\n‎Save the date and mark your calendars! We eagerly anticipate your presence and contribution on the 31th of October at University of Sydney. Spread the word and bring your friends.\n\n');
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JoinedEventSignUp`
--

DROP TABLE IF EXISTS `JoinedEventSignUp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JoinedEventSignUp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JoinedEventSignUp`
--

LOCK TABLES `JoinedEventSignUp` WRITE;
/*!40000 ALTER TABLE `JoinedEventSignUp` DISABLE KEYS */;
INSERT INTO `JoinedEventSignUp` VALUES (1,'xpertmessi@gmail.com','Adelaide Local Food Drive','2024-06-12 13:17:15'),(2,'pateltirth719@gmail.com','Woman In Power','2024-06-12 13:17:34'),(3,'jimilpatel24@gmail.com','Packathon at Tarneit Primary School!','2024-06-12 13:24:53'),(4,'pateltirth719@gmail.com','Woman In Power','2024-06-12 13:25:01'),(5,'pateltirth719@gmail.com','Halloween Food Drive','2024-06-12 13:36:37'),(6,'pateltirth719@gmail.com','Adelaide Local Food Drive','2024-06-12 13:38:57'),(7,'pateltirth719@gmail.com','Adelaide Local Food Drive','2024-06-12 13:48:10'),(8,'pateltirth719@gmail.com','Adelaide Local Food Drive','2024-06-12 13:53:24'),(9,'pateltirth719@gmail.com','Adelaide Local Food Drive','2024-06-12 15:56:21'),(10,'pateltirth719@gmail.com','Adelaide Local Food Drive','2024-06-12 17:50:54');
/*!40000 ALTER TABLE `JoinedEventSignUp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PrivateUpdates`
--

DROP TABLE IF EXISTS `PrivateUpdates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PrivateUpdates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PrivateUpdates`
--

LOCK TABLES `PrivateUpdates` WRITE;
/*!40000 ALTER TABLE `PrivateUpdates` DISABLE KEYS */;
INSERT INTO `PrivateUpdates` VALUES (3,'**Private Update for Managers and Admins**\n\nWelcome to Food Link! We\'re excited to have you on board. Your dedication and leadership will be instrumental in achieving our mission to support communities in need. Together, we\'ll make a significant impact. Thank you for joining us in this vital cause.\n\nBest regards,\nBob The Dawg','2024-06-11 18:15:07');
/*!40000 ALTER TABLE `PrivateUpdates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PublicUpdates`
--

DROP TABLE IF EXISTS `PublicUpdates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PublicUpdates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PublicUpdates`
--

LOCK TABLES `PublicUpdates` WRITE;
/*!40000 ALTER TABLE `PublicUpdates` DISABLE KEYS */;
INSERT INTO `PublicUpdates` VALUES (2,'Welcome to Food Link! We\'re excited to have you join our volunteer community. Together, we\'ll make a difference by connecting surplus food to those in need. Thank you for your support and dedication to our mission!','2024-06-11 05:39:52');
/*!40000 ALTER TABLE `PublicUpdates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserInfo`
--

DROP TABLE IF EXISTS `UserInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserInfo`
--

LOCK TABLES `UserInfo` WRITE;
/*!40000 ALTER TABLE `UserInfo` DISABLE KEYS */;
INSERT INTO `UserInfo` VALUES (1,'user','Jimil Patel','0410897295','jimilpatel24@gmail.com','Tirth6969'),(2,'user','Tirth Patel','0416887750','pateltirth719@gmail.com','Jimil6969'),(4,'user','James King','0459786623','0ahfah@gmail.com','Jimil2004'),(6,'manager','oggy singh bodywala','69696969','ollyhotty@gmail.com','ollyhotty'),(7,'admin','Dev Desai','0411785371','dev.desai.work@gmail.com','Oggyjackmaa'),(9,'admin','Admin','0412345677','Admin10@gmail.com','admin'),(10,'admin','BOB','8888888888','bobthedawg@gmail.com','bobthedawg'),(12,'user','Big man','1234567890','bigman@gmail.com','bigman'),(13,'manager','Gang','0000000000','gang@gmail.com','gang'),(18,'users','Oggy Singh','N/A','oggysingh719@gmail.com',''),(19,'users','Tirth Patel','N/A','tirth7575@gmail.com',''),(20,'admin','Tirth Patel','041269699','tirthpatel@gmail.com','Tennyson17');
/*!40000 ALTER TABLE `UserInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_subscriptions`
--

DROP TABLE IF EXISTS `email_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_address` varchar(255) NOT NULL,
  `date_sent` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_subscriptions`
--

LOCK TABLES `email_subscriptions` WRITE;
/*!40000 ALTER TABLE `email_subscriptions` DISABLE KEYS */;
INSERT INTO `email_subscriptions` VALUES (1,'jimilpatel24@gmail.com','2024-06-06 06:30:39'),(2,'compassioncoop1@gmail.com','2024-06-06 06:50:52'),(6,'pateltirth719@gmail.com','2024-06-06 14:02:54'),(7,'dev.desai18107@icloud.com','2024-06-06 14:13:23'),(8,'tiya1744@gmail.com','2024-06-07 02:38:40'),(9,'ayushdchauhan2004@gmail.com','2024-06-11 07:28:48');
/*!40000 ALTER TABLE `email_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-12 17:55:11
