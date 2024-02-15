const PhoneNumber= ({person}) => {
    return <li>{person.name} {person.number}</li>
}
const Person = ({persons}) => {
    return(
        <div>
            <ul>{persons.map(person => <PhoneNumber key = {person.id} person = {person}/>)}</ul>
        </div>
    )
}
export default Person