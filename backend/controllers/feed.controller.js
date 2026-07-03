const Post = require("../models/post.model");
const User = require("../models/user.model");

const getFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if(!currentUser) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
      }

    const feedUsers = [...currentUser.following, currentUser._id];

    const posts = await Post.find({
      user: { $in: feedUsers },
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getSuggestions = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user.id);

        const excludeUsers = [
            ...currentUser.following, 
            req.user.id
        ];

        const users = await User.find({
            _id: {
                $nin: excludeUsers
            }
        })
        .select("username")
        .limit(10);

        return res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false, 
            message: "Server error"
        })
    }
}

module.exports = {
  getFeed,
  getSuggestions
};
