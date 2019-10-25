const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/socialnetwork`
);

exports.register = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [first, last, email, password]
    );
};

exports.getPassword = email => {
    return db.query(
        `
        SELECT password, id FROM users WHERE email = $1
        `,
        [email]
    );
};

module.exports.addImage = (url, id) => {
    return db.query(
        `
        UPDATE users SET url = $1
        WHERE id = $2
        RETURNING url
         `,
        [url, id]
    );
};

exports.getUser = id => {
    return db.query(
        `
        SELECT first, last, url FROM users WHERE id = $1
        `,
        [id]
    );
};
