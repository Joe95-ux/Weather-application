import React from "react";
import "./sideDrawer.css";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const SideDrawer = () => {
  return (
    <div className="sideDrawer">
      <div className="topBar">
        <form>
          <div className="inputField">
            <SearchIcon />
            <input type="text" placeholder="search for places..." />
          </div>
        </form>
        <MyLocationIcon />
      </div>
      <img src="" alt="weather" />
      <h2 className="temp">12</h2>
      <h3 className="date">
        Monday, <span>16:00</span>
      </h3>
      <hr/>
      <p>Mostly cloudy</p>
      <p>Rain - 30%</p>
      <div className="cityImageContainer">
        <h3>New York, NY, USA</h3>
      </div>
    </div>
  );
};

export default SideDrawer;
