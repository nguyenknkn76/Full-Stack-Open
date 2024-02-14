
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id:1, 
    content: 'html is easy',
    important: true
  },
  {
    id:2, 
    content: 'Browser can execute only js',
    important: false
  },
  {
    id:3, 
    content: 'get and post are the most important methods of http protocol',
    important: true
  },
]
const result1 = notes.map (note => note.content)
const result2 = notes.map (note => note.id)
console.log(result1)
console.log(result2)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes =  {notes}/>
)