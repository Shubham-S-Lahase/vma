const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  fileSize: { type: Number },
  filePath: { type: String },
  driveLink: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
