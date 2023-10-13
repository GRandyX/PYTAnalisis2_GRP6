DROP TABLE IF EXISTS `permisosusuario`;
CREATE TABLE `permisosusuario` (
  `Id` int NOT NULL,
  `NombrePermiso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NivelPermiso` int DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci