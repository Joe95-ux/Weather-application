import "./dailyHighlights.css";
import { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

const DailyHighlights = ({ title, sunrise, sunset }) => {
  const { formatDate } = useContext(WeatherContext);
  const { currentTime: sunRise } = formatDate(sunrise);
  const { currentTime: sunSet } = formatDate(sunset);
  return (
    <div className="highlight">
      <h3>{title}</h3>
      {sunrise && sunset && (
        <div className="sunriseAndSunset">
          <div>
            <ArrowUpwardOutlinedIcon className="arrow"/>
            <h2>{sunRise}</h2>
          </div>
          <div>
            <ArrowDownwardOutlinedIcon className="arrow" />
            <h2>{sunSet}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyHighlights;
