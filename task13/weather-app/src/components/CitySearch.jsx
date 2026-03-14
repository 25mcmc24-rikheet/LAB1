import { useState } from "react"

function CitySearch({onSearch}){

const [city,setCity] = useState("")

const submitCity = ()=>{

if(city.trim()!==""){
onSearch(city)
setCity("")
}

}

return(

<div>

<input
type="text"
placeholder="Enter city"
value={city}
onChange={(e)=>setCity(e.target.value)}
/>

<button onClick={submitCity}>
Search
</button>

</div>

)

}

export default CitySearch