import { useState } from "react"
import { Link, useParams } from "react-router-dom"


const Notes = (props) => {
    return <div>
        <ul>
            {props.notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>

        <NoteForm onAddNote={props.onAddNote} />
    </div>
}

const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div><strong>{note.important ? "important" : ""}</strong></div>
        </div>
    )
}

const NoteForm = (props) => {
    const [newNoteText, setNewNoteText] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        props.onAddNote({ content: newNoteText })
        setNewNoteText("")
    }

    return <form onSubmit={onSubmit}>
        <input
            value={newNoteText}
            onChange={({ target }) => setNewNoteText(target.value)}
        />
        <button type="submit">save</button>
    </form>
}

export { Notes, Note }