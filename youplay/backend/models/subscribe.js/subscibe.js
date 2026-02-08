const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Subscribe", SubscribeSchema);