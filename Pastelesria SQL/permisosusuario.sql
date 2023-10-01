/*
 Navicat Premium Data Transfer

 Source Server         : Pasteleria
 Source Server Type    : MySQL
 Source Server Version : 80034 (8.0.34)
 Source Host           : localhost:3306
 Source Schema         : creasy

 Target Server Type    : MySQL
 Target Server Version : 80034 (8.0.34)
 File Encoding         : 65001

 Date: 30/09/2023 22:27:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permisosusuario
-- ----------------------------
DROP TABLE IF EXISTS `permisosusuario`;
CREATE TABLE `permisosusuario`  (
  `Id` int NOT NULL,
  `NombrePermiso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NivelPermiso` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permisosusuario
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
