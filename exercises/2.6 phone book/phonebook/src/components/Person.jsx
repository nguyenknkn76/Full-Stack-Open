const Person = ({person, deletePhonebook}) => {
    return(
        <li>
            {person.id} : {person.name} : {person.number} 
            <button onClick={deletePhonebook}> delete </button>
        </li>
    )
}
export default Person