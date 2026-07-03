const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    images: [
        {
            url: {
                type: String,
                required: true
            },

            fileId: {
                type: String,
                required: true
            },
        }
    ],

    caption: {
        type: String,
        default: ""
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;