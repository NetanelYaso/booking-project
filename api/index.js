const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
})



app.listen(4000);

// (port, () => {
//     console.log(`server is up at port : ${port}`);
// })