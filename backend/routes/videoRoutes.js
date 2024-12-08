const express = require("express");
const router = express.Router();
const {
  uploadVideo,
  getUserVideos,
} = require("../controllers/videoController");
const { authenticateUser } = require("../middleware/authenticate");
const multer = require("multer");
const multerStorage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage: multerStorage }); // Use memory storage for uploads

// Route to upload a video
router.post("/upload", authenticateUser, upload.single("video"), uploadVideo);

// Route to fetch all videos for the logged-in user
router.get("/", authenticateUser, getUserVideos);

module.exports = router;
