const express = require("express")
const router = express.Router()
const Question = require("../models/Question")
const fs = require("fs")
const { exec, execSync } = require("child_process")

router.get("/random", async (req, res) => {
  try {
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }])

    if (!randomQuestion || randomQuestion.length === 0) {
      return res.status(404).json({ success: false, message: "No question found" })
    }

    res.json(randomQuestion[0])
  } catch (err) {
    console.error("Failed to fetch random question:", err)
    res.status(500).json({ success: false, message: "Failed to fetch random question" })
  }
})

router.post("/compile", (req, res) => {
  const { code } = req.body
  if (!code) return res.status(400).json({ error: "No code provided." })

  const tempFilePath = "./tempCode.py"
  fs.writeFileSync(tempFilePath, code)

  exec(`python ${tempFilePath}`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFilePath)
    if (error) {
      return res.json({ output: stderr || error.message })
    }
    res.json({ output: stdout || "No output from code." })
  })
})

router.post("/evaluate", async (req, res) => {
  const { code, testCases, questionId } = req.body

  if (!code || !testCases || !questionId) {
    return res.status(400).json({ error: "Code, test cases, or questionId is missing." })
  }

  const tempFilePath = "./tempCode.py"
  const tempTestFilePath = "./tempTestCode.py"

  try {
    fs.writeFileSync(tempFilePath, code)

    const results = []
    let totalPassed = 0

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      const { input, expected_output } = testCase

      const testCode = `
${code}
print(${input})
`

      fs.writeFileSync(tempTestFilePath, testCode)

      try {
        const stdout = execSync(`python ${tempTestFilePath}`).toString().trim()
        const passed = stdout === expected_output
        if (passed) totalPassed++

        results.push({
          input,
          expectedOutput: expected_output,
          actualOutput: stdout,
          passed: passed,
        })
      } catch (error) {
        results.push({
          input,
          expectedOutput: expected_output,
          actualOutput: error.message,
          passed: false,
        })
      }
    }

    fs.unlinkSync(tempFilePath)
    fs.unlinkSync(tempTestFilePath)

    await Question.findByIdAndUpdate(questionId, { $set: { totalPassed } }, { new: true })

    res.json({
      results,
      totalPassed,
    })
  } catch (error) {
    console.error("Error during evaluation:", error)
    res.status(500).json({ error: "Internal server error." })
  }
})

module.exports = router

