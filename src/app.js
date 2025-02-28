const express = require("express")
const { initDb } = require("./models")
const loginRouter = require("./controllers/login")
const notesRouter = require("./controllers/notes")
const usersRouter = require("./controllers/users")
const middleware = require("./utils/middleware")

const app = express()
initDb()

app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/login", loginRouter)
app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app