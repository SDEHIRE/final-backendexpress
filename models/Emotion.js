const mongoose = require("mongoose")

const emotionSchema = new mongoose.Schema({
  timestamp: Date,
  emotion: String,
  emotion_scores: {
    angry: Number,
    disgust: Number,
    fear: Number,
    happy: Number,
    sad: Number,
    surprise: Number,
    neutral: Number,
  },
})

module.exports = mongoose.model("Emotion", emotionSchema, "emotions")

