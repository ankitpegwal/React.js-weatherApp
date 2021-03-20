import React, { useState, useEffect } from 'react';
import './style.css';
export default function NewTemp() {
    const [search, setSearch] = useState("")
    const [city, setCity] = useState("")

    const [allData, setAllData] = useState([])


    useEffect(() => {
        try {
            const fecthApi = async () => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5449f9013b218a22dbbfffbcdcdab198`
                const response = await fetch(url);
                const resjson = await response.json()

                setAllData(resjson)
                console.log(resjson);
                // console.log(new Date.getTimezoneOffset());

            }
            fecthApi();

        }
        catch (err) {
            throw err.message
        }
    }, [search])

    const callApi = (e) => {
        setSearch(e.target.value)
    }
    const onFocus = () => {

    }


    const fullDate = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let date = d.getDate();


        return `${day}, ${date} ${month} ${year}`

    }




    return (
        <div className={


            // condition
            (typeof allData.main != "undefined") ? (allData.weather[0].main == "Smoke" ? "app smoke" : (allData.weather[0].main == "Haze") ? "app haze" : (allData.weather[0].main == "Clouds") ? "app cloud" : (allData.weather[0].main == "Rain") ? "app rain" : "app") : "app"




        }>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search Here..."
                        onChange={callApi}
                        value={search}
                        style={{ textTransform: "capitalize" }}

                    />
                </div>

                <div>
                    {(typeof allData.name != "undefined") ?
                        (<div>    <div className="location-box">
                            <div className="location">{allData.name}, {allData.sys.country}</div>
                                                        

                            <div className="date">{fullDate(new Date())}</div>
                        </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(allData.main.temp - 273)}°C

                                </div>
                                <div className="weather">{allData.weather[0].main}
                                 </div>
                            </div>
<h6 style={{color:"white"}} >Last
Update {new Date().toLocaleTimeString()}
</h6>
                            </div>
                        ) : (<div  >
                            <h1 style={{ color: "white", textShadow: "0px 2px 3px " }} >City Not Found...</h1>
                        </div>)}

                </div>

            </main>
        </div >
    )
}
