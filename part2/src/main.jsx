
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import App2 from './App2'
import axios from 'axios'
import './index.css'

//! có thể loại bỏ phần tìm nạp dl từ main.jsx do TRUY XUẤT các ghi chú từ SERVER
//! nên ko cần truyền dl dưới dạng đạo cụ cho App components nữa
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)
// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)
// promise.then(response => {
//   console.log(response)
// })
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     console.log('noi truc tiep',response)
//     const notes = response.data
//     console.log(notes)
//     //! phan 3 su dung csdl axios
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes = {notes}/>)
// })

//   //! phan 1 - 2
// const notes = [
//   {
//     id:1, 
//     content: 'html is easy',
//     important: true
//   },
//   {
//     id:2, 
//     content: 'Browser can execute only js',
//     important: false
//   },
//   {
//     id:3, 
//     content: 'get and post are the most important methods of http protocol',
//     important: true
//   },
// ]
// const result1 = notes.map (note => note.content)
// const result2 = notes.map (note => note.id)
// console.log(result1)
// console.log(result2)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <App/>
  <App2/>
    
)