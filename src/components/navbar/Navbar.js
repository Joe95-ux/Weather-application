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
        <button>&#8451;</button>
        <button>&#8457;</button>
      </div>
    </div>
  );
};

export default Navbar;
