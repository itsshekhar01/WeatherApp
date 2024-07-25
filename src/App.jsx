import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import BackgroundLayout from './components/BackgroundLayout';
import './App.css'; // Ensure this file includes basic reset styles if needed

const App = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className='app'>
      <div className='background'>
        <BackgroundLayout weather={weather} />
      </div>
      <Weather setWeather={setWeather} />
    </div>
  );
};

export default App;
