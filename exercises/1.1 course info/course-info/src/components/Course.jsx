const Header = ({name}) => {
    return(
        <h1>{name}</h1>
    )
}
const Content = ({parts}) =>{
    return(
        <ul>
            {parts.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>)}
        </ul>   
        )
    
}
const Part = ({name,exercises}) => {
    return(
        <li>{name} : {exercises}</li>
    )
}
const Total = ({parts}) =>{
    let total = 0
    parts.forEach(part => {
        total += part.exercises
    });
    return <div>total of {total} exercises </div>
    
}
const Course = ({name, parts}) => {
    return (
        <div>
            <Header name = {name}/>
            <Content parts = {parts}/>
            <Total parts = {parts}/>
        </div>
    )
}
export default Course


//! Note: always use console with console.log() 
/* Extension: Better comment
    ! hello
    ? its me 
    todo let do it 
    * nhok kon
    // nhat ban roi 
*/

