
DROP DATABASE blockapps;
CREATE DATABASE blockapps;
\connect blockapps

\i BlockApps-schema.sql



DROP DATABASE blockapps_test;
CREATE DATABASE blockapps_test;
\connect blockapps_test

\i BlockApps-schema.sql
