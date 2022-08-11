import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
