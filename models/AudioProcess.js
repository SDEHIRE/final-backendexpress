const mongoose = require("mongoose")

const audioProcessSchema = new mongoose.Schema({
  confidence: Number,
  transcript: String,
  timestamp: Date,
})

module.exports = mongoose.model("AudioProcess", audioProcessSchema, "audioprocess")

