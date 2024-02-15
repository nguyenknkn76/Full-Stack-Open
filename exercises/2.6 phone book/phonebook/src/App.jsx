import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const checkExistName = (checkedName) => {
    let check = persons.some(person => person.name === checkedName)
    return check
  }
  const checkExistNumber = (checkedNumber) => {
    let check = persons.some(person => person.number === checkedNumber)
    return check
  }
  const addNewPhonebook = (event) => {
    event.preventDefault()
    if (checkExistName(newName) || checkExistNumber(newNumber)){
      alert(`${newName} is already added to phonebook`)
      // alert(newName + ' is already added to phonebook')
    } else{
      const objectPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(objectPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchKeyChange = (event) =>{
    const searchTerm = event.target.value
    setSearchKey(event.target.value)
    console.log(searchTerm)
    const results = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPhonebook={addNewPhonebook}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Person persons = {persons}/>

      <h3>Search results</h3>
      <Filter onChange = {handleSearchKeyChange} value = {searchKey}/>
      <Person persons = {searchResults}/>
    </div>
  )
}
export default App

//! cách debug:
// <div>debug: {newName} {newNumber}</div>


      {/* <form onSubmit={addNewPhonebook}>
        <div> name:<input onChange={handleNameChange} value = {newName}/></div>
        <div> number:<input onChange={handleNumberChange} value = {newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}