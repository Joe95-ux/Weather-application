import { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import DailyHighlights from "./dailyHighlights/DailyHighlights";
import DayForcast from "./dayForcast/DayForcast";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { WeatherContext } from "../context/weatherContext";
import Loader from "./Loader";

// import useWeather from "../hooks/useWeather";

const Today = () => {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const { formatDate, formatTemp } = useContext(WeatherContext);

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
            let currentRes = await axios.get(`/api/currentWeather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric`);
            let currentData = await currentRes.data;
            let current = await currentData.current;
            let list = await currentData.daily.slice(0,6);
            console.log(currentRes.data,data);


            setWeatherData({
              city: data.city.name,
              country: data.city.country,
              description: current.weather[0].description,
              icon: current.weather[0].icon,
              iconId:current.weather[0].id,
              main: current.weather.main,
              pop: currentData.daily[0].pop,
              temperature: current.temp,
              tempObj:currentData.daily[0].temp,
              timestamp: current.dt,
              sunrise:current.sunrise,
              sunset:current.sunset,
              list:list,
              current:current,
              windSpeed:current.wind_speed,
              pressure:current.pressure,
              humidity: current.humidity
            });

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
  const { day, timeString, currentDate, dateString } = formatDate(
    weatherData.timestamp
  );
  const temp = formatTemp(weatherData.tempObj);
  if (weatherData.timestamp) {
    console.log(
      day,
      timeString,
      currentDate,
      dateString,
      weatherData.temperature
    );
  }

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
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                weatherData.icon +
                "@4x.png"
              }
              alt="weather"
            />
            <h2 className="temp">{temp + "??C"}</h2>
            <h3 className="date">
              {day}, <span>{timeString}</span>
            </h3>
            <hr />
            <p><i className={`wi wi-owm-${weatherData.iconId} ${weatherData.main}`} style={{marginRight:"5px"}}></i>{weatherData.description}</p>
            <p><i className="wi wi-rain" style={{marginRight:"5px"}}></i>Rain - {weatherData.pop * 100}%</p>
            
            <div className="cityImageContainer">
              <LocationOnOutlinedIcon />
              <h3>
                {weatherData.city}, {weatherData.country}
              </h3>
            </div>
          </div>
          <div className="weatherReadings">
            <Navbar />
            <div className="dayReadings">
            {weatherData.list.map((list)=>
              <DayForcast 
              key={uuidV4()}
              date={list.dt}
              iconId={list.weather[0].id}
              icon={list.weather[0].icon}
              maxTemp={list.temp.max}
              minTemp={list.temp.min}
              />
            )}
            </div>
            <div className="dailyHighlights">
              <h1>Today's Highlights</h1>
              <div className="highlightsWrapper">
                <DailyHighlights title = "Sunrise & Sunset" sunrise = {weatherData.sunrise} sunset= {weatherData.sunset} />
                <DailyHighlights title ="Humidity" humidity = {weatherData.humidity}/>
                <DailyHighlights title = "Wind Status" speed = {weatherData.windSpeed} />
                <DailyHighlights title = "Air Pressure" pressure = {weatherData.pressure}/>
                <DailyHighlights title = "Visibility $ Uv Index" uvi ={weatherData.current.uvi} vis ={weatherData.current.visibility}/>
                <DailyHighlights title = "Temperature" max={weatherData.tempObj.max} min={weatherData.tempObj.min}/>
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
    <Loader/>
  );
};

export default Today;
