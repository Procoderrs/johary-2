import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

const storage = multer.memoryStorage();

export const uploadCategory = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Single image — categories ke liye
export const handleCategoryImageUpload = async (req, res, next) => {
  try {
    // req.file — single file (upload.single se aata hai)
    if (!req.file) return next();

    const uploadedUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "categories" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      const readable = new Readable();
      readable._read = () => {};
      readable.push(req.file.buffer);
      readable.push(null);
      readable.pipe(stream);
    });

    req.cloudinaryUrl = uploadedUrl; // controller mein yahi use hoga
    next();

  } catch (error) {
    console.error("Category image upload error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};