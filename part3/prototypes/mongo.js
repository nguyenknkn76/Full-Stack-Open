// // const Note = require('Note')
// if (process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const note = new Note({
//     content: 'HTML is easy',
//     important: true,
// })
// const note2 = new Note({
//     content: "Browser can execute only JavaScript",
//     important: false,
// })
// const note3 = new Note({
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
// })

// Note.find({important: true}).then(result => {
//     result.forEach(note =>{
//         console.log(note)
//     })
// })


// // note3.save().then(result => {
// //     console.log('note saved!')
// //     mongoose.connection.close()
// // })