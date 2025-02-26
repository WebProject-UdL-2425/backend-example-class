const db = require("../utils/db")
const notesModel = require("./notes")

// Database initialization
const initDb = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT, important BOOLEAN)")
    })
}

module.exports = {
    initDb, notesModel
}