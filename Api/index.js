require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/weather", (req, res) => {
  const { q, lat, lon, cnt, units } = req.query;
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    params: {
      q: q,
      lat: lat,
      lon: lon,
      cnt: cnt,
      units: units,
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.WEATHER_APP_ID,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
app.get("/today", async (req, res) => {
  try {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_APP_ID}`
    );
    res.json(response.data.location);
  } catch (e) {
    console.log(e);
  }
});

app.get("/coordinates", async (req, res) => {
  const city = req.query.q;
  console.log(city);

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_APP_ID}`
    );
    res.json(response.data[0]);
  } catch (e) {
    console.log(e);
  }
});

const PORT = process.env.Port || 3003;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
