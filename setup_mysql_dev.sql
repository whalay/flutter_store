-- prepares a MySQL server for test practice project

CREATE DATABASE IF NOT EXISTS prac_dev_db;
CREATE USER IF NOT EXISTS 'prac_dev'@'localhost' IDENTIFIED BY 'prac_dev_pwd';
GRANT ALL PRIVILEGES ON `prac_dev_db`.* TO 'prac_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'prac_dev'@'localhost';
FLUSH PRIVILEGES;
