const db = require("../utils/db")

const getAllNotes = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM notes", [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = { getAllNotes }