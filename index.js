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

// gets unique id of user
app.get("/api/user", (req, res) => {
    const data = [req.body.username, req.body.password];
    const sql = "SELECT id FROM user WHERE username = ? AND password = ?";
    db.get(sql, data, (err, row) => {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            if (!row) res.status(400).send("User Id does not exist");
            else res.send(row);
        }
    });
})

// register a user
app.post("/api/user", (req, res) => {
    validate(req.body)
        .then(() => {
            const data = [req.body.username, req.body.password]
            const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
            db.run(sql, data, function (err) {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err.message);
                }
                else {
                    res.send("User registered.");
                }
            })
        })
        .catch(err => {
            if (err) res.status(400).send(err.errors[0]);
        });
});

// inside heroes app or user account app (where user can change password) or delete account
// client side should make user enter password to confirm deletion
// remove based on id
// user won't be able to delete based on wrong id because id must first gotten from GET
app.delete("/api/user", (req, res) => {
    const sql = `DELETE FROM user where id = ${req.body.id}`;
    db.run(sql, function (err) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else {
            res.send("User deleted.");
        }
    })
});

// add PUT request so that user can update their password

function validate(user) {
    const schema = yup.object().shape({
        username: yup.string().min(3).max(15).required(),
        password: yup.string().required() // TODO: ADD LENGTH OF HASH LATER
    });
    return schema.validate(user);
}

app.listen(port, () => console.log(`listening on port ${port}`));
