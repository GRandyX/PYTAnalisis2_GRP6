
DROP TABLE IF EXISTS `detalleventas`;
CREATE TABLE `detalleventas` (
  `Id` int NOT NULL,
  `IdVenta` int DEFAULT NULL,
  `IdPastel` int DEFAULT NULL,
  `NombrePastel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Costo` decimal(10,2) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `SubTotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Ventas_bk` (`IdVenta`) USING BTREE,
  KEY `pastel` (`IdPastel`) USING BTREE,
  CONSTRAINT `pastel` FOREIGN KEY (`IdPastel`) REFERENCES `pasteles` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Ventas_bk` FOREIGN KEY (`IdVenta`) REFERENCES `ventas` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
