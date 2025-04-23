import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import loginService from './services/login'
import noteService from './services/noteService'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNoteText, setNewNoteText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // TODO: Error handling
      console.log('Wrong credentials')
    }
  }

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
    noteService.create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNoteText("")
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNoteText}
        onChange={handleNoteTextChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>

      {user === null ?
        loginForm() :
        <div>
          <p>Hello, {user.name}!</p>
          {noteForm()}
          <ul>
            {notes.map(note =>
              <Note key={note.id} note={note} />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App
