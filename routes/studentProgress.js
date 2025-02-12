const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb")
const { MONGODB_URI } = require("../config/config")

router.get("/", async (req, res) => {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const database = client.db("sdehire")
    const sessions = database.collection("sessions")

    const username = req.query.username

    if (!username) {
      return res.status(400).json({ error: "Username is required" })
    }

    const userSessions = await sessions.find({ username }).toArray()

    if (userSessions.length === 0) {
      return res.status(404).json({ error: "No sessions found for this user" })
    }

    const dailyProgress = {}

    userSessions.forEach((session) => {
      const sessionDate = new Date(session.createdAt).toISOString().split("T")[0]

      if (!dailyProgress[sessionDate]) {
        dailyProgress[sessionDate] = {
          problemsAttempted: 0,
          passedTestCases: 0,
        }
      }

      dailyProgress[sessionDate].problemsAttempted += 1
      dailyProgress[sessionDate].passedTestCases += session.evaluationResults
        ? session.evaluationResults.reduce((sum, test) => sum + (test.passed ? 1 : 0), 0)
        : 0
    })

    const progressData = Object.keys(dailyProgress).map((date) => ({
      date,
      problemsAttempted: dailyProgress[date].problemsAttempted,
      passedTestCases: dailyProgress[date].passedTestCases,
    }))

    const totalProblemsAttempted = progressData.reduce((sum, day) => sum + day.problemsAttempted, 0)
    const totalPassedTestCases = progressData.reduce((sum, day) => sum + day.passedTestCases, 0)

    let predictedSalary = 120000
    const targetProblems = 650

    if (totalProblemsAttempted >= 15) {
      predictedSalary = Math.min(4500000, 120000 + (totalProblemsAttempted - 15) * (4400000 / (targetProblems - 15)))
    }

    return res.status(200).json({
      username: userSessions[0].username,
      totalProblemsAttempted,
      totalPassedTestCases,
      predictedSalary,
      progressData,
    })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ error: "Internal server error" })
  } finally {
    await client.close()
  }
})

module.exports = router

