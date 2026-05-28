const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");

const {
    createPost, getAllPosts, getPostById, updatePost, deletePost
} = require("../controllers/post.controller");

router.post(
    "/create-post",
    upload.single("image"),
    createPost
);

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.put("/:id", upload.single("image"), updatePost)

router.delete("/:id", deletePost)


module.exports = router;