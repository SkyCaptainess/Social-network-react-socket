CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR(300),
    sender_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
