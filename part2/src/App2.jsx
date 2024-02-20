import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";

const App2 = () => {
    const [value, setValue] = useState('')
    const [rates, setRates] = useState({})
    const [currency, setCurrency] = useState(null)

    useEffect(() => {
        console.log('effect run, currency is now' , currency)
        if (currency){
            console.log('fetching exchange rates')
            axios
                .get(`http://open.er-api.com/v6/latest/${currency}`)
                .then(response => {
                    setRates(response.data.rates)
                    
                })
        }
    },[currency])

    const handleChange = (event) => {
        setValue(event.target.value)
    } 

    const onSearch = (event) => {
        event.preventDefault()
        setCurrency(value)
    }
    return (
        <div>
            <form onSubmit={onSearch}>
                currency:<input value = {value} onChange={handleChange}/>
                <button type = "submit">exchange rate</button>
            </form>
            <pre>
                {JSON.stringify(rates, null, 2)}
            </pre>
        </div>
    )
}
export default App2