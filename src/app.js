const express = require("express");

const authRoutes = require("../routes/auth.routes");

const postRoutes = require("../routes/post.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use("/posts", postRoutes);

module.exports = app;