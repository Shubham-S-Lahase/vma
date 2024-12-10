const express = require("express");
const router = express.Router();
const { saveVideoToDatabase, getUserVideos } = require("../controllers/videoController");
const { authenticateUser } = require("../middleware/authenticate");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

// Access the existing MongoDB connection
const conn = mongoose.connection;

// Initialize GridFS
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
});

// Configure Multer GridFS Storage
const storage = new GridFsStorage({
  db: conn,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads", // Bucket name in GridFS
    };
  },
});

const upload = multer({ storage });

// Route to upload a video
router.post("/upload", authenticateUser, upload.single("file"), saveVideoToDatabase);

// Route to fetch all videos for the logged-in user
router.get("/", authenticateUser, getUserVideos);

module.exports = router;
