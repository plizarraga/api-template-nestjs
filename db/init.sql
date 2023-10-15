-- MySQL
-- CREATE DATABASE IF NOT EXISTS db_dev

-- Postgresql
SELECT 'CREATE DATABASE dev_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dev_db')\gexec