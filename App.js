import React, { useState } from 'react'
import './App.css'

function App() {

  const apiKey = '1f89a17d8885c959f9b921b0d883fef4'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1f89a17d8885c959f9b921b0d883fef4&units=imperial').then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }

  }

  return (
    <div className='container'>
      <input  
      className="input"
      onChange={event => setCity(event.target.value)}
      placeholder="Enter City" 
      value = {city}
      onKeyPress={getWeather}
      /> 
      
      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to weather data! Enter a city to find the weather.</p>
        </div>

      ): (
        <div>
          <p>{city}</p>
          <p> {weatherData.name} </p>
          <p> {Math.round(weatherData.main.temp)} F</p>
          <p> {weatherData.weather[0].main}</p>
        </div>
      
      ) }

    </div>
  )
}

export default App