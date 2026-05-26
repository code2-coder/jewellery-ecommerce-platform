import Banner from "../models/Banner.js";

// @desc    Fetch all active banners
// @route   GET /api/banners
// @access  Public
export const getActiveBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Fetch all banners (for admin)
// @route   GET /api/banners/admin
// @access  Private/Admin
export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({}).sort({ createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Fetch single banner
// @route   GET /api/banners/:id
// @access  Private/Admin
export const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (banner) {
            res.json(banner);
        } else {
            res.status(404).json({ message: "Banner not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a banner
// @route   POST /api/banners
// @access  Private/Admin
export const createBanner = async (req, res) => {
    try {
        const banner = new Banner({
            image: "/images/large_gold_ring.png",
            link: "/",
            isActive: false,
        });

        const createdBanner = await banner.save();
        res.status(201).json(createdBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
export const updateBanner = async (req, res) => {
    try {
        const { image, link, isActive } = req.body;

        const banner = await Banner.findById(req.params.id);

        if (banner) {
            banner.image = image || banner.image;
            banner.link = link || banner.link;
            banner.isActive = isActive !== undefined ? isActive : banner.isActive;

            const updatedBanner = await banner.save();
            res.json(updatedBanner);
        } else {
            res.status(404).json({ message: "Banner not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (banner) {
            await Banner.deleteOne({ _id: banner._id });
            res.json({ message: "Banner removed" });
        } else {
            res.status(404).json({ message: "Banner not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
