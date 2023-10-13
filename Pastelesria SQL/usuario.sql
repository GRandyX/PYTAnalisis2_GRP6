
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Contrasena` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `IdPermiso` int DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE KEY `Usuario` (`Usuario`) USING BTREE,
  KEY `IdPermiso` (`IdPermiso`) USING BTREE,
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdPermiso`) REFERENCES `permisosusuario` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci