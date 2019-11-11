### Schema

CREATE DATABASE stay_alive_db;
USE stay_alive_db;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL DEFAULT '',
  `userName` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `firstName` varchar(30) NOT NULL DEFAULT '',
  `lastName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `characterID` int(11) NOT NULL,
  `lastLogin` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;