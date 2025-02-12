const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { PORT } = require("./config/config")
const connectDB = require("./config/database")
const learnerRoutes = require("./routes/learner")
const questionRoutes = require("./routes/question")
const reportRoutes = require("./routes/report")
const studentProgressRoutes = require("./routes/studentProgress")
const sessionRoutes = require("./routes/Session")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
)
app.use(express.json())
app.use(bodyParser.json())

// Routes
app.use("/api/learner", learnerRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/report", reportRoutes)
app.use("/api/student-progress", studentProgressRoutes)
app.use("/api/session", sessionRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

