const express = require("express")
const router = express.Router()
const CodeAnalysis = require("../models/CodeAnalysis")
const Confidence = require("../models/Confidence")
const Emotion = require("../models/Emotion")
const AudioProcess = require("../models/AudioProcess")

router.get("/", async (req, res) => {
  try {
    const codeAnalysisData = await CodeAnalysis.findOne().sort({ timestamp: -1 })
    const confidenceData = await Confidence.findOne().sort({ timestamp: -1 })
    const emotionData = await Emotion.findOne().sort({ timestamp: -1 })
    const audioProcessData = await AudioProcess.findOne().sort({ timestamp: -1 })

    console.log("Fetched Confidence Data:", confidenceData)
    console.log("Fetched Emotion Data:", emotionData)
    console.log("Fetched Code Analysis Data:", codeAnalysisData)
    console.log("Fetched Audio Process Data:", audioProcessData)

    const responseData = {
      confidence: confidenceData,
      emotions: emotionData,
      code_analysis: codeAnalysisData,
      audio_process: audioProcessData,
    }

    res.json(responseData)
  } catch (err) {
    console.error("Failed to fetch report data:", err)
    res.status(500).json({ message: "Failed to fetch report data" })
  }
})

module.exports = router

