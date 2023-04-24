const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

require("dotenv").config();
const app = express();
mongoose.connect(process.env.MONGO_URL);

app.use(express.json({ extened: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        credentials: true,
        origin: "http://127.0.0.1:5173",
    }
));

const User = require("./models/user")

const bcryptSalt = bcrypt.genSaltSync(10);

app.get("/test", (req, res) => {
    res.json("test ok");
})


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt, (err, hash) => {
                console.log(hash);
            })
        });
        res.json(user);
    }
    catch (error) {
        res.status(422).json(error);
    }


})


const saltRounds = 10;
const plainPassword = 'password123';

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(plainPassword, salt, (err, hash) => {
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.json(user, "Found");
    }
    else {
        res.json("Not Found");
    }
})

app.listen(4000);

// (port, () => {
//     console.log(`server is up at port : ${port}`);
// })