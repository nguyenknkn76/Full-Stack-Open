import Note from './components/Note'
import { useEffect, useState } from 'react'
import axios from 'axios'
import noteService from'./services/Notes'

//! trc khi sd axios => cần truyền props (notes) từ main.jsx
//// const App = (props) => {
////  const [notes, setNotes] = useState(props.notes)

//! sau khi sd axios => ko cần truyền props nx 
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('enter-a-new-note')
  const [showAll, setShowAll] = useState(true)
  // const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
/*//! cách GÀ viết trc khi sd hook  
  useEffect(()=> {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fullfilled')
        setNotes(response.data)
      })
  },[])
*/
  //! cách PRO viết sau khi sd hook
  const hook = () =>{
    // axios
    //   .get('http://localhost:3001/notes')
    //   .then(response =>{
    //     setNotes(response.data)
    //   })

    //todo su dung note service
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }

  useEffect(hook, []) //* tham số thứ 2 => tần suất chạy hiệu ứng

  
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    console.log(`importance ${id} needs to be toggled`)

    // axios
    //   .put(url,changedNote)
    //   .then(response => {
    //     console.log(response)
    //     setNotes(notes.map(n => n.id !== id ? n : response.data))
    //   })
    //todo su dung note service
    noteService
      .update(id,changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  // console.log('render',notes.length,'notes')
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
    // setNotes(notes.concat(noteObject))
    // setNewNote('')

    // axios
    //   .post('http://localhost:3001/notes',noteObject)
    //   .then(response => {
    //     console.log(response)
    //     setNotes(notes.concat(response.data))
    //     setNewNote('')
    //   })
    //todo su dung noteService
    noteService
      .create(noteObject)
      .then(returnedNote=> {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    
  }
  return (
    <div>

      {
      //! phan 2.1 => bỏ sau khi ko nhận dl từ main.jsx nx
      /* <h1>Notes</h1>
      <h2>version 1</h2>
      <li>{notes[0].content}</li>
      <li>{notes[1].content}</li>
      <li>{notes[2].content}</li>

      <h2>version 2</h2>
      <ul>
        {notes.map(note =>
          <Note key = {note.id} note = {note}/>
        )}
      </ul> */
      }

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
          {notesToShow.map(note => 
            <Note 
              key = {note.id} 
              note = {note}
              toggleImportance={()=>toggleImportanceOf(note.id)}
            />
          )}
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