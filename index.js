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
app.delete("/api/user/remove", (req, res) => {

});

app.listen(port, () => console.log(`listening on port ${port}`));
