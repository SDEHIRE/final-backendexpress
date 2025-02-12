const express = require("express")
const router = express.Router()
const multer = require("multer")
const crypto = require("crypto")
const Learner = require("../models/Learner")

const upload = multer({ dest: "uploads/" })

router.post("/register", upload.single("upload-photo"), async (req, res) => {
  try {
    const parseNullableNumber = (value) => (value === "" || isNaN(value) ? null : Number.parseFloat(value))
    const parseNullableInt = (value) => (value === "" || isNaN(value) ? null : Number.parseInt(value))

    const learnerData = {
      firstName: req.body["first-name"] || null,
      lastName: req.body["last-name"] || null,
      branch: req.body.branch || null,
      aadhar: req.body.aadhar || null,
      photo: req.file ? req.file.path : null,
      dob: req.body.dob ? new Date(req.body.dob) : null,
      gender: req.body.gender || null,
      tenthPercent: parseNullableNumber(req.body["tenth-percent"]),
      interDiplomaPercent: parseNullableNumber(req.body["inter-diploma-percent"]),
      eamcetRank: parseNullableInt(req.body["eamcet-rank"]),
      ecetRank: parseNullableInt(req.body["ecet-rank"]),
      cgpa_1_1: parseNullableNumber(req.body["cgpa-1-1"]),
      cgpa_1_2: parseNullableNumber(req.body["cgpa-1-2"]),
      cgpa_2_1: parseNullableNumber(req.body["cgpa-2-1"]),
      cgpa_2_2: parseNullableNumber(req.body["cgpa-2-2"]),
      cgpa_3_1: parseNullableNumber(req.body["cgpa-3-1"]),
      cgpa_3_2: parseNullableNumber(req.body["cgpa-3-2"]),
      cgpa_4_1: parseNullableNumber(req.body["cgpa-4-1"]),
      cgpa_4_2: parseNullableNumber(req.body["cgpa-4-2"]),
      activeBacklogs: parseNullableInt(req.body["active-backlogs"]),
      backlogsCleared: parseNullableInt(req.body["backlogs-cleared"]),
      yearGaps: parseNullableInt(req.body["year-gaps"]),
      collegeEmail: req.body["college-email"] || null,
      gmailId: req.body["gmail-id"] || null,
      mobileNumber: req.body["mobile-number"] || null,
    }

    const newLearner = new Learner(learnerData)
    await newLearner.save()

    res.status(200).json({ message: "Learner registered successfully!" })
  } catch (error) {
    console.error("Error registering learner:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/login", async (req, res) => {
  const { firstName, mobileNumber } = req.body

  try {
    const learner = await Learner.findOne({ firstName, mobileNumber })

    if (learner) {
      const sessionId = crypto.randomBytes(16).toString("hex")
      learner.sessionId = sessionId
      await learner.save()

      res.json({ success: true, sessionId })
    } else {
      res.status(404).json({ success: false, message: "Invalid credentials" })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" })
  }
})

module.exports = router

