const express = require("express");
const cors = require('cors')

const postRoutes = require("./api/routes/posts")
const userRoutes = require("./api/routes/users")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/social",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log("Connected to MongoDB")
    ).catch((err) => console.log("DB connection refused: " + err));

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes)
app.use("/post", postRoutes);

app.use((req, res, next) => {
    let error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.message,
            message: "Requested endpoint does not exists"
        }
    })
});

module.exports = app;