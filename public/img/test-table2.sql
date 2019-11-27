CREATE TABLE test2 (
    id SERIAL PRIMARY KEY,
    grid_id INT NOT NULL,
    dscrpt VARCHAR(300),
    n INT,
    s INT,
    w INT,
    e INT,
    item VARCHAR(300),
    item_nfo VARCHAR(300),
    door_state VARCHAR(300),
    door_nfo VARCHAR(300),
    door_to VARCHAR(300)
);

SELECT * from test2;
