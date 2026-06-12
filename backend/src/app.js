const express = require("express");

const authRoutes = require("../routes/auth.routes");

const postRoutes = require("../routes/post.routes");
const commentRoutes = require("../routes/comment.routes");
const userRoutes = require("../routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use("/posts", postRoutes);
app.use("/posts", commentRoutes);

app.use("/users", userRoutes);

module.exports = app;