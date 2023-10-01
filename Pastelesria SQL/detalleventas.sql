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

 Date: 30/09/2023 22:24:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for detalleventas
-- ----------------------------
DROP TABLE IF EXISTS `detalleventas`;
CREATE TABLE `detalleventas`  (
  `Id` int NOT NULL,
  `IdVenta` int NULL DEFAULT NULL,
  `IdPastel` int NULL DEFAULT NULL,
  `NombrePastel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Costo` decimal(10, 2) NULL DEFAULT NULL,
  `Precio` decimal(10, 2) NULL DEFAULT NULL,
  `Cantidad` int NULL DEFAULT NULL,
  `SubTotal` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Ventas_bk`(`IdVenta` ASC) USING BTREE,
  INDEX `pastel`(`IdPastel` ASC) USING BTREE,
  CONSTRAINT `pastel` FOREIGN KEY (`IdPastel`) REFERENCES `pasteles` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Ventas_bk` FOREIGN KEY (`IdVenta`) REFERENCES `ventas` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalleventas
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
