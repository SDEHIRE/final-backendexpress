const mongoose = require("mongoose")

const confidenceSchema = new mongoose.Schema({
  original_sentence: String,
  modified_sentence: String,
  rewritten_sentence: String,
  original_score: Number,
  modified_score: Number,
  rewritten_score: Number,
  replaced_words: Array,
  timestamp: Date,
})

module.exports = mongoose.model("Confidence", confidenceSchema, "confidence")

