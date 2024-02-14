import Note from './components/Note'

const App = ({notes}) => {
  
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
      
      //! Hiển thị collection
      <h3>version 3</h3>
      <h3>
        <ul>
          {notes.map(note => <div key = {note.id}>{note.content}</div>)}
        </ul>
      </h3>
    </div>
  )
}



export default App