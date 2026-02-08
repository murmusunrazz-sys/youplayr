const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  thumbnail: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video", VideoSchema);