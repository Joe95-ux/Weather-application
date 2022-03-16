import { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import DailyHighlights from "./dailyHighlights/DailyHighlights";
import DayForcast from "./dayForcast/DayForcast";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
// import useWeather from "../hooks/useWeather";

const Today = () => {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});

  let cityRef = useRef();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation not supported in this browser! Try searching for a city instead"
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const options = {
            method: "GET",
            url: "/api/weather",
            params: {
              lat: coords.latitude,
              lon: coords.longitude,
              cnt: 10,
              units: "metric",
            },
          };
          try {
            let res = await axios.request(options);
            let data = await res.data;
            let singleDay = await data.list[0];
            let weather = await singleDay.weather[0];

            setWeatherData({
              city: data.city.name,
              country: data.city.country,
              description: weather.description,
              icon: weather.icon,
              main: weather.main,
              temperature: singleDay.temp.day,
              timestamp: singleDay.dt,
            });
            console.log(data);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            setError("Could not get the weather data, try again later");
          }
        },
        () => {
          setLoading(false);
          setError("Geolocation not active! Try searching for a city instead");
        }
      );
    }
    return () => {
      setError("");
      setLoading(true);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityRef.current.value);
    cityRef.current.value = "";
  };

  return !loading ? (
    <div className="containerWrapper">
      {weatherData && !error ? (
        <>
          <div className="sideDrawer">
            <div className="topBar">
              <form onSubmit={handleSubmit}>
                <div className="inputField">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="search for places..."
                    ref={cityRef}
                  />
                </div>
              </form>
              <MyLocationIcon />
            </div>
            <img src= {"http://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png"} alt="weather" />
            <h2 className="temp">{weatherData.temperature + "°C"}</h2>
            <h3 className="date">
              Monday, <span>16:00</span>
            </h3>
            <hr />
            <p>{weatherData.description}</p>
            <p>{weatherData.main}</p>
            <div className="cityImageContainer">
              <h3>
                {weatherData.city}, {weatherData.country}
              </h3>
            </div>
          </div>
          <div className="weatherReadings">
            <Navbar />
            <div className="dayReadings">
              <DayForcast />
              <DayForcast />
              <DayForcast />
              <DayForcast />
              <DayForcast />
              <DayForcast />
            </div>
            <div className="dailyHighlights">
              <h1>Today's Highlights</h1>
              <div className="highlightsWrapper">
                <DailyHighlights />
                <DailyHighlights />
                <DailyHighlights />
                <DailyHighlights />
                <DailyHighlights />
                <DailyHighlights />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  ) : (
    <h1 style={{ textAlign: "center" }}>Fetching data!</h1>
  );
};

export default Today;
