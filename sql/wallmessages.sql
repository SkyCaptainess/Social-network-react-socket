CREATE TABLE wallmessages (
    id SERIAL PRIMARY KEY,
    message VARCHAR(300),
    wall_sender_id INT NOT NULL REFERENCES users(id),
    wall_receiver_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
