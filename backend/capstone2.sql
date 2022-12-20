DROP DATABASE IF EXISTS capstone2;
CREATE DATABASE capstone2;

\c capstone2;

\i capstone2_schema.sql

DROP DATABASE IF EXISTS capstone2_test;
CREATE DATABASE capstone2_test;

\c capstone2_test;
\i capstone2_schema.sql
