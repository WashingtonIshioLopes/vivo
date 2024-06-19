-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.37 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para db_washington
DROP DATABASE IF EXISTS `db_washington`;
CREATE DATABASE IF NOT EXISTS `db_washington` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_washington`;

-- Copiando estrutura para tabela db_washington.filmes
DROP TABLE IF EXISTS `filmes`;
CREATE TABLE IF NOT EXISTS `filmes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdFilme` int NOT NULL,
  `IdUsuario` int NOT NULL,
  `Favorito` int DEFAULT '0',
  `Assistido` int DEFAULT '0',
  `PretendeAssistir` int DEFAULT '0',
  `Status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'ativo',
  `DtCreated` datetime DEFAULT NULL,
  `DtUpdated` datetime DEFAULT NULL,
  `DtDeleted` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`),
  KEY `IdFilme` (`IdFilme`),
  KEY `IdUsuario` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_washington.filmes: ~9 rows (aproximadamente)
DELETE FROM `filmes`;
INSERT INTO `filmes` (`Id`, `IdFilme`, `IdUsuario`, `Favorito`, `Assistido`, `PretendeAssistir`, `Status`, `DtCreated`, `DtUpdated`, `DtDeleted`) VALUES
	(2, 1022789, 2, 1, 1, 1, 'ativo', NULL, '2024-06-19 03:13:43', NULL),
	(3, 1001311, 2, 0, 0, 0, 'ativo', '2024-06-19 01:27:05', NULL, NULL),
	(4, 573435, 2, 1, 0, 0, 'ativo', '2024-06-19 01:35:35', '2024-06-19 03:38:55', NULL),
	(5, 955555, 2, 0, 1, 0, 'ativo', '2024-06-19 01:36:11', NULL, NULL),
	(6, 626412, 2, 1, 0, 0, 'ativo', '2024-06-19 01:41:25', NULL, NULL),
	(7, 653346, 2, 1, 0, 0, 'ativo', '2024-06-19 02:13:13', '2024-06-19 02:13:27', NULL),
	(8, 278, 2, 0, 0, 0, 'ativo', '2024-06-19 02:13:55', '2024-06-19 02:13:56', NULL),
	(9, 424, 2, 0, 1, 0, 'ativo', '2024-06-19 03:42:31', NULL, NULL);

-- Copiando estrutura para tabela db_washington.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT '',
  `CPF` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `Senha` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `Telefone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `Email` varchar(50) DEFAULT '',
  `Status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'ativo',
  `DtCreated` datetime DEFAULT NULL,
  `DtUpdated` datetime DEFAULT NULL,
  `DtDeleted` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_washington.usuarios: ~3 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`Id`, `Nome`, `CPF`, `Senha`, `Telefone`, `Email`, `Status`, `DtCreated`, `DtUpdated`, `DtDeleted`) VALUES
	(2, 'Washington Ishio Lopes', '178.320.888-00', '$2a$08$xyyydhmjGZRoxQAUHNvRR.ZrW21lXVz7brCIzZxNDED05WdyNpOZO', '11932676815', 'washington.ishio@gmail.com', 'ativo', '2024-06-18 09:05:05', '2024-06-18 09:06:10', NULL),
	(3, 'Keli Ishio Lopes', '468.906.550-01', '$2a$08$UuORTx4TjhVtPKRE52sDUOhzysK1VYZ6Ix/11xx9BGLa6ONrO7sUC', '11932676815', 'keli.ishio@gmail.com', 'ativo', '2024-06-18 23:41:39', NULL, NULL),
	(5, 'Ricardo Ishio Lopes', '093.339.220-67', '$2a$08$RrpQ6SZRYKvA.sv20C7kx.dZ9oDT4Q9g.NtKOzSUPx7JXFdWzpo9K', '11932676815', 'ricardo.ishio@gmail.com', 'ativo', '2024-06-19 12:18:46', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
