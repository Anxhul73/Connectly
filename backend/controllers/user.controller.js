const User = require("../models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");

const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)    // fetching user
            .select("username email");

        if( !user ) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const posts = await Post.find({        // fetching posts
            user: req.params.id               // req.params.id === user.id
        })
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            user,
            postscount: posts.length,
            posts
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select("username email");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const posts = await Post.find({
            user: user.id
        })
        .sort({ createdAt: -1 });

        return res.status(200).json({
                success: true,
                user,
                postscount: posts.length,
                posts
            });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const followUser = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id"
            });
        }

        const currentUser = await User.findById(req.user.id);

        const targetUser = await User.findById(req.params.id);

        if( !targetUser ){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if( req.user.id === req.params.id ){
            return res.status(403).json({
                success: false,
                message: "You can't follow yourself."
            })
        }

        const alreadyFollowing = currentUser.following.some(
            user => user.toString() === req.params.id
        );

        if(alreadyFollowing) {
            currentUser.following = currentUser.following.filter(
                 user => user.toString() !== req.params.id
            );

            targetUser.followers = targetUser.followers.filter(
                user => user.toString() !== req.user.id
            )
        } else {
            currentUser.following.push(req.params.id)
            targetUser.followers.push(req.user.id)
        }

        await currentUser.save();
        await targetUser.save();

        return res.status(200).json({
            success: true,
            message: !alreadyFollowing? "User followed successfully" : "User unfollowed successfully",
            following: !alreadyFollowing,
            followersCount: targetUser.followers.length,
            followingCount: currentUser.following.length
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("followers", "username");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            count: user.followers.length,
            followers: user.followers
        });

    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("following", "username");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            count: user.following.length,
            following: user.following
        });

    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

module.exports = {
    getUserProfile,
    getCurrentUser,
    followUser,
    getFollowers,
    getFollowing,
};