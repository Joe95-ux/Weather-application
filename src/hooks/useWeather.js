import { useState, useEffect } from "react";
import axios from "axios";

function useWeather(city) {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3003/weather",
      params: { q: city }
    };
    if (city) {
      axios
        .request(options)
        .then(function (response) {
          setWeather(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [city]);
  return weather;
}

export default useWeather;
