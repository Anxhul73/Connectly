const express = require("express");

const router = express.Router();
const upload = require("../middlewares/upload.middleware");
// console.log(upload);

const {
    createPost, getAllPosts, getPostById, updatePost, deletePost, toggleLike,
    getLikes, 
} = require("../controllers/post.controller");
const protect = require("../middlewares/auth.middleware");

router.post(
  "/create-post",
  (req, res, next) => {
    //   console.log("MIDDLEWARE HIT");
      next();
  },
  protect,
  upload.array("images", 10),
  createPost
);

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.put(
  "/:id", 
  protect,
  upload.array("images", 10),
  updatePost
  )

router.delete(
  "/:id",
  protect,
  deletePost
  )


  router.post(
    "/:id/like",
    protect,
    toggleLike,
  )

  router.get(
    "/:id/likes",
    getLikes
  )


module.exports = router;