DROP TABLE IF EXISTS `ingredientes_pasteles`;
CREATE TABLE `ingredientes_pasteles` (
  `IdPastel` int DEFAULT NULL,
  `IdProducto` int DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  KEY `Idx_Pastel` (`IdPastel`),
  KEY `Idx_Producto` (`IdProducto`),
  CONSTRAINT `ingredientes_pasteles_ibfk_1` FOREIGN KEY (`IdPastel`) REFERENCES `pasteles` (`Id`),
  CONSTRAINT `ingredientes_pasteles_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci