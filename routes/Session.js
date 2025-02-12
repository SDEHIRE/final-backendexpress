const express = require("express")
const router = express.Router()
const Session = require("../models/Session")

router.post("/saveSessionData", async (req, res) => {
  const sessionData = req.body

  try {
    const newSession = new Session({
      ...sessionData,
    })
    await newSession.save()
    res.status(201).json({ message: "Session data saved successfully!" })
  } catch (error) {
    console.error("Error saving session data:", error)
    res.status(500).json({ message: "Failed to save session data" })
  }
})

module.exports = router

