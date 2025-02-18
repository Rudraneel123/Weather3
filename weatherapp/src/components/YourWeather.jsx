import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
// import getWeather from "./api";
import getWeather from "../api";
import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Container, Card, Alert, Image, Spinner } from "react-bootstrap";

function YourWeather() {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch weather using coordinates
  const getWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError("");

    try {
      const weatherData = await getWeather(null, lat, lon); // Pass lat/lon instead of city
      if (weatherData.cod !== 200) {
        setError("Could not fetch weather. Try again.");
        setWeather({});
      } else {
        setWeather(weatherData);
      }
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
    }

    setLoading(false);
  };

  // Get user's location automatically on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoordinates(latitude, longitude);
        },
        (err) => {
          setError("Location access denied. Please enable it in your browser.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Function to format the date based on timezone
  const renderDate = (timezone) => {
    let now = new Date();
    let deviceTime = now.getTime() + now.getTimezoneOffset() * 60000;
    let localTime = new Date(deviceTime + timezone * 1000);
    return dateFormat(localTime, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <Container className="app text-center mt-5">
      <h1 className="mb-4">🌦️ Weather App for my location</h1>

      {loading && <Spinner animation="border" role="status" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Weather Display */}
      {weather && weather.weather ? (
        <Card
          className="shadow-lg p-4 mt-4 mx-auto"
          style={{ maxWidth: "500px", backgroundColor: "bisque" }}
        >
          <Card.Body>
            <Card.Title>
              📍 {weather.name}, {weather.sys.country}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {weather.timezone ? renderDate(weather.timezone) : "Updating..."}
            </Card.Subtitle>

            {/* Weather Icon & Description */}
            <div className="d-flex flex-column align-items-center my-3">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                rounded
              />
              <h3>{weather.weather[0].description}</h3>
            </div>

            {/* Temperature Details */}
            <h1 className="display-4">{weather.main.temp}°C</h1>
            <h5>Feels Like {weather.main.feels_like}°C</h5>

            {/* Wind Stats */}
            <h5 className="mt-3">🌬️ Wind Speed: {weather.wind.speed} m/s</h5>

            <h5 className="mt-3">🧭 Direction: {weather.wind.deg}°</h5>
          </Card.Body>
        </Card>
      ) : (
        !loading && <Alert variant="info">Fetching weather details...</Alert>
      )}
    </Container>
  );
}

export default YourWeather;
