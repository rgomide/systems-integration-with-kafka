CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price MONEY NOT NULL
);