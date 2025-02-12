const mongoose = require("mongoose")

const learnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  branch: String,
  aadhar: String,
  photo: String,
  dob: Date,
  gender: String,
  tenthPercent: Number,
  interDiplomaPercent: Number,
  eamcetRank: Number,
  ecetRank: Number,
  cgpa_1_1: Number,
  cgpa_1_2: Number,
  cgpa_2_1: Number,
  cgpa_2_2: Number,
  cgpa_3_1: Number,
  cgpa_3_2: Number,
  cgpa_4_1: Number,
  cgpa_4_2: Number,
  activeBacklogs: Number,
  backlogsCleared: Number,
  yearGaps: Number,
  collegeEmail: String,
  gmailId: String,
  mobileNumber: String,
  sessionId: String,
})

module.exports = mongoose.model("Learner", learnerSchema)

