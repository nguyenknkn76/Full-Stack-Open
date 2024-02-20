import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [searchKey, setSearchKey] = useState('')
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [countryInfo, setCountryInfo] = useState({})
  // const [results, setResults] = useState([])
  
  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const init = response.data
      setCountries(init)
      console.log('coutries',countries)
    })
  },[])
  const handleChange = (event) => {
    const searchTerm = event.target.value
    setSearchKey(searchTerm)
    const results = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    if(results.length <= 10 && results.length > 1){
      setFoundCountries(results)
    }
    if(results.length > 10){
      setFoundCountries([])
      setErrorMessage('too many countries to view')
      setTimeout(()=>{
        setErrorMessage('')
      },1000)
    }
    if(results.length === 1){
      const [first] = results
      setCountryInfo(first)
      console.log("result:",results)
      console.log("first",first)
      console.log("countryInfo",countryInfo)
    }
  } 
  
  return (
    <div>
      <div>{errorMessage}</div>
      <form>
        find countries: <input value = {searchKey} onChange={handleChange}/>
      </form>
      <div>
        <h3>search results</h3>
        <ul>
          {foundCountries.map(country => <li key ={country.area}>{country.name.common}</li>)}
        </ul>
      </div>
      <div>
        <h3>country info</h3>
        <div></div>
      </div>
    </div>
    
  )
}

export default App
