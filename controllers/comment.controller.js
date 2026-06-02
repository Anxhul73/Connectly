const { NotFoundError } = require("@imagekit/nodejs");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");


const createComment = async ( req, res ) => {
    try {

        const { text } = req.body;

        if (!text || text.trim() == "") {
            return res.status(400).json({
                success: false,
                message: "Text is required."
            });
        }

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post doesn't exists."
            });
        }

        const comment = await Comment.create({
            text,
            user: req.user.id,
            post: req.params.id
        })

        return res.status(201).json({
            success: true,
            message: "Comment sent successfully.",
            comment
         })


    } catch ( error ) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getComments = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                success: false, 
                message: "Post not found"
            });
        }

        const comments = await Comment.find({
            post: req.params.id
        })
        .populate("user", "username")
        .sort({ createdAt: -1 }); 

        return res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateComment = async ( req, res ) => {
    try {
        // Extracting text 
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Text is required."
            });
        }
       
        const comment = await Comment.findById(req.params.commentId);  // Fetching comment

        // Check if comment is present or not.
        if( !comment ) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

       // Check if comment belongs to user who's updating it 
        if( comment.user.toString() !== req.user.id ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }
        
        comment.text = text;

        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
} 
const deleteComment = async ( req, res ) => {
    try {
        const comment = await Comment.findById( req.params.commentId);

        if( !comment ) {
            return res.status(404).json({
                success: false, 
                message: "Comment not found"
            });
        }

        if( comment.user.toString() !== req.user.id ){
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            })
        }

        await Comment.findByIdAndDelete( req.params.commentId );

        return res.status(200).json({
            success: true, 
            message: "Comment deleted successfully"
        });

    } catch ( error ) {
        return res.status(500).json({
            success: true,
            message: "Server error."
        });
    }
}

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
}