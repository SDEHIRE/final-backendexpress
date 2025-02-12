const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
  },
  userCode: String,
  language: String,
  evaluationResults: [Object],
  totalPassed: Number,
  nextQuestion: Object,
  isOverlapping: Boolean,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Session", sessionSchema)

