import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // member since time
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    followers: [
        {
            //id create by mongoDb
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            //id create by mongoDb
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    }


}, { timestamps: true })

const User = mongoose.model("User", userSchema); //it will be users
export default User;