const cloudinary = require('../cloudinaryConfig');
const Video = require('../models/Video');

// Controller to handle video upload
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const userId = req.user.id; // Assume we have authenticated user via middleware

    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Stream the video file directly to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video' }, // Specify that this is a video upload
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      req.file.stream.pipe(stream); // Pipe the file stream to Cloudinary
    });

    // Save video metadata to MongoDB
    const newVideo = new Video({
      userId,
      title,
      description,
      tags,
      fileSize: req.file.size,
      fileUrl: uploadResult.secure_url, // Cloudinary URL for the uploaded video
    });

    await newVideo.save();

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: newVideo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload video', error: error.message });
  }
};
