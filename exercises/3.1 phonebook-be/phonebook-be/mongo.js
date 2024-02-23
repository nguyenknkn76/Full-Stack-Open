// const mongoose = require('mongoose')

// if(process.argv.length<3){
//     console.log('give password as argument')
//     process.exit(1)
// }
// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// const url = `mongodb+srv://nguyenknkn76:${password}@nguyen-cluster.hkp3hcw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=nguyen-cluster`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//     name: String, 
//     number: String,
// })
// const Person = mongoose.model('Person',personSchema)

// const person1 = new Person({
//     name: "nguyen",
//     number:'01234567890',
// })
// if(name === undefined && number === undefined){
//     console.log('phonebook')
//     Person.find({}).then(persons => {
//         persons.forEach(person =>{
//             console.log(`${person.name} ${person.number}`)
//             mongoose.connection.close()
//         })
//     })
// }else{
//     const newPerson = new Person ({
//         name: name,
//         number: number,
//     })
    
//     newPerson.save().then(result =>{
//         console.log(`added ${result.name} number ${result.number} to phonebook`)
//         mongoose.connection.close()
//     })
// }
