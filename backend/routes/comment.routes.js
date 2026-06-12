const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {
    createComment, 
    getComments,
    updateComment,
    deleteComment
} = require("../controllers/comment.controller");

router.post(
    "/:id/comments",
    protect,
    createComment
);

router.get(
    "/:id/comments",
    getComments
)

router.put(
    "/comments/:commentId",
    protect,
    updateComment
)

router.delete(
    "/comments/:commentId",
    protect,
    deleteComment
)
module.exports = router;