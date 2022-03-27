import "./dailyHighlights.css";
import { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import styled from "styled-components";

const Gage = styled.div`
    background: purple;
    width: ${props=>props.humidity}%;
    border-radius: 55px;
    height: 100%;
  `;

const DailyHighlights = ({ title, sunrise, sunset, humidity }) => {
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
            <div className="percentage"><p className="percentageContent">%</p></div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default DailyHighlights;
