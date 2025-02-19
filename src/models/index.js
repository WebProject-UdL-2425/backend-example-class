const db = require("../utils/db")

// Database initialization
const initDb = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT, important BOOLEAN)")
        db.run('INSERT INTO notes (content, important) VALUES ("html is easy", FALSE)')
        db.run('INSERT INTO notes (content, important) VALUES ("html is hard", TRUE)')
    })
}

module.exports = initDb