import { Link } from "react-router-dom";
import "../styleapp/Header.css";
function Header() {
  return (
    <>
      <header>
        <nav>
          <Link to="/antd">ANTD</Link>
          <Link to="/autoweather">AutoWeather</Link>
          <Link to="/addlist">AddList</Link>
          <Link to="/yourweather">YourWeather</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
