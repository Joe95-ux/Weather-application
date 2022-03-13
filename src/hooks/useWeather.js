import { useState, useEffect } from "react";
import axios from "axios";

function useWeather(city,lat,lon) {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3003/weather",
      params: {
        q: city,
        lat: lat,
        lon: lon,
        cnt: "10",
        units: "metric or imperial",
      },
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
  }, [city,lat,lon]);
  return weather;
}

export default useWeather;