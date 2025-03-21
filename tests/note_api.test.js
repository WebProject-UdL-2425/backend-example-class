const { test, describe, beforeEach, afterEach } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require("../src/app")
const { notesModel } = require("../src/models")
const db = require('../src/utils/db')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe('tests with dummy data in the DB', () => {
    beforeEach(() => {
        // Setup dummy database
        const notes = [
            { content: "First note", important: false },
            { content: "Second note", important: true }
        ]
        db.serialize(() => {
            const sql = 'INSERT INTO notes (content, important) VALUES (?, ?)'
            notes.forEach(note => db.run(sql, [note.content, note.important]))
        })
    })

    test('addition of a note', async () => {
        // TODO: This should be fixed
        const newNote = { content: "New note!", important: false }
        await api
            .post("/api/notes")
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const lastNote = (await notesModel.getAllNotes()).at(-1)

        assert.strictEqual(lastNote.content, newNote.content)
        assert.equal(lastNote.important, newNote.important)
    })

    test('deletion of a note', async () => {
        // TODO: This is a dummy comment.
    })

    afterEach(() => {
        // Clean database
        db.serialize(() => {
            db.run('DELETE FROM notes')
        })
    })
})