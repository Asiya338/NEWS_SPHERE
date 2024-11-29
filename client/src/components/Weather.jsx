import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSunRain,
  faSun,
  faCloud,
  faBolt,
  faSnowflake,
  faSmog,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWeatherIcon = (description) => {
    const conditionIcons = {
      Clear: faSun,
      Clouds: faCloud,
      Thunderstorm: faBolt,
      Drizzle: faCloudShowersHeavy,
      Rain: faCloudShowersHeavy,
      Snow: faSnowflake,
      Mist: faSmog,
      Smoke: faSmog,
      Haze: faSmog,
      Fog: faSmog,
    };

    // Return the icon based on the main weather condition
    return conditionIcons[description] || faCloudSunRain;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://news-sphere-backend.onrender.com/weather?city=${encodeURIComponent(
          city
        )}`
      );
      if (response.data.success) {
        setWeatherData(response.data.data);
      }
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 hover:drop-shadow-sm mt-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center">
          <pre>
            <b> Weather Today!!! </b>
          </pre>
          <FontAwesomeIcon icon={faCloudSunRain} style={{ fontSize: "50px" }} />
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="city">
              <b>City :</b>
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city, country name ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="font-bold py-2 px-4 rounded w-full bg-blue-500 text-white button"
          >
            Get Weather
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weatherData && (
          <div className="mt-4">
            <hr className="mt-3 mb-3" />
            <h3 className="text-lg font-bold text-center hover:underline">
              Weather Details of {city} :
            </h3>
            <div className="text-center mb-4">
              <h4>
                <b>{weatherData.weather[0].main} &nbsp;</b>
                <FontAwesomeIcon
                  icon={getWeatherIcon(weatherData.weather[0].main)}
                  style={{ fontSize: "40px", marginTop: "10px" }}
                />
              </h4>
            </div>
            <p>
              <b>Temperature : </b> {weatherData.main.temp} °C
            </p>
            <p>
              <b>Humidity : </b> {weatherData.main.humidity} %
            </p>
            <p>
              <b>Outlook : </b> {weatherData.weather[0].description}
            </p>
            <p>
              <b>Sunrise : </b> {formatTime(weatherData.sys.sunrise)}
            </p>
            <p>
              <b>Sunset : </b> {formatTime(weatherData.sys.sunset)}
            </p>
            <p>
              <b>Current Time : </b>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
