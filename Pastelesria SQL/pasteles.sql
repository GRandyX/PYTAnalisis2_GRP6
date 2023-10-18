DROP TABLE IF EXISTS `pasteles`;
CREATE TABLE `pasteles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombrePastes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `IdSabor` int DEFAULT NULL,
  `IdRelleno` int DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Costo` decimal(10,2) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Existencia` int DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `IdSabor` (`IdSabor`),
  KEY `IdRelleno` (`IdRelleno`),
  CONSTRAINT `pasteles_ibfk_1` FOREIGN KEY (`IdSabor`) REFERENCES `sabor` (`IdSabor`),
  CONSTRAINT `pasteles_ibfk_2` FOREIGN KEY (`IdRelleno`) REFERENCES `relleno` (`IdRelleno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci