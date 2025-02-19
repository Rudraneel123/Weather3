import { Link } from "react-router-dom";
import "../styleapp/Header.css";
import "../styleapp/Register.css";
function Header() {
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/antd">ANTD</Link>
            <Link to="/autoweather">AutoWeather</Link>
            <Link to="/addlist">AddList</Link>
            <Link to="/yourweather">YourWeather</Link>
          </div>
          <Link to="/">
            <button
              style={{
                backgroundColor: "rgba(124, 3, 135, 0.2)",
                border: "none",
                outline: "none",
                background: "none",
              }}
            >
              <img src="./logout.png" className="logout-button" />
            </button>
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
