/* ORDEN DE SENTENCIAS PARA CREACION DE TABLAS:
	- PERMISOS DE USUARIOS
	- USUARIOS
	- CLIENTES
	- PROVEEDORES
	- PRODUCTOS
	- RELLENOS
	- SABORES
	- PASTELES
	- VENTAS
	- INGREDIENTES DE PASTELES
	- DETALLE DE VENTAS
*/


/* PERMISOS DE USUARIOS */
DROP TABLE IF EXISTS `permisosusuario`;
CREATE TABLE `permisosusuario` (
	`Id` int NOT NULL AUTO_INCREMENT,
	`NombrePermiso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`NivelPermiso` int DEFAULT NULL,
	PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* USUARIOS */
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* CLIENTES */
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
	`Id` int NOT NULL AUTO_INCREMENT,
	`NombreCliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`NIT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`Direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`IdUsuario` int DEFAULT NULL,
	PRIMARY KEY (`Id`) USING BTREE,
	UNIQUE KEY `NIT` (`NIT`) USING BTREE,
	KEY `IdUsuario` (`IdUsuario`),
	CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* PROVEEDORES */
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores` (
	`Id` int NOT NULL AUTO_INCREMENT,
	`NombreProveedor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`NIT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`Direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	PRIMARY KEY (`Id`) USING BTREE,
	UNIQUE KEY `NIT` (`NIT`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* PRODUCTOS */
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* RELLENOS */
DROP TABLE IF EXISTS `relleno`;
CREATE TABLE `relleno` (
	`IdRelleno` int NOT NULL AUTO_INCREMENT,
	`NombreRelleno` varchar(150) DEFAULT NULL,
	`Descripcion` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`IdRelleno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* SABORES */
DROP TABLE IF EXISTS `sabor`;
CREATE TABLE `sabor` (
	`IdSabor` int NOT NULL AUTO_INCREMENT,
	`NombreSabor` varchar(150) DEFAULT NULL,
	`Descripcion` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`IdSabor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* FAMILIA PASTELES */
CREATE TABLE `familia_pasteles`(
	`IdFamilia` int primary key AUTO_INCREMENT,
    `NombreFamilia` VARCHAR(150)
);

/* PASTELES */
DROP TABLE IF EXISTS `pasteles`;
CREATE TABLE `pasteles` (
	`Id` int NOT NULL AUTO_INCREMENT,
	`IdFamilia` int DEFAULT NULL,
	`NombrePastes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`IdSabor` int DEFAULT NULL,
	`IdRelleno` int DEFAULT NULL,
	`Descripcion` varchar(255) DEFAULT NULL,
	`Costo` decimal(10,2) DEFAULT NULL,
	`Precio` decimal(10,2) DEFAULT NULL,
	`Existencia` int DEFAULT NULL,
	`url_imagen` varchar(150) DEFAULT NULL,
	`FechaCreacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`Id`) USING BTREE,
	KEY `IdFamilia` (`IdFamilia`),
	KEY `IdSabor` (`IdSabor`),
	KEY `IdRelleno` (`IdRelleno`),
	CONSTRAINT `pasteles_ibfk_1` FOREIGN KEY (`IdSabor`) REFERENCES `sabor` (`IdSabor`),
	CONSTRAINT `pasteles_ibfk_2` FOREIGN KEY (`IdRelleno`) REFERENCES `relleno` (`IdRelleno`),
	CONSTRAINT `pasteles_ibfk_3` FOREIGN KEY (`IdFamilia`) REFERENCES `familia_pasteles`(`IdFamilia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* VENTAS */
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas` (
	`Id` int NOT NULL AUTO_INCREMENT,
	`IdCliente` int DEFAULT NULL,
	`NombreCliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`Numero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`Serie` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
	`TotalMonto` decimal(10,2) DEFAULT NULL,
	`FechaEmision` date DEFAULT NULL,
	PRIMARY KEY (`Id`) USING BTREE,
	KEY `Cliente` (`IdCliente`) USING BTREE,
	CONSTRAINT `Cliente` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* INGREDIENTES DE PASTELES */
DROP TABLE IF EXISTS `ingredientes_pasteles`;
CREATE TABLE `ingredientes_pasteles` (
	`IdPastel` int DEFAULT NULL,
	`IdProducto` int DEFAULT NULL,
	`Cantidad` int DEFAULT NULL,
	KEY `Idx_Pastel` (`IdPastel`),
	KEY `Idx_Producto` (`IdProducto`),
	CONSTRAINT `ingredientes_pasteles_ibfk_1` FOREIGN KEY (`IdPastel`) REFERENCES `pasteles` (`Id`),
	CONSTRAINT `ingredientes_pasteles_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* DETALLE DE VENTAS */
DROP TABLE IF EXISTS `detalleventas`;
CREATE TABLE `detalleventas` (
	`Id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
