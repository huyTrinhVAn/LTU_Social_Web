import express from "express";

import path from "path";
import authRoutes from "./routes/auth.route.js";  // Correct path
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js";

import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"


// Middleware to handle JSON
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();
app.use(express.json({ limit: "5mb" })); // tp parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data encoded
app.use(cookieParser());
// Use the auth routes at the path "/api/auth"
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
// Start the server on port 
app.listen(PORT, () => {
    console.log(`Sever is running on ${PORT}`);
    connectMongoDB();
});
