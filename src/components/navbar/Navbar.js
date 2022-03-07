import { NavLink } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <NavLink className="period" to="/" activeclassname="active">
          Today
        </NavLink>
        <NavLink className="period" to="/week" activeclassname="active">
          Week
        </NavLink>
      </div>
      <div className="btnContainer">
        <button>&#8451;</button>
        <button>&#8457;</button>
      </div>
    </div>
  );
};

export default Navbar;
