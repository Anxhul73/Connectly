const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const { getUserProfile, getCurrentUser, followUser, getFollowers, getFollowing, } = require("../controllers/user.controller");
const { getFeed, getSuggestions } = require("../controllers/feed.controller");


router.get(
    "/me",
    protect,
    getCurrentUser,
);

router.get(
    "/feed",
    protect,
    getFeed
);

router.get(
    "/suggestions",
    protect,
    getSuggestions
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

router.get(
    "/:id", 
    getUserProfile
);

module.exports = router;