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
    </div>
  )
}



export default App