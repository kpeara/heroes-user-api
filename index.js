const express = require("express");
const yup = require("yup"); // for validation later
const cors = require("cors");
const db = require("./dbconnect");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
const port = 3002;

app.get("/", (req, res) => {
    res.send("<h1>Heroes User API</h1>");
});

// gets id of user
app.get("/api/user/id", (req, res) => {
    const data = [req.body.username, req.body.password];
    const sql = "SELECT id FROM user WHERE username = ? AND password = ?";
    db.get(sql, data, (err, row) => {
        if (err) console.log(err.message);
        else {
            if (!row) res.status(404).sendStatus("User Id does not exist");
            else res.send(row);
        }
    });
})

// register a user
app.post("/api/user/add", (req, res) => {
    const data = [req.body.username, req.body.password]
    const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
    db.run(sql, data, function (err) {
        if (err) console.log(err.message);
        else {
            res.send("User registered.");
        }
    })
});

// inside heroes app or user account app (where user can change password) or delete account
// client side should make user enter password to confirm deletion
// remove based on id
app.delete("/api/user/remove", (req, res) => {
    const sql = `DELETE FROM user where id = ${req.body.id}`;
    db.run(sql, function (err) {
        if (err) console.log(err.message);
        else {
            res.send("User deleted.");
        }
    })
});

app.listen(port, () => console.log(`listening on port ${port}`));
