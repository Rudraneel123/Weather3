import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import getWeather from "./api";
// import { useState } from "react";
// import dateFormat from "dateformat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AnTD from "./components/AnTD";
import AddList from "./components/AddList";
import AutoWeather from "./components/AutoWeather";
import YourWeather from "./components/YourWeather";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Landing from "./Landing";

const App = () => {
  const [loggedInUser, setLoggedUser] = useState(null);
  return (
    <div className="basic-centre" style={{ opacity: 0.9 }}>
      <Router>
        <AppContent loggedInUser={loggedInUser} setLoggedUser={setLoggedUser} />
      </Router>
    </div>
  );
};
const AppContent = ({ loggedInUser, setLoggedUser }) => {
  const location = useLocation();

  const showHeader = location.pathname !== "/" && location.pathname !== "/userregister";

  return (
    <div>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Login onLogin={setLoggedUser} />} />
        <Route path="/addlist" element={<AddList />} />
        <Route path="/autoweather" element={<AutoWeather />} />
        <Route path="/yourweather" element={<YourWeather />} />
        <Route path="/userregister" element={<Register />} />
        <Route path="/landing" element={<Landing />} />

        <Route
          path="/antd"
          element={
            loggedInUser ? <AnTD user={loggedInUser} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
};
AppContent.propTypes = {
  loggedInUser: PropTypes.object,
  setLoggedUser: PropTypes.func.isRequired,
};

export default App;
