const express = require("express")
const cors = require("cors")
const { PORT } = require("./config/config")
const connectDB = require("./config/database")
const learnerRoutes = require("./routes/learner")
const questionRoutes = require("./routes/question")
const reportRoutes = require("./routes/report")

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

// Routes
app.use("/api/learner", learnerRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/report", reportRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

