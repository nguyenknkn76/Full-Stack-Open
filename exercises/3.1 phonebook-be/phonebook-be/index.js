const express = require('express')
const app = express()
require('dotenv').config() 
const Person = require('./models/Person')

app.use(express.json()) //! the way that middleware taken into use
app.use(express.static('dist'))
//! import cors mechanism (cross-origin resource sharing)
const cors = require('cors')
app.use(cors())

//! config morgan
const morgan = require('morgan')
morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body)
})
const formatStr = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(formatStr))


let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]
//! try morgan
// app.get('/hw', function (req,res) {
//     res.send('hello,world')
//     // morgan.token('type', function (req, res) { return req.headers['content-type'] })
//     // morgan('tiny')
//     // morgan(':method :url :status :res[content-length] - :response-time ms')
// })

//!GET method
app.get('/',(req, res)=> {
    res.send("<h1>Hello World</h1>")
})
app.get('/api/persons',(req, res) => {
    // res.json(persons)
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
app.get('/info',(req,res)=>{
    const currentDate = new Date()
    console.log(currentDate)
    Person.find({}).then(persons => {
        res.send(`<p>phonebook has info for ${persons.length} people</p><br/><p>${currentDate}</p>`)
    })
})
app.get('/api/persons/:id',(req,res)=>{
    Person.findById(req.params.id).then(person =>{
        res.json(person)
    })
})
//!DELETE method
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
//!POST method
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id)) 
        : 0
    return maxId + 1
}
const checkExist = (name) => {
    const person = persons.find(person => person.name === name)
    if(person) return false
    else return true
}
app.post('/api/persons',(req,res)=> {
    const reqName = req.body.name
    const reqNumber = req.body.number
    if(!reqName || !reqNumber){
        return res.status(400).json({error: 'missing attribute'});
    }
    if(!checkExist(reqName)){
        return res.status(400).json({error: "name must be unique"})
    }
    const person = new Person({
        name: reqName,
        number: reqNumber
    })
    person.save().then(savedPerson =>{
        res.json(savedPerson)
    })
    console.log(req.body)
    
})
// const PORT = 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
