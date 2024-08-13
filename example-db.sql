-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_spk_saw_kopi
CREATE DATABASE IF NOT EXISTS `db_spk_saw_kopi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_spk_saw_kopi`;

-- Dumping structure for table db_spk_saw_kopi.m_alternatif
CREATE TABLE IF NOT EXISTS `m_alternatif` (
  `id_alternatif` int(11) NOT NULL AUTO_INCREMENT,
  `alternatif` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_alternatif`),
  KEY `Index 2` (`id_alternatif`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_spk_saw_kopi.m_alternatif: ~4 rows (approximately)
INSERT INTO `m_alternatif` (`id_alternatif`, `alternatif`) VALUES
	(1, 'Kopi 1'),
	(2, 'Kopi 2'),
	(3, 'Kopi 3'),
	(4, 'Kopi 4');

-- Dumping structure for table db_spk_saw_kopi.m_kriteria
CREATE TABLE IF NOT EXISTS `m_kriteria` (
  `id_kriteria` int(11) NOT NULL AUTO_INCREMENT,
  `kriteria` varchar(100) DEFAULT NULL,
  `bobot_kriteria` float DEFAULT NULL,
  `keterangan_kriteria` varchar(50) DEFAULT NULL,
  `nilai_rating_bobot` decimal(2,2) DEFAULT NULL,
  PRIMARY KEY (`id_kriteria`),
  KEY `Index 2` (`id_kriteria`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_spk_saw_kopi.m_kriteria: ~10 rows (approximately)
INSERT INTO `m_kriteria` (`id_kriteria`, `kriteria`, `bobot_kriteria`, `keterangan_kriteria`, `nilai_rating_bobot`) VALUES
	(1, 'Rasa', 20, 'benefit', 0.18),
	(2, 'Aroma', 15, 'benefit', 0.14),
	(3, 'Kelembutan', 10, 'benefit', 0.09),
	(4, 'Asam', 15, 'benefit', 0.14),
	(6, 'Kepahitan', 10, 'cost', 0.09),
	(7, 'Keseimbangan', 10, 'benefit', 0.09),
	(8, 'Kualitas biji', 10, 'benefit', 0.09),
	(9, 'Kelembapan', 5, 'benefit', 0.05),
	(10, 'Kepadatan', 5, 'benefit', 0.05),
	(11, 'Harga', 10, 'cost', 0.09);

-- Dumping structure for table db_spk_saw_kopi.ref_user
CREATE TABLE IF NOT EXISTS `ref_user` (
  `username` char(12) NOT NULL,
  `password` char(50) DEFAULT NULL,
  `role` char(50) DEFAULT NULL,
  `is_login` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `Index 2` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_spk_saw_kopi.ref_user: ~2 rows (approximately)
INSERT INTO `ref_user` (`username`, `password`, `role`, `is_login`) VALUES
	('admin123', 'U2FsdGVkX19HDBH3tf2oMVCebhogfnM+hq9CGub1fRw=', 'admin', 0),
	('user123', 'U2FsdGVkX18sikNQP5Mc0EglyxWAan9Egqa5lyga5v4=', 'user', 1);

-- Dumping structure for table db_spk_saw_kopi.trx_hasil
CREATE TABLE IF NOT EXISTS `trx_hasil` (
  `id_alternatif` int(11) NOT NULL,
  `id_hasil` int(11) NOT NULL AUTO_INCREMENT,
  `urutan_trx` char(10) DEFAULT NULL,
  `hasil` decimal(20,4) DEFAULT NULL,
  `rangking` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id_hasil`),
  UNIQUE KEY `Index 4` (`id_alternatif`,`urutan_trx`),
  KEY `Index 2` (`id_hasil`),
  KEY `Index 3` (`id_alternatif`),
  CONSTRAINT `FK_trx_hasil_m_alternatif` FOREIGN KEY (`id_alternatif`) REFERENCES `m_alternatif` (`id_alternatif`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_spk_saw_kopi.trx_hasil: ~4 rows (approximately)
INSERT INTO `trx_hasil` (`id_alternatif`, `id_hasil`, `urutan_trx`, `hasil`, `rangking`) VALUES
	(3, 1, '1', 0.9746, 1),
	(2, 2, '1', 0.9701, 2),
	(1, 3, '1', 0.9494, 3),
	(4, 4, '1', 0.9330, 4);

-- Dumping structure for table db_spk_saw_kopi.trx_nilai_alternatif
CREATE TABLE IF NOT EXISTS `trx_nilai_alternatif` (
  `id_alternatif` int(11) NOT NULL,
  `id_kriteria` int(11) NOT NULL,
  `id_nilai_alternatif` int(11) NOT NULL AUTO_INCREMENT,
  `nilai_alternatif` float DEFAULT NULL,
  PRIMARY KEY (`id_nilai_alternatif`) USING BTREE,
  UNIQUE KEY `Index 5` (`id_alternatif`,`id_kriteria`),
  KEY `Index 1` (`id_alternatif`),
  KEY `Index 2` (`id_kriteria`),
  KEY `Index 3` (`id_nilai_alternatif`) USING BTREE,
  CONSTRAINT `FK_trx_nilai_alternatif_m_alternatif` FOREIGN KEY (`id_alternatif`) REFERENCES `m_alternatif` (`id_alternatif`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_trx_nilai_alternatif_m_kriteria` FOREIGN KEY (`id_kriteria`) REFERENCES `m_kriteria` (`id_kriteria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=544 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_spk_saw_kopi.trx_nilai_alternatif: ~35 rows (approximately)
INSERT INTO `trx_nilai_alternatif` (`id_alternatif`, `id_kriteria`, `id_nilai_alternatif`, `nilai_alternatif`) VALUES
	(1, 2, 84, 7),
	(1, 3, 85, 8),
	(1, 4, 86, 7),
	(1, 6, 87, 6),
	(1, 7, 88, 7),
	(1, 8, 89, 8),
	(1, 9, 90, 8),
	(1, 10, 91, 7),
	(1, 11, 92, 7),
	(2, 1, 503, 8),
	(2, 2, 504, 8),
	(2, 3, 505, 7),
	(2, 4, 506, 7),
	(2, 6, 507, 6),
	(2, 7, 508, 8),
	(2, 8, 509, 8),
	(2, 9, 510, 7),
	(2, 10, 511, 7),
	(2, 11, 512, 6),
	(1, 1, 523, 8),
	(3, 1, 524, 8),
	(3, 2, 525, 7),
	(3, 3, 526, 8),
	(3, 4, 527, 7),
	(3, 6, 528, 6),
	(3, 7, 529, 7),
	(3, 8, 530, 8),
	(3, 9, 531, 8),
	(3, 10, 532, 7),
	(3, 11, 533, 5),
	(4, 1, 534, 7),
	(4, 2, 535, 8),
	(4, 3, 536, 7),
	(4, 4, 537, 7),
	(4, 6, 538, 6),
	(4, 7, 539, 8),
	(4, 8, 540, 8),
	(4, 9, 541, 7),
	(4, 10, 542, 6),
	(4, 11, 543, 7);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
