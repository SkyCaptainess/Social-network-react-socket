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

module.exports.addBio = (bio, id) => {
    return db.query(
        `
        UPDATE users SET bio = $1
        WHERE id = $2
        RETURNING bio
         `,
        [bio, id]
    );
};

exports.getUser = id => {
    return db.query(
        `
        SELECT id, first, last, url, bio FROM users WHERE id = $1
        `,
        [id]
    );
};

exports.getNewUsers = id => {
    return db.query(
        `
        SELECT id, first, last, url FROM users
        WHERE id != $1
        ORDER BY id DESC LIMIT 3
        `,
        [id]
    );
};
exports.findPeople = name => {
    return db.query(
        `
        SELECT id, first, last, url FROM users
        WHERE first ILIKE $1;
        `,
        [name + "%"]
    );
};

exports.getInitialStatus = (profileId, currentId) => {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        `,
        [profileId, currentId]
    );
};
exports.sendRequest = (profileId, currentId) => {
    return db.query(
        `
        INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2)
        RETURNING true
        `,
        [profileId, currentId]
    );
};
