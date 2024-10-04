import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";  // Correct path
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Define the routes and map them to controller methods
router.get("/me", protectRoute, getMe);
router.post("/signup", signup);  // POST request for signup
router.post("/login", login);    // POST request for login
router.post("/logout", logout);   // GET request for logout

export default router;
