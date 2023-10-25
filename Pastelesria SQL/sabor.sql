
DROP TABLE IF EXISTS `sabor`;
CREATE TABLE `sabor` (
  `IdSabor` int NOT NULL AUTO_INCREMENT,
  `NombreSabor` varchar(150) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdSabor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci