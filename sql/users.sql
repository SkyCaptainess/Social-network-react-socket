DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL CHECK (first != ''),
    last VARCHAR(200) NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL CHECK (password != ''),
    url VARCHAR(300),
    bio VARCHAR(300)
);

SELECT * FROM users;
