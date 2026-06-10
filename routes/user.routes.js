const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const { getUserProfile, getCurrentUser, followUser, getFollowers, getFollowing, } = require("../controllers/user.controller");


router.get(
    "/me",
    protect,
    getCurrentUser,
);


router.get(
    "/:id", 
    getUserProfile
);

router.post(
    "/:id/follow",
    protect,
    followUser
);

router.get(
    "/:id/followers",
    protect,
    getFollowers
);

router.get(
    "/:id/following",
    protect,
    getFollowing
);

module.exports = router;