export async function fetchWeather(city){

const key = "e88a8b49ea1acf43fa3361e94b9c4979"

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
)

const data = await response.json()

return data

}