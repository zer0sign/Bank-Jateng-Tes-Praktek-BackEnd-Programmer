/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100428
 Source Host           : localhost:3307
 Source Schema         : bankjateng

 Target Server Type    : MySQL
 Target Server Version : 100428
 File Encoding         : 65001

 Date: 04/10/2024 10:59:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cards
-- ----------------------------
DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(255) DEFAULT NULL,
  `cardHolder` varchar(255) DEFAULT NULL,
  `expired` varchar(255) DEFAULT NULL,
  `securityCode` int(11) DEFAULT NULL,
  `pin` int(11) NOT NULL DEFAULT 123456,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of cards
-- ----------------------------
BEGIN;
INSERT INTO `cards` (`id`, `cardNumber`, `cardHolder`, `expired`, `securityCode`, `pin`) VALUES (1, '02345', 'Hasan', '10/27', 777, 14199);
INSERT INTO `cards` (`id`, `cardNumber`, `cardHolder`, `expired`, `securityCode`, `pin`) VALUES (3, '02345', 'Ifa', '10/27', 777, 123456);
COMMIT;

-- ----------------------------
-- Table structure for inquiry
-- ----------------------------
DROP TABLE IF EXISTS `inquiry`;
CREATE TABLE `inquiry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(11) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `phonenumber` float DEFAULT NULL,
  `datetime` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of inquiry
-- ----------------------------
BEGIN;
INSERT INTO `inquiry` (`id`, `from`, `to`, `fullname`, `amount`, `phonenumber`, `datetime`) VALUES (1, 'hasna', '082327246840', 'John Doe', 1000, 62123500000, NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `name`, `phonenumber`, `password`) VALUES (4, 'hasan', '082327246840', '$2b$10$IOnyOANgGTy3LKMgG0R21ORT4XtDlBnFdMVhSoSM2L7OFnrb9vRNG');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
