const PersonForm = (props) => {
const {handleNameChange, handleNumberChange, addNewPhonebook, newName, newNumber} = props
return(
        <form onSubmit={addNewPhonebook}>
            <div> name:<input onChange={handleNameChange} value = {newName}/></div>
            <div> number:<input onChange={handleNumberChange} value = {newNumber}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm