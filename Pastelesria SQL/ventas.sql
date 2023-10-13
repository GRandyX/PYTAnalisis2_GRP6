
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas` (
  `Id` int NOT NULL,
  `IdCliente` int DEFAULT NULL,
  `NombreCliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Numero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Serie` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `TotalMonto` decimal(10,2) DEFAULT NULL,
  `FechaEmision` date DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Cliente` (`IdCliente`) USING BTREE,
  CONSTRAINT `Cliente` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci