import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollower, getSuggestedUser, getUserProfile, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);

router.get("/suggested", protectRoute, getSuggestedUser);

router.post("/follow/:id", protectRoute, followUnfollower);

router.post("/update", protectRoute, updateUser);
export default router;