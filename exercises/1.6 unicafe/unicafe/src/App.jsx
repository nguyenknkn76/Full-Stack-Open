import { useState } from 'react'

const Display = ({value,text}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
  
}
// 
const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>
const Statistics = (props) => {
  const {good,neutral,bad,all,average,positive} = props
  if(good === 0 && neutral ===0 && bad ===0){
    return <div>No feed back given</div>
  }
  return(
      <div>
        <table>
          <tbody>
            <Display value = {good} text = "good"/>
            <Display value = {neutral} text = "neutral"/>
            <Display value = {bad} text = "bad"/>
            <Display value = {all} text = "all"/>
            <Display value = {average} text = "average"/>
            <Display value = {positive} text = "positive"/>
          </tbody>
        </table>
          
      </div>
  )      
}
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const increaseGood = () => {
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    const newAverage = (newGood - bad)/newAll
    const newPositive = newGood/newAll*100
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    const newAll = all + 1
    const newAverage = (good - bad)/newAll
    const newPositive = good/newAll*100
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }
  const increaseBad = () => {
    const newBad = bad + 1 
    setBad(newBad)
    const newAll = all + 1
    const newAverage = (good - newBad)/newAll
    const newPositive = good/newAll*100
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }
  
  return (
    <div>
      <h3>give feed back</h3>
      <div>
        <Button onClick = {increaseGood} text = "good"/>
        <Button onClick = {increaseNeutral} text = "neutral"/>
        <Button onClick = {increaseBad} text = "bad"/>
      </div>
      <h3>statistics</h3>
      <Statistics good = {good} neutral = {neutral}  bad = {bad} all = {all} average = {average} positive = {positive}/>
    </div>
    
  )
}

export default App
