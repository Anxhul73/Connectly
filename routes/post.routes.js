const express = require("express");

const router = express.Router();
const upload = require("../middlewares/upload.middleware");
// console.log(upload);

const {
    createPost, getAllPosts, getPostById, updatePost, deletePost
} = require("../controllers/post.controller");
const protect = require("../middlewares/auth.middleware");

router.post(
  "/create-post",
  (req, res, next) => {
    //   console.log("MIDDLEWARE HIT");
      next();
  },
  protect,
  upload.single("image"),
  createPost
);

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.put(
  "/:id", 
  protect,
  upload.single("image"),
  updatePost
  )

router.delete(
  "/:id",
  protect,
  deletePost
  )


module.exports = router;