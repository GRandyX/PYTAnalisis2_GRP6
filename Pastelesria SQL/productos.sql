
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Costo` decimal(10,2) DEFAULT NULL,
  `IdProveedor` int DEFAULT NULL,
  `Existencia` int DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `IdProveedor` (`IdProveedor`) USING BTREE,
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`IdProveedor`) REFERENCES `proveedores` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci