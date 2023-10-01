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

 Date: 30/09/2023 22:27:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `Id` int NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Costo` decimal(10, 2) NULL DEFAULT NULL,
  `IdProveedor` int NULL DEFAULT NULL,
  `Existencia` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `IdProveedor`(`IdProveedor` ASC) USING BTREE,
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`IdProveedor`) REFERENCES `proveedores` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
