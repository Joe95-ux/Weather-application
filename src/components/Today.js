import { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import DailyHighlights from "./dailyHighlights/DailyHighlights";
import DayForcast from "./dayForcast/DayForcast";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useWeather from "../hooks/useWeather";

const Today = () => {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  let cityRef = useRef();

  const getDefaultCity = async () => {
    try {
      const response = await axios.get("http://localhost:3003/today");
      setCity(response.data.city);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDefaultCity();
  }, []);

  const getCoordinates = async (city) => {
    console.log(city);
    const url = "http://localhost:3003/coordinates?q=" + city;
    try {
      const response = await axios.request(url);
      setLat(response.data.lat);
      setLng(response.data.lon);
    } catch (e) {
      console.log(e);
    }
  };

  let weatherData = useWeather(city, lat, lng);
  console.log(weatherData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityRef.current.value);
    cityRef.current.value = "";
  };

  useEffect(() => {
    getCoordinates(city);
  }, [city]);

  return (
    <div className="containerWrapper">
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
        <img src="" alt="weather" />
        <h2 className="temp">12</h2>
        <h3 className="date">
          Monday, <span>16:00</span>
        </h3>
        <hr />
        <p>Mostly cloudy</p>
        <p>Rain - 30%</p>
        <div className="cityImageContainer">
          <h3>New York, NY, USA</h3>
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
    </div>
  );
};

export default Today;
