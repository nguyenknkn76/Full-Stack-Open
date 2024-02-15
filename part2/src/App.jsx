import Note from './components/Note'
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note ...')
  const [showAll, setShowAll] = useState(true)
  // const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  // console.log('notesToShow',notesToShow)
  // console.log('showAll',showAll)
  // console.log('notes',notes)
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  return (
    <div>
      <h1>Notes</h1>
      <h2>version 1</h2>
      <li>{notes[0].content}</li>
      <li>{notes[1].content}</li>
      <li>{notes[2].content}</li>

      <h2>version 2</h2>
      <ul>
        {notes.map(note =>
          <Note key = {note.id} note = {note}/>
        )}
      </ul>

      <form onSubmit = {addNote}>
        <input value = {newNote} onChange={handleNoteChange}/> 
        <input value = "test value" readOnly/>
        <button type = "submit">save</button>
      </form>

      <h3>note to show</h3>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <div>
        <ul>
          {notesToShow.map(note => <Note key = {note.id} note = {note}/>)}
        </ul>
      </div>
      {/*//! Hiển thị Collection */}
      {/* <h3>version 3</h3>
      <h3>
        <ul>
          {notes.map(note => <div key = {note.id}>{note.content}</div>)}
        </ul>
      </h3> */}
      
    </div>
  )
}



export default App