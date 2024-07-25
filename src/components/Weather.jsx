import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import spinner from '../assets/Full snake.gif';

const Weather = ({ setWeather }) => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const search = async (city) => {
    if (city === '') {
      alert('Enter City Name');
      return;
    }
    setLoading(true);
    setError('');
    setWeatherData(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      const conditions = data.weather[0].description.toLowerCase();
      const date = new Date();

      const newWeatherData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        conditions: conditions,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      };

      setWeatherData(newWeatherData);
      setWeather(newWeatherData);
    } catch (error) {
      setError('Error in fetching weather data');
      console.error('Error in fetching weather data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search('London');
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="additional-info">
            <p className="conditions">{weatherData.conditions}</p>
            <div className="date-time">
              <p>{weatherData.date}</p>
              <p>{weatherData.time}</p>
            </div>
          </div>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" className="humidity animated" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" className="wind animated" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
