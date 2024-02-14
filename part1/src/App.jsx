// const Hello = ({name,age}) => {
//   // const {name,age} = props
//   const bornYear = () =>new Date().getFullYear() - age
//   console.log(props)
//   return (
//     <div>
//       <p>Hello world {name}, you are {age} years old</p>
//       <p>I guess you was born in {bornYear()}</p>
//     </div>
//   )
// }

// const Footer = () => {
//   return (
//     <div>
//       greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
//     </div>
//   )
// }
// const App = () => {
//   const name = "peter"
//   const age = 10
//   const friends = [
//     {name:'Khoi', age: 4},
//     {name:'Dinh', age: 5},
//   ]
//   const friends2 = ['nguyenknkn76','uiojklzxc']
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name = "Nguyen" age = {26+10}/>
//       <Hello name = {name} age = {age}/>
//       <Footer/>
//       <div>
//         <p>{friends[0].name}{friends[0].age}</p>
//         <p>{friends[1].name}{friends[1].age}</p>
//       </div>
//       <div>{friends2}</div>
//     </div>
    
//   )
// }

// export default App

// const App = (props) => {
//   const {counter} = props
//   console.log(counter)
//   return (
//     <div>{counter}</div>
//   )
// }

// export default App

import { useState } from 'react'

const Display = ({counter}) => <div>{counter}</div>
const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>
const History = ({allClicks}) => {
  if(allClicks.length === 0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press History: {allClicks.join('  ')}
    </div>
  )
}
const App = () => {
  const [counter, setCounter] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft+right)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }
  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  // debugger
  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />

      <div> 
        {/* <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        <div>{allClicks.join(' ')}</div> */}
        {left}
        <Button onClick={handleLeftClick} text="left"/>
        <Button onClick={handleRightClick} text="right"/>
        {right}
        <History allClicks = {allClicks}/>
      </div>

      <div> total: {total} </div>
      <div>
        <Button onClick={() => setToValue(0)} text="zero"/>
        <Button onClick={() => setToValue(1000)} text="thousand"/>
        <Button onClick={() => setToValue(value+1)} text="increase"/>
        <Display counter = {value}/>
      </div>
      
    </div>
  )
} 

	

export default App