import { useEffect, useState } from "react";

import weatherService from "../services/weatherService";

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    weatherService.getWeather(country.capital).then((weather) => {
      setWeatherData(weather);
    });
  }, []);

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      {Object.keys(weatherData).length ? (
        <div>
          temperature {weatherData.main.temp} celcius
          <br />
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
          <br />
          wind {weatherData.wind.speed} m/s
        </div>
      ) : (
        <div>Fetching data from API</div>
      )}
    </div>
  );
};

export default Weather;
