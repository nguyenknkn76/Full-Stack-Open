import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
}

const Part = (part) =>(
  <p>{part.name}{part.exercises}</p>
)
const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
}

const Total = ({course}) => {
  const parts = course.parts
  let totalExercises = 0
  parts.forEach(part =>{
    totalExercises += part.exercises
  })
  return <p>Number of exercises {totalExercises}</p>;
}

// const TestArray = () => {
//   const t = [1, 2, 3]
//   t.push(5)
//   console.log(t.length)
//   console.log(t[1])
//   t.forEach(value => {console.log(value)})
// }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10},
      { name: 'Using props to pass data', exercises: 7},
      { name: 'State of a components', exercises: 14},
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>
  );
}

export default App;
