-- Database and tables inferred from application queries
CREATE DATABASE IF NOT EXISTS gonguerie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gonguerie;

CREATE TABLE IF NOT EXISTS user (
  id VARCHAR(191) NOT NULL PRIMARY KEY,
  pw CHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
  n INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(191) NOT NULL DEFAULT 'Unknown User',
  written_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  view_count INT NOT NULL DEFAULT 0,
  category INT NOT NULL DEFAULT 0,
  contents MEDIUMTEXT NOT NULL,
  INDEX idx_announcements_category (category),
  INDEX idx_announcements_written_date (written_date)
);
