import React from "react";

export interface WeatherData {
  city: string;
  description: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
}

interface WeatherDisplayProps {
  data: WeatherData;
  unit: "C" | "F";
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  data,
  unit,
}) => {
  return (
    <div className="weather-display">
      <h2 className="city-name">{data.city}</h2>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="weather-icon"
        />
        <div className="weather-temp">
          <h1>
            {Math.round(data.temperature)}°{unit}
          </h1>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="weather-details">
        <p>
          Feels like: {Math.round(data.feelsLike)}°{unit}
        </p>
        <p>Humidity: {data.humidity}%</p>
        <p>Wind: {Math.round(data.wind)} m/s</p>
      </div>
    </div>
  );
};
