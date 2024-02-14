import { useState } from 'react'

const Display = ({anecdotesSelected}) => <div>{anecdotesSelected}</div>
const DisplayVote = ({anecdotesPos, votes}) => <div>anecdotes {anecdotesPos} has {votes} votes</div>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));  
  let maxPos = 0
  for (let i = 0; i < votes.length; i ++){
    if(votes[i] === Math.max(...votes)){
      maxPos = i
      break
    }
  } 
  const backAnecdotes = () => {
    if(selected === 0) setSelected((anecdotes.length - 1))
    else setSelected(selected - 1)
  }
  const nextAnecdotes = () => {
    if(selected === (anecdotes.length - 1)) setSelected(0)
    else setSelected(selected + 1)
  }
  const increaseVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes)
    console.log(newVotes)
  }
  
  return (
    <div>
      <h3>Anecdotes of the day</h3>
      <Display anecdotesSelected = {anecdotes[selected]}/>
      <DisplayVote anecdotesPos={selected} votes = {votes[selected]}/>
      <div>
        <button onClick={backAnecdotes}>back anecdotes</button>
        <button onClick={nextAnecdotes}>next anecdotes</button>
        <button onClick={increaseVotes}>vote</button>
      </div>
      <h3>Anecdotes with most votes</h3>  
      <Display anecdotesSelected={anecdotes[maxPos]}/>
      <DisplayVote anecdotesPos={maxPos} votes = {votes[maxPos]}/>
      {/* <p>anecdotes {maxPos} have {votes[maxPos]} votes</p> */}
    </div>
  )
}

export default App