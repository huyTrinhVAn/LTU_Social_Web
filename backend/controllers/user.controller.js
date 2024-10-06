import Notification from "../models/notification.model.js";
import User from "../models/user.models.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getUserProfile: ", error.message);

    }
}
export const followUnfollower = async (req, res) => {
    try {
        const { id } = req.params;
        const userToMOdify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can follow/Unfollow yourself" });
        }

        if (!userToMOdify || !currentUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            // todo: return the id of the user as a response
            res.status(200).json({ message: "User unfollow successfully" });
        } else {
            // follow user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            // Send notification
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToMOdify._id
            });
            await newNotification.save();
            // todo: return the id of the user as a response
            res.status(200).json({ message: "User follow successfully" });
        }
    } catch (error) {
        console.log("Error in followUnfollower : ", error.message);
        res.status(500).json({ error: error.message })
    }
}
export const getSuggestedUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const userFollowedByMe = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ])
        const filltedUsers = users.filter(user => !userFollowedByMe.following.includes(user._id));
        const suggestedUsers = filltedUsers.slice(0, 4);

        suggestedUsers.forEach(user => user.password = null);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log('Error in suggestedUsers: ', error.message);
        res.status(500).json({ error: error.message });

    }
}