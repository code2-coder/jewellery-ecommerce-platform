import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes
router.get("/profile", protect, getUserProfile);

// Example of an admin-only route (you can add this to other routes as needed)
// router.get("/admin-dashboard", protect, admin, adminDashboardController);

export default router;
