import express from "express";
import {
    getActiveBanners,
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
} from "../controllers/bannerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getActiveBanners).post(protect, admin, createBanner);
router.route("/admin").get(protect, admin, getAllBanners);
router.route("/:id").get(protect, admin, getBannerById).put(protect, admin, updateBanner).delete(protect, admin, deleteBanner);

export default router;
