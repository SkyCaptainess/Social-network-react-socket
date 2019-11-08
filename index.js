const express = require("express");
const app = express();
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const { hash, compare } = require("./passwordModules");
const {
    register,
    getPassword,
    getUser,
    addImage,
    addBio,
    getNewUsers,
    findPeople,
    getInitialStatus,
    sendRequest,
    acceptRequest,
    endFriendship,
    getFriendsWannabes,
    addMessage,
    getLastTenChatMessages,
    getNewMessage,
    getWallMessages,
    addWallMessage
} = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static("./public"));

// app.use(
//     cookieSession({
//         secret: `I'm always angry.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

app.use(express.json());
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    let email = req.body.email;
    let origPswd = req.body.password;
    let password = "";

    hash(origPswd)
        .then(result => {
            password = result;
            return password;
        })

        .then(password => {
            console.log("testing ", password);
            register(firstName, lastName, email, password).then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({
                    success: true
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/login", (req, res) => {
    let id;
    let email = req.body.email;
    let logPass = req.body.password;
    getPassword(email)
        .then(({ rows }) => {
            let receivedPass = rows[0].password;
            let receivedId = rows[0].id;
            let isMatch = compare(logPass, receivedPass);
            id = receivedId;
            return isMatch;
        })
        .then(isMatch => {
            if (isMatch) {
                req.session.userId = id;
                res.json({
                    success: true
                });
            } else {
                res.sendStatus(500);
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/user", async (req, res) => {
    try {
        const { rows } = await getUser(req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/users/new", async (req, res) => {
    try {
        const { rows } = await getNewUsers(req.session.userId);
        console.log("three new users: ", rows);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/users/:name", async (req, res) => {
    try {
        const { rows } = await findPeople(req.params.name);
        const filteredRows = rows.filter(row => row.id != req.session.userId);
        res.json(filteredRows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/upload", uploader.single("image"), s3.upload, function(req, res) {
    const url = `${s3Url}${req.file.filename}`;
    console.log("url: ", url);
    addImage(url, req.session.userId)
        .then(function({ rows }) {
            console.log("upload rows: ", rows);
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/editBio", (req, res) => {
    console.log("editbio req body ", req.body);
    addBio(req.body.bio, req.session.userId)
        .then(function({ rows }) {
            res.json(rows[0].bio);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const { rows } = await getUser(req.params.id);
        res.json({
            rows: rows[0],
            cookieId: req.session.userId
        });
    } catch (err) {
        console.log("error getting other profile: ", err);
        res.sendStatus(500);
    }
});

app.get("/get-initial-status/:id", async (req, res) => {
    try {
        const { rows } = await getInitialStatus(
            req.params.id,
            req.session.userId
        );
        if (rows.length == 0) {
            console.log("initial status - rel false");
            res.json({ relationship: "false" });
        } else {
            console.log("initial status:", rows[0]);
            res.json(rows[0]);
        }
    } catch (err) {
        console.log("error getting initial status: ", err);
        res.sendStatus(500);
    }
});

app.post("/send-friend-request/:id", async (req, res) => {
    try {
        const { rows } = await sendRequest(req.params.id, req.session.userId);

        res.json(rows);
    } catch (err) {
        console.log("error getting initial status: ", err);
        res.sendStatus(500);
    }
});

app.post("/accept-friend-request/:id", async (req, res) => {
    try {
        const { rows } = await acceptRequest(req.params.id, req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("error getting initial status: ", err);
        res.sendStatus(500);
    }
});
app.post("/end-friendship/:id", async (req, res) => {
    try {
        const { rows } = await endFriendship(req.params.id, req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("error getting initial status: ", err);
        res.sendStatus(500);
    }
});

app.get("/friends-wannabes", async (req, res) => {
    try {
        const { rows } = await getFriendsWannabes(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("error getting friends-wannabes: ", err);
        res.sendStatus(500);
    }
});

app.get("/wall-messages/:id", async (req, res) => {
    let wallId = req.params.id;
    console.log("first wallid : ", wallId);

    try {
        const { rows } = await getWallMessages(wallId);
        console.log("wall msg ", rows);
        res.json(rows);
    } catch (err) {
        console.log("error getting wall messages: ", err);
        res.sendStatus(500);
    }
});

app.post("/addWallMessage/:id", async (req, res) => {
    console.log("addWallMessage req body ", req.body);
    try {
        const { rows } = await addWallMessage(
            req.session.userId,
            req.params.id,
            req.body.wallMessage
        );
        console.log("wall msg ", rows);
        res.json(rows);
    } catch (err) {
        console.log("error getting wall messages: ", err);
        res.sendStatus(500);
    }
});

// app.post("friend-request", (req, res) => {
//     io.sockets.sockets[socketIdOfRecipient].emit("newFriendRequest");
// });

// DO NOT DELETE
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// DO NOT DELETE

// SERVER SIDE SOCKET CODE //
const onlineUsers = {};
io.on("connection", socket => {
    console.log(`a socket with the id ${socket.id} just connected`);
    let userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;
    socket.on("iAmHere", data => {
        console.log(data.message);
    });
    // socket.emit("goodToSeeYou", {
    //     message: "you look marvellous"
    // });
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    getLastTenChatMessages().then(data => {
        console.log("get last messages: ", data.rows);
        io.sockets.emit("lastTenMessages", data.rows);
    });

    // socket.on("getLastTenChatMessages", () => {
    //     getLastTenChatMessages().then(data => {
    //         console.log("get last messages: ", data.rows);
    //         io.sockets.emit("lastTenMessages", data.rows);
    //     });
    // });

    socket.on("chatMessage", async msg => {
        console.log("my amazing chat message", msg);
        await addMessage(msg, userId);
        getNewMessage(userId).then(({ rows }) => {
            console.log("chatmessage data: ", rows);
            io.sockets.emit("chatMessage", rows);
        });
    });

    // socket.on("newMessage", newMessage => {
    // do stuff in here...
    // query - info with sender userId first last imgUrl
    // emit message OBJECT to everybody - should look like object in last10msgs
    // storeit in the database
    // });

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        console.log(`a socket with the id ${socket.id} just disconnected`);
        io.sockets.emit("somebodyNew");
        //seding a message to everybody
    });
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
