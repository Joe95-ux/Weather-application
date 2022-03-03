import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Navbar from "./components/navbar/Navbar";
import SideDrawer from "./components/sideDrawer/SideDrawer";

const App = () => {
  return (
    <div className="containerFluid">
      <div className="mainWrapper">
        <div className="containerWrapper">
          <div className="drawerComponent">
            <SideDrawer />
          </div>
          <div className="weatherReadings">
            <Navbar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
