const apiKey = "1fa297733ac3687df3b1444c858dacec";

// const selfWeather = async (city) => {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//     );
//     if (!response.ok) {
//       throw new Error(`City not found (${response.status})`);
//     }
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     return null; // Return null in case of an error
//   }
// };
const selfWeather = async (city = null, lat = null, lon = null) => {
    try {
      let url;
  
      if (lat !== null && lon !== null) {
        // Fetch weather using latitude & longitude
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      } else if (city) {
        // Fetch weather using city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      } else {
        throw new Error("City or coordinates are required to fetch weather.");
      }
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found (${response.status})`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };
  

export default selfWeather;
