const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  QID: Number,
  QTitle: String,
  QText: String,
  QCategory: String,
  hints: [
    {
      hint: String,
      code: String,
    },
  ],
  solution: {
    code: String,
  },
  test_cases: [
    {
      input: String,
      expected_output: String,
    },
  ],
  totalPassed: Number,
})

module.exports = mongoose.model("Question", questionSchema)

