
DROP TABLE IF EXISTS `relleno`;
CREATE TABLE `relleno` (
  `IdRelleno` int NOT NULL AUTO_INCREMENT,
  `NombreRelleno` varchar(150) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdRelleno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci