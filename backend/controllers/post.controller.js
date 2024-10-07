import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;

        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!text && !img) {
            return res.status(400).json({ error: "Post must have text or imgae" });
        }
        if (img) {
            const upLoadedResponse = await cloudinary.uploader.upload(img);
            img = upLoadedResponse.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            img
        })
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Interal error sever" });
        console.log("Error in createPost controller: ", error);

    }
};
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }
        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted sucessfully" });
    } catch (error) {
        console.log("Error in DeletePost controller.js :", error);
        res.status(500).json({ error: "Internal sever error" });

    }
}
export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        if (!text) {
            return res.status(400).json({ error: "text field  is required" });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comment = { user: userId, text };
        post.comments.push(comment);
        await post.save();
        res.status(200).json(post)
    } catch (error) {
        console.log("Error in commentOnPost controller.js :", error);
        res.status(500).json({ error: "Interal sever error" });

    }
}
export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            // like the post
            post.likes.push(userId);
            await post.save();
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
            })
            await notification.save();
            res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        console.log("Error in likeUnlikePost controller.js :", error);
        res.status(500).json({ error: "Internal error sever" });

    }
}
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            });
        if (posts.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });

    }
};