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
exports.acceptRequest = (profileId, currentId) => {
    return db.query(
        `
        UPDATE friendships SET accepted = true
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING true
        `,
        [profileId, currentId]
    );
};
exports.endFriendship = (profileId, currentId) => {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING true
        `,
        [profileId, currentId]
    );
};
exports.getFriendsWannabes = id => {
    return db.query(
        `
        SELECT users.id, first, last, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [id]
    );
};
exports.addMessage = (msg, id) => {
    return db.query(
        `
        INSERT INTO messages (message, sender_id)
        VALUES ($1, $2)
        `,
        [msg, id]
    );
};
exports.getLastTenChatMessages = () => {
    return db.query(
        `
        SELECT first, last, url, message, created_at, messages.id AS msg_id FROM messages
        JOIN users
        ON sender_id = users.id
        ORDER BY messages.id DESC LIMIT 10
        `
    );
};
exports.getNewMessage = id => {
    return db.query(
        `
        SELECT first, last, url, message, created_at, messages.id AS msg_id FROM messages
        JOIN users
        ON (sender_id = $1 AND sender_id = users.id)
        ORDER BY messages.id DESC LIMIT 1
        `,
        [id]
    );
};

exports.getWallMessages = id => {
    return db.query(
        `
        SELECT first, last, url, message, created_at, wallmessages.id AS wall_msg_id
        FROM wallmessages
        JOIN users
        ON wall_receiver_id = $1 AND wall_sender_id = users.id


        ORDER BY wallmessages.id DESC LIMIT 10
        `,
        [id]
    );
};
exports.addWallMessage = (senderId, receiverId, message) => {
    return db.query(
        `
        INSERT INTO wallmessages (wall_sender_id, wall_receiver_id, message)
        VALUES ($1, $2, $3)
        RETURNING true
        `,
        [senderId, receiverId, message]
    );
};

//OR (wall_receiver_id = $1 AND wall_sender_id = users.id)
// ON (wall_receiver_id = $1 AND wall_receiver_id = users.id)
