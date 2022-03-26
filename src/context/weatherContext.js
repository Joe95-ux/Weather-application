import { createContext } from "react";

const WeatherContext = createContext();

const ContextProvider = ({ children }) => {
  const formatDate = (date) => {
    let day;
    let currentDay;
    let hour;
    let minutes;
    let timeString;
    let currentDate;
    let month;
    let currentTime;
    let dateString;
    let options = { month: "long" };
    const days = [
      "Sun",
      "Mon",
      "Tues",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
    ];
    if (date) {
      currentDate = new Date(date * 1000);
      dateString = currentDate.toLocaleTimeString();
      hour = new Date().getHours();
      hour = hour < 10 ? "0" + hour : hour;
      minutes = new Date().getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      month = new Intl.DateTimeFormat("en-US", options).format(currentDate);
      day = currentDate.getDay();
      day = days[day];
      currentDay = currentDate.getDate();
      timeString = currentDay + " " + month + " " + hour + ":" + minutes;
      currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return { day, timeString, currentDate, dateString, currentTime };
  };
  const formatTemp = (tempObject) => {
    
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let temp;
    if (tempObject) {
      const {day, eve, morn, night} = tempObject;
      if (hour > 4 && hour < 12) {
        temp = morn;
      } else if (hour >= 12 && hour < 17) {
        temp = day;
      } else if (hour >= 17 && hour < 22) {
        temp = eve;
      } else {
        temp = night;
      }
    }

    return Math.round(temp);
  };

  return (
    <WeatherContext.Provider
      value={{
        formatDate,
        formatTemp,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, ContextProvider };
