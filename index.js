const express = require("express");
const app = express();
const compression = require("compression");
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
    getFriendsWannabes
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

app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
            res.json({ relationship: "false" });
        } else {
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

// DO NOT DELETE
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// DO NOT DELETE

app.listen(8080, function() {
    console.log("I'm listening.");
});
