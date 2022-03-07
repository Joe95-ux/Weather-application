import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Today from "./components/Today";
import Week from "./components/Week";

const App = () => {
  return (
    <div className="containerFluid">
      <div className="mainWrapper">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/week" element={<Week />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
