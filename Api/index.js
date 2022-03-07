require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/weather", (req, res) => {
  const city = req.query.q;
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/climate/month",
    params: { q: city },
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
app.get("/today", async(req, res)=>{
    try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_APP_ID}`
        );
        res.json(response.data.location.city);
      } catch (e) {
        console.log(e);
      }
})

const PORT = process.env.Port || 3003;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
