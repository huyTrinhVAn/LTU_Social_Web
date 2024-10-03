import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";  // Correct path

const router = express.Router();

// Define the routes and map them to controller methods
router.post("/signup", signup);  // POST request for signup
router.post("/login", login);    // POST request for login
router.get("/logout", logout);   // GET request for logout

export default router;
