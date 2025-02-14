const express = require("express")
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(":memory:")

const app = express()

app.use(express.json())

let notes = [{ id: 1, content: "HTML is easy", important: true },
{ id: 2, content: "Another", important: false },
{ id: 3, content: "And one", important: true },
{ id: 4, content: "HTML is hard", important: true },
{ id: 5, content: "Another note HELLO", important: false },
{ id: 6, content: "!!", important: true },
{ id: 7, content: "HTML", important: true },
{ id: 8, content: "HTTP", important: false },
{ id: 9, content: "HTTPS", important: true }
]

app.get("/", (request, response) => {
    response.send("<h1>Hello world!</h1>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})