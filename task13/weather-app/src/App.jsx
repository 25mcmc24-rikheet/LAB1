import { useState } from "react"
import CitySearch from "./components/CitySearch"
import WeatherCard from "./components/WeatherCard"
import { fetchWeather } from "./api/weatherApi"
import "./App.css"

function App(){

const [data,setData] = useState(null)

const handleCity = async(city)=>{

const result = await fetchWeather(city)

setData(result)

}

return(

<div>

<h1>Weather App</h1>

<CitySearch onSearch={handleCity}/>

{data && <WeatherCard info={data}/>}

</div>

)

}

export default App