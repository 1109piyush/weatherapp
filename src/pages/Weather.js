import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from "./Weather.module.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TbWind } from "react-icons/tb";
import { IoIosWater } from "react-icons/io";
import { Link } from "react-router-dom";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  // Get location query parameter from the URL
  const location = useLocation().search.slice(10);

  // Fetch weather data using OpenWeatherMap API
  function getWeatherData(location) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        setError("Sorry, there was an error retrieving the weather data. Please try again later.");
      });
  }

  const [error, setError] = useState("");

  useEffect(() => {
    getWeatherData(location);
  }, [location]);

  // If weather data has not loaded yet, display a  message
  if (!weatherData) {
    return <div className={styles.box}>
      <div className={styles.header}>
        <AiOutlineArrowLeft className={styles.arrow} />
        <Link className={styles.link} to='/'> <h1 className={styles.h1}>Weather App</h1></Link>
      </div>
      <div className={styles.temperature}>
        <h2>no data</h2>
        <h3>try again go to home page</h3>
      </div>
      <div className={styles.other}>
        <div className={styles.humidity}>
          <div className={styles.humidityData}>
            <IoIosWater style={{ color: "var(--primary)" }} />
            <p>no data</p>
          </div>
          <p>humidity</p>
        </div>
        <div className={styles.speed}>
          <div className={styles.speedData}>
            <TbWind style={{ color: "var(--primary)" }} />
            <p>no data</p>
          </div>
          <p>wind speed</p>
        </div>
      </div>
    </div>
  }

  // Get weather icon URL
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (


    <div className={styles.box}>
      {error && <div className="error">{error}</div>}
      <div className={styles.header}>
        <AiOutlineArrowLeft className={styles.arrow} />
        <Link className={styles.link} to='/'> <h1 className={styles.h1}>Weather App</h1></Link>
      </div>
      <div className={styles.temperature}>
        <img src={weatherIcon} alt={weatherData.weather[0].description} />
        <h2>{weatherData.main.temp}</h2>
        <h3>{weatherData.weather[0].description}</h3>
        <h3>{weatherData.name}</h3>
      </div>
      <div className={styles.other}>
        <div className={styles.humidity}>
          <div className={styles.humidityData}>
            <IoIosWater style={{ color: "var(--primary)" }} />
            <p>{weatherData.main.humidity}</p>
          </div>
          <p>humidity</p>
        </div>
        <div className={styles.speed}>
          <div className={styles.speedData}>
            <TbWind style={{ color: "var(--primary)" }} />
            <p>{weatherData.wind.speed}</p>
          </div>
          <p>wind speed</p>
        </div>
      </div>
    </div>

  );
};

export default Weather;
