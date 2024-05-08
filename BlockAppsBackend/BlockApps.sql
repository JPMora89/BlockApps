
DROP DATABASE blockapps;
CREATE DATABASE blockapps;
\connect blockapps

\i BlockApps-schema.sql

INSERT INTO general_treasury (groupcoin_pool, exchange_rate) VALUES (1000, 1);

-- A test database


-- DROP DATABASE blockapps_test;
-- CREATE DATABASE blockapps_test;
-- \connect blockapps_test

-- \i BlockApps-schema.sql
