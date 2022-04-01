import "./dailyHighlights.css";
import { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import styled from "styled-components";

const Gage = styled.div`
  background: #40a4c8;
  width: ${(props) => props.humidity}%;
  border-radius: 55px;
  height: 100%;
`;

const DailyHighlights = ({
  title,
  sunrise,
  sunset,
  humidity,
  speed,
  pressure,
  max,
  min,
  uvi,
  vis,
}) => {
  const { formatDate } = useContext(WeatherContext);
  const { currentTime: sunRise } = formatDate(sunrise);
  const { currentTime: sunSet } = formatDate(sunset);

  return (
    <div className="highlight">
      <h3>{title}</h3>
      {sunrise && sunset && (
        <div className="sunriseAndSunset">
          <div>
            <ArrowUpwardOutlinedIcon className="arrow" />
            <h2>{sunRise}</h2>
          </div>
          <div>
            <ArrowDownwardOutlinedIcon className="arrow" />
            <h2>{sunSet}</h2>
          </div>
        </div>
      )}
      {humidity && (
        <>
          <div className="humidity">
            <i className="wi wi-humidity" style={{ marginRight: "12px" }}></i>
            <h2>{humidity + "%"}</h2>
          </div>
          <div className="lineContainer">
            <div className="readings">
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className="lineContainerInner">
              <Gage humidity={humidity}></Gage>
            </div>
            <div className="percentage">
              <p className="percentageContent">%</p>
            </div>
          </div>
        </>
      )}
      {speed && (
        <div className="wind">
          <h1>
            {speed} <span>km/h</span>
          </h1>
        </div>
      )}
      {pressure && (
        <div className="pressure">
          <h1>
            {pressure} <span>mb</span>
          </h1>
        </div>
      )}
      {max && (
        <div className="tempHighlight">
          <h2>
            <i
              className="wi wi-thermometer"
              style={{ marginRight: "12px" }}
            ></i>{" "}
            High/Low
          </h2>
          <p>
            {Math.round(max) + "°"}/{Math.round(min) + "°"}
          </p>
        </div>
      )}
      {vis && (
        <div className="visAndUvi">
          <div className="vis">
            <div>
              <VisibilityOutlinedIcon />
              <h4>Visibility</h4>
            </div>
            <div>{vis / 1000} km</div>
          </div>
          <div className="uvi">
            <div>
              <WbSunnyOutlinedIcon />
              <h4>Uv Index</h4>
            </div>
            <div>{uvi} of 10</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyHighlights;
