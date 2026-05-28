const Post = require("../models/post.model");
const uploadFile = require("../services/storage.service");

const createPost = async (req, res) => {

    try {

        const result = await uploadFile(req.file);

        const post = await Post.create({
            caption: req.body.caption,
            image: result.url
        });

        res.status(201).json({
            success: true,
            post
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
         
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const getPostById = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
         
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updatePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if(!post) {
            res.status(404).json({
                success: false, 
                message: "Post not found"
            })
        }

        if(req.body.caption) {
            post.caption = req.body.caption;
        }

        if(req.file) {
            const uploadedImage = await uploadFile(req.file);
            post.image = uploadedImage.url;
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        
        if(!post) {
            res.status(404).json({
                success: false, 
                message: "Post not found"
            });
        }

        await post.deleteOne();
        
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}  

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};