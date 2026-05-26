import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "aurelia_jewellery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1920, height: 1080, crop: "limit" }],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    res.send({
      message: "Image uploaded successfully",
      image: req.file.path,
    });
  } else {
    res.status(400).send({ message: "No image file provided" });
  }
});

export default router;
