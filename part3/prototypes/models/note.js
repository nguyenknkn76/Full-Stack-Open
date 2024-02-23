const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
// const password = process.argv[2] //! DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url =
//     `mongodb+srv://nguyenknkn76:${password}@nguyen-cluster.hkp3hcw.mongodb.net/noteApp?retryWrites=true&w=majority&appName=nguyen-cluster`
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)