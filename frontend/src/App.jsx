import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNoteText, setNewNoteText] = useState('a new note...')

  const handleNoteTextChange = (event) => {
    console.log(event.target.value)
    setNewNoteText(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNoteText,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNoteText('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNoteText} onChange={handleNoteTextChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
