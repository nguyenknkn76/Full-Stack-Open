// import http from 'http'
//! first
// const http = require('http')
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

const cors = require('cors')
const  express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
//! GET method
app.get('/',(request,response)=>{
    response.send('<h1>Hello World!</h1>')
})
app.get('/api/notes',(request,response)=>{
    response.json(notes)
})
app.get(`/api/notes/:id`,(request,response)=>{
    const id = Number(request.params.id)
    // const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id , typeof id, note.id === id)
    //     return note.id === note
    // })
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0
    return maxId + 1
}

app.post('/api/notes',(request, response)=>{
    const body = request.body
    if(!body.content){
        //! IMPORTANT: must return, nếu k code sẽ chạy tiếp và vx lưu giá trị sai đinh dạng vào app
        return response.status(400).json({
            error:'content missing'
        })
    }
    // const note = request.body
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
    // console.log(request.headers) //! sd để check header trong lúc debug
})

// app.put('/api/notes/:id',(req,res) => {
//     const id = Number(req.params.id)
//     const body = req.body
//     const updatedNote = {
//         content: body.content,
//         important: Boolean(body.important), 
//         id: body.id
//     }
//     console.log(updatedNote)
//     const newNotes =  notes.map(note => note.id !== id ? note : updatedNote)
//     notes = newNotes
// })

// const PORT = 3001
const PORT = process.env.port || 3001
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})