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

exports.getUserId = id => {
    return db.query(
        `
        SELECT user_id FROM signatures WHERE user_id = $1
        `,
        [id]
    );
};
