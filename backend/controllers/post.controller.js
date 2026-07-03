const Post = require("../models/post.model");
const {uploadFile, deleteFile} = require("../services/storage.service");

const createPost = async (req, res) => {

    try {
        // console.log(req.headers["content-type"]);
        // console.log("FILE:", req.file);
        // console.log("BODY:", req.body);

        
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No image attached"
            })
        }

        if(req.files.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Can't upload more than 10 images"
            })
        }

        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const result = await uploadFile(file);

                return {
                    url: result.url,
                    fileId: result.fileId,
                }

            })
        ) 

        const post = await Post.create({
            images: uploadedImages,
            caption: req.body.caption,
            user: req.user.id
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
        const posts = await Post.find()
            .populate("user", "username")
            .sort({ createdAt: -1 });

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
        const post = await Post.findById(req.params.id)
        .populate("user", "username")
        .sort({ createdAt: -1 });

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

        // console.log(req.user);
        const post = await Post.findById(req.params.id);

        // console.log("Logged User:", req.user.id);
        // console.log("Post User:", post.user?.toString());

        if(!post) {
           return res.status(404).json({
                success: false, 
                message: "Post not found"
            })
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }

        if (req.body.caption !== undefined) {
          post.caption = req.body.caption;
        }

        if (req.files && req.files.length > 0) {
          const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
              const result = await uploadFile(file);

              return {
                url: result.url,
                fileId: result.fileId,
              };
            }),
          );

          await Promise.all(
            post.images.map((image) => deleteFile(image.fileId)),
          );

          post.images = uploadedImages;
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
           return res.status(404).json({
                success: false, 
                message: "Post not found"
            });
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }
        
        await Promise.all(
            post.images.map(async (image) => deleteFile(image.fileId))
        );

        await Post.findByIdAndDelete(req.params.id);
        
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

const toggleLike = async ( req, res ) => {
    try{ 

        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.some(
            like => like.toString() === req.user.id
        );

        if(alreadyLiked) {
            post.likes = post.likes.filter(
                likes => likes.toString() !== req.user.id 
            );
        } else {
            post.likes.push(req.user.id);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: post.likes.length
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getLikes = async ( req, res ) => {
    try {

        const post = await Post.findById(req.params.id)
            .populate("likes", "username");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            count: post.likes.length,
            users: post.likes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLike,
    getLikes,
};