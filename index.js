require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const {protect, check_user} = require("./middleware/authMiddleware");
mongoose.connect(process.env.DB_URI, (err) => {
    if(err) throw err;
    console.log("Connected to MongoDB.")
})

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser())

const Patient = require("./models/patient");
app.use("*", check_user)
app.use("/", require("./routes/auth"))
app.use("/patients", require("./routes/patient"))
app.get("/", protect, async (req, res) => {
    return res.redirect("/patients")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running at port ${PORT}`)
});