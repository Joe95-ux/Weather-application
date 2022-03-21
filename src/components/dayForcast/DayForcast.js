import "./dayForcast.css";
import {useContext} from "react";
import { WeatherContext } from "../../context/weatherContext";


const DayForcast = ({date,iconId,icon,maxTemp,minTemp}) => {
  const {formatDate} =  useContext(WeatherContext);
  const {day} = formatDate(date)
  return (
    <div className="dayReading">
      <h1>{day}</h1>
      <i className={`wi wi-owm-${iconId}`} style={{fontSize:"2rem",margin:"1rem 0", color:"purple"}}></i>
      <p>
        {Math.round(maxTemp) + "°"}<span>-{Math.round(minTemp) + "°"}</span>
      </p>
    </div>
  );
};

export default DayForcast;
