import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link className="period" to="/today">
          Today
        </Link>
        <Link className="period" to="/week">
          Week
        </Link>
      </div>
      <div className="btnContainer">
        <button><span>o</span>C</button>
        <button><span>o</span>F</button>
      </div>
    </div>
  );
};

export default Navbar;
