require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { request } = require("express");
const axios = require("axios").default;
const app = express();


app.use(cors());
app.use(express.json());

app.get("/api/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const cnt = req.query.cnt;
  const units = req.query.units;
  console.log(req.query);
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    params: {
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
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/api/currentWeather", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const units = req.query.units;
  console.log(req.query);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_APP_ID}`
    );
    res.json(response.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/today", async (req, res) => {
  try {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_APP_ID}`
    );
    res.json(response.data.location);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/coordinates", async (req, res) => {
  const city = req.query.q;
  console.log(city);
  if (city) {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_APP_ID}`
      );
      res.json(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  }
});

app.get("/api/place", async (req, res) => {
  const q = req.query.q;
  const options = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${process.env.GOOGLE_PLACES_APIKEY}`,
    headers: {},
  };
  try{
    const response = await axios.request(options);
    const photoRef = await response.data.results[0].photos[0].photo_reference;
    res.json(photoRef);

  }catch(e){
    console.log(e);
  }
});

app.get("/api/placePhoto", (req, res) => {
  const photoRef = "Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${photoRef}&key=${process.env.GOOGLE_PLACES_APIKEY}`;
    
  
  request(url).pipe(fs.createReadStream("places.jpeg"));
  fs.readFile('places.jpeg', function(err, data) {
    if (err) throw err; 
    else {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data); 
    }
  });
  
});

const PORT = process.env.Port || 3003;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
