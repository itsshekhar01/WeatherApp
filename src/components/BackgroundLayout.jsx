import React, { useEffect, useState } from 'react';
// images
import Clear from '../assets/clear.jpg';
import Fog from '../assets/fog.jpg';
import Cloudy from '../assets/cloudy.jpg';
import Rainy from '../assets/rainy.jpg';
import Snow from '../assets/snow.jpg';
import Stormy from '../assets/stormy.jpg';
import Sunny from '../assets/sunny.jpg';

const BackgroundLayout = ({ weather }) => {
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather && weather.conditions) {
      const condition = weather.conditions.toLowerCase();
      console.log("Weather conditions:", condition); // Add this line
      if (condition.includes('clear')) {
        setImage(Clear);
      } else if (condition.includes('cloud')) {
        setImage(Cloudy);
      } else if (condition.includes('rain') || condition.includes('shower')) {
        setImage(Rainy);
      } else if (condition.includes('snow')) {
        setImage(Snow);
      } else if (condition.includes('fog')) {
        setImage(Fog);
      } else if (condition.includes('thunder') || condition.includes('storm')) {
        setImage(Stormy);
      } else {
        setImage(Clear);
      }
    } else {
      console.log("Weather conditions not available"); // Add this line
    }
  }, [weather]);

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

export default BackgroundLayout;
