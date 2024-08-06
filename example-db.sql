-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.22-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_spk_saw_kopi
CREATE DATABASE IF NOT EXISTS `db_spk_saw_kopi` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db_spk_saw_kopi`;

-- Dumping structure for table db_spk_saw_kopi.m_alternatif
CREATE TABLE IF NOT EXISTS `m_alternatif` (
  `id_alternatif` int(11) NOT NULL,
  `alternatif` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_alternatif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_spk_saw_kopi.m_alternatif: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_alternatif` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_alternatif` ENABLE KEYS */;

-- Dumping structure for table db_spk_saw_kopi.m_kriteria
CREATE TABLE IF NOT EXISTS `m_kriteria` (
  `id_alternatif` int(11) DEFAULT NULL,
  `id_kriteria` int(11) NOT NULL,
  `kriteria` varchar(100) DEFAULT NULL,
  `bobot_kriteria` decimal(2,2) DEFAULT NULL,
  PRIMARY KEY (`id_kriteria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_spk_saw_kopi.m_kriteria: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_kriteria` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_kriteria` ENABLE KEYS */;

-- Dumping structure for table db_spk_saw_kopi.m_rating_bobot
CREATE TABLE IF NOT EXISTS `m_rating_bobot` (
  `id_rating_bobot` int(11) NOT NULL,
  `nilai_rating_awal` decimal(2,2) DEFAULT NULL,
  `nilai_rating_akhir` decimal(3,2) DEFAULT NULL,
  `nilai_rating_bobot` decimal(2,2) DEFAULT NULL,
  `keterangan_rating_bobot` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_rating_bobot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_spk_saw_kopi.m_rating_bobot: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_rating_bobot` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_rating_bobot` ENABLE KEYS */;

-- Dumping structure for table db_spk_saw_kopi.ref_user
CREATE TABLE IF NOT EXISTS `ref_user` (
  `username` char(12) DEFAULT NULL,
  `password` char(50) DEFAULT NULL,
  `role` char(50) DEFAULT NULL,
  `is_login` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_spk_saw_kopi.ref_user: ~2 rows (approximately)
/*!40000 ALTER TABLE `ref_user` DISABLE KEYS */;
INSERT INTO `ref_user` (`username`, `password`, `role`, `is_login`) VALUES
	('user123', 'U2FsdGVkX18sikNQP5Mc0EglyxWAan9Egqa5lyga5v4=', 'user', 0),
	('admin123', 'U2FsdGVkX19HDBH3tf2oMVCebhogfnM+hq9CGub1fRw=', 'admin', 0);
/*!40000 ALTER TABLE `ref_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
