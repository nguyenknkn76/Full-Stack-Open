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


// const mongoose = require('mongoose')
require('dotenv').config() //! need to be imported before import model note
const Note = require('./models/note')
const cors = require('cors')
const  express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
// app.use(requestLogger) //* need double check


// //todo CONNECT WITH MONGODB
// const password = process.argv[2] //! DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url =
//     `mongodb+srv://nguyenknkn76:${password}@nguyen-cluster.hkp3hcw.mongodb.net/noteApp?retryWrites=true&w=majority&appName=nguyen-cluster`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })
// const Note = mongoose.model('Note', noteSchema)
// //todo config option of schema
// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         //! attribute _id is NOT string. it's object => use toJSON method to tranforms it into a string to be save
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id 
//         delete returnedObject.__v
//     }
// })

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
    
    // response.json(notes)
    Note.find({}).then(notes => {   //todo use mongodb
        response.json(notes)
    })
    
})
// app.get(`/api/notes/:id`,(request,response)=>{
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)
//     if(note){
//         response.json(note)
//     }else{
//         response.status(404).end()
//     }
// })
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if(note){
                response.json(note)
            }else{
                response.status(404).end()
            }
        })
        .catch (error => next(error))
        // .catch(error =>{
        //     console.log(error)
        //     response.status(400).send({error: 'malformatted id'})
        //     // response.status(500).end()
        // })
})
//! cách DEBUG khi đang sd find() method
// const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id , typeof id, note.id === id)
    //     return note.id === note
    // })

//! DELETE method
app.delete('/api/notes/:id',(request, response, next)=>{
    Note.findByIdAndDelete(request.params.id)
        .then(result =>{
            response.status(204).end()
        })
        .catch(error => next(error))
})
// app.delete('/api/notes/:id',(request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
//     response.status(204).end()
// })


//!POST method
const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0
    return maxId + 1
}

// app.post('/api/notes',(request, response)=>{
//     const body = request.body
//     if(body.content === undefined){
//         //! IMPORTANT: must return, nếu k code sẽ chạy tiếp và vx lưu giá trị sai đinh dạng vào app
//         return response.status(400).json({error:'content missing'})
//     }
//     // const note = request.body
//     const note = {
//         content: body.content,
//         important: body.important || false,
//         id: generateId(),
//     }
//     notes = notes.concat(note) //todo trc khi sd mongoDB
//     response.json(note)
//     // console.log(request.headers) //! sd để check header trong lúc debug
// })

app.post('/api/notes', (request, response, next) => {
    const body = request.body
    
    // if (body.content === undefined) {
    //     return response.status(400).json({ error: 'content missing' })
    // }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
})

//!PUT method
app.put('/api/notes/:id',(request,response, next)=>{
    const {content, important} = request.body

    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(
        request.params.id, 
        {content, important} , //! updated note
        {new:true, runValidators: true, context:'query'}
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
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
// app.use(unknownEndpoint)
// const PORT = 3001
const unknownEndpoint = (request, response) =>{
    response.status(404).send({error:'Unknown Endpoint'})
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) =>{
    console.error(error.message)
    if(error.name === "CastError"){ return response.status(404).send({error:'malformatted id'})}
    else if(error.name === "ValidationError"){return response.status(400).json({error: error.message})}
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})

