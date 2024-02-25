import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'
import { v4 as uuidv4 } from 'uuid';
import Notification from '../../../../part2/src/components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  //! nạp dl persons từ server
  const getAllPerson = () => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(getAllPerson,[])
  
  const addNewPerson = (newPerson) => {
    phonebookService
      .addNew(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`added ${newName} success`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
    
      })
      .catch(error =>{
        console.log(error)
        const displayError = error.response.data.error
        console.log('display error: ', displayError)
        setErrorMessage(displayError)
        setTimeout(()=>{
          setErrorMessage(null)
        }, 3000)
      })
  }

  // const deletePersonById = (id) => {
  //   axios
  //     .delete(`http://localhost:3001/persons/${id}`)
  //     .then(response => {
  //       setPersons(persons.filter(person => person.id !== id))
  //     })
  //     .catch(error => {
  //       console.error('Error deleting person:', error);
  //     });
  // }

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
      // alert(`${newName} is already added to phonebook`)
      // alert(newName + ' is already added to phonebook')
      if(window.confirm(`${newName} is already added to phone book, replace the old number with a new one`)){
        event.preventDefault()
        const objectPerson = persons.find(person => person.name === newName || person.number ===newNumber)
        const changedPerson = {
          id: objectPerson.id,
          name: newName,
          number: newNumber
        }
        
        // axios
        //   .put(`http://localhost:3001/persons/${changedPerson.id}`,changedPerson)
        //   .then(response => {
        //     setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson ))
        //   })

        phonebookService
          .updateById(changedPerson.id,changedPerson)
          .then(returnedPerson => {
            console.log('here')
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson ))
            setErrorMessage(`update ${returnedPerson.name} success`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`this persons was already deleted from database`)
            setTimeout(() => {
              setErrorMessage(null)
            },3000)
          })
      }

    } else{
      event.preventDefault()
      const objectPerson = {
        id: uuidv4(),
        name: newName,
        number: newNumber,
      }
      addNewPerson(objectPerson)
    }
  }
  
  const deletePhonebook = (id) => {
    console.log(`delete person have ${id} id`)
    if(window.confirm('are you sure?')){
      console.log('true')
      const updatedPersons = persons.filter(person => person.id !==id)
      // const updatedPersonsWithNewId = updatedPersons.map((person,index) => ({...person, id: index + 1}) )
      phonebookService
      .deleteById(id)
      .then(() => {
        setPersons(updatedPersons)
        setErrorMessage(`delete success`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.error('Error deleting person:', error)
      })
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
      <Notification message={errorMessage}/>
      <h1>Phonebook</h1>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPhonebook={addNewPhonebook}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      {/* <Person persons = {persons} deletePhonebook = {deletePhonebook}/> */}
      <ul>
        {persons.map(person => 
          <Person 
            key={person.id}
            person = {person} 
            deletePhonebook={() => deletePhonebook(person.id)}
          />
        )}
      </ul>
      <h3>Search results</h3>
      <Filter onChange = {handleSearchKeyChange} value = {searchKey}/>
      <ul>
        {searchResults.map(person => 
          <Person
            key = {person.id}
            person = {person}
            deletePhonebook={()=>deletePhonebook(person.id)}
          />
        )}
      </ul>
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