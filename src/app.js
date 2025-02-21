const express = require("express")
const { initDb } = require("./models")
const notesRouter = require("./controllers/notes")
const middleware = require("./utils/middleware")

const app = express()
initDb()

app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.use(middleware.unknownEndpoint)

module.exports = app