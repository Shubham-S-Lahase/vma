const express = require("express");
const router = express.Router();
const { saveVideoToDatabase, getUserVideos, getVideoDetails, updateVideoMetadata } = require("../controllers/videoController");
const { authenticateUser } = require("../middleware/authenticate");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const Video = require("../models/Video");

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

const streamVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video || !video.filePath) {
      return res.status(404).json({ message: "Video file not found" });
    }

    const fileStream = gfs.openDownloadStreamByName(video.filePath);
    res.set("Content-Type", "video/mp4");
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).json({ message: "Failed to stream video" });
  }
};



// Route to upload a video
router.post("/upload", authenticateUser, upload.single("file"), saveVideoToDatabase);

// Route to fetch all videos for the logged-in user
router.get("/", authenticateUser, getUserVideos);

router.get("/:id", authenticateUser, getVideoDetails);

router.get("/stream/:id", authenticateUser, streamVideo);

// Route to update video metadata
router.put("/:id", authenticateUser, updateVideoMetadata);


module.exports = router;
