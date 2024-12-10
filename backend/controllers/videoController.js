const Video = require("../models/Video");

const saveVideoToDatabase = async (req, res) => {
  try {
    const { title, description, tags, driveLink } = req.body;
    const userId = req.user.id;

    if (!req.file && !driveLink) {
      return res
        .status(400)
        .json({ message: "No video file or link provided" });
    }

    if (req.file && driveLink) {
      return res.status(400).json({
        message:
          "You can either upload a video file or provide a Google Drive link, not both.",
      });
    }

    const newVideo = new Video({
      userId,
      title,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });

    if (req.file) {
      newVideo.fileSize = req.file.size;
      newVideo.filePath = req.file.filename; // Save the GridFS filename
    }

    if (driveLink) {
      newVideo.driveLink = driveLink;
    }

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error saving video:", error);
    res
      .status(500)
      .json({ message: "Failed to save video", error: error.message });
  }
};

const getUserVideos = async (req, res) => {
  try {
    const { userId, title, tags, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Build the query object dynamically based on filters
    const query = { userId };

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive title search
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $all: tagArray }; // Match all provided tags
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const total = await Video.countDocuments(query);

    // Fetch videos with pagination and sorting
    const videos = await Video.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ uploadedAt: -1 })
      .select("title description tags filePath driveLink uploadedAt"); // Include only necessary fields

    res.status(200).json({
      videos,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user videos", error: error.message });
  }
};

module.exports = { saveVideoToDatabase, getUserVideos };
