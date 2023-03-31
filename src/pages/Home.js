import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css"


const Desktop1 = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // Navigate to the weather page with the location query parameter set to the value of the "location" state variable
    navigate(`/weather?location=${location}`);
  }

  return (
    <div className={styles.box}>
      <div className={styles.h1}>
        <h1 className={styles.h1}>Weather App</h1></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input}
          type="text"
          id="location"
          placeholder="Enter city name"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </form>
      <p className={styles.or}>or</p>
      <div className={styles.divbutton}>

        <button className={styles.button}>Get Device Location</button>
      </div>
    </div>

  );
};

export default Desktop1;
