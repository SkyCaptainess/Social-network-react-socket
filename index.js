const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./passwordModules");
const { register } = require("./db");
const cookieSession = require("cookie-session");

app.use(compression());

app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(express.json());

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
    console.log("req body ");
    let firstName = req.body.first;
    console.log("getting first name: ", firstName);
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
            register(firstName, lastName, email, password)
                .then(({ rows }) => {
                    console.log("Am i getting rows?", rows);
                    req.session.userId = rows[0].id;
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.render("registration", { error: true });
                });
        });
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
