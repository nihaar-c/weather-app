import { clear } from '@testing-library/user-event/dist/clear'
import React, { useState } from 'react'
import './App.css'

function App() {

  const apiKey = '1f89a17d8885c959f9b921b0d883fef4'
  const cloudImg = 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fHww&w=1000&q=80'
  const clearImg = 'https://t4.ftcdn.net/jpg/04/77/90/99/360_F_477909933_OHFAIA6IQ7DOAvtnSP6VM4RvpC8FSJr0.jpg'
  const thunderImg = 'https://media.wcnc.com/assets/WFMY/images/dab58622-2b2c-4450-891c-16ae63f11fc9/dab58622-2b2c-4450-891c-16ae63f11fc9_1140x641.jpg'
  const rainImg = 'https://t4.ftcdn.net/jpg/01/63/96/63/360_F_163966311_qh3qSk57mw9oLPOklZigzX9zlB5DgdaM.jpg'
  const lightsImg = ""

  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')
  let image = ""
  let additionalStyles = {}

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1f89a17d8885c959f9b921b0d883fef4&units=imperial`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }

  }

  if (typeof weatherData.main != 'undefined') {
    if (weatherData.weather[0].main === "Clouds") {
      image = (cloudImg)
    }
    else if (weatherData.weather[0].main === "Clear") {
      image = clearImg
    }
    else if (weatherData.weather[0].main === "Thunderstorm") {
      image = thunderImg
    }
    else if (weatherData.weather[0].main === "Rain") {
      image = rainImg
    }
  }

  return (
    <div className='container' style={{
      backgroundImage: `url("${lightsImg}")`,
    }}>
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
        

        <div className='weather-data' style={{ 
          backgroundImage: `url("${image}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p className = 'fill2'></p>
          <p className = 'city'> {weatherData.name} </p>
          <p className = 'temp'> {Math.round(weatherData.main.temp)} °F</p>
          

          <p className = 'weather'> {weatherData.weather[0].main}</p>
          <p className = 'filler'></p>
        </div>
        
      
      ) }

      {weatherData.cod === '404' ? (
        <p>City not found</p>
      ): (
        <></>
      )
      }


    </div>
  )
}

export default App