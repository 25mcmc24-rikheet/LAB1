function WeatherCard({info}){

return(

<div>

<h2>{info.name}</h2>

<p>Temperature: {info.main.temp} °C</p>

<p>Humidity: {info.main.humidity}%</p>

<p>Weather: {info.weather[0].main}</p>

</div>

)

}

export default WeatherCard